import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './LocationInput.css';

const LocationInput = ({ label, placeholder, onLocationSelect, required }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const wrapperRef = useRef(null);

    const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

    useEffect(() => {
        // Close dropdown when clicking outside
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [wrapperRef]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!query || query.length < 3) {
                setSuggestions([]);
                return;
            }

            // Don't fetch if the query exactly matches the selected text (prevents refetch after selection)
            if (!isOpen) return;

            setIsLoading(true);
            try {
                const response = await axios.get(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`,
                    {
                        params: {
                            access_token: MAPBOX_TOKEN,
                            autocomplete: true,
                            limit: 5
                        }
                    }
                );

                if (response.data && response.data.features) {
                    setSuggestions(response.data.features);
                }
            } catch (error) {
                console.error('Error fetching Mapbox places:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchSuggestions();
        }, 500); // 500ms debounce

        return () => clearTimeout(timeoutId);
    }, [query, MAPBOX_TOKEN, isOpen]);

    const handleSelect = (feature) => {
        setQuery(feature.place_name);
        setIsOpen(false);
        setSuggestions([]);

        // Mapbox returns coordinates as [longitude, latitude]
        if (onLocationSelect) {
            onLocationSelect({
                name: feature.place_name,
                coordinates: feature.geometry.coordinates // [lng, lat]
            });
        }
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
        setIsOpen(true);
        if (onLocationSelect && e.target.value === '') {
            onLocationSelect(null); // Clear selection if input is cleared
        }
    };

    return (
        <div className="location-input-wrapper" ref={wrapperRef}>
            <label>{label}</label>
            <div className="location-input-container">
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    onFocus={() => { if (query.length >= 3) setIsOpen(true); }}
                    placeholder={placeholder || "Search for a place"}
                    required={required}
                    className="location-input"
                    autoComplete="off"
                />
                {isLoading && <span className="location-loading">...</span>}
            </div>

            {isOpen && suggestions.length > 0 && (
                <ul className="location-suggestions">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.id}
                            onClick={() => handleSelect(suggestion)}
                            className="location-suggestion-item"
                        >
                            <span className="suggestion-name">{suggestion.text}</span>
                            <span className="suggestion-address">{suggestion.place_name.substring(suggestion.text.length + 2)}</span>
                        </li>
                    ))}
                </ul>
            )}

            {isOpen && query.length >= 3 && !isLoading && suggestions.length === 0 && (
                <div className="location-suggestions empty">
                    No places found.
                </div>
            )}
        </div>
    );
};

export default LocationInput;

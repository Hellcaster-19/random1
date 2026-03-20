import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MapView from '../components/MapView';
import apiService from '../services/apiService';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    
    const [featuredRide, setFeaturedRide] = useState(null);
    const [scheduledRides, setScheduledRides] = useState([]);
    const [loadingMap, setLoadingMap] = useState(true);

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const [active, scheduled] = await Promise.all([
                    apiService.getActiveRides().catch(() => []),
                    apiService.getScheduledRides().catch(() => [])
                ]);
                
                const activeArray = Array.isArray(active) ? active : (active?.rides || []);
                const scheduledArray = Array.isArray(scheduled) ? scheduled : (scheduled?.rides || []);
                
                setScheduledRides(scheduledArray);
                
                if (activeArray.length > 0) {
                    setFeaturedRide(activeArray[0]);
                } else if (scheduledArray.length > 0) {
                    setFeaturedRide(scheduledArray[0]);
                }
            } catch (err) {
                console.error("Failed to load map data on landing page", err);
            } finally {
                setLoadingMap(false);
            }
        };
        fetchRides();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display h-screen overflow-y-auto w-full">
            <style dangerouslySetInnerHTML={{__html: `
                .glass {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .gradient-glow {
                    box-shadow: 0 0 20px rgba(255, 122, 92, 0.4);
                }
                body {
                    scroll-behavior: smooth;
                }
            `}} />

            {/* Navigation */}
            <header className="fixed top-0 z-50 w-full glass border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary p-1.5 rounded-lg">
                            <span className="material-symbols-outlined text-background-dark font-bold text-xl">emoji_emotions</span>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight text-white">Happiness Campaign</h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-10">
                        <Link className="text-sm font-medium hover:text-primary transition-colors text-white" to="/">Home</Link>
                        {user ? (
                            <Link className="text-sm font-medium hover:text-primary transition-colors text-white" to="/tracker">Live Map</Link>
                        ) : (
                            <a className="text-sm font-medium hover:text-primary transition-colors text-white" href="#live-ride">Live Map</a>
                        )}
                        <Link className="text-sm font-medium hover:text-primary transition-colors text-white" to="/campaigns">Campaigns</Link>
                        <Link className="text-sm font-medium hover:text-primary transition-colors text-white" to="/about">About</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        {user ? (
                            <button onClick={handleLogout} className="bg-white/10 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-white/20 transition-all border border-white/20">
                                Logout
                            </button>
                        ) : (
                            <Link to="/auth" state={{ tab: 'login' }}>
                                <button className="bg-gradient-to-r from-primary to-primary-light text-background-dark px-6 py-2.5 rounded-xl font-bold text-sm gradient-glow hover:opacity-90 transition-all">
                                    Join the Ride
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            {/* Section 1: Hero Landing */}
            <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/70 z-10"></div>
                    <div className="w-full h-full bg-cover bg-center" data-alt="Cinematic dark city road at night with street lights" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD2QXNNOXFEL0_D3AHusafV9Q3NLELqYkFH0Dixd0RTtksH-p_-EJDw1a7LMlb9LPzYaqVPmrrGEWTcyXwJcFVgCxe2coLJ3vEhTiWPcxbLo9tTB8zGDKicBR_KYOmluA3yq_8Mh8ewWmODyzCprLppsdR3bB_ujZuwJW1zy81Zjo6a6fVPxoLB3C5bD0c5AYo-hGBcKfWOiCa3ImnfR7Y3JlWV8DFdrNQeagw6t26mM5Uo1Tq7QfYnxINo7umVQbx8jPfI5TYQMCQ')" }}></div>
                </div>
                <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight text-white">
                        Drive Happiness <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">Across the City</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Track the Happiness Ride in real-time and join the movement spreading smiles across the streets.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to={user ? "/tracker" : "/auth"} state={{ tab: 'register' }} className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-primary-light text-background-dark rounded-xl font-bold text-lg gradient-glow">
                                Join the Ride
                            </button>
                        </Link>
                        <a href="#campaigns" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto px-8 py-4 glass text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all border border-white/20">
                                Explore Campaigns
                            </button>
                        </a>
                    </div>
                </div>

                {/* Web3 Widgets */}
                <div className="absolute bottom-12 left-6 right-6 z-20 flex flex-wrap justify-center gap-4 pointer-events-none">
                    <div className="glass p-4 rounded-xl flex items-center gap-4 pointer-events-auto border-primary/20">
                        <div className="h-10 w-10 bg-primary/20 rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary">groups</span>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold m-0">Live Riders</p>
                            <p className="text-xl font-black text-white m-0">1,284</p>
                        </div>
                    </div>
                    <div className="glass p-4 rounded-xl flex items-center gap-4 pointer-events-auto border-primary/20">
                        <div className="h-10 w-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-emerald-400">route</span>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold m-0">Route Updates</p>
                            <p className="text-xl font-black text-emerald-400 m-0">Active Now</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Live Happiness Ride */}
            <section className="py-24 px-6 max-w-7xl mx-auto" id="live-ride">
                <style>{`
                    .landing-map-view {
                        width: 100%;
                        height: 100%;
                        min-height: 500px;
                        border-radius: 0.75rem;
                        overflow: hidden;
                    }
                    .landing-map-view .map-container {
                        width: 100%;
                        height: 100%;
                    }
                    .landing-map-view .mapboxgl-map {
                        width: 100% !important;
                        height: 100% !important;
                    }
                `}</style>
                <div className="grid lg:grid-cols-12 gap-8 items-stretch">
                    {/* Left: Map */}
                    <div className="relative overflow-hidden lg:col-span-8 rounded-xl border border-white/5 h-[500px] lg:h-auto min-h-[500px] shadow-2xl shadow-primary/5 bg-[#0B0F14]">
                        {loadingMap ? (
                            <div className="flex items-center justify-center h-full w-full">
                                <span className="material-symbols-outlined text-4xl text-primary animate-spin">progress_activity</span>
                            </div>
                        ) : (
                            <div className="landing-map-view h-full w-full">
                                <MapView 
                                    ride={featuredRide} 
                                    scheduledRides={scheduledRides}
                                />
                            </div>
                        )}
                        <div className="absolute top-6 left-6 z-10 glass px-4 py-2 rounded-full flex items-center gap-2 border border-primary/20 bg-background-dark/60 backdrop-blur-md">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                            </span>
                            <span className="text-sm font-bold text-white">Live Tracking</span>
                        </div>
                    </div>

                    {/* Right: Info Panel */}
                    <div className="lg:col-span-4 glass p-8 rounded-xl flex flex-col justify-between border border-primary/10">
                        {loadingMap ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400">
                                <span className="material-symbols-outlined text-4xl mb-3 animate-spin">progress_activity</span>
                                <p>Loading ride data...</p>
                            </div>
                        ) : !featuredRide ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
                                <span className="material-symbols-outlined text-4xl mb-3 opacity-50">directions_car</span>
                                <p>No rides available right now.</p>
                                <p className="text-sm mt-2 opacity-70">Check back later or schedule one!</p>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <div className="flex items-center justify-between mb-8">
                                        {featuredRide.status === 'scheduled' ? (
                                            <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-black rounded-full border border-blue-500/20">SCHEDULED</span>
                                        ) : (
                                            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-black rounded-full border border-emerald-500/20">ACTIVE</span>
                                        )}
                                        <span className="text-slate-400 text-sm font-mono">Ride ID: #{featuredRide._id?.substring(featuredRide._id.length - 6).toUpperCase() || 'HC-9921'}</span>
                                    </div>
                                    <h3 className="text-3xl font-bold mb-2 break-words">{featuredRide.title || featuredRide.rideName || 'City Happiness Tour'}</h3>
                                    <p className="text-primary font-medium mb-8">Happiness Ride</p>
                                    <div className="space-y-6 mb-10">
                                        <div className="flex items-start gap-4">
                                            <span className="material-symbols-outlined text-slate-400 mt-0.5">location_on</span>
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase font-bold m-0 mb-1">Current Location</p>
                                                <p className="text-white font-medium m-0">
                                                    {featuredRide.location?.coordinates 
                                                        ? `${featuredRide.location.coordinates[1].toFixed(4)}° N, ${featuredRide.location.coordinates[0].toFixed(4)}° E`
                                                        : 'Fetching location...'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <span className="material-symbols-outlined text-slate-400 mt-0.5">directions_car</span>
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase font-bold m-0 mb-1">Vehicle</p>
                                                <p className="text-white font-medium m-0">{featuredRide.vehicleName || 'Happiness Bus'}</p>
                                            </div>
                                        </div>
                                        {featuredRide.status !== 'scheduled' && (
                                            <div className="flex items-start gap-4">
                                                <span className="material-symbols-outlined text-slate-400 mt-0.5">speed</span>
                                                <div>
                                                    <p className="text-xs text-slate-500 uppercase font-bold m-0 mb-1">Current Speed</p>
                                                    <p className="text-white font-medium m-0">
                                                        {featuredRide.speed ? `${featuredRide.speed} km/h` : 'Tracking...'}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex items-start gap-4">
                                            <span className="material-symbols-outlined text-slate-400 mt-0.5">group</span>
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase font-bold m-0 mb-1">Riders</p>
                                                <p className="text-white font-medium m-0">{featuredRide.waypoints?.length || 0} / {featuredRide.maxPassengers || 10} Joined</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Link to={user ? "/tracker" : "/auth"} state={{ tab: 'login' }} className="w-full">
                                    <button className="w-full h-14 bg-primary text-background-dark font-black rounded-xl hover:bg-primary-light transition-all border-none flex items-center justify-center gap-2">
                                        JOIN THIS RIDE <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Section 3: Suggested Happiness Rides */}
            <section className="py-24 bg-primary/5" id="campaigns">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div>
                            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2 mt-0">Near You</p>
                            <h2 className="text-4xl font-extrabold tracking-tight text-white m-0">Suggested Happiness Rides</h2>
                        </div>
                        <a className="text-primary font-bold hover:underline flex items-center gap-1 decoration-transparent" href="#campaigns">
                            View all campaigns <span className="material-symbols-outlined block">chevron_right</span>
                        </a>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="group glass rounded-xl overflow-hidden hover:border-primary/50 transition-all cursor-pointer">
                            <div className="h-48 relative overflow-hidden">
                                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" data-alt="Beautiful sunrise over green fields" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCC3rXmLD0RkamEKfcQKLizzCyrClapEP4tHCHNO01MAwTGRYlLGZXKqQUp7v8TPVL-b1rX0cIpdR04cv3GxS_NIdEvf4IsvHoJP9iCGQLSBUPthFZDgWzxG6o2p7GwH_Xzr2JrVB0ckmCZPhto0sGJ6ZExTAdBP_WBnAMiftoDdRk9EpRWtEFry6TK0-XuJ68_t3TZLGdO5TEURAbIihf2KnAtxD18yRWiHyk2C1cSb1nS1HOXBwMcqCKzvuhLMCRVdhnov7_n4gg')" }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                    <span className="glass px-3 py-1 rounded-full text-[10px] font-bold text-white border-white/20">UPCOMING</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors text-white mt-0">Sunrise Happiness Ride</h4>
                                <p className="text-slate-400 text-sm mb-6 line-clamp-2">Start your day with positivity. Join the fleet as we head towards the lakeside for a morning meditation.</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-cover" data-alt="User avatar" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAdcAhLepLYuVvelAP2QP47fecCPlRLBaSNzir95lGEn1tQYACalZjaj4kvki9XeS_cguTzprxdSIL9NyeApHIsYRsCUSgfGQDRUq8KJvPaYeOMf2LyXLsdXUYnxgDBTT37FMjp5GrvXPJu_AP-h1W1p4rslEcs_ZLBbO8ZAXuklBg4qSDsSQehHn6ketuJI0JTvH4-pIcuKU5JmxiWxYa435biAPjKuvWgzSBUb_7gRG97DGLxdqYaOS2nGDU1mTgdCJHM35c1OAc')" }}></div>
                                        <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-cover" data-alt="User avatar" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB2bG-BjBO6yKUBEwkQNP18CVPIlLlwNIWRFBaTARj9yIHy2Sat9IJhyU4dm0b3sNlLscsH2fP9andznNwxkaE_U-sJe2ZP9YZY75JM4bVQ-O4W61Vx3W6P7hRzD3mC08Fvsae93jDERQTPmb4jvXK1AYGs9yEo7WhnWjGiVMOdfLPUvhwXg2vFx7UsVz6zrhuA41cBCk6Vq29o1ygVexE75PROJ1wo2R8WAt_jo3Ld8hKHg6a3k2eVZbApeyprlA1ERtBEE_RpLIE')" }}></div>
                                        <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-cover" data-alt="User avatar" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBROabzy4zgQ-ubtpJLAciivT39IDc7C7M8WFWO7apgaZXMP3vsQBss9Qsvnz3Qbf3cVKYLINLRPYfYn3HT5mX6kzoSJL40oHKvl9zAnxki8A1TrqjjiKK47IgY2T-hf-VG0y52txGgw014iyGrNYAjo6ptVp1FFkD17QF9rvtlkES-jXhuXgKZLTjDCBlw4eZdgvGcl0hpbQEboDEFVV-hVg44mFRZYGOU3kwPAnZ72ck2XWq1SVX3ok4W8wn42_wEgGpeOa0BMDs')" }}></div>
                                        <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">+12</div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-500">Starts in 4h</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="group glass rounded-xl overflow-hidden hover:border-primary/50 transition-all cursor-pointer">
                            <div className="h-48 relative overflow-hidden">
                                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" data-alt="Hands planting a small tree in soil" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAqRBqOe7w5wCvmc3zx88G9L9Js6nJKo--cEL9_Z7mULwG8c4Fs4WFXbYeKSDNZpwX_PJ2cHKgtyidkvMl82m3_QgdwdVugL3OWwAvFvWmngGMbw8qNRIjQzb7emGlkD77110ou_2cltJxxnVh4vXhGTHmurp4figh7qsIkPoeMKC4TQkNw3W-mZT-bLAdh3_M04ErQ0TDA4mbwx28HFOeGMtovnvTaBw6woXTQrXPH1QFVLxI1-Xix65vHwbpF_3-KCzCHI-yBPtg')" }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-[10px] font-bold">ECO-FRIENDLY</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors text-white mt-0">Plant Trees Campaign</h4>
                                <p className="text-slate-400 text-sm mb-6 line-clamp-2">Driving green! Join us to distribute saplings across the urban centers of the city.</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-cover" data-alt="User avatar" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAuBWb-AtbABAGKk_Y40_aoVT2fdRM2QBAmgJnH2RU6-4bZufuK81lkTe8g53e3O_hM8NL5RnxiKcPiX_Gdb2qjfXWm7MQYnu1xJxXds6X2WLH3ivqVLwNxiWlA0anzsH696NMoLaZKH1Z3lmfI42yMQHfA_6Oi78O6whcviiAjvpQYReCjywl-rxp9zXbUy--Px3xK9XUm6eOpcv0tYx46tNZPVEMIpvRxfp3eE8wDu0f_AAWS6F-q-d-DxpOTL0GtszTM4tlXKVw')" }}></div>
                                        <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-cover" data-alt="User avatar" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBkxPZ6YVIVMDOZ-zHhcgLtVDs_WsjY2RMhwNvvBNPI7D2gILeXWxg57QcqN1qa4MoMbMt7gEgP4ynNMOcrMzO6Q4H-o32mn5OQR1s8HeN5UEIv3pFKkYW-9JOmLVEHYBrX8d-jRS1JiJuUgYlXvxJGAufP7dt3LdlNOJAvL343sBUFaudFeqf0Vj1aY5XdLJUiWUB08bBI5hZ4KkAA5-es_02KAvthkMTrsDlce9IMvrpoonNXwjk_m_6luK8hoSpj64glyCE-3qQ')" }}></div>
                                        <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">+45</div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-500">200 Saplings Ready</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="group glass rounded-xl overflow-hidden hover:border-primary/50 transition-all cursor-pointer">
                            <div className="h-48 relative overflow-hidden">
                                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" data-alt="Volunteers handing out food packages" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCpt0C-_n1lQD9cL8Tntw-14kFomwC_3Hc1gck5Bc28xocKiow9LYanp5jh33WtFT2lQYjDcXUK6wVoA0xmefpYySt2eUj_p8jhrKPCMgLfJILS9F3tATWFjzM1OMGEYpYKt8GBsUnC9oA92bidhoJY5ImGDrhDyBceg0nKpJ2JWtG22MOxK005-bzpK-xLf7khX7_DL0ODJ5PbLqkFjg9YDfesEvbeZTDAlQ9GTzJKec0By8PmPYsaT2QRqu2FyyCMXeifSsXlRXU')" }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                    <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-[10px] font-bold">DONATION</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors text-white mt-0">Food Donation Ride</h4>
                                <p className="text-slate-400 text-sm mb-6 line-clamp-2">Partnering with local restaurants to distribute surplus fresh food to communities in need.</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-cover" data-alt="User avatar" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC2-zZ8Sp7ksRiCyDlG8q0t2VR0fs9ujeo7EbW14520ELNoUmhcbB3TXdmJ0_DsXkVQzNzQ-nSgOhBkCHbgqBc_GQsi9_EiW13IJJ3z5nGg5YSLLt673c8AjKdwR7EXb0_QNYezpdUB90UQqWnYZSBszHDeH9eC96PLzMJMv0bRGcy5G98zGVKwfseNCgEdVjeaxUVLiVvL-mmFOFlA_WMfA4fjrJ-feuJe5tNphpo4StQtM_b4siHfHpDxPC02dFI-3Usylvk6QOc')" }}></div>
                                        <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-cover" data-alt="User avatar" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD27BuecfSUh8-FMmGUu0dSU6D8RjQEIkKvkNNw2a4Cf1ISElbpvkPzZxVpvNIyDEzxQVn_jkh9ZZg0gUL1sr5Co8W_vqyqPW2512mXVPT1sGzM1VuTXtH1tbAVCDF4x6J2MLHlOz0eyr1lRpGqc2q7oX0D8tZtzDTvchr1BMoqfD-oOM1sgj7kCNAZKCJPv_3oZi3AGvoE2e8Muf_KI8nMHIRCHrqgrQiFlXqsZhdxsXZBfIfryda_lGcqZSrH-nnPr0e_1BzyvYM')" }}></div>
                                        <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">+88</div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-500">Ongoing</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/5 bg-background-dark">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-3 opacity-50">
                        <div className="bg-slate-700 p-1.5 rounded-lg">
                            <span className="material-symbols-outlined text-background-dark font-bold text-sm block">emoji_emotions</span>
                        </div>
                        <h2 className="text-lg font-bold tracking-tight m-0 text-white">Happiness Campaign</h2>
                    </div>
                    <p className="text-slate-500 text-sm m-0">© 2024 Happiness Campaign. Spreading smiles digitally.</p>
                    <div className="flex gap-6 text-slate-400">
                        <a className="hover:text-primary decoration-transparent" href="#"><span className="material-symbols-outlined block text-white/70">public</span></a>
                        <a className="hover:text-primary decoration-transparent" href="#"><span className="material-symbols-outlined block text-white/70">share</span></a>
                        <a className="hover:text-primary decoration-transparent" href="#"><span className="material-symbols-outlined block text-white/70">chat</span></a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;

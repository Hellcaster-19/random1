const fs = require('fs');

// Read the raw HTML file
const htmlPath = process.argv[2] || 'livemap_raw.html';
const outputPath = 'src/pages/LiveMapPage.jsx';

let html = fs.readFileSync(htmlPath, 'utf8');

// Extract body content only
const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
if (!bodyMatch) {
  console.error('No body found');
  process.exit(1);
}

let body = bodyMatch[1];

// HTML to JSX conversions
// 1. class -> className
body = body.replace(/\bclass=/g, 'className=');

// 2. Convert style strings to objects
// Handle style="key: value; key2: value2;"
body = body.replace(/style="([^"]*)"/g, (match, styleStr) => {
  const props = styleStr.split(';').filter(s => s.trim()).map(s => {
    const [key, ...valParts] = s.split(':');
    const val = valParts.join(':').trim();
    // Convert CSS property to camelCase
    const camelKey = key.trim().replace(/-([a-z])/g, (m, c) => c.toUpperCase());
    // Determine if value is numeric
    if (/^\d+(\.\d+)?$/.test(val)) {
      return `${camelKey}: ${val}`;
    }
    return `${camelKey}: '${val.replace(/'/g, "\\'")}'`;
  });
  return `style={{${props.join(', ')}}}`;
});

// 3. Fix self-closing tags: <input ... /> <img ... /> <br/> <hr/>
// input tags
body = body.replace(/<input([^>]*?)\/>/g, '<input$1 />');
body = body.replace(/<input([^>]*?)(?<!\/)>/g, '<input$1 />');
// img tags
body = body.replace(/<img([^>]*?)\/>/g, '<img$1 />');
body = body.replace(/<img([^>]*?)(?<!\/)>/g, '<img$1 />');

// 4. Convert HTML comments to JSX comments
body = body.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

// 5. Fix stroke-width -> strokeWidth, stroke-dasharray -> strokeDasharray, etc. in SVG
body = body.replace(/stroke-width=/g, 'strokeWidth=');
body = body.replace(/stroke-dasharray=/g, 'strokeDasharray=');
body = body.replace(/viewbox=/gi, 'viewBox=');
body = body.replace(/data-alt=/g, 'dataAlt=');
body = body.replace(/data-location=/g, 'dataLocation=');

// 6. Fix for/htmlFor
body = body.replace(/\bfor=/g, 'htmlFor=');

// Build JSX component
const jsx = `import React from 'react';
import { Link } from 'react-router-dom';

const LiveMapPage = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-hidden h-screen flex flex-col">
      <style>{\`
        .glass-sidebar {
          background: rgba(17, 24, 39, 0.7);
          backdrop-filter: blur(12px);
          border-right: 1px solid rgba(255, 122, 92, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 122, 92, 0.3);
          border-radius: 10px;
        }
        .map-container {
          background: radial-gradient(circle at center, rgba(255, 122, 92, 0.08) 0%, rgba(11, 15, 20, 0.9) 60%), #0B0F14;
        }
        .map-container img {
          filter: grayscale(0.85) brightness(0.9);
        }
      \`}</style>
${body}
    </div>
  );
};

export default LiveMapPage;
`;

fs.writeFileSync(outputPath, jsx, 'utf8');
console.log('LiveMapPage.jsx written successfully to', outputPath);
`;

// Now let's also fix the Link components for Home and Live Map
let result = jsx;
// Replace Home link
result = result.replace(
  /<a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Home<\/a>/,
  '<Link className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" to="/">Home</Link>'
);
// Replace Live Map link
result = result.replace(
  /<a className="text-primary text-sm font-bold border-b-2 border-primary pb-1" href="#">Live Map<\/a>/,
  '<Link className="text-primary text-sm font-bold border-b-2 border-primary pb-1" to="/tracker">Live Map</Link>'
);

fs.writeFileSync(outputPath, result, 'utf8');
console.log('LiveMapPage.jsx written successfully to', outputPath);

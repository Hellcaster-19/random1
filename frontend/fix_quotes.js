const fs = require('fs');

const inputPath = 'live_map_screen.html';
const outputPath = 'src/pages/LiveMapPage.jsx';

function fixHTMLToJSX() {
    let content = fs.readFileSync(inputPath, 'utf8');

    // 1. Remove doctype, html, head, meta, script tags
    content = content.replace(/<!DOCTYPE html>[\s\S]*?<body[^>]*>/i, '');
    content = content.replace(/<\/body>[\s\S]*?<\/html>/i, '');

    // 2. Change class to className
    content = content.replace(/class=/g, 'className=');

    // 3. Fix unclosed tags (img, input, hr, br)
    content = content.replace(/<(img|input|hr|br)([^>]*?)(?<!\/)>/g, '<$1$2/>');

    // 4. Wrap in a React Component
    content = `import React from 'react';

const LiveMapPage = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display h-screen overflow-y-auto w-full">
      ${content}
    </div>
  );
};

export default LiveMapPage;
`;

    // 5. Write to file
    fs.writeFileSync(outputPath, content);
    console.log(`Successfully converted ${inputPath} to ${outputPath}`);
}

fixHTMLToJSX();

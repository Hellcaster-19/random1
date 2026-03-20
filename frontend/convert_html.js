const fs = require('fs');
let html = fs.readFileSync('temp_screen.html', 'utf8');
let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
let innerHtml = bodyMatch[1] || html;
innerHtml = innerHtml.replace(/class=/g, 'className=');
innerHtml = innerHtml.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
innerHtml = innerHtml.replace(/<img([^>]+?)([^\/])>/g, '<img$1$2/>');
innerHtml = innerHtml.replace(/<br>/g, '<br/>');
innerHtml = innerHtml.replace(/<hr>/g, '<hr/>');
innerHtml = innerHtml.replace(/style=\"([^\"]+)\"/g, (match, styleStr) => {
    let objStr = styleStr.split(';').filter(s => s.trim()).map(s => {
        let parts = s.split(':');
        if(parts.length < 2) return '';
        let key = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        let val = parts.slice(1).join(':').trim();
        return key + ': \'' + val + '\'';
    }).join(', ');
    return 'style={{' + objStr + '}}';
});

let component = `import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
      logout();
      navigate('/');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <style dangerouslySetInnerHTML={{__html: \`
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
      \`}} />
      ${innerHtml}
    </div>
  );
};

export default HomePage;
`;

fs.writeFileSync('src/pages/HomePage.jsx', component);
console.log('Done!');

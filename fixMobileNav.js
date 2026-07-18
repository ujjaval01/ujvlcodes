const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const cssFix = `
/* --- MOBILE NAV FIX --- */
@media (max-width: 760px) {
  .nav-right {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: flex-end !important;
    gap: 12px !important;
    width: auto !important;
    flex-wrap: nowrap !important;
  }
  .theme-btn, .mobile-menu-toggle {
    display: inline-flex !important;
    margin: 0 !important;
    position: relative !important;
    top: auto !important;
    right: auto !important;
  }
}
`;

files.forEach(f => {
  let content;
  try {
    content = fs.readFileSync(f, 'utf16le');
    if (!content.includes('</style>')) {
      content = fs.readFileSync(f, 'utf8');
    }
  } catch(e) {
    content = fs.readFileSync(f, 'utf8');
  }
  
  if(content.includes('</style>') && !content.includes('/* --- MOBILE NAV FIX --- */')) {
    content = content.replace('</style>', cssFix + '\n</style>');
    // Save as utf8 because that's what we usually work with here
    fs.writeFileSync(f, content, 'utf8');
    console.log('Fixed ' + f);
  }
});

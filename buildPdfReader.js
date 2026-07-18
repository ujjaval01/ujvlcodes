const fs = require('fs');

const file = 'cobraPdf.html';
let content = fs.readFileSync(file, 'utf8');

// Replace Title
content = content.replace(/<title>.*?<\/title>/, '<title>Cobra PDF - Professional Offline PDF Toolkit</title>');
// Replace Description
content = content.replace(/<meta name="description" content=".*?">/, '<meta name="description" content="A fast, secure, and 100% offline PDF management system for mobile professionals.">');

// Replace Main Block
const newMain = `<main>
  <!-- HERO -->
  <section class="hero-section" id="home" data-signal="Intro">
    <div class="hero-grid"></div>
    <div class="hero-orb" aria-hidden="true"></div>
    <div class="hero-content">
      <div class="hero-kicker">
        <span class="eyebrow">Android Native · MVVM</span>
      </div>
      <h1>Your Professional <em>Offline PDF Toolkit</em>.</h1>
      <p class="hero-subtitle">A fast, secure, and 100% offline PDF management system for mobile professionals.</p>
      <div class="hero-cta">
        <a href="#" class="btn btn-primary glow-border">Download App</a>
        <a href="#features" class="btn btn-outline">Explore Features</a>
      </div>
    </div>
  </section>

  <!-- FEATURES -->
  <section class="features-section reveal" id="features" data-signal="Features">
    <div class="features-header">
      <span class="eyebrow">Product Specs</span>
      <h2>Core Features</h2>
    </div>
    <div class="features-grid">
      <div class="feature-card">
        <h3>⚡ High-Speed Engine</h3>
        <p>Instant loading of large documents powered by a high-performance rendering engine.</p>
      </div>
      <div class="feature-card">
        <h3>📖 Dual Reading Modes</h3>
        <p>Support for both Horizontal (magazine style) and Vertical (continuous scroll) swiping.</p>
      </div>
      <div class="feature-card">
        <h3>🌙 Night Mode & Smart Zoom</h3>
        <p>Native Dark Mode support and fluid pinch-to-zoom for detailed document inspection.</p>
      </div>
      <div class="feature-card">
        <h3>🔒 Privacy & Security</h3>
        <p>100% offline processing and Zero Data Upload. Protect sensitive files with 128-bit AES encryption.</p>
      </div>
      <div class="feature-card">
        <h3>🧰 Professional Tools</h3>
        <p>Image to PDF, Merge, Split, and Compress files locally on your device hardware.</p>
      </div>
      <div class="feature-card">
        <h3>📁 Organized Storage</h3>
        <p>Auto-scan finds all PDFs instantly. Built with Room Database for fast local storage.</p>
      </div>
    </div>
  </section>

  <!-- APP PREVIEW -->
  <section class="video-section reveal" id="preview" data-signal="Preview">
    <div class="video-inner">
      <div class="video-info">
        <span class="eyebrow">Interactive Demo</span>
        <h2>100% Offline &amp; <em>Secure</em> workflows.</h2>
        <p>Watch how Cobra PDF flows seamlessly through local document processing, encryption, and dark mode reading. Implemented natively in Kotlin with MVVM architecture.</p>
      </div>
      <div class="film-panel">
        <div class="film-frame">
          <img src="https://images.unsplash.com/photo-1547237711-8e9a3a37b85e?w=600&h=400&fit=crop" style="width:100%; height:100%; object-fit:cover;" alt="PDF Viewer Demo">
        </div>
        <div class="film-caption">
          <strong>Cobra PDF Showcase</strong>
          <span>Native Android walkthrough</span>
        </div>
      </div>
    </div>
  </section>

  <!-- SCREENSHOTS -->
  <section class="screenshots-section reveal" id="screenshots" data-signal="Screenshots">
    <div class="screenshots-header">
      <span class="eyebrow">Galleria</span>
      <h2>App Screenshots</h2>
    </div>
    <div class="image-slider">
      <div class="slider-track">
        <img src="https://images.unsplash.com/photo-1547237711-8e9a3a37b85e?w=400&h=800&fit=crop" alt="UI 1" loading="lazy">
        <img src="https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?w=400&h=800&fit=crop" alt="UI 2" loading="lazy">
        <img src="https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=400&h=800&fit=crop" alt="UI 3" loading="lazy">
        <img src="https://images.unsplash.com/photo-1547237711-8e9a3a37b85e?w=400&h=800&fit=crop" alt="UI 1" loading="lazy">
        <img src="https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?w=400&h=800&fit=crop" alt="UI 2" loading="lazy">
        <img src="https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=400&h=800&fit=crop" alt="UI 3" loading="lazy">
      </div>
    </div>
  </section>

  <!-- REVIEWS -->
  <section class="testimonial-section reveal" id="reviews" data-signal="Reviews">
    <div class="testimonial-shell">
      <h2>User Reviews</h2>
      <div id="review-slider">
        <p id="review-text">"The best offline PDF toolkit I've ever used. Lightning fast!"</p>
        <h5 id="review-author">- Professional User</h5>
      </div>
    </div>
  </section>

  <!-- DOWNLOAD -->
  <section class="download-section reveal" id="download" data-signal="Download">
    <div class="download-panel">
      <h2>Ready to upgrade your <em>documents</em>?</h2>
      <p>Download Cobra PDF on Google Play and securely manage your files offline.</p>
      <div class="download-cta">
        <a href="#" class="btn btn-primary glow-border">Get Cobra PDF</a>
      </div>
    </div>
  </section>
</main>`;

const mainStart = content.indexOf('<main>');
const mainEnd = content.indexOf('</main>') + 7;

content = content.substring(0, mainStart) + newMain + content.substring(mainEnd);

// Also replace the footer or header specific texts if any (e.g. quoteApp references to cobraPdf if needed).
// The script above handles the main replacements.

fs.writeFileSync(file, content, 'utf8');
console.log('cobraPdf.html updated.');

# LUMIX Landing Page

A modern, responsive landing page for LUMIX - AI-Powered Development Tools platform.

## Features

### 🎨 Design
- **Purple & Black Theme**: Elegant color scheme with subtle purple shades
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Modern Animations**: Smooth transitions, hover effects, and scroll animations
- **Accessibility**: Keyboard navigation, focus states, and reduced motion support

### 🚀 Sections

1. **Header Navigation**
   - Fixed header with smooth scrolling navigation
   - Mobile hamburger menu with animations
   - Brand logo with gradient text effect

2. **Hero Section**
   - Animated title with staggered entrance effects
   - Floating elements with parallax scrolling
   - Call-to-action buttons with hover effects

3. **Drives Section**
   - Horizontal scrolling company cards
   - Auto-scroll functionality with manual controls
   - Touch/swipe support for mobile devices
   - Mouse wheel scrolling support

4. **AI Tools Overview**
   - Grid layout with tool cards
   - Hover animations and feature tags
   - Scroll-triggered entrance animations

5. **GitHub Search**
   - Live GitHub API integration
   - Search repositories, users, and topics
   - Real-time results with loading states
   - Sorting and filtering options

6. **Community Section**
   - Interactive community cards
   - Join button animations
   - Feature highlights with icons

7. **Footer**
   - Multi-column layout with essential links
   - Social media icons with hover effects
   - Responsive design for mobile

### ⚡ Interactive Features

- **Smooth Scrolling**: Navigation links scroll smoothly to sections
- **Mobile Menu**: Animated hamburger menu for mobile devices
- **Auto-Scroll**: Drives section automatically scrolls through cards
- **GitHub API**: Real-time repository search functionality
- **Touch Support**: Swipe gestures for mobile interactions
- **Keyboard Navigation**: Full keyboard accessibility support

### 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: 360px - 479px
- **Extra Small**: Below 360px

## Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality and API integration
- **GitHub API**: Live repository search
- **Font Awesome**: Icons and visual elements

## File Structure

```
lumix-landing/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Complete CSS styling
├── js/
│   └── script.js       # JavaScript functionality
├── images/             # Image assets directory
└── README.md           # Project documentation
```

## Setup Instructions

1. **Download**: Extract the zip file to your desired location
2. **Open**: Open `index.html` in your web browser
3. **Local Server** (Optional): For best experience, serve via local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## Browser Compatibility

- **Chrome**: 70+
- **Firefox**: 65+
- **Safari**: 12+
- **Edge**: 79+
- **Mobile Browsers**: iOS Safari 12+, Chrome Mobile 70+

## Performance Features

- **Optimized Animations**: Hardware-accelerated CSS animations
- **Debounced Search**: Prevents excessive API calls
- **Lazy Loading**: Scroll-triggered animations for better performance
- **Responsive Images**: Optimized for different screen sizes
- **Minimal Dependencies**: Only Font Awesome for icons

## Customization

### Colors
Edit CSS variables in `:root` to change the color scheme:
```css
:root {
    --primary-purple: #6B46C1;
    --light-purple: #A78BFA;
    --dark-purple: #4C1D95;
    /* ... other colors */
}
```

### Content
- Update company information in the Drives section
- Modify AI tools in the Tools Overview section
- Customize community features and statistics
- Edit footer links and social media URLs

### GitHub API
The GitHub search functionality uses the public GitHub API. No authentication required for basic searches, but rate limits apply (60 requests per hour per IP).

## Features in Detail

### Horizontal Scrolling (Drives Section)
- Auto-scroll every 4 seconds
- Manual navigation with left/right buttons
- Touch/swipe support for mobile
- Mouse wheel scrolling
- Infinite loop scrolling

### GitHub Search
- Search repositories, users, or topics
- Sort by relevance, stars, or recent updates
- Display repository stats (stars, forks, watchers)
- Show programming languages and topics
- Responsive result cards

### Animations
- CSS keyframe animations for smooth effects
- Intersection Observer for scroll-triggered animations
- Staggered entrance animations
- Parallax scrolling effects
- Hover state transitions

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please refer to the documentation or create an issue in the project repository.

---

**LUMIX** - Illuminating Innovation in AI-Powered Development Tools


# Weeks From Today Calculator

A comprehensive SEO-optimized date calculator website that helps users calculate future dates by adding weeks to today's date.

## Features

### Core Functionality
- **Date Calculator**: Calculate any future date by adding weeks to a start date
- **Multiple Date Formats**: Support for MM/DD/YYYY, DD/MM/YYYY, and YYYY-MM-DD formats
- **Business Day Calculations**: Option to exclude weekends and holidays
- **Custom Start Dates**: Use any date as the starting point, not just today
- **Real-time Results**: Instant calculation with countdown display

### User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Copy/Share/Export**: Multiple ways to save and share calculation results
- **Quick Links**: Easy access to common week calculations (1, 2, 4, 8, 12, 52 weeks)
- **Error Handling**: User-friendly notifications for invalid inputs
- **Smooth Animations**: Enhanced UI with hover effects and transitions

### SEO Optimization
- **Targeted Keywords**: Optimized for "weeks from today" and related long-tail keywords
- **Structured Data**: Proper HTML5 semantic structure for better search engine understanding
- **Internal Linking**: Comprehensive internal linking structure between pages
- **Meta Tags**: Optimized title tags and meta descriptions for each page
- **Sitemap & Robots.txt**: Proper SEO configuration files included

### Content Strategy
- **Dedicated Pages**: Individual pages for 1, 2, 4, 8, 12, and 52 weeks calculations
- **Detailed Explanations**: Manual calculation methods and Excel formulas
- **Use Cases**: Practical applications for different timeframes
- **FAQ Section**: Comprehensive answers to common questions
- **Educational Content**: Business and personal planning guidance

## Project Structure

```
├── index.html                    # Homepage with main calculator
├── faq.html                     # Frequently Asked Questions
├── terms.html                   # Terms of Service & Privacy Policy
├── sitemap.xml                  # SEO sitemap
├── robots.txt                   # Search engine instructions
├── css/
│   └── styles.css              # Main stylesheet
├── js/
│   └── calculator.js           # Core calculator functionality
├── pages/
│   ├── 1-weeks-from-today.html
│   ├── 2-weeks-from-today.html
│   ├── 4-weeks-from-today.html
│   ├── 8-weeks-from-today.html
│   ├── 12-weeks-from-today.html
│   └── 52-weeks-from-today.html
└── data/
    └── holidays.json           # US Federal holidays data
```

## Setup Instructions

1. **Download or Clone**: Download all files to your local machine or clone the repository
2. **Web Server**: Place files on a web server (Apache, Nginx, etc.)
3. **Access**: Open `index.html` in your browser

**Note**: The calculator uses local JavaScript and doesn't require any backend server or database.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## SEO Strategy

### Target Keywords
- Primary: "weeks from today", "date calculator"
- Secondary: "calculate future date", "add weeks to date"
- Long-tail: "X weeks from today" (for X = 1-52)

### On-Page SEO
- Optimized title tags with target keywords
- Meta descriptions with clear value propositions
- Header tags (H1, H2, H3) with proper hierarchy
- Keyword-rich content sections
- Internal linking between all pages

### Technical SEO
- Clean, semantic HTML5 structure
- Mobile-responsive design
- Fast loading times
- Proper sitemap and robots.txt
- Clean URL structure

## Customization Options

### Adding More Week Pages
To create additional week calculation pages (3-weeks-from-today.html, etc.):

1. Copy an existing page template (e.g., `2-weeks-from-today.html`)
2. Update the title tag and H1 heading
3. Change the weeks input value: `value="X"`
4. Update page-specific content and examples
5. Add to sitemap.xml

### Customizing Holidays
Edit `data/holidays.json` to add region-specific holidays or update existing ones.

### Styling Customization
Modify `css/styles.css` to change colors, fonts, and layout.

## Deployment

### Static Hosting
This site can be deployed on any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- Any web server with static file support

### Domain Configuration
1. Point your domain to the hosting provider
2. Update sitemap.xml with your domain
3. Submit to Google Search Console
4. Set up Google Analytics (optional)

## Performance Considerations

- All calculations are client-side for instant results
- Minimal external dependencies
- Optimized CSS and JavaScript
- Responsive images and media
- Clean, efficient code structure

## Future Enhancements

- Batch calculation functionality
- More holiday regions (UK, Canada, Australia)
- Date difference calculator
- API integration for holiday data
- User preferences storage
- Export to calendar formats
- Multi-language support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational and commercial use. Please review the terms.html file for complete terms of service.

## Support

For questions or issues, please refer to the FAQ section or create an issue in the repository.

---

**Built with HTML5, CSS3, and vanilla JavaScript**
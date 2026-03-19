# Cat-5 Armory LLC Website

Professional firearms manufacturing and retail website for Cat-5 Armory LLC, based in Naples, Florida.

## 🎯 Overview

This is a professional, modern website designed for Cat-5 Armory LLC, featuring:
- **Home Page**: Hero section, features, categories, and company overview
- **About Us Page**: Company mission, values, and services
- **Shop Page**: Product categories and custom build information
- **News Page**: Company updates and announcements
- **Contact Page**: Contact form and business information

## 🎨 Design

The website features a professional design with:
- **Color Scheme**: Black (#1a1a1a), Red (#c41e3a), and tactical styling
- **Typography**: Rajdhani for headings, Roboto for body text
- **Responsive Design**: Fully mobile-responsive layout
- **Modern UI**: Clean, professional interface suitable for a firearms business

## 📁 File Structure

```
cat5-armory/
├── index.html          # Home page
├── about.html          # About Us page
├── shop.html           # Shop page
├── news.html           # News page
├── contact.html        # Contact page
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
├── netlify.toml        # Netlify configuration
├── assets/             # Images and media
│   ├── logo.png        # Cat-5 Armory logo
│   ├── hero-bg.jpg     # Hero background image
│   ├── storefront.jpg  # About section image
│   ├── handguns.jpg    # Category images
│   ├── rifles.jpg
│   ├── shotguns.jpg
│   ├── ammunition.jpg
│   ├── accessories.jpg
│   ├── optics.jpg
│   └── custom-build.jpg
└── README.md           # This file
```

## 🚀 Deployment to Netlify

### Method 1: Drag and Drop (Easiest)

1. Create an `assets` folder and add your images:
   - `logo.png` - Your Cat-5 Armory logo
   - `hero-bg.jpg` - Background image for hero section
   - `storefront.jpg` - Image for about section
   - Category images (handguns.jpg, rifles.jpg, etc.)

2. Go to [Netlify](https://www.netlify.com/)
3. Sign up or log in
4. Drag and drop the entire `cat5-armory` folder onto the Netlify dashboard
5. Your site will be live in seconds!

### Method 2: Git Deploy

1. Initialize a git repository:
   ```bash
   cd cat5-armory
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Push to GitHub/GitLab/Bitbucket

3. In Netlify:
   - Click "New site from Git"
   - Connect your repository
   - Deploy!

## 📸 Required Images

You'll need to add the following images to the `assets` folder:

1. **logo.png** - Cat-5 Armory logo (transparent background recommended)
   - Download from: https://s3.amazonaws.com/mgm-content/sites/armslist/uploads/accounts/13128/hyh4e1nj.jpg
   - Save as PNG with transparent background

2. **hero-bg.jpg** - Hero section background (1920x1080px recommended)
   - Use a professional firearms/tactical image

3. **storefront.jpg** - About section image (800x600px)

4. **Category Images** (600x400px each):
   - handguns.jpg
   - rifles.jpg
   - shotguns.jpg
   - ammunition.jpg
   - accessories.jpg
   - optics.jpg
   - custom-build.jpg

### Image Sources

You can use:
- Your own photos
- Stock photos from:
  - [Unsplash](https://unsplash.com/) (free)
  - [Pexels](https://pexels.com/) (free)
  - [Shutterstock](https://shutterstock.com/) (paid)

## ⚙️ Customization

### Update Contact Information

Edit the phone number and location in all HTML files:
- Current: `239-784-5451`
- Location: `Naples, FL`

### Update Content

All content can be edited directly in the HTML files. Key sections:
- **Hero text**: `index.html` (lines 40-50)
- **About content**: `about.html`
- **Shop categories**: `shop.html`
- **News articles**: `news.html`

### Update Colors

Edit `styles.css` CSS variables (lines 7-18):
```css
:root {
    --primary-color: #c41e3a;      /* Main red color */
    --primary-dark: #8b0000;       /* Darker red */
    --secondary-color: #1a1a1a;    /* Black */
    /* ... */
}
```

## 📱 Features

- ✅ Fully responsive design
- ✅ Mobile-friendly navigation
- ✅ Contact form (ready for backend integration)
- ✅ Smooth scrolling
- ✅ Animated elements on scroll
- ✅ Professional firearms industry styling
- ✅ SEO-friendly structure
- ✅ Fast loading times

## 🔒 Legal Compliance

The website includes appropriate disclaimers and information about:
- FFL licensing
- Age requirements
- Background checks
- Federal, state, and local law compliance
- Florida-specific regulations (3-day waiting period)

## 📞 Contact Form Integration

The contact form currently shows an alert. To make it functional:

1. **Using Netlify Forms** (Easiest):
   - Add `netlify` attribute to the form tag
   - Netlify will handle submissions automatically

2. **Using FormSpree**:
   - Sign up at [FormSpree.io](https://formspree.io/)
   - Update form action attribute

3. **Custom Backend**:
   - Integrate with your own email service
   - Update `script.js` form handler

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📄 License

© 2026 Cat-5 Armory LLC. All rights reserved.

## 🆘 Support

For questions or issues with the website, contact your web developer or refer to:
- [Netlify Documentation](https://docs.netlify.com/)
- [HTML/CSS Resources](https://developer.mozilla.org/)


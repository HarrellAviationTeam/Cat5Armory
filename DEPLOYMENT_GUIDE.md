# 🚀 Cat-5 Armory - Netlify Deployment Guide

## Quick Start (5 Minutes)

### Step 1: Prepare Images

1. Download the Cat-5 Armory logo from:
   - https://s3.amazonaws.com/mgm-content/sites/armslist/uploads/accounts/13128/hyh4e1nj.jpg

2. Save it as `logo.png` in the `assets` folder

3. Add placeholder images for now (you can replace them later):
   - Create simple placeholder images or use stock photos
   - Save them in the `assets` folder with the names listed in `IMAGES_NEEDED.txt`

### Step 2: Deploy to Netlify

#### Option A: Drag & Drop (Easiest - No Account Needed Initially)

1. Go to https://app.netlify.com/drop
2. Drag the entire `cat5-armory` folder onto the page
3. Your site will be live instantly!
4. Netlify will give you a URL like: `https://random-name-123456.netlify.app`

#### Option B: Full Netlify Account (Recommended)

1. Go to https://www.netlify.com/
2. Click "Sign Up" (free account)
3. Once logged in, click "Add new site" → "Deploy manually"
4. Drag the `cat5-armory` folder
5. Your site is live!

### Step 3: Customize Your Domain (Optional)

1. In Netlify dashboard, go to "Site settings"
2. Click "Change site name"
3. Choose a custom name like: `cat5-armory.netlify.app`
4. Or connect your own domain (like `cat5armory.com`)

## 📋 Pre-Deployment Checklist

- [ ] Logo added to `assets/logo.png`
- [ ] All category images added to `assets/` folder
- [ ] Contact phone number verified (239-784-5451)
- [ ] Business location verified (Naples, FL)
- [ ] All pages reviewed for accuracy
- [ ] Tested on mobile device (or use browser dev tools)

## 🎨 Adding Images

### Where to Get Images

**Free Stock Photos:**
- [Unsplash](https://unsplash.com/s/photos/firearms) - High quality, free
- [Pexels](https://pexels.com/search/gun/) - Free stock photos
- [Pixabay](https://pixabay.com/images/search/weapon/) - Free images

**Important:** Ensure images are licensed for commercial use!

### Image Specifications

| Image | Size | Format | Purpose |
|-------|------|--------|---------|
| logo.png | 300x100px | PNG | Navigation logo |
| hero-bg.jpg | 1920x1080px | JPG | Homepage hero |
| storefront.jpg | 800x600px | JPG | About section |
| handguns.jpg | 600x400px | JPG | Category card |
| rifles.jpg | 600x400px | JPG | Category card |
| shotguns.jpg | 600x400px | JPG | Category card |
| ammunition.jpg | 600x400px | JPG | Category card |
| accessories.jpg | 600x400px | JPG | Category card |
| optics.jpg | 600x400px | JPG | Category card |
| custom-build.jpg | 800x600px | JPG | Shop page |

### Optimizing Images

Before uploading, compress images:
- Use [TinyPNG](https://tinypng.com/) for PNG files
- Use [CompressJPEG](https://compressjpeg.com/) for JPG files
- Or use [Squoosh](https://squoosh.app/) for all formats

## 🔧 Customization After Deployment

### Update Contact Information

1. Open each HTML file
2. Find and replace:
   - Phone: `239-784-5451`
   - Location: `Naples, FL`
   - Email: Add if needed

### Update Content

Edit the HTML files directly:
- `index.html` - Homepage content
- `about.html` - Company information
- `shop.html` - Product categories
- `news.html` - News articles
- `contact.html` - Contact form

### Change Colors

Edit `styles.css` (lines 7-18):
```css
:root {
    --primary-color: #c41e3a;      /* Change this for main color */
    --primary-dark: #8b0000;       /* Darker version */
    --secondary-color: #1a1a1a;    /* Black/dark color */
}
```

## 📧 Setting Up Contact Form

The contact form currently shows an alert. To make it functional:

### Option 1: Netlify Forms (Easiest)

1. In `contact.html`, find the `<form>` tag (line 100)
2. Add `netlify` attribute:
   ```html
   <form class="contact-form" id="contactForm" netlify>
   ```
3. Redeploy the site
4. Form submissions will appear in Netlify dashboard

### Option 2: FormSpree

1. Sign up at https://formspree.io/
2. Create a new form
3. Update the form tag:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Option 3: Email Service

Integrate with services like:
- SendGrid
- Mailgun
- AWS SES

## 🔒 Security & Compliance

The website includes:
- ✅ FFL licensing disclaimers
- ✅ Age verification requirements
- ✅ Background check information
- ✅ Federal/state law compliance notices
- ✅ Florida-specific regulations

**Important:** Ensure all content complies with:
- Federal firearms regulations
- Florida state laws
- Local Naples ordinances
- ATF guidelines

## 📱 Testing Your Site

### Before Going Live

1. **Test all pages:**
   - Click every navigation link
   - Verify all content displays correctly
   - Check images load properly

2. **Test on mobile:**
   - Use your phone to visit the site
   - Or use Chrome DevTools (F12 → Toggle device toolbar)

3. **Test contact form:**
   - Fill out and submit
   - Verify you receive submissions

4. **Check loading speed:**
   - Use [PageSpeed Insights](https://pagespeed.web.dev/)
   - Optimize if needed

## 🌐 Custom Domain Setup

### If You Own a Domain

1. In Netlify: "Domain settings" → "Add custom domain"
2. Enter your domain (e.g., `cat5armory.com`)
3. Follow Netlify's DNS instructions
4. Update your domain registrar's DNS settings
5. Wait 24-48 hours for DNS propagation

### Buying a New Domain

1. Purchase from:
   - [Namecheap](https://www.namecheap.com/)
   - [Google Domains](https://domains.google/)
   - [GoDaddy](https://www.godaddy.com/)

2. Connect to Netlify (see above)

## 🆘 Troubleshooting

### Images Not Showing
- Check file names match exactly (case-sensitive)
- Verify images are in the `assets` folder
- Check image file formats (PNG/JPG)

### Site Not Loading
- Clear browser cache
- Check Netlify deploy log for errors
- Verify all files uploaded correctly

### Mobile Menu Not Working
- Ensure `script.js` is loaded
- Check browser console for errors (F12)

### Form Not Submitting
- Verify form setup (see contact form section)
- Check Netlify forms dashboard
- Test with different browsers

## 📞 Support Resources

- **Netlify Docs:** https://docs.netlify.com/
- **HTML/CSS Help:** https://developer.mozilla.org/
- **Web Design:** https://www.w3schools.com/

## ✅ Post-Deployment Checklist

- [ ] Site is live and accessible
- [ ] All images display correctly
- [ ] Mobile version works properly
- [ ] Contact form is functional
- [ ] All links work correctly
- [ ] Content is accurate and professional
- [ ] SEO meta tags are correct
- [ ] Site loads quickly
- [ ] Tested on multiple browsers
- [ ] Custom domain connected (if applicable)

---

**Congratulations!** Your Cat-5 Armory website is ready to launch! 🎉


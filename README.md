# Modern React Portfolio Template

A modern, responsive portfolio template built with React, featuring smooth animations, contact form integration, and SEO optimization. Perfect for developers looking to showcase their work in a professional manner.

![Portfolio Preview](public/og-image.jpg)

## ✨ Features

- **Modern React Architecture** - Built with React 19 and modern JavaScript
- **Responsive Design** - Fully responsive layout for all device sizes
- **Dynamic Projects Section** - Showcase your work with a filterable projects grid
- **Contact Form Integration** - Working contact form using EmailJS
- **SEO Optimized** - Includes meta tags, Open Graph, and Twitter Card support
- **Performance Focused** - Optimized loading times and smooth animations
- **Accessibility** - WCAG compliant with semantic HTML and ARIA labels
- **Easy Customization** - Well-structured components and clear styling

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-template.git
```

2. Install dependencies:
```bash
cd portfolio-template
npm install
```

3. Create a `.env` file in the root directory and add your EmailJS credentials:
```
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

4. Start the development server:
```bash
npm start
```

## 📝 Customization

### Personal Information
Edit the following files to add your personal information:

- `src/components/About.jsx` - Update your bio and skills
- `src/components/Projects.jsx` - Add your projects
- `src/components/Contact.jsx` - Update contact information
- `public/index.html` - Update meta tags and title
- `public/manifest.json` - Update app information

### Styling
- Main styles are in `src/index.css`
- Component-specific styles are in `src/styles/components/`
- Color schemes and variables can be modified in `src/styles/global.css`

### Projects
Update the projects data in `src/components/Projects.jsx`:
```javascript
const projectsData = [
  {
    id: 1,
    title: "Your Project",
    category: "Category",
    description: "Short description",
    image: projectImage,
    link: "https://github.com/yourusername",
    tech: ["React", "Node.js", "MongoDB"],
    fullDescription: "Detailed project description"
  },
  // Add more projects...
];
```

## 📧 Setting Up EmailJS

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a new email service
3. Create an email template
4. Copy your credentials to the `.env` file
5. Update the contact form configuration in `src/components/Contact.jsx`

## 🛠️ Built With

- [React](https://reactjs.org/) - Frontend framework
- [EmailJS](https://www.emailjs.com/) - Email service
- [React Hook Form](https://react-hook-form.com/) - Form validation
- [Yup](https://github.com/jquense/yup) - Schema validation

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

Build the project for production:
```bash
npm run build
```

The build files will be in the `build` folder, ready to be deployed to your hosting service of choice (Netlify, Vercel, GitHub Pages, etc.).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📬 Contact

Your Name - [@yourusername](https://twitter.com/yourusername)

Project Link: [https://github.com/yourusername/portfolio-template](https://github.com/yourusername/portfolio-template)

## 🙏 Acknowledgments

- [Create React App](https://create-react-app.dev/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Google Fonts](https://fonts.google.com/)


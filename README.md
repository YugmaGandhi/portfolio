# Yugma Gandhi - Portfolio Website

A modern, Naruto-themed portfolio website built with React, Redux, TypeScript, and Material UI.

## Features

- ✨ Modern UI design with Naruto-inspired theme
- 🌗 Light/Dark mode with Naruto color palette
- 📱 Fully responsive design
- 🔄 State management with Redux Toolkit
- 📄 Resume Download feature with HR and Technical variants
- 🎯 Form handling with React Hook Form
- 💅 Styling with Material UI
- 🔤 TypeScript for type safety

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

- `/src` - Main source code
  - `/components` - React components
  - `/services` - Service files
  - `/redux` - Redux store and slices
  - `/hooks` - Custom hooks
  - `/utils` - Utility functions
  - `/types` - TypeScript type definitions
  - `/assets` - Static assets
  - `/public/images` - Public images including project images
  - `/public/assets/resumes` - Pre-generated resume PDFs

## Portfolio Sections

- **Hero** - Animated introduction with Naruto theme
- **About** - Personal information with Naruto-inspired design
- **Experience** - Work experience timeline
- **Skills** - Skills displayed as scrolling cards with Naruto-themed certification badges
- **Projects** - Featured projects with consistent card sizing and proper image display
- **Contact** - Contact form with animations

## Resume Download

The portfolio provides downloadable resume options tailored for different audiences:

- **HR Resume**: ATS-friendly resume focused on achievements and soft skills
- **Technical Resume**: Detailed technical resume emphasizing technical skills and project specifics

Users can select their role to download the most appropriate resume version. The pre-generated PDFs are stored in the `/public/assets/resumes` directory.

## Customization

You can customize the theme by modifying the `themeSlice.ts` file in the Redux store.

## Credits

- Icons: Material UI Icons
- UI Framework: Material UI
- Animation: Framer Motion

## License

MIT

---

Made with ❤️ by Yugma Gandhi

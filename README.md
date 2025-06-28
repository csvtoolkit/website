# CSVToolkit Website

This is the official website for CSVToolkit, built with Astro and Tailwind CSS. The website showcases our high-performance CSV processing tools and provides comprehensive documentation.

## 🚀 About CSVToolkit

CSVToolkit is a suite of high-performance CSV processing tools designed for developers and companies who need speed, reliability, and cost savings at scale. Our tools provide 3.6-4.8x faster performance compared to native PHP CSV functions.

### Our Projects

- **🧩 FastCSV-ext**: High-performance PHP extension for CSV processing
- **⚙️ FastCSV-C**: Blazing-fast, dependency-free C library for CSV parsing
- **🛠️ PHP-CSVHelper**: Modern PHP library with unified API and automatic performance boost

## 🌟 Features

- 🎨 Modern and responsive design with dark mode support
- 📚 Comprehensive documentation for all projects
- 🔍 Full-text search functionality
- ⚡ Fast loading with optimized assets
- 📱 Mobile-friendly responsive design
- 🌐 SEO optimized with structured data

## 🛠️ Technology Stack

- **Framework**: [Astro](https://astro.build) - Static site generator
- **Styling**: [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- **Search**: [Pagefind](https://pagefind.app) - Static search engine
- **Deployment**: Optimized for static hosting

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/csvtoolkit/website.git
   cd website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:4321](http://localhost:4321) in your browser.

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── content/        # Documentation content (MDX)
│   └── docs/       # Project documentation
├── data/           # Static data (projects.json)
├── layouts/        # Page layouts
└── pages/          # Route components
public/
├── assets/         # Optimized CSS/JS files
├── favicon.svg     # Site favicon
└── _headers        # Netlify headers
```

## 📝 Content Management

### Adding Documentation

Documentation is written in Markdown and stored in `src/content/docs/`:

```md
---
title: "Page Title"
description: "Page description"
---

# Your content here
```

### Updating Project Information

Project data is managed in `src/data/projects.json`:

```json
{
  "name": "Project Name",
  "slug": "project-slug",
  "description": "Project description",
  "features": ["Feature 1", "Feature 2"]
}
```

## 🏗️ Development

### Available Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |

### Building for Production

```bash
npm run build
```

The built site will be in the `dist/` directory, optimized for production deployment.

## 🎨 Customization

### Styling

The site uses Tailwind CSS with custom configurations in `tailwind.config.mjs`. The design system includes:

- Custom color palette for CSVToolkit branding
- Responsive typography scales
- Dark mode support
- Custom animations and transitions

### Components

Reusable components are located in `src/components/` and follow a consistent design pattern.

## 🔍 Search Functionality

The website includes full-text search powered by Pagefind, automatically indexing all documentation content during the build process.

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Test your changes locally before submitting
- Update documentation when adding new features
- Ensure responsive design works on all screen sizes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website**: [https://csvtoolkit.org](https://csvtoolkit.org)
- **GitHub Organization**: [https://github.com/csvtoolkit](https://github.com/csvtoolkit)
- **Documentation**: [https://csvtoolkit.org/docs](https://csvtoolkit.org/docs)

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build) for excellent performance
- Styled with [Tailwind CSS](https://tailwindcss.com) for rapid development
- Search powered by [Pagefind](https://pagefind.app) for static search
- Icons and design inspiration from the open source community

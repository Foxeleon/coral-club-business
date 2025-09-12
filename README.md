# Vite + React + TypeScript Coral Club Business Project

A modern web application built with Vite, React, TypeScript, and styled with Tailwind CSS and shadcn/ui components.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed on your machine. We recommend using a Node version manager like `nvm`.
- [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Local Development

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Foxeleon/coral-club-business
   ```

2. **Navigate to the project directory:**
   ```sh
   cd coral-club-business
   ```

3. **Install dependencies:**
   ```sh
   npm install
   ```

4. **Start the development server:**
   ```sh
   npm run dev
   ```
   This will start the Vite dev server with hot reload. Open [http://localhost:8080](http://localhost:8080) (or the port shown in your terminal) to view it in the browser.

## Tech Stack

This project is built with:

- **[Vite](https://vitejs.dev/)** - Build tool and dev server
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React](https://react.dev/)** - UI library
- **[shadcn/ui](https://ui.shadcn.com/)** - Component library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Deployment

To deploy this project:

1. **Build the project:**
   ```sh
   npm run build
   ```
   This creates a `dist` folder with production-ready files.

2. **Deploy the `dist` folder:**
   You can deploy the contents of the `dist` folder to any static hosting service:
    - [Vercel](https://vercel.com/)
    - [Netlify](https://www.netlify.com/)
    - [AWS Amplify](https://aws.amazon.com/amplify/)
    - [GitHub Pages](https://pages.github.com/)

   Most of these services can be connected directly to your GitHub repository for automatic deployment on every commit to the `main` branch.

## Contributing

There are several ways to contribute to this project:

### Edit files directly on GitHub
- Navigate to the file you want to edit
- Click the "Edit" button (pencil icon)
- Make your changes and commit them

### Use GitHub Codespaces
- Go to the main page of the repository
- Click the green "Code" button
- Select the "Codespaces" tab
- Click "New codespace" to launch a cloud development environment
- Edit files directly and commit your changes

### Local development
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Project Structure

```
coral-club-business
├── src/
│   ├── components/     # React components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   ├── pages/         # Page components
│   └── styles/        # CSS and styling files
├── public/            # Static assets
├── dist/              # Production build (generated)
└── package.json       # Project dependencies and scripts
```

## Development Guidelines

- Follow TypeScript best practices
- Use ESLint for code quality
- Components should be properly typed
- Follow the existing code structure and naming conventions
- Write clean, readable code with appropriate comments

## Troubleshooting

### Common Issues

**Dependencies conflicts:**
If you encounter dependency issues, try resetting your `node_modules` folder.
```sh
rm -rf node_modules package-lock.json
npm install
```

**Port already in use:**
- The dev server runs on port 8080 by default.
- If the port is busy, Vite will automatically try the next available port.
- You can specify a different port in `vite.config.ts`.

**Build issues:**
- Make sure all TypeScript errors are resolved before building.
- Run `npm run lint` to check for linting issues.

## License

This project is open source and available under the [MIT License].

## Contact

Project Link: [https://github.com/Foxeleon/coral-club-business](https://github.com/Foxeleon/coral-club-business)

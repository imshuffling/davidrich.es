# davidrich.es

![image](https://github.com/user-attachments/assets/27d3ae2d-9fb7-42e9-b63e-95c14d65ba24)


Welcome to [davidrich.es](https://davidrich.es), my personal website. This repository contains the source code and configuration for the site.

## Technologies Used

- **[Next.js](https://nextjs.org/)** v16: A React framework for building optimized and scalable web applications.
- **[React](https://react.dev/)** v19: JavaScript library for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)** v5: Typed superset of JavaScript for better developer experience.
- **[Contentful](https://www.contentful.com/)**: A headless CMS for managing and delivering content.
- **[pnpm](https://pnpm.io/)**: Fast, disk space efficient package manager.
- **[Netlify](https://www.netlify.com/)**: Hosting platform for fast deployment and continuous delivery.

## Features

- **Dynamic Content**: Content managed through Contentful for seamless updates.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Performance Optimized**: Leveraging Next.js's capabilities for server-side rendering (SSR) and static site generation (SSG).
- **Netlify Hosting**: Deployed with continuous integration for rapid updates.

## Getting Started

Follow the instructions below to set up and run the project locally.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) (v8 or higher recommended)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/davidrich.es.git
   cd davidrich.es
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Configure environment variables:

   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your-space-id
   NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your-access-token
   ```

   Replace `your-space-id` and `your-access-token` with your Contentful API credentials.

### Running the Development Server

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

### Building for Production

Build the application for production:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

### Deployment

This project is deployed on [Netlify](https://www.netlify.com/). Pushes to the `main` branch trigger an automatic build and deployment.

For manual deployment:

1. Run the production build:

   ```bash
   pnpm build
   ```

2. Deploy the `.next` folder to Netlify.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

If you have any questions or feedback, feel free to contact me via the website or open an issue in this repository.

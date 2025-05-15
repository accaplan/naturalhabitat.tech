# Romance Office - Architecture Studio Website

A modern web application for Romance Office, a creative architectural design studio, built with Next.js 13+ and Sanity CMS.

## Features

- Dynamic content management through Sanity Studio
- Real-time preview of content changes
- Image optimization using next/image
- Server-side rendering for optimal performance
- Responsive design for all devices
- SEO optimization
- Contact form with validation
- Journal/Blog functionality
- Project portfolio with filtering
- Team member profiles
- Dark/light mode support

## Tech Stack

- **Framework**: Next.js 13+ with App Router
- **CMS**: Sanity v3
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Form Handling**: React Hook Form
- **Form Validation**: Zod
- **Animations**: Framer Motion
- **Deployment**: Vercel/Netlify/etc.

## Getting Started

### Prerequisites

- Node.js (v16.8.0 or later)
- npm or yarn
- Sanity account (for CMS)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/romance-office.git
   cd romance-office
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
   SANITY_API_READ_TOKEN=your-read-token
   ```

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website
   Open [http://localhost:3000/studio](http://localhost:3000/studio) to access the Sanity Studio

## Project Structure

- `/app`: Next.js app router pages and layouts
- `/components`: Reusable React components
- `/lib`: Utility functions and configuration
- `/public`: Static assets
- `/sanity`: Sanity CMS configuration and schemas

## Sanity CMS Setup

1. Create a new Sanity project at [sanity.io](https://www.sanity.io/)
2. Get your project ID and API tokens from the Sanity dashboard
3. Add them to your `.env.local` file
4. Deploy the Sanity Studio by running:
   ```bash
   npx sanity deploy
   ```

## Deployment

This application can be easily deployed to Vercel, Netlify, or any other platform that supports Next.js.

For Vercel deployment:
```bash
vercel
```

Make sure to add the environment variables to your deployment platform.

## Performance Optimization

The website is optimized for performance with:
- Next.js image optimization
- Server-side rendering
- Code splitting
- CSS optimization with Tailwind
- Font optimization

## License

[MIT](LICENSE)
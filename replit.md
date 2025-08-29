# Overview

MindfulSpace is a comprehensive mental health and wellness platform that provides users with tools, resources, and support for their mental health journey. The application combines modern web technologies to deliver an accessible, user-friendly experience focused on mental health support, journaling, community interaction, and professional therapy connections.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client application is built with React 18 using a modern component-based architecture. The frontend leverages:

- **Component Structure**: Modular React components organized by functionality (pages, components, contexts)
- **Routing**: React Router DOM for client-side navigation with protected routes for authenticated features
- **State Management**: React Context API for global state (authentication and theme management)
- **Styling**: Tailwind CSS with custom color schemes (lavender, seafoam, pastel-pink, soft-blue) and dark mode support
- **UI Components**: Custom icon library and reusable components (Card, Form, HeroSection, ChatWidget)

## Backend Architecture
The server follows a RESTful API design pattern using Express.js with:

- **MVC Pattern**: Controllers handle business logic, models define data schemas, routes manage API endpoints
- **Authentication**: JWT-based authentication with bcryptjs for password hashing
- **Security**: Helmet for security headers, CORS configuration, rate limiting, and request validation
- **Data Models**: MongoDB schemas for Users, Journals, Blogs, Forum Posts, Chat Logs, Appointments, and Contact Messages

## Authentication & Authorization
- JWT token-based authentication system
- Role-based access control (user, therapist, admin roles)
- Protected routes requiring authentication for sensitive features
- Password encryption using bcryptjs

## Data Storage Solutions
MongoDB database with Mongoose ODM providing:
- User profiles and authentication data
- Journal entries with mood tracking
- Forum posts and community interactions
- Chat logs for AI conversations
- Blog posts and content management
- Appointment scheduling system

# External Dependencies

## Frontend Dependencies
- **React Ecosystem**: React 18, React DOM, React Router DOM for core functionality
- **UI Libraries**: Heroicons for iconography, Recharts for data visualization
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer for responsive design

## Backend Dependencies
- **Core Framework**: Express.js for server functionality
- **Database**: MongoDB with Mongoose ODM for data persistence
- **Security**: Helmet, CORS, express-rate-limit, express-validator for API protection
- **Authentication**: JSON Web Token (jsonwebtoken), bcryptjs for secure user management
- **Development**: Nodemon for development server hot-reloading

## Third-Party Services
The application is designed to integrate with:
- MongoDB Atlas for cloud database hosting
- AI/ML services for chatbot functionality (currently mock implementation)
- Email services for notifications and communications
- Payment processing for therapy appointments
- Video conferencing APIs for telehealth sessions

## Development Tools
- Create React App for frontend development environment
- Environment variable management with dotenv
- Database seeding scripts for initial data setup
- Development and production build configurations
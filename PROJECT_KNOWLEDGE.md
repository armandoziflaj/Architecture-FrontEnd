SYSTEM INSTRUCTION FOR ALL AI ASSISTANTS: Before implementing, refactoring, or planning ANY feature or fix in this repository, you MUST read this file first. All code generated MUST strictly adhere to the patterns and constraints listed below.

# Project Knowledge & Architectural Guide

## 1. Executive Summary & Architecture Overview

This document outlines the architectural standards, technology stack, and best practices for the Sulozeqi Project. The project is a modern web application built with React, TypeScript, and Vite, designed for high performance, scalability, and maintainability.

The architecture follows a feature-based, component-driven model. We use React Query for server state management to ensure a reactive and consistent UI, and CSS Modules for styling to maintain component encapsulation. All code must be written in TypeScript to enforce type safety and improve developer productivity.

## 2. Tech Stack

| Category         | Library/Tool                                                                                                           | Justification                                                                                                                                                            |
|------------------|------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **UI Framework** | [React](https://reactjs.org/)                                                                                          | The industry standard for building dynamic and component-based user interfaces.                                                                                          |
| **Language**     | [TypeScript](https://www.typescriptlang.org/)                                                                          | Provides static typing, reducing runtime errors and improving code quality and maintainability.                                                                          |
| **Build Tool**   | [Vite](https://vitejs.dev/)                                                                                            | Offers a significantly faster development experience with near-instant Hot Module Replacement (HMR).                                                                     |
| **Server State** | [TanStack React Query](https://tanstack.com/query/v4)                                                                  | Simplifies data fetching, caching, and synchronization of server state. It eliminates the need for manual state management for asynchronous data.                        |
| **Routing**      | [React Router](https://reactrouter.com/)                                                                               | The standard library for declarative routing in React applications.                                                                                                      |
| **API Client**   | [Axios](https://axios-http.com/)                                                                                       | A robust, promise-based HTTP client for making API requests. It provides a clean and consistent API for handling network operations.                                     |
| **Styling**      | [CSS Modules](https://github.com/css-modules/css-modules)                                                              | Scopes CSS locally to components, preventing style conflicts and promoting modularity. All styles should be written in `.module.css` files.                              |
| **Animations**   | [React Intersection Observer](https://www.npmjs.com/package/react-intersection-observer)                               | For triggering animations on component view. This is more performant and user-friendly than on-mount animations.                                                         |
| **Testing**      | [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) | A modern, fast, and user-friendly testing framework that integrates seamlessly with Vite. RTL encourages testing practices that resemble how users interact with the UI. |

## 3. Mandatory Coding Rules & Constraints

- **TypeScript Everywhere**: All new code (`.ts`, `.tsx`) must be written in TypeScript. Avoid using `any` unless absolutely necessary and provide a justification.
- **File Naming**:
  - Components: `PascalCase.tsx` (e.g., `ProjectCard.tsx`)
  - Hooks: `useCamelCase.ts` (e.g., `useProjects.ts`)
  - API Services: `camelCaseApi.ts` (e.g., `projectsApi.ts`)
  - Types: `PascalCase.ts` (e.g., `Project.ts`)
- **Component Design**: Components should be small, focused, and follow the Single Responsibility Principle. Prefer functional components with hooks over class components.
- **Styling**: 
  - All styling must use CSS Modules. Do not use global stylesheets or inline styles for layout and component-specific styling.
  - All colors, fonts, and spacing must be defined as CSS variables in `index.css` and used throughout the application.
- **Forbidden Practices**:
  - Do not use default exports. Always use named exports to avoid naming conflicts.
  - Do not manually manage server state with `useState` or `useEffect`. Use React Query for all data fetching.
  - Avoid prop drilling. Use React Context for deeply nested state or consider component composition.
  - **Do not hardcode environment-specific values** (e.g., API URLs). Use environment variables.

## 4. Standard Solutions Repository

### Environment Variables & Configuration

To ensure the application is portable between development and production environments, all environment-specific values must be stored in `.env` files.

**Creating the Development Environment File:**
In the project root, create a file named `.env`. Add any environment-specific variables, prefixed with `VITE_`.

**`.env` file:**
```
VITE_API_BASE_URL=http://localhost:5188
```

**Accessing Variables in Code:**
Use `import.meta.env.VITE_VARIABLE_NAME` to access the variables in your application code.

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const imageUrl = `${API_BASE_URL}${photo.imageUrl}`;
```

**Production Configuration:**
For production builds, these variables must be set in the hosting provider's environment variable settings (e.g., Vercel, Netlify). Do not commit production `.env` files.

### API Requests & Error Handling

All API requests must be centralized in the `src/api` directory and should use the `VITE_API_BASE_URL` environment variable.

### UI/UX & Animations

**View-Triggered Animations:**
To create a professional and performant user experience, animations should be triggered when a component enters the viewport. This is achieved with the `useInViewAnimation` custom hook.

### Immersive Hero Section

For a high-impact, professional aesthetic, the hero section should be immersive, using a full-viewport background video or image.

## 5. File Structure Blueprint

```
/
├── public/
│   └── ...
├── src/
│   ├── api/
│   ├── assets/
│   ├── Components/
│   ├── hooks/
│   ├── Pages/
│   ├── Types/
│   ├── App.tsx
│   └── main.tsx
├── .env                <-- Local development environment variables
├── .eslintrc.cjs
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 6. Verification Rules

- **Testing**: All new components and critical business logic must be accompanied by tests.
- **Linting & Formatting**: All code must pass ESLint checks and be formatted with Prettier.
- **Code Review**: All pull requests must be reviewed, focusing on adherence to this document.
- **Manual QA**: All new features must be manually tested in a staging environment.
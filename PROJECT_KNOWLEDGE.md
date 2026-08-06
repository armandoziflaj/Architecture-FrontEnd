SYSTEM INSTRUCTION FOR ALL AI ASSISTANTS: Before implementing, refactoring, or planning ANY feature or fix in this repository, you MUST read this file first. All code generated MUST strictly adhere to the patterns and constraints listed below.

# Project Knowledge & Architectural Guide

## 1. Executive Summary & Architecture Overview

This document outlines the architectural standards, technology stack, and best practices for the Sulozeqi Project. The project is a modern web application built with React, TypeScript, and Vite, designed for high performance, scalability, and maintainability.

The architecture follows a feature-based, component-driven model. We use React Query for server state management to ensure a reactive and consistent UI, and CSS Modules for styling to maintain component encapsulation. All code must be written in TypeScript to enforce type safety and improve developer productivity.

## 2. Tech Stack

| Category          | Library/Tool                               | Justification                                                                                                                                                           |
| ----------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **UI Framework**  | [React](https://reactjs.org/)              | The industry standard for building dynamic and component-based user interfaces.                                                                                         |
| **Language**      | [TypeScript](https://www.typescriptlang.org/) | Provides static typing, reducing runtime errors and improving code quality and maintainability.                                                                         |
| **Build Tool**    | [Vite](https://vitejs.dev/)                | Offers a significantly faster development experience with near-instant Hot Module Replacement (HMR).                                                                    |
| **Server State**  | [TanStack React Query](https://tanstack.com/query/v4) | Simplifies data fetching, caching, and synchronization of server state. It eliminates the need for manual state management for asynchronous data.                  |
| **Routing**       | [React Router](https://reactrouter.com/)   | The standard library for declarative routing in React applications.                                                                                                     |
| **API Client**    | [Axios](https://axios-http.com/)           | A robust, promise-based HTTP client for making API requests. It provides a clean and consistent API for handling network operations.                                      |
| **Styling**       | [CSS Modules](https://github.com/css-modules/css-modules) | Scopes CSS locally to components, preventing style conflicts and promoting modularity. All styles should be written in `.module.css` files.                     |
| **Testing**       | [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) | A modern, fast, and user-friendly testing framework that integrates seamlessly with Vite. RTL encourages testing practices that resemble how users interact with the UI. |

## 3. Mandatory Coding Rules & Constraints

- **TypeScript Everywhere**: All new code (`.ts`, `.tsx`) must be written in TypeScript. Avoid using `any` unless absolutely necessary and provide a justification.
- **File Naming**:
  - Components: `PascalCase.tsx` (e.g., `ProjectCard.tsx`)
  - Hooks: `useCamelCase.ts` (e.g., `useProjects.ts`)
  - API Services: `camelCaseApi.ts` (e.g., `projectsApi.ts`)
  - Types: `PascalCase.ts` (e.g., `Project.ts`)
- **Component Design**: Components should be small, focused, and follow the Single Responsibility Principle. Prefer functional components with hooks over class components.
- **Styling**: All styling must use CSS Modules. Do not use global stylesheets or inline styles for layout and component-specific styling.
- **Forbidden Practices**:
  - Do not use default exports. Always use named exports to avoid naming conflicts.
  - Do not manually manage server state with `useState` or `useEffect`. Use React Query for all data fetching.
  - Avoid prop drilling. Use React Context for deeply nested state or consider component composition.

## 4. Standard Solutions Repository

### API Requests & Error Handling

All API requests must be centralized in the `src/api` directory. Use the shared `axios` instance from `src/api/axiosInstance.ts`.

**Example API Hook (`useProjects.ts`):**
```typescript
import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../api/projectsApi';

export const useProjects = (language: string) => {
    return useQuery({
        queryKey: ['projects', language],
        queryFn: () => getProjects(language),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
```

**Error Handling:**
API errors should be handled by a centralized function. The existing `handleApiError` is a good foundation. All mutations in React Query should use this.

```typescript
// Example Mutation
import { useMutation } from '@tanstack/react-query';
import { handleApiError } from './handleApiError';
import { createProject } from '../api/projectsApi';

export const useCreateProject = () => {
    return useMutation({
        mutationFn: async (projectData) => {
            try {
                return await createProject(projectData);
            } catch (err) {
                return handleApiError(err); // Centralized error handling
            }
        },
    });
};
```

## 5. File Structure Blueprint

```
/
├── public/
├── src/
│   ├── api/
│   │   ├── axiosInstance.ts
│   │   ├── projectsApi.ts
│   │   └── contactInquiryApi.ts
│   ├── assets/
│   │   └── ...
│   ├── Components/
│   │   ├── Common/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   └── Button.module.css
│   │   │   └── ...
│   │   └── ...
│   ├── hooks/
│   │   ├── useProjects.ts
│   │   └── useContactInquiry.ts
│   ├── Pages/
│   │   ├── Admin/
│   │   │   ├── Dashboard/
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   └── Dashboard.module.css
│   │   │   └── ...
│   │   └── ...
│   ├── Types/
│   │   ├── Project.ts
│   │   ├── Inquiry.ts
│   │   └── BaseResponse.ts
│   ├── App.tsx
│   └── main.tsx
├── .eslintrc.cjs
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 6. Verification Rules

- **Testing**: All new components and critical business logic (hooks, API functions) must be accompanied by unit or integration tests using Vitest and React Testing Library.
- **Linting & Formatting**: All code must pass ESLint checks and be formatted with Prettier before being committed. A pre-commit hook should be configured to enforce this.
- **Code Review**: All pull requests must be reviewed by at least one other team member before being merged. The review should focus on adherence to the standards outlined in this document.
- **Manual QA**: Before final deployment, all new features must be manually tested in a staging environment to ensure they meet the requirements and are free of bugs.

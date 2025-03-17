# React Todo Assignment

This is a simple Todo application built with React, TypeScript, TailwindCSS, and Redux Toolkit. It uses Axios for HTTP requests and Vite as the build tool.

## Setup & Run

 1. Install dependencies:

    ```sh
    pnpm install
    ```
2. Create a `.env` file in the root of the project and copy variables from `.env.example` (in real project, we should not commit `.env` file to the repository):

    ```sh
    cp .env.example .env
    ```

3. Start the development server:

    ```sh
    pnpm dev
    ```

## For development setup
1. Init Husky for development. Setup hook to run linting and formatting before commit:
    
    ```sh
   pnpm prepare
    ```
2. Run test cases:

    ```sh
    pnpm test
    # or
    pnpm test:coverage
    ```
## Functions Implemented

### 1. Setup Standard Codebase
- Configured the project with TypeScript, TailwindCSS, and Vite.
- Set up ESLint and Prettier for code linting and formatting.
- Initialized Husky for pre-commit hooks to ensure code quality.

### 2. Implement Todo UI with Full Functionality
- Created a responsive (mobile, desktop) Todo UI using React and TailwindCSS.
- Added features to add, delete, and mark todos as complete.
- Added a sorting feature to sort todos which makes it easier to see animation

### 3. Add Animation to Task List
- Used CSS animations and libraries like `framer-motion` to add smooth animations to the todo list items.

### 4. Use Redux for State Management and Persist State
- Configured Redux Toolkit for state management.
- Used `redux-persist` to persist the state across sessions.

### 5. Handling Forms with Latest Syntax of React 19
- Utilized React 19's latest features and hooks for form handling.

### 6. Writing Unit Tests
- Wrote unit tests using Vitest and React Testing Library.

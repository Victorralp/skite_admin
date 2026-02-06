# Skite Admin Dashboard - Project Overview

## 📌 Project Status: "What has been done"

This project is a modern Admin Dashboard built with **Next.js 14**, **Tailwind CSS**, and **TypeScript**. It features a responsive design with interactive data visualization and management tools.

### Key Features Implemented:
1.  **Dashboard Home (`/`)**:
    -   **Activity Overview**: key metrics cards (Messages, Revenue, Client Acquisition) with trend indicators.
    -   **Revenue Charts**: Visual representation of financial data using `recharts`.
    -   **Top Creators**: A table displaying high-performing users.
    -   **Recent Transactions**: A status-coded list of recent financial activities.
    -   **Global Layout**: Includes a collapsible responsive `Sidebar` and a top-level `SearchBar`.

2.  **Creator Management (`/creators`)**:
    -   **Full CRUD Interface**: A dedicated page for managing specific user accounts ("Creators").
    -   **Advanced Filtering**: Search by name/email and filter by functional role (Admin, Editor, Viewer).
    -   **Detail View**: A modal component (`CreatorDetailModal`) for viewing in-depth user profiles.
    -   **Actions**: Edit and Delete capabilities via dropdown menus.

3.  **UI/UX Refinements**:
    -   Customized Tailwind styling for a polished, premium look.
    -   Interactive components using `Radix UI` primitives (Dialogs, Dropdowns).
    -   Mock data integration for realistic development and testing.

---

## 📂 Project Structure & File Guide

### 1. Application Routing (`/app`)
The core of the Next.js application, handling routes and layouts.

-   **`layout.tsx`**: The root layout file. It wraps the entire application, providing global fonts (Inter) and structure.
-   **`page.tsx`**: The **Main Dashboard** view. It aggregates the overview widgets, charts, and transaction tables into the primary landing page.
-   **`globals.css`**: Global CSS definitions and Tailwind directives.
-   **`creators/page.tsx`**: The **Creators Management** page. It hosts the `CreatorsTable`, `CreatorFilters`, and handles the state for managing creators.

### 2. Components (`/components`)
Modular, reusable UI parts.

#### Dashboard Specific
-   **`Sidebar.tsx`**: The main navigation menu. Includes responsive states and custom SVG icons.
-   **`ActivityOverview.tsx`**: Displays the top row of metric cards (e.g., "Messages", "Revenue").
-   **`ChartsRow.tsx`** & **`RevenueTrend.tsx`**: Wrapper and implementation for data visualization charts.
-   **`RecentTransactionsTable.tsx`**: Displays a list of recent transactions with status badges (Success, Pending, Flagged).
-   **`TopCreatorsTable.tsx`**: A summary table for the dashboard view showing top performers.
-   **`Overview.tsx`**: General overview container component.

#### Creators Feature
-   **`CreatorsTable.tsx`**: The main data table for the `/creators` page.
-   **`CreatorFilters.tsx`**: Contains the search bar and role selection dropdowns for filtering the table.
-   **`CreatorDetailModal.tsx`**: A dialog modal showing detailed information about a specific creator.
-   **`CreatorActions.tsx`**: The "three-dots" menu for Edit/Delete actions on a row.

#### UI Primitives (`/components/ui`)
Low-level building blocks, largely based on Radix UI and Shadcn.
-   **`SearchBar.tsx`**: A reusable, styled search input component.
-   **`CustomDropdown.tsx`**: A specific dropdown implementation.
-   **`button.tsx`, `card.tsx`, `dialog.tsx`, `table.tsx`, `dropdown-menu.tsx`**: Base accessible UI components.

### 3. Data Layer (`/data`)
-   **`dashboard.ts`**: The single source of truth for **Mock Data**. It contains arrays for transactions, creators, activity metrics, and revenue data used throughout the app to simulate a real backend.

### 4. Utilities (`/lib`)
-   **`utils.ts`**: Contains helper functions, primarily `use-toast` (or similar class mergers like `cn` from `clsx` + `tailwind-merge`) for dynamic class name handling.

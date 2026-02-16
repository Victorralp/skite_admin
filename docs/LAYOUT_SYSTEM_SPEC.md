# Layout System Refactor Spec (System-Wide)

## Scope
Standardize layout spacing, width, and responsive behavior across the entire admin dashboard so pages stop using per-page hardcoded widths/heights for core structure.

This spec covers:
- Global shell/container behavior
- Page layout primitives
- Viewer behavior (video, PDF, image)
- Tables and dense data layouts
- Migration order for all routes and shared components

## Current State Summary
Audit snapshot from current codebase:
- Hardcoded size matches (`w-[..px]`, `h-[..px]`, inline `width/height/maxWidth`): `901`
- Files affected: `66`
- Most affected page routes:
1. `app/creators/[id]/page.tsx` (52)
2. `app/users/page.tsx` (33)
3. `app/products/page.tsx` (27)
4. `app/products/[id]/page.tsx` (15)
5. `app/settings/admin-roles/page.tsx` (12)
- Most affected shared components:
1. `components/LogsTable.tsx` (43)
2. `components/creator/PersonalInfo.tsx` (39)
3. `components/creator/LiveSessionCard.tsx` (33)
4. `components/SessionDetailsModal.tsx` (31)
5. `components/creator/ComplianceTab.tsx` (24)

## Global Layout Contract
All page-level layout must come from shared tokens and primitives.

### Tokens (single source of truth)
Add CSS variables in global styles:
- `--layout-content-max`
- `--layout-gutter-mobile`
- `--layout-gutter-tablet`
- `--layout-gutter-desktop`
- `--layout-section-gap`
- `--layout-stack-gap`
- `--layout-panel-radius`
- `--layout-panel-padding`
- `--layout-2pane-main-min`
- `--layout-2pane-side`
- `--layout-2pane-gap`

### Shell rules
- Keep one central max-width wrapper in app shell.
- No page sets its own max-width except explicitly approved special views.
- Horizontal spacing uses tokenized gutters only.
- Sidebar width and content area behavior remain controlled at shell level.

### Page rules
- `PageContainer` controls page vertical rhythm and base gutters.
- No page-level hardcoded main column width.
- Two-pane pages use shared `TwoPaneLayout` primitive instead of literal pixel grids.
- Fixed heights are only allowed for compact UI controls, not primary content regions.

## Viewer Behavior Contract
Applies to product content page and any future media/document viewers.

### Shared `MediaFrame` behavior
- Viewer region width is fluid.
- Height uses responsive clamp/viewport rules, not one fixed px height.
- Fullscreen mode must preserve controls and keyboard accessibility.

### Video rules
- Default fit mode: `contain` for instructional/admin review use-cases.
- Optional toggle to `cover` only if explicitly needed.
- Stable aspect ratio container (16:9 default, adjustable).
- Control bar wraps/collapses at narrow widths.
- No hidden controls on extra-wide screens.

### PDF rules
- Default zoom mode: fit-to-width.
- Zoom bounds are explicit (min/max).
- Sticky toolbar.
- Page rendering area centered with maximum readable width limit.
- Scrolling and page indicator remain stable while resizing.

### Image rules
- Default `object-contain` in bounded frame.
- Never crop by default for moderation/review screens.

## Data Table Contract
- Shared table primitive for header/body row sizing.
- Column widths use semantic tokens (`xs`, `sm`, `md`, `lg`, `flex`) instead of hardcoded per-file pixels where possible.
- Horizontal overflow behavior standardized:
1. container scroll
2. sticky header
3. optional sticky first column for key identifiers

## Layout Primitives To Introduce
- `AppContent` (shell content wrapper)
- `PageContainer` (existing, token-driven)
- `PageHeaderRow`
- `TwoPaneLayout`
- `Panel`
- `ScrollablePanel`
- `MetricGrid`
- `DataTableShell`
- `MediaFrame` (video/pdf/image host)

## Route Migration Matrix (All Pages)
Legend:
- `Template A`: single-column dashboard/content
- `Template B`: two-pane content + side panel
- `Template C`: dense table/list page
- `Template D`: detail profile page with tabs

| Route file | Target template | Notes |
|---|---|---|
| `app/page.tsx` | A | Home wrapper aligns to shell tokens |
| `app/dashboard/page.tsx` | A | Metrics/cards/charts stack |
| `app/creators/page.tsx` | C | Filter + table pattern |
| `app/creators/[id]/page.tsx` | D | Highest page-level hardcode count |
| `app/users/page.tsx` | C | Custom columns and action menus |
| `app/products/page.tsx` | C | Listing + metrics + filters |
| `app/products/[id]/page.tsx` | B | Viewer + content rail |
| `app/events/page.tsx` | A | Stats + cards |
| `app/revenue/page.tsx` | A | Tabs, trend, tables |
| `app/transactions/page.tsx` | C | Transaction table behaviors |
| `app/transactions/[id]/page.tsx` | D | Detail panel layout |
| `app/support/page.tsx` | A | Mixed cards and list blocks |
| `app/live-tools/page.tsx` | A | Tool cards and live controls |
| `app/notifications/page.tsx` | C | Notification table |
| `app/logs/page.tsx` | C | Heavy tabular layouts |
| `app/settings/page.tsx` | A | Settings cards |
| `app/settings/admin-roles/page.tsx` | C | Dense tabular admin roles |
| `app/profile/page.tsx` | D | Profile tabs/content |
| `app/(auth)/login/page.tsx` | Special | Excluded from app shell layout contract |

## Shared Component Migration Matrix
Primary components to normalize first (highest layout risk):
- `components/LogsTable.tsx`
- `components/TransactionsTable.tsx`
- `components/NotificationsTable.tsx`
- `components/PastSessionsTable.tsx`
- `components/TopCreatorsTable.tsx`
- `components/RecentTransactionsTable.tsx`
- `components/RefundsTable.tsx`
- `components/PayoutsTable.tsx`
- `components/creator/PersonalInfo.tsx`
- `components/creator/LiveSessionCard.tsx`
- `components/creator/ComplianceTab.tsx`
- `components/creator/ClassesTab.tsx`
- `components/creator/ReviewsList.tsx`
- `components/SessionDetailsModal.tsx`
- `components/ProductDetailModal.tsx`
- `components/LiveTools.tsx`
- `components/LiveSessionsGrid.tsx`
- `components/UserDetailModal.tsx`
- `components/layout/AppShell.tsx`
- `components/layout/PageContainer.tsx`
- `components/ContentViewer.tsx`

All other components must be validated against the same token/primitives contract before completion sign-off.

## Full Component Coverage Checklist
The following component files are in refactor scope and must be validated:
- `components/ActionMenu.tsx`
- `components/ActivityOverview.tsx`
- `components/AddAdminModal.tsx`
- `components/ChartsRow.tsx`
- `components/ComplianceModal.tsx`
- `components/ContentViewer.tsx`
- `components/CreatorActions.tsx`
- `components/CreatorDetailModal.tsx`
- `components/CreatorFilters.tsx`
- `components/CreatorsTable.tsx`
- `components/DisableStreamsModal.tsx`
- `components/EditPermissionsModal.tsx`
- `components/EmptyStateIllustration.tsx`
- `components/EventsStats.tsx`
- `components/FilterDropdown.tsx`
- `components/HoldTransactionModal.tsx`
- `components/HubDetailModal.tsx`
- `components/LiveSessionCard.tsx`
- `components/LiveSessionsGrid.tsx`
- `components/LiveStreamingModal.tsx`
- `components/LiveTools.tsx`
- `components/LogsOverview.tsx`
- `components/LogsTable.tsx`
- `components/MuteChatModal.tsx`
- `components/NotificationSettingsModal.tsx`
- `components/NotificationsOverview.tsx`
- `components/NotificationsTable.tsx`
- `components/Overview.tsx`
- `components/PastSessionsTable.tsx`
- `components/PauseStreamsModal.tsx`
- `components/PayoutsTable.tsx`
- `components/ProductDetailModal.tsx`
- `components/RecentTransactionsTable.tsx`
- `components/RefundsTable.tsx`
- `components/RejectPayoutModal.tsx`
- `components/RevenueOverview.tsx`
- `components/RevenueTabs.tsx`
- `components/RevenueTrend.tsx`
- `components/SessionDetailsModal.tsx`
- `components/Sidebar.tsx`
- `components/SkiteLogo.tsx`
- `components/StatsCard.tsx`
- `components/SupportCenter.tsx`
- `components/TopCreatorsTable.tsx`
- `components/TransactionDetailsModal.tsx`
- `components/TransactionsTable.tsx`
- `components/UpcomingSessionCard.tsx`
- `components/UserDetailModal.tsx`
- `components/creator/ClassesTab.tsx`
- `components/creator/ComplianceTab.tsx`
- `components/creator/HubsTab.tsx`
- `components/creator/LiveSessionCard.tsx`
- `components/creator/PersonalInfo.tsx`
- `components/creator/ProductsTab.tsx`
- `components/creator/ReferredUsersCard.tsx`
- `components/creator/ReviewsList.tsx`
- `components/creator/TabHeader.tsx`
- `components/creator/TransactionDetailsModal.tsx`
- `components/creator/TransactionsTab.tsx`
- `components/creator/UsersPieChart.tsx`
- `components/icons/WarningTriangle.tsx`
- `components/layout/AppShell.tsx`
- `components/layout/PageContainer.tsx`
- `components/profile/NotificationsTab.tsx`
- `components/profile/ProfileContent.tsx`
- `components/ui/CustomDropdown.tsx`
- `components/ui/RatingDistribution.tsx`
- `components/ui/SearchBar.tsx`
- `components/ui/TimeDropdown.tsx`
- `components/ui/button.tsx`
- `components/ui/card.tsx`
- `components/ui/dialog.tsx`
- `components/ui/dropdown-menu.tsx`
- `components/ui/table.tsx`

## Phased Implementation Plan
### Phase 0: Foundation
- Introduce layout/media tokens.
- Create primitives (`TwoPaneLayout`, `DataTableShell`, `MediaFrame`).
- Keep visuals identical where possible.

### Phase 1: Shell + High-Traffic Routes
- Migrate `AppShell` and `PageContainer` to token contract.
- Migrate: `dashboard`, `products`, `products/[id]`, `users`, `transactions`.

### Phase 2: Table + List Ecosystem
- Migrate all table-heavy shared components to `DataTableShell`.
- Standardize filter rows and action menus.

### Phase 3: Creator Detail Ecosystem
- Migrate `creators/[id]` and all `components/creator/*`.
- Remove absolute/fixed sizing that breaks ultra-wide and tablet widths.

### Phase 4: Remaining Routes + Modal Alignment
- Migrate settings/support/live-tools/logs/profile.
- Normalize modal widths and max-heights using shared modal tokens.

### Phase 5: QA + Regression Gate
- Verify widths: `1280`, `1440`, `1600`, `1920`, `2560`.
- Verify viewport heights: `700`, `900`, `1200`.
- Verify viewer states: loading/error/no-content/fullscreen.
- Verify keyboard and focus behavior for all popovers/dropdowns/viewers.

## Acceptance Criteria
- No page-level structural hardcoded widths for primary content columns.
- Shared primitives used for all page structures and tables.
- Product viewer behaves consistently on large and small screens.
- No overflow clipping for critical controls on wide monitors.
- Visual diff approved for all routes and major components.


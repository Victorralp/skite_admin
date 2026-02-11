type DashboardFilter = 'today' | 'yesterday' | 'week' | 'month' | 'six_months';

type DashboardUiState = {
  revenueTrendFilter: DashboardFilter;
  chartsTransactionFilter: DashboardFilter;
  chartsBreakdownFilter: DashboardFilter;
  revenueOverviewRevenueFilter: DashboardFilter;
  revenueOverviewTransactionFilter: DashboardFilter;
  revenueOverviewBreakdownFilter: DashboardFilter;
};

const dashboardUiDefaults: DashboardUiState = {
  revenueTrendFilter: 'today',
  chartsTransactionFilter: 'today',
  chartsBreakdownFilter: 'today',
  revenueOverviewRevenueFilter: 'today',
  revenueOverviewTransactionFilter: 'today',
  revenueOverviewBreakdownFilter: 'today'
};

let dashboardUiState: DashboardUiState = { ...dashboardUiDefaults };

export function getDashboardUiState<K extends keyof DashboardUiState>(key: K): DashboardUiState[K] {
  return dashboardUiState[key];
}

export function setDashboardUiState<K extends keyof DashboardUiState>(
  key: K,
  value: DashboardUiState[K]
) {
  dashboardUiState[key] = value;
}

export function clearDashboardUiState() {
  dashboardUiState = { ...dashboardUiDefaults };
}

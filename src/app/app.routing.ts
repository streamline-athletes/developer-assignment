import { Routes } from "@angular/router";

import { LayoutComponent } from "./layout/layout.component";

export const appRoutes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "dashboards/performances" },
  {
    path: "dashboards",
    component: LayoutComponent,
    children: [
      {
        path: "performances",
        loadChildren: () =>
          import("./modules/performances/performances.module").then(m => m.PerformancesModule),
      },
      { path: "**", redirectTo: "performances" },
    ],
  },
  { path: "**", redirectTo: "dashboards/performances" },
];

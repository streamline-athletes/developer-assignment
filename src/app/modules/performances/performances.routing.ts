import { Route } from "@angular/router";

import { PerformancesComponent } from "./performances.component";
import { PerformancesResolver } from "./performances.resolver";

export const performancesRoutes: Route[] = [
  {
    path: "",
    component: PerformancesComponent,
    resolve: {
      performances: PerformancesResolver,
    },
  },
];

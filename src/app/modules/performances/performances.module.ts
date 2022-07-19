import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SharedModule } from "../../shared/shared.module";
import { PerformancesComponent } from "./performances.component";
import { performancesRoutes } from "./performances.routing";

@NgModule({
  declarations: [PerformancesComponent],
  imports: [RouterModule.forChild(performancesRoutes), SharedModule],
})
export class PerformancesModule {}

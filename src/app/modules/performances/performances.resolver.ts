import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { Performance } from "./performance.type";
import { PerformancesService } from "./performances.service";

@Injectable({
  providedIn: "root",
})
export class PerformancesResolver implements Resolve<Performance[]> {
  constructor(private _performancesService: PerformancesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Performance[]> {
    return this._performancesService.getPerformances("year:frToSr");
  }
}

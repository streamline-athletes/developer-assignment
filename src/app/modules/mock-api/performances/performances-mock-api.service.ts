import { Injectable } from "@angular/core";
import { cloneDeep } from "lodash-es";

import { Performance } from "../../performances/performance.type";
import { SortDirection } from "../../performances/performances.service";
import { AppMockApiService } from "../mock-api.service";
import { performances as performancesData } from "./data";

@Injectable({
  providedIn: "root",
})
export class PerformancesMockApiService {
  private _performances: any[] = performancesData;
  private _sortByYear: any = {
    "FR-1": 0,
    "SO-2": 1,
    "JR-3": 2,
    "SR-4": 3,
  };
  private _sortConfig: Map<SortDirection, (a: Performance, b: Performance) => number> = new Map();

  /**
   * Constructor
   */
  constructor(private _appMockApiService: AppMockApiService) {
    // Register Mock API handlers
    this.registerHandlers();
    this._sortConfig.set("year:frToSr", this.sortByYearFrToSr.bind(this));
    this._sortConfig.set("year:srToFr", this.sortByYearSrToFr.bind(this));
    this._sortConfig.set("time:fastToSlow", this.sortByTimeFastToSlow.bind(this));
    this._sortConfig.set("time:slowToFast", this.sortByTimeSlowToFast.bind(this));
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register Mock API handlers
   */
  registerHandlers(): void {
    // -----------------------------------------------------------------------------------------------------
    // @ Performances - GET
    // -----------------------------------------------------------------------------------------------------
    this._appMockApiService.onGet("api/performances").reply(() => {
      // Clone the performances
      const performances = cloneDeep(this._performances);

      // Return the response
      return [200, performances];
    });

    // sort helpers
    const sortByYearFrToSr: SortDirection = "year:frToSr";
    const sortByYearSrToFr: SortDirection = "year:srToFr";
    const sortByTimeFastToSlow: SortDirection = "time:fastToSlow";
    const sortByTimeSlowToFast: SortDirection = "time:slowToFast";

    this._appMockApiService.onGet(`api/performances?sortBy=${sortByYearFrToSr}`).reply(() => {
      // Clone the performances
      const performances: Performance[] = cloneDeep(this._performances);

      // Sort the performances by the year field
      performances.sort(this._sortConfig.get(sortByYearFrToSr));

      // Return the response
      return [200, performances];
    });

    this._appMockApiService.onGet(`api/performances?sortBy=${sortByYearSrToFr}`).reply(() => {
      // Clone the performances
      const performances: Performance[] = cloneDeep(this._performances);

      // Sort the performances by the year field
      performances.sort(this._sortConfig.get(sortByYearSrToFr));

      // Return the response
      return [200, performances];
    });

    this._appMockApiService.onGet(`api/performances?sortBy=${sortByYearSrToFr}`).reply(() => {
      // Clone the performances
      const performances: Performance[] = cloneDeep(this._performances);

      // Sort the performances by the year field
      performances.sort(this._sortConfig.get(sortByYearSrToFr));

      // Return the response
      return [200, performances];
    });

    /*
    this._appMockApiService.onGet(`api/performances?sortBy=${sortByTimeFastToSlow}`).reply(() => {
     
    });

    this._appMockApiService.onGet(`api/performances?sortBy=${sortByTimeSlowToFast}`).reply(() => {
     
    });
    */
  }

  private sortByYearFrToSr(a: Performance, b: Performance): number {
    return this._sortByYear[a.year] - this._sortByYear[b.year];
  }

  private sortByYearSrToFr(a: Performance, b: Performance): number {
    return this._sortByYear[b.year] - this._sortByYear[a.year];
  }

  private sortByTimeFastToSlow(a: Performance, b: Performance): number {
    return 1;
  }

  private sortByTimeSlowToFast(a: Performance, b: Performance): number {
    return 1;
  }
}

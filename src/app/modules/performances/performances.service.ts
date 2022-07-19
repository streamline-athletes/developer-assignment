import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";

import { Performance } from "./performance.type";

export type SortDirection = "time:slowToFast" | "time:fastToSlow" | "year:frToSr" | "year:srToFr";

@Injectable({
  providedIn: "root",
})
export class PerformancesService {
  private readonly _performances: BehaviorSubject<Performance[] | null>;

  constructor(private _httpClient: HttpClient) {
    this._performances = new BehaviorSubject(null);
  }

  get performances$(): Observable<Performance[]> {
    return this._performances.asObservable();
  }

  getPerformances(sortDirection?: SortDirection): Observable<Performance[]> {
    return this._getPerformances(sortDirection);
  }

  private _getPerformances(sortDirection?: SortDirection): Observable<Performance[]> {
    const params = sortDirection ? `?sortBy=${sortDirection}` : "";
    return this._httpClient.get<Performance[]>(`api/performances${params}`).pipe(
      tap(performances => {
        this._performances.next(performances);
      })
    );
  }
}

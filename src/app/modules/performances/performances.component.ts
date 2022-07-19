import { KeyValue } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { Performance } from "./performance.type";
import { PerformancesService, SortDirection } from "./performances.service";

interface MenuOption {
  active: boolean;
  sortBy?: SortDirection;
  showDivider?: boolean;
  displayOrder?: number;
  displayName?: string;
  category?: string;
}

@Component({
  selector: "app-performances",
  templateUrl: "performances.component.html",
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerformancesComponent implements OnInit, OnDestroy {
  readonly performances$: Observable<Performance[]>;
  readonly sortMenuOptions: Map<string, MenuOption>;

  private activeSort: SortDirection;
  private readonly subscription: Subscription;

  constructor(private performancesService: PerformancesService) {
    this.subscription = new Subscription();
    this.performances$ = this.performancesService.performances$;
    this.sortMenuOptions = new Map();
    this.activeSort = "year:frToSr";
  }

  ngOnInit(): void {
    this.initializeSortMenu();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected onSortMenuItemClick(selectedSortLabel: string, selectedOption: MenuOption): void {
    // set all options as inactive
    for (const [label, menuOption] of this.sortMenuOptions.entries())
      this.sortMenuOptions.get(label).active = false;

    if (!this.sortMenuOptions.get(selectedSortLabel).active) {
      this.sortMenuOptions.get(selectedSortLabel).active = true;
      this.activeSort = this.sortMenuOptions.get(selectedSortLabel).sortBy;
      this.getSortedPerformances(selectedOption.sortBy);
    }
  }

  protected compareByMenuCategories(
    a: KeyValue<string, MenuOption>,
    b: KeyValue<string, MenuOption>
  ): number {
    const optionsHaveDisplayOrder = a.value.displayOrder && b.value.displayOrder;
    const optionsAreSameCategory = a.key.charAt(0) === b.key.charAt(0);

    if (optionsHaveDisplayOrder) return a.value.displayOrder - b.value.displayOrder;
    if (optionsAreSameCategory) return a.key.localeCompare(b.key); // default comparison

    return 1; // push unprioritized items to the bottom
  }

  private getSortedPerformances(sortDirection: SortDirection): void {
    this.subscription.add(this.performancesService.getPerformances(sortDirection).subscribe());
  }

  private initializeSortMenu(): void {
    this.sortMenuOptions.set("Time: Fast to Slow", {
      active: false,
      sortBy: "time:fastToSlow",
      displayOrder: 1,
      displayName: "Time: Fast to Slow",
    });
    this.sortMenuOptions.set("Time: Slow to Fast", {
      active: false,
      sortBy: "time:slowToFast",
      displayOrder: 2,
      displayName: "Time: Slow to Fast",
    });
    this.sortMenuOptions.set("Year: Freshman to Senior", {
      active: true,
      sortBy: "year:frToSr",
      displayOrder: 3,
      displayName: "Year: Freshman to Senior",
      showDivider: true,
    });
    this.sortMenuOptions.set("Year: Senior to Freshman", {
      active: false,
      sortBy: "year:srToFr",
      displayOrder: 4,
      displayName: "Year: Senior to Freshman",
    });
  }
}

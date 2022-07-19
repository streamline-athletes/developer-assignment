import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-layout",
  templateUrl: "layout.component.html",
  styles: [],
})
export class LayoutComponent implements OnInit {
  menuIsOpen: boolean;

  constructor() {
    this.menuIsOpen = false;
  }

  ngOnInit(): void {}

  protected onToggleMenu(): void {
    this.menuIsOpen = !this.menuIsOpen;
  }
}

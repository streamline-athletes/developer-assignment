import { NgModule } from "@angular/core";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";

@NgModule({
  declarations: [],
  imports: [MatDividerModule, MatIconModule, MatMenuModule],
  exports: [MatDividerModule, MatIconModule, MatMenuModule],
})
export class MaterialModule {}

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ExtraOptions, PreloadAllModules, RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { appRoutes } from "./app.routing";
import { LayoutModule } from "./layout/layout.module";
import { mockApiServices } from "./modules/mock-api/mock-api-services";
import { MockApiModule } from "./modules/mock-api/mock-api.module";

const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: "enabled",
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, routerConfig),
    LayoutModule,
    MockApiModule.forRoot(mockApiServices),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

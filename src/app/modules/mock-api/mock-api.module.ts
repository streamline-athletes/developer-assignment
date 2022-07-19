import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { APP_INITIALIZER, InjectionToken, ModuleWithProviders, NgModule } from "@angular/core";

import { MockApiInterceptorService } from "./mock-api-interceptor.service";

export const APP_MOCK_API_DEFAULT_DELAY = new InjectionToken<number>("APP_MOCK_API_DEFAULT_DELAY");

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockApiInterceptorService,
      multi: true,
    },
  ],
  declarations: [],
  imports: [CommonModule],
})
export class MockApiModule {
  static forRoot(
    mockApiServices: any[],
    config?: { delay?: number }
  ): ModuleWithProviders<MockApiModule> {
    return {
      ngModule: MockApiModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          deps: [...mockApiServices],
          useFactory: () => (): any => null,
          multi: true,
        },
        {
          provide: APP_MOCK_API_DEFAULT_DELAY,
          useValue: config?.delay ?? 0,
        },
      ],
    };
  }
}

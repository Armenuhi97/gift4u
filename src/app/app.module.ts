import { CommonModule, registerLocaleData } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { httpParams } from './com/annaniks/gift4u/params/httpParams';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppService, TranslateService1 } from './com/annaniks/gift4u/services';
import { HttpModule } from '@angular/http';
import { LoadingService } from './com/annaniks/gift4u/services/loading.service';
import { CookieService } from './com/annaniks/gift4u/services/cookie.service';
import { PlatformService } from './com/annaniks/gift4u/services/platform.service';
import { TransferHttpModule, TransferHttpService } from '@gorniv/ngx-transfer-http';
import { TranslateHttpLoader } from  '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from  '@angular/common/http';
import localeRu from '@angular/common/locales/ru';
registerLocaleData(localeRu)

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    TransferHttpCacheModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'app-root' }),
    TransferHttpModule
  ],
  providers: [
    AppService,
    HttpClientModule,
    HttpModule,
    CookieService,
    PlatformService,
    TranslateService1,
    {
      provide: 'req',
      useValue: null
    },
    {
      provide: 'BASE_URL',
      useValue: httpParams.baseUrl
    },
    {
      provide: 'FILE_URL',
      useValue: httpParams.fileUrl
    },
    { provide: LOCALE_ID, useValue: "ru" },
    LoadingService,
    TransferHttpService
  ],
})
export class AppModule { }

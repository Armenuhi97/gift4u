import { CommonModule, registerLocaleData } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { httpParams } from './com/annaniks/gift4u/params/httpParams';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppService, TranslateService } from './com/annaniks/gift4u/services';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { LoadingService } from './com/annaniks/gift4u/services/loading.service';
import { CookieService } from './com/annaniks/gift4u/services/cookie.service';
import { PlatformService } from './com/annaniks/gift4u/services/platform.service';
import { TransferHttpModule, TransferHttpService } from '@gorniv/ngx-transfer-http';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu)
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
    TranslateService,
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

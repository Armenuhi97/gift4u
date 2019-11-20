import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateInterceptor } from './i18n/services/translate.interceptor';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule   
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: TranslateInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppServerModule { }
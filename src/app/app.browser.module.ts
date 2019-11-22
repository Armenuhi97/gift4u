import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { I18nBrowserModule } from './i18n/i18n.browser.module';
@NgModule({
       bootstrap: [AppComponent],
       imports: [
              BrowserModule.withServerTransition({ appId: 'app-root' }),
              BrowserTransferStateModule,
              ModuleMapLoaderModule,
              AppModule,
              I18nBrowserModule
       ],
       providers: []
})
export class AppBrowserModule { }
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
@NgModule({
       bootstrap: [AppComponent],
       imports: [
              BrowserModule.withServerTransition({ appId: 'app-root' }),
              BrowserTransferStateModule,
              ModuleMapLoaderModule,
              AppModule,
       ],
       providers: []
})
export class AppBrowserModule { }
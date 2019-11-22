import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

import { I18nServerModule } from './i18n/i18n.server.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule  ,
    I18nServerModule 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppServerModule { }
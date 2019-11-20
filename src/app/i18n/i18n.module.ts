import { NgModule, InjectionToken, Optional, PLATFORM_ID } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { TranslateModule, TranslateService, TranslateLoader } from "@ngx-translate/core";

import { TranslateUniversalLoader } from "./services/translate-universal-loader.service";

export function translateFactory() {
    return new TranslateUniversalLoader();
}

@NgModule({
    imports: [
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: translateFactory
            }
        }),
    ],
    exports: [TranslateModule]
})
export class I18Module {
    constructor(translate: TranslateService) {
        translate.setDefaultLang('en');
    }
}
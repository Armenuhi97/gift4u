import { Inject, NgModule } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { ServerTransferStateModule } from '@angular/platform-server';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { Request } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { TranslateService1 } from '../com/annaniks/gift4u/services';
import { CookieService } from '../com/annaniks/gift4u/services/cookie.service';

@NgModule({
    imports: [
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: translateFSLoaderFactory
            }
        })
    ]
})
export class I18nServerModule {
    constructor(translate: TranslateService, @Inject(REQUEST) req: Request,private _cookieService:CookieService) {
        translate.addLangs(['en', 'ru', 'arm']);
        const language: 'en' | 'ru' | 'arm' = req.cookies.lang || 'en';
        translate.use(language.match(/en|ru|arm/) ? language : 'en');
        this._cookieService.isCookie=(req.cookies && req.cookies.color)?true:false
    }
}

export class TranslateFSLoader implements TranslateLoader {
    constructor(private prefix = 'i18n', private suffix = '.json') { }

    /**
     * Gets the translations from the server, store them in the transfer state
     */
    public getTranslation(lang: string): Observable<any> {
        const path = join('src/assets/', this.prefix, `${lang}${this.suffix}`);
        const data = JSON.parse(readFileSync(path, 'utf8'));

        return of(data);
    }
}

export function translateFSLoaderFactory() {
    return new TranslateFSLoader();
}
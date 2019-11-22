import { Inject, NgModule } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { ServerTransferStateModule } from '@angular/platform-server';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { Request } from 'express';
// import { readFileSync } from 'fs';
// import { join } from 'path';
import * as fs from 'fs';
import * as path from 'path';
import { Observable, of } from 'rxjs';

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
  constructor(translate: TranslateService, @Inject(REQUEST) req: Request) {
    translate.addLangs(['en', 'ru','arm']);
    const language: 'en' | 'ru' | 'arm' = req.cookies.lang || 'arm';
    translate.use(language.match(/en|ru|arm/) ? language : 'arm');
  }
}

export class TranslateFSLoader implements TranslateLoader {
  constructor(private prefix = 'i18n', private suffix = '.json') { }

  /**
   * Gets the translations from the server, store them in the transfer state
   */
  public getTranslation(lang: string): Observable<any> {
    const path1 = path.join(__dirname, '../browser/assets/', this.prefix, `${lang}${this.suffix}`);
    const data = JSON.parse(fs.readFileSync(path1, 'utf8'));

    return of(data);
  }
}

export function translateFSLoaderFactory() {
  return new TranslateFSLoader();
}
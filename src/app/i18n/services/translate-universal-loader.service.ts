import {TranslateLoader} from '@ngx-translate/core';

import {Observable, of} from 'rxjs';

import * as translationEn from 'assets/i18n/en.json';
import * as translationRu from 'assets/i18n/ru.json';
import * as translationArm from 'assets/i18n/arm.json';

const TRANSLATIONS = {
  en: translationEn,
  ru: translationRu,
  arm: translationArm,

};

export class TranslateUniversalLoader implements TranslateLoader {
       
  constructor() {
  }

  public getTranslation(lang: string): Observable<any> {
    return of(TRANSLATIONS[lang]);
  }
 }
  
  export function translateFactory() {
    return new TranslateUniversalLoader();
  }
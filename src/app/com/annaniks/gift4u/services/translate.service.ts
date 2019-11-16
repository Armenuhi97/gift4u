import { Injectable } from "@angular/core";
import { TransferHttpService } from "@gorniv/ngx-transfer-http";
import { AppService } from "./app.service";
import { CookieService } from "./cookie.service";
import { TranslateService } from "@ngx-translate/core";
@Injectable()
export class TranslateService1 {
    private _activeLanguage: string = this._translate.currentLang;

    constructor(private _httpClient: TransferHttpService, private _translate: TranslateService, private _appService: AppService, private _cookieService: CookieService) { }
    ngOnInit() {

    }

    public getActiveLanguage() {
        return this._activeLanguage
    }
    public getTranslate(word: string) {
        let translate: string;
        this._translate.get(word).subscribe((data) => {
            translate = data;
            return translate
        })
        return translate
    }
    
    public translateImportant(key1: string, key2: string, key3: string) {
        this._activeLanguage = this._translate.currentLang;
        if (this._activeLanguage == "en") {
            return key1
        } else {
            if (this._activeLanguage == "ru") {
                return key2;
            } else {
                if (this._activeLanguage == "arm") {
                    return key3;
                }
            }

        }
    }
    public getRequestTranslateAttributeName(object, name: string) {
        let activeLanguage = this._translate.currentLang;
        let attributeName;
        if (activeLanguage == 'arm') {
            attributeName = name;
            return this._appService.checkPropertyValue(object, attributeName)
        } else {
            attributeName = name + '_' + activeLanguage
            return this._appService.checkPropertyValue(object, attributeName)
        }

    }
    public getRequestTranslateAttribute(name: string) {
        let activeLanguage = this._activeLanguage;
        if (activeLanguage == 'arm') {
            return name
        } else {
            return name + '_' + activeLanguage
        }

    }
}
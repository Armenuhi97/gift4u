import { Injectable } from "@angular/core";
import { TransferHttpService } from "@gorniv/ngx-transfer-http";
import { DICTIONARY } from '../translate-params/dictionary'
import { AppService } from "./app.service";
@Injectable()
export class TranslateService {
    private _activeLanguage: string = JSON.parse(localStorage.getItem('language_key')) ? JSON.parse(localStorage.getItem('language_key')) : 'arm';

    constructor(private _httpClient: TransferHttpService,private _appService:AppService) { }
    ngOnInit() {
    }
   
    public getActiveLanguage() {
        return this._activeLanguage
    }
    public setActiveLng(lng: string) {
        window.location.reload();
        this._activeLanguage = lng;
        localStorage.setItem('language_key', JSON.stringify(lng));
    }
    public translate(key) {
        return DICTIONARY[this._activeLanguage][key]
    }
    public translateImportant(key1: string, key2: string, key3: string) {
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
    public getRequestTranslateAttributeName(object,name: string) {
        let activeLanguage = this._activeLanguage;
        let attributeName;
        if (activeLanguage == 'arm') {
            attributeName= name;
            return this._appService.checkPropertyValue(object,attributeName)
        } else {
            attributeName= name + '_' + activeLanguage
            return this._appService.checkPropertyValue(object,attributeName)
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
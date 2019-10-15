import { Injectable } from "@angular/core";
import { TransferHttpService } from "@gorniv/ngx-transfer-http";
import { DICTIONARY } from '../translate-params/dictionary'
@Injectable()
export class TranslateService {
    private _activeLanguage: string = JSON.parse(localStorage.getItem('language_key')) ? JSON.parse(localStorage.getItem('language_key')) : 'arm';
    // public englishWords;
    // public russianWords;
    constructor(private _httpClient: TransferHttpService) { }
    ngOnInit() {
    }
    // public getEglish() {
    //     return this._httpClient.get('assets/files/lang-en.json').pipe(
    //         map((data) => {
    //             localStorage.setItem('english', JSON.stringify(data))
    //             return data
    //         })
    //     )

    // }
    // public getRussian() {
    //     return this._httpClient.get('assets/files/lang-ru.json').pipe(
    //         map((data) => {
    //             localStorage.setItem('russian', JSON.stringify(data))
    //             return data
    //         })
    //     )
    // }
    public getActiveLanguage() {
        return this._activeLanguage
    }
    public setActiveLng(lng: string) {
        this._activeLanguage = lng;
        localStorage.setItem('language_key', JSON.stringify(lng));
        window.location.reload();
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
}
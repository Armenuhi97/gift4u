import { Component, OnInit, Input, Inject } from '@angular/core';
import { TranslateService } from '../../../services';

@Component({
    selector: 'app-characteristic',
    templateUrl: 'characteristic.component.html',
    styleUrls: ['characteristic.component.scss']
})
export class CharacteristicTabComponent implements OnInit {
    @Input('data') private _characteristicData;

    constructor(@Inject('FILE_URL') private _fileUrl: string,private _translateService:TranslateService) { }

    ngOnInit() {}
    public getAttributeName(obj,name: string) {
        return this._translateService.getRequestTranslateAttributeName(obj,name)
    }
    get fileUrl(): string {
        return this._fileUrl;
    }

    get characteristicData() {
        return this._characteristicData;
    }
    get language(){
        return this._translateService.getActiveLanguage()
    }
}
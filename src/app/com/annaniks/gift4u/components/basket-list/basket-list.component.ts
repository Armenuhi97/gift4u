import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService1 } from '../../services';

@Component({
    selector: 'app-basket-list',
    templateUrl: 'basket-list.component.html',
    styleUrls: ['basket-list.component.scss'],

})
export class BastketListComponent implements OnInit {

    constructor(private _translateService: TranslateService1) { }
    get language() {
        return this._translateService.getActiveLanguage()
    }
    ngOnInit() { }
}
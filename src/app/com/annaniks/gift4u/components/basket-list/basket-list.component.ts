import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '../../services';

@Component({
    selector: 'app-basket-list',
    templateUrl: 'basket-list.component.html',
    styleUrls: ['basket-list.component.scss'],

})
export class BastketListComponent implements OnInit {

    constructor(private _translateService: TranslateService) { }
    get language() {
        return this._translateService.getActiveLanguage()
    }
    ngOnInit() { }
}
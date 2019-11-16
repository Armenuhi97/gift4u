import { Component, OnInit, Input } from '@angular/core';
import { TranslateService1 } from '../../../services';

@Component({
    selector: "app-description",
    templateUrl: 'description.component.html',
    styleUrls: ['description.component.scss']
})
export class DescriptionTabComponent implements OnInit {
    @Input('data') private _descriptionData;

    constructor(private _translateService:TranslateService1) { }

    ngOnInit() {}

    get descriptionData() {
        return this._descriptionData;
    }
    public getAttributeName(obj,name: string) {
        return this._translateService.getRequestTranslateAttributeName(obj,name)
    }
}
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: "app-description",
    templateUrl: 'description.component.html',
    styleUrls: ['description.component.scss']
})
export class DescriptionTabComponent implements OnInit {
    @Input('data') private _descriptionData;

    constructor() { }

    ngOnInit() {}

    get descriptionData() {
        return this._descriptionData;
    }
}
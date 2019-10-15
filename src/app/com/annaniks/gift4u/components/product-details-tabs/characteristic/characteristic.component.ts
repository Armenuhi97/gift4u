import { Component, OnInit, Input, Inject } from '@angular/core';

@Component({
    selector: 'app-characteristic',
    templateUrl: 'characteristic.component.html',
    styleUrls: ['characteristic.component.scss']
})
export class CharacteristicTabComponent implements OnInit {
    @Input('data') private _characteristicData;

    constructor(@Inject('FILE_URL') private _fileUrl: string) { }

    ngOnInit() {}

    get fileUrl(): string {
        return this._fileUrl;
    }

    get characteristicData() {
        return this._characteristicData;
    }
}
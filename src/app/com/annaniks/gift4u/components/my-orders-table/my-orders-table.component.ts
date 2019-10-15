import { Component, OnInit, Input, Inject, ViewEncapsulation } from '@angular/core';
import { OrderProducts } from '../../views/main/personal-area/personal-area.models';

@Component({
    selector: "app-my-orders-table",
    templateUrl: 'my-orders-table.component.html',
    styleUrls: ['my-orders-table.component.scss'],

})
export class MyOrdersTableComponent implements OnInit {
    @Input('productsData') private _products: OrderProducts[] = [];

    constructor(@Inject('FILE_URL') private _fileUrl: string) { }

    ngOnInit() { }

    get products(): OrderProducts[] {
        return this._products;
    }

    get fileUrl(): string {
        return this._fileUrl;
    }
}
import { Component, OnInit, Input, Inject, ViewEncapsulation } from '@angular/core';
import { OrderProducts } from '../../views/main/personal-area/personal-area.models';
import { TranslateService1 } from '../../services';

@Component({
    selector: "app-my-orders-table",
    templateUrl: 'my-orders-table.component.html',
    styleUrls: ['my-orders-table.component.scss'],

})
export class MyOrdersTableComponent implements OnInit {
    @Input('productsData') private _products: OrderProducts[] = [];

    constructor(@Inject('FILE_URL') private _fileUrl: string,private _translateService:TranslateService1) { }

    ngOnInit() { }

    get products(): OrderProducts[] {
        console.log(this._products);
        
        return this._products;
    }

    get fileUrl(): string {
        return this._fileUrl;
    }
    get language(){
        return this._translateService.getActiveLanguage()
    }
}
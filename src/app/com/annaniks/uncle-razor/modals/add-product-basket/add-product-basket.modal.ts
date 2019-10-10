import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductFull, Product } from '../../models/models';
import { Router } from '@angular/router';

@Component({
    selector: 'add-product-basket-modal',
    templateUrl: 'add-product-basket.modal.html',
    styleUrls: ['add-product-basket.modal.scss']
})
export class AddProductBasketModal implements OnInit {
    private _product: Product = new Product();

    constructor(
        @Inject(MAT_DIALOG_DATA) private _data: any,
        @Inject("FILE_URL") private _fileUrl: string,
        private _dialogRef: MatDialogRef<AddProductBasketModal>,
        private _router: Router
    ) { }

    ngOnInit() {
        this._product = this._data.product;        
    }

    public closeModal(): void {
        this._dialogRef.close();
    }

    public onClickCountinue(): void {
        this._dialogRef.close();
    }

    public onClickGoBasket(): void {
        this._router.navigate(['/basket']);
        this._dialogRef.close();
    }

    get product(): Product {
        return this._product;
    }

    get fileUrl(): string {
        return this._fileUrl;
    }

    get price(): number {
        return this._product.count * +this._product.price_with_vat
    }
    get specificPrice():number{
        return this._product.count* +this._product.specificPrice
    }
}
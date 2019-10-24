import { Component, OnInit, Input, Inject, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Product } from '../../../models/models';
import { TranslateService } from '../../../services';

@Component({
    selector: '[basketListItem]',
    templateUrl: 'basket-list-item.component.html',
    styleUrls: ['basket-list-item.component.scss'],

})
export class BasketListItemComponent implements OnInit {
    @Input('basketItem') private _basketItem: Product = new Product();
    @Output('deleteEvent') private _deleteEvent: EventEmitter<void> = new EventEmitter<void>();
    private _count: number = 1;

    constructor(@Inject('FILE_URL') private _fileUrl: string, private _translateService:TranslateService) { }

    ngOnInit() { }

    public onClickIncrement(): void {
        this._basketItem.count++;
    }

    public onClickDecrement(): void {
        if (this._basketItem.count == 1) {
            return;
        }
        this._basketItem.count--;
    }

    public getAttributeName(object,name: string) {
        return this._translateService.getRequestTranslateAttributeName(object,name)
    }
    public onClickDelete(): void {
        this._deleteEvent.emit();
    }

    get count(): number {
        return this._count;
    }

    get basketItem(): Product {
        return this._basketItem;
    }

    get fileUrl(): string {
        return this._fileUrl;
    }

    get currentPrice(): number {
        return this._basketItem.count * ((this._basketItem && this._basketItem.specificPrice) ? this._basketItem.specificPrice : +this._basketItem.price_with_vat);
    }
    get promocodeDiscountPrice(): number {
        let currentPrice = this._basketItem.count * ((this._basketItem && this._basketItem.specificPrice) ? this._basketItem.specificPrice : +this._basketItem.price_with_vat)
        let discountPrice=this._basketItem.discountType == 'Percent - order' ? +currentPrice - +currentPrice * this._basketItem.promoDiscount : +currentPrice - this._basketItem.promoDiscount
        // return (+currentPrice - +currentPrice * this._basketItem.promoDiscount);
        return discountPrice

    }
    get promoPrice() {
        if (this._basketItem.promoDiscount) {
            let price = this._basketItem.specificPrice ? this._basketItem.specificPrice : this._basketItem.price_with_vat;
            let discountPrice = this._basketItem.discountType == 'Percent - order' ? +price - +price * this._basketItem.promoDiscount : +price - this._basketItem.promoDiscount
            // return +price - +price * this._basketItem.promoDiscount
            return discountPrice
        }
    }
}
import { Component, OnInit, Input, Inject, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Product } from '../../../models/models';
import { AppService, TranslateService1 } from '../../../services';

@Component({
    selector: '[basketListItem]',
    templateUrl: 'basket-list-item.component.html',
    styleUrls: ['basket-list-item.component.scss'],

})
export class BasketListItemComponent implements OnInit {
    @Input('basketItem') private _basketItem: Product = new Product();
    @Output('deleteEvent') private _deleteEvent: EventEmitter<void> = new EventEmitter<void>();
    private _count: number = 1;

    constructor(@Inject('FILE_URL') private _fileUrl: string, private _appService: AppService,private _translateService:TranslateService1) { }

    ngOnInit() { }

    public onClickIncrement(): void {
        this._basketItem.count++;
    }
    public getAttributeName(item,name: string) {
        return this._translateService.getRequestTranslateAttributeName(item,name)
    }
    public onClickDecrement(): void {
        if (this._basketItem.count == 1) {
            return;
        }
        this._basketItem.count--;
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
        // return this._basketItem.count * ((this._basketItem && this._basketItem.specificPrice) ? this._basketItem.specificPrice : +this._basketItem.price_with_vat);
        return this._basketItem.count * ((this._basketItem) ? +this._basketItem.price_with_vat : null);
    }
    get promocodeDiscountPrice(): number {
        let currentPrice = this._basketItem.count * ((this._basketItem && this._basketItem.specificPrice) ? +this._basketItem.specificPrice : 0)
        let promoPrice = this._basketItem.count * (this._basketItem.discountType == 'Percent - order' ? +this._basketItem.price_with_vat - +this._basketItem.price_with_vat * +this._basketItem.promoDiscount : +this._basketItem.price_with_vat - +this._basketItem.promoDiscount)
        let discountPrice: number;
        if (currentPrice) {
            if ((this._basketItem.both == 0 || this._basketItem.both == null) && this._basketItem.isHaveBoth) {

                discountPrice = +currentPrice < +promoPrice ? +currentPrice : +promoPrice
            } else {
                if (this._basketItem.both == 1) {

                    discountPrice = this._basketItem.count *
                        (this._basketItem.discountType == 'Percent - order' ?
                            +this._basketItem.specificPrice - +this._basketItem.specificPrice *
                            +this._basketItem.promoDiscount : +this._basketItem.specificPrice - +this._basketItem.promoDiscount)
                } else {
                    discountPrice = currentPrice
                }
            }
        } else {
            discountPrice = promoPrice
        }
        return +discountPrice.toFixed(2)

    }
    get promoPrice() {
        let price = this._basketItem.specificPrice ? this._basketItem.specificPrice : 0;
        if (this._basketItem.promoDiscount) {
            let promoPrice = this._basketItem.discountType == 'Percent - order' ? +this._basketItem.price_with_vat - +this._basketItem.price_with_vat * this._basketItem.promoDiscount : +this._basketItem.price_with_vat - this._basketItem.promoDiscount
            let discountPrice: number;
            if (price) {
                if ((this._basketItem.both == 0 || this._basketItem.both == null) && this._basketItem.isHaveBoth) {
                    discountPrice = price < promoPrice ? price : promoPrice
                } else {
                    if (this._basketItem.both == 1) {
                        discountPrice = this._basketItem.discountType == 'Percent - order' ? +this._basketItem.specificPrice - +this._basketItem.specificPrice * this._basketItem.promoDiscount : +this._basketItem.specificPrice - this._basketItem.promoDiscount
                    } else {
                        discountPrice = price
                    }
                }
            } else {
                discountPrice = promoPrice
            }
            return discountPrice
        } else {
            return +price
        }
    }
    get language(){
        return this._translateService.getActiveLanguage()
    }
}
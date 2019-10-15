import { Component, OnInit, Input, Inject, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Product } from '../../../models/models';

@Component({
    selector: '[basketListItem]',
    templateUrl: 'basket-list-item.component.html',
    styleUrls: ['basket-list-item.component.scss'],

})
export class BasketListItemComponent implements OnInit {
    @Input('basketItem') private _basketItem: Product = new Product();
    @Output('deleteEvent') private _deleteEvent: EventEmitter<void> = new EventEmitter<void>();
    private _count: number = 1;

    constructor(@Inject('FILE_URL') private _fileUrl: string) { }

    ngOnInit() {}

    public onClickIncrement(): void {
        this._basketItem.count++;
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

    get currentPrice():number{
        return this._basketItem.count * ((this._basketItem && this._basketItem.specificPrice) ? this._basketItem.specificPrice : +this._basketItem.price_with_vat);
    }
}
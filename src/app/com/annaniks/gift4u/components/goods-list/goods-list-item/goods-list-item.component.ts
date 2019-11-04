import { Component, OnInit, Input, Inject, ViewEncapsulation } from '@angular/core';
import { Product, ProductScore } from '../../../models/models';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MainService } from '../../../views/main/main.service';
import { TranslateService } from '../../../services';

@Component({
    selector: 'app-goods-list-item',
    templateUrl: 'goods-list-item.component.html',
    styleUrls: ['goods-list-item.component.scss']
})
export class GoodsListItemComponent implements OnInit {
    private _productRating: number = 0;
    @Input('product') _product: Product = new Product();
    @Input('style') style;
    constructor(
        @Inject('FILE_URL') private _fileUrl: string,
        private _router: Router,
        private _titleService: Title,
        private _mainService: MainService,
        private _translateService:TranslateService
    ) { }

    ngOnInit() {
        this._calcProductRating(this._product.productScore)
    }
    public getAttributeName(obj,name: string) {
        return this._translateService.getRequestTranslateAttributeName(obj,name)
    }
    private setProductToBasket(product): void {
        product['count'] = 1;
        this._mainService.addProductBasket(product)
    }

    private _calcProductRating(ratings: ProductScore[]): void {
        if (ratings) {
            ratings.forEach((element) => {
                this._productRating += +element.score
            })
            if (ratings.length > 0) {
                this._productRating = this._productRating / ratings.length;
            }
        }
    }

    private _setProductRating(starCount: number): void {
        this._mainService.setProductRating(starCount, this._product.id).subscribe((data) => { })
    }

    public onClickItem(): void {
        this._router.navigate([`/catalog/${this._product.id}`])
        this._titleService.setTitle(this._product.name);
    }

    public onClickAddBasket(): void {
        this.setProductToBasket(this._product);
    }

    public handleSetRating(event): void {
        this._setProductRating(event)
    }

    public onMouseEnter(): void {

    }

    get product(): Product {
        return this._product;
    }

    get fileUrl(): string {
        return this._fileUrl;
    }

    get productRating(): number {
        return this._productRating
    }
    get language(){
        return this._translateService.getActiveLanguage()
    }
}
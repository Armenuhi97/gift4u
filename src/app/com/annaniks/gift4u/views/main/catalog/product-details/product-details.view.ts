import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { BuyOneClickModal, LightboxModal } from '../../../../modals';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from '../catalog.service';
import { ServerResponse, ProductFull, CombinedProduct, CombinedAttribute, LikeProduct, AttributeProductValue, AttributeSet, Path, Product, ProductScore, Reviews } from '../../../../models/models';
import { Subscription } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';
import { AppService, TranslateService1 } from '../../../../services';
import { MainService } from '../../main.service';
import { LoadingService } from '../../../../services/loading.service';
import { ProductDetailsService } from './product-details.service';
import { Lightbox, LightboxEvent, LIGHTBOX_EVENT } from 'ngx-lightbox';
import { PlatformService } from '../../../../services/platform.service';
import { CrystalLightbox } from 'ngx-crystal-gallery';

@Component({
    selector: 'product-details-view',
    templateUrl: 'product-details.view.html',
    styleUrls: ['product-details.view.scss']
})
export class ProductDetailsView implements OnInit, OnDestroy {
    public reviews: Reviews[] = []
    private _activeSizeItem: number = 0;
    private _activeTabItem: string = 'description';
    public count: number = 1;
    private _product: ProductFull = new ProductFull();
    private _subscription: Subscription = new Subscription();
    private _paramsSubscription: Subscription = new Subscription();
    private _mainImage: string = '';
    private _routeSteps = [
        { label: this.translateWord('Main', 'Главная', 'Գլխավոր'), url: '/', queryParams: {}, status: '' },
    ];
    private _combinedProducts: CombinedProduct[] = [];
    private _selectedAttributse: { id: string; fullName: string, value: string }[] = []
    private _combinedAttributes: CombinedAttribute[] = [];
    private _productRating: number = 0;
    public activeIcon: string;
    public isActive: boolean = false;
    private _isFavorite: boolean;
    private _id: number
    constructor(
        @Inject('FILE_URL') private _fileUrl: string,
        private _matDialog: MatDialog,
        private _activatedRoute: ActivatedRoute,
        private _catalogService: CatalogService,
        private _titleService: Title,
        private _appService: AppService,
        private _mainService: MainService,
        private _metaService: Meta,
        private _loadingService: LoadingService,
        private _productDetailsService: ProductDetailsService,
        private _lightbox: Lightbox,
        private _lightboxEvent: LightboxEvent,
        private _translateService: TranslateService1,
        private _router: Router,
        private _platformService: PlatformService,
        private _crystalLightbox: CrystalLightbox


    ) {
        this._checkProductId();
    }

    ngOnInit() {

    }
    public translateWord(key1: string, key2: string, key3: string) {
        return this._translateService.translateImportant(key1, key2, key3)
    }
    public getAttributeName(obj, name: string) {
        return this._translateService.getRequestTranslateAttributeName(obj, name)
    }
    private _checkIsFavorite(id: number): void {
        if (this._mainService.isAuthorized) {
            this.activeIcon = '';
            this._productDetailsService.getFavoriteBookmark(id).subscribe((data: ServerResponse<boolean>) => {
                this._isFavorite = data.messages;
                this.activeIcon = this._isFavorite ? 'favorite' : 'favorite_border'
            })
        }
    }
    private _openBuyOneClickModal(): void {
        let matDialog = this._matDialog.open(BuyOneClickModal, {
            width: '504px',
            minHeight: '231px',
            maxHeight: '80vh'
        })
    }

    private _checkProductId(): void {
        this._paramsSubscription = this._activatedRoute.params.subscribe((params) => {
            if (params && params.id) {
                this._id = params.id
                this._getProduct(params.id);
                this._getProductReviews(params.id);
                this._checkIsFavorite(this._id)
            }
        })
    }

    private _setProductToBasket(): void {
        this._product['count'] = this.count;
        this._mainService.addProductBasket(this._product);
    }

    private _setRouteSteps(step: { label: string, url: string, queryParams: object, status: string }): void {
        this._routeSteps.push(step);
    }
    private _getProductReviews(productId: number) {
        this._loadingService.showLoading();
        this._mainService.getReview(productId).subscribe((data: ServerResponse<Reviews[]>) => {
            this.reviews = data.messages;
            this._loadingService.hideLoading();
        },
            () => {
                this._loadingService.hideLoading();
            })
    }
    private _getProduct(id: number): void {
        this._subscription.unsubscribe();
        this._loadingService.showLoading();
        this._routeSteps = [{ label: this.translateWord('Main', 'Главная', 'Գլխավոր'), url: '/', queryParams: {}, status: '' }];
        this._combinedAttributes = [];
        this._subscription = this._catalogService.getProductById(id).subscribe((data) => {
            this._product = data.messages;

            this._calcProductRating(this._product.productScore);
            this._metaService.updateTag({ name: 'description', content: this.getAttributeName(this._product, 'description') })
            this._metaService.updateTag({ property: "og:url", content: 'https://gift4u.am' + this._router.url })
            this._metaService.updateTag({ property: "og:type", content: "article" })
            this._metaService.updateTag({ property: "og:title", content: this.getAttributeName(this._product, 'name') })
            this._metaService.updateTag({ property: "og:description", content: this.getAttributeName(this._product, 'description') })
            this._metaService.updateTag({ property: "og:image", content: this._fileUrl + 'products/' + this._product.image })

            this._metaService.addTag({ name: 'keywords', content: this._product.keywords })
            this._mainImage = window.innerWidth > 920 ?
                this._appService.checkPropertyValue(data.messages, 'smallImage') : this._appService.checkPropertyValue(data.messages, 'image');

            let paths: Path[] = this._product.path.reverse();
            paths.forEach((element, index) => {
                if (index == 0) {
                    this._setRouteSteps({ label: this.getAttributeName(element, 'name'), url: `/catalog`, queryParams: { parentcategoryname: paths[0].name, parentcategoryid: paths[0].categoryId }, status: '' });
                }
                else {
                    this._setRouteSteps({ label: this.getAttributeName(element, 'name'), url: `/catalog`, queryParams: { parentcategoryname: paths[0].name, parentcategoryid: paths[0].categoryId, categoryname: element.name, categoryid: element.categoryId }, status: '' });
                }
            })
            this._setRouteSteps({ label: this.getAttributeName(this._product, 'name'), url: `/catalog/${this._product.id}`, queryParams: {}, status: '' });
            this._titleService.setTitle(this.getAttributeName(this._product, 'title'));

            this._product.combineAttribute.forEach((item: AttributeSet) => {
                this._combinedAttributes.push({ attribute_id: item.attribute_id, values: [], name: item.name })
            })
            let mian: CombinedProduct = { product_id: this._product.id.toString(), values: [] }
            this._product.attributeSet.forEach(((item: AttributeSet, index: number) => {
                item.AttributeProductValue.forEach((attributePvalue: AttributeProductValue) => {
                    this._combinedAttribute(attributePvalue)
                    this._selectedAttributse.push({ id: attributePvalue.attribute_id, fullName: attributePvalue.value, value: attributePvalue.value })
                    mian.values.push({ id: attributePvalue.attribute_id, value: attributePvalue.value })
                })
            }))
            this._combinedProducts.push(mian)
            this._product.likeProduct.forEach((item: LikeProduct, index) => {
                let combineP: CombinedProduct = { product_id: item.productId, values: [] }
                if (item.CombineProductAttribute && item.CombineProductAttribute.length > 0) {
                    item.CombineProductAttribute[0].ProductAttribute.forEach((pAttribute: AttributeProductValue, index) => {
                        this._combinedAttribute(pAttribute)
                        combineP.values.push({ id: pAttribute.attribute_id, value: pAttribute.value });
                    })
                }
                this._combinedProducts.push(combineP);
            })
            this._loadingService.hideLoading();
        },
            () => {
                this._loadingService.hideLoading()
            })
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

    public handleSetRating($event): void {
        this._setProductRating($event);
    }

    public handleSelectedAttribute(attributeValue, attribute: CombinedAttribute) {
        this.changeSelectAttribute(attribute.attribute_id, attributeValue.value, attributeValue.fullName);
    }

    public changeSelectAttribute(id, value, fullName: string) {
        for (let k = 0; k < this._selectedAttributse.length; k++) {
            if (this._selectedAttributse[k].id == id) {
                this._selectedAttributse[k].value = value;
                this._selectedAttributse[k].fullName = fullName
                this._findLikeProduct();
            }
        }
    }
    private _findLikeProduct() {
        for (let i = 0; i < this._combinedProducts.length; i++) {
            const product = this._combinedProducts[i];
            let like = true;
            for (let j = 0; j < product.values.length; j++) {
                const value = product.values[j];
                for (let k = 0; k < this._selectedAttributse.length; k++) {
                    const selected = this._selectedAttributse[k];
                    if (selected.id == value.id) {
                        if (selected.fullName !== value.value) {
                            like = false;
                            break;
                        }
                    }
                }
                if (!like) break;
            }
            if (like) {
                this._getLikeProduct(product.product_id)
            }

        }

    }

    private _getLikeProduct(product_id) {
        this._loadingService.showLoading();
        this._product.productImages = [];

        this._subscription = this._catalogService.getProductById(product_id).subscribe((data: ServerResponse<ProductFull>) => {
            this._product = data.messages;
            this._calcProductRating(this._product.productScore);
            this._mainImage = this._appService.checkPropertyValue(data.messages, 'image');

            this._loadingService.hideLoading();
        },
            () => {
                this._loadingService.hideLoading()
            })
    }

    private _indexOf(array, value) {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if (element.value == value) return index;
        }
        return -1;
    }

    private _combinedAttribute(pAttribute: AttributeProductValue) {
        for (let index = 0; index < this._combinedAttributes.length; index++) {
            this._combinedAttributes[index]['fullName'] = pAttribute.value
            if (this._combinedAttributes[index].attribute_id == pAttribute.attribute_id) {
                if (this._indexOf(this._combinedAttributes[index].values, pAttribute.value) == -1) {
                    this._combinedAttributes[index].values.push({ value: pAttribute.value, fullName: pAttribute.value, available: true });
                }
                break;
            }
        }
    }


    private _openLightboxModal(images: object[], imageIndex: number): void {
        if (images && images.length > 0) {
            let matDialog = this._matDialog.open(LightboxModal, {
                width: '100%',
                height: '100%',
                maxHeight: '100%',
                maxWidth: '100%',
                panelClass: 'light-box-modal',
                data: {
                    images: images,
                    imageIndex: imageIndex
                }
            });
        }
    }

    public onClickMainImage(): void {
        let imageIndex: number = 0;
        let images = [];
        this._product.productImages.forEach((element, index) => {
            if (element.name === this.mainImage) {
                imageIndex = index;
            }
            images.push({ image: element.name })
        })
        let sm_albums = []
        let _albums = [];
        for (let img of images) {
            const src = this.fileUrl + 'products/' + img.image;
            const caption = this.fileUrl + 'products/' + img.image
            const thumb = this.fileUrl + 'products/' + img.image;
            const album = {
                src: src,
                caption: caption,
                thumb: thumb
            };
            sm_albums.push({
                preview: src,
                full: src,
            })
            _albums.push(album);
        }
        if (window.innerWidth > 920) {
            this._lightbox.open(_albums, imageIndex, { centerVertically: true });
            this._subscription = this._lightboxEvent.lightboxEvent$
                .subscribe(event => {
                    this._onReceivedEvent(event)
                });
            if (this._platformService.isBrowser)
                document.body.style.overflow = 'hidden';
        } else {
            this._crystalLightbox.open(sm_albums, { index: imageIndex, manasory: false, counter: true })

        }
    }
    private _onReceivedEvent(event: any): void {
        // remember to unsubscribe the event when lightbox is closed
        if (event.id === LIGHTBOX_EVENT.CLOSE) {
            if (this._platformService.isBrowser) {
                document.body.style.overflow = 'auto';
                document.body.style.paddingRight = "0px"
            }
            this._subscription.unsubscribe();
        }
    }

    public handleMainImageEvent(event: number) {
        this._mainImage = this._product.productImages[event].name;
    }
    public addOrRemoveBookmark(): void {
        this._loadingService.showLoading()
        if (this._isFavorite && this.activeIcon == 'favorite') {
            this._productDetailsService.deleteBookmark(this._id).subscribe(() => {
                this.activeIcon = 'favorite_border';
                this._isFavorite = false;
                this._loadingService.hideLoading()
            },
                () => {
                    this._loadingService.hideLoading()
                })
        } else {
            if (!this._isFavorite && this.activeIcon == 'favorite_border') {
                this._productDetailsService.addBookmark(this._id).subscribe(() => {
                    this.activeIcon = 'favorite';
                    this._isFavorite = true;
                    this._loadingService.hideLoading()
                },
                    () => {
                        this._loadingService.hideLoading()
                    })
            }
        }
    }
    public onClickTabItem(itemType: string): void {
        this._activeTabItem = itemType;
    }

    public onClickIncrement(): void {
        this.count++;
    }

    public onClickDecrement(): void {
        if (this.count == 1) {
            return;
        }
        this.count--;
    }

    public onClickBuyOneClick(): void {
        this._openBuyOneClickModal();
    }

    public onClickAddBasket(): void {
        this._setProductToBasket();
    }


    get activeSizeItem(): number {
        return this._activeSizeItem;
    }

    get activeTabItem(): string {
        return this._activeTabItem;
    }

    get product(): ProductFull {
        return this._product;
    }

    get fileUrl(): string {
        return this._fileUrl;
    }
    get language() {
        return this._translateService.getActiveLanguage()
    }
    get mainImage(): string {
        return this._mainImage;
    }

    get routeSteps() {
        return this._routeSteps;
    }

    get combinedAttributes(): CombinedAttribute[] {
        return this._combinedAttributes
    }

    get productRating(): number {
        return this._productRating;
    }
    // get review():Reviews[]{
    //     return this._reviews
    // }

    get isAuthorized(): boolean {
        return this._mainService.isAuthorized();
    }

    get bonusPrice(): number {
        let bonusPrice = 0;
        if (this._mainService.isAuthorized) {
            bonusPrice = (+this._product.price_with_vat * +this._mainService.getUserInfo().percent) / 100;
        }
        return bonusPrice;

    }
    get id(): number {
        return this._id
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
        this._paramsSubscription.unsubscribe();
        this._metaService.updateTag({ property: "og:url", content: '' })
        this._metaService.updateTag({ property: "og:type", content: '' })
        this._metaService.updateTag({ property: "og:title", content: '' })
        this._metaService.updateTag({ property: "og:description", content: '' })
        this._metaService.updateTag({ property: "og:image", content: '' })
        this._metaService.updateTag({ name: 'description', content: '' });
        this._metaService.updateTag({ name: 'keywords', content: '' });
    }
}
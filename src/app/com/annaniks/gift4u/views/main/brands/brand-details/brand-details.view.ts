import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { BrandsService } from '../brands.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../../models/models';
import { Brand } from '../brands.models';
import { Meta, Title } from '@angular/platform-browser';
import { LoadingService } from '../../../../services/loading.service';
import { TranslateService } from '../../../../services';

@Component({
    selector: 'brand-details-view',
    templateUrl: 'brand-details.view.html',
    styleUrls: ['brand-details.view.scss']
})
export class BrandDetailsView implements OnInit, OnDestroy {
    private _routeSubscription: Subscription = new Subscription();
    private _fullProducts: Product[] = [];
    private _loading: boolean = false;
    private _pageLength: number = 12;
    private _productsCount: number = 0;
    private _page: number = 1;
    private _products: Product[] = [];
    private _brandInfo: Brand;
    private _routeSteps: any[];
    private _showMore: boolean = false;
    private _sort: string;
    public imageKey: string = 'image';
    private _id: number;
    private _banners = []
    constructor(
        @Inject('FILE_URL') private _fileUrl: string,
        private _brandService: BrandsService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _title: Title,
        private _meta: Meta,
        private _loadingService: LoadingService,
        private _translateService: TranslateService
    ) {
        this._checkBrandId();
    }

    ngOnInit() {
        this._checkWindowSize()
    }

    private _checkBrandId(): void {
        this._routeSubscription = this._activatedRoute.params.subscribe((params) => {
            if (params && params.id) {
                this._id = +params.id
            }
        })

        this._activatedRoute.queryParams.subscribe((queryparams) => {
            this._resetProperties();
            if (queryparams && queryparams.page) {
                this._page = +queryparams.page;
            }

            if (queryparams && queryparams.sort) {
                this._sort = queryparams.sort;
                // this._sortProducts(queryparams.sort);
            }
            this._getBrandById(this._id, this._page - 1, this._pageLength, this._sort)
        })
    }
    public getAttributeName(obj, name: string) {
        if (obj && obj[name]) {
            let attribute = this._translateService.getRequestTranslateAttributeName(obj, name);
            return attribute ? attribute : obj[name]
        }
    }
    private _getBrandById(id: number, page: number, pageLength: number, sort): void {
        this._loading = true;
        this._loadingService.showLoading();
        let min = sort == 'min' ? true : null;
        let max = sort == 'max' ? true : null;
        this._brandService.getBrandById(id, page, pageLength, max, min).subscribe((data) => {
            this._products = data.messages.product;
            this._fullProducts = data.messages.product;
            this._productsCount = data.count;
            this._brandInfo = data.messages.brand[0];
            this._banners = this._brandInfo.images
            this._title.setTitle(this._brandInfo.name);
            this._meta.updateTag({ name: 'description', content: this._brandInfo.description })
            this._meta.updateTag({ name: 'keywords', content: this._brandInfo.keywords })
            // this._sortProducts(this._sort);
            this._loadingService.hideLoading()
            this._loading = false;
        })
    }

    private _resetProperties(): void {
        this._page = 1;
    }

    public onPageChange($event) {
        if ($event.isArrow)
            this._router.navigate([], { relativeTo: this._activatedRoute, queryParams: { page: $event.pageNumber }, queryParamsHandling: 'merge' })
    }

    public onClickShowMore(): void {
        this._showMore = !this._showMore;
    }
    private _checkWindowSize(): void {
        if (window.innerWidth <= 445) {
            this.imageKey = 'smallImage';
        }
    }

    get loading(): boolean {
        return this._loading;
    }

    get productsCount(): number {
        return this._productsCount;
    }

    get page(): number {
        return this._page;
    }

    get products() {
        return this._products;
    }

    get pageLength(): number {
        return this._pageLength;
    }
    get banners() {
        return this._banners
    }

    get brandInfo() {
        return this._brandInfo;
    }

    get fileUrl(): string {
        return this._fileUrl;
    }

    get routeSteps(): any[] {
        return this._routeSteps;
    }

    get showMore(): boolean {
        return this._showMore
    }
    ngOnDestroy() {
        this._routeSubscription.unsubscribe();
    }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from './search.service';
import { Product, ServerResponse } from '../../../models/models';
import { LoadingService } from '../../../services/loading.service';

@Component({
    selector: 'search-view',
    templateUrl: 'search.view.html',
    styleUrls: ['search.view.scss']
})
export class SearchView implements OnInit, OnDestroy {
    public productsCount: number = 0;
    public pageLength: number = 12;
    public page: number = 1;
    public products: Product[] = [];
    private _fullProducts: Product[] = [];
    public loading: boolean = false;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _searchService: SearchService,
        private _loadingService: LoadingService
    ) {
        this._checkQueryParams();
    }

    ngOnInit() { }

    private _checkQueryParams(): void {
        this._activatedRoute.queryParams.subscribe((params) => {
            if (params) {
                //&& params.search
                if (params.page) {
                    this.page = +params.page;
                }
                else {
                    this.page = 1;
                }
                this._searchProduct(params.search);
            }
            else {
                this._router.navigate(['/']);
            }
        })
    }

    private _searchProduct(search: string): void {
        this.loading = true;
        this._loadingService.showLoading()
        this._searchService.searchProduct(search).subscribe((data: ServerResponse<Product[]>) => {
            this._fullProducts = data.messages;
            this.productsCount = data.messages.length;
            this._setPage(this.page)
            this.loading = false;
            this._loadingService.hideLoading()
        },
            () => {
                this._loadingService.hideLoading()
            })
    }

    private _setPage(pageNumber: number): void {
        window.scrollTo(0, 0)
        this.products = this._fullProducts.slice((pageNumber - 1) * this.pageLength, pageNumber * this.pageLength)
    }

    public onPageChange($event) {
        this._setPage($event.pageNumber);
        if ($event.isArrow)
            this._router.navigate([], { relativeTo: this._activatedRoute, queryParams: { page: $event.pageNumber }, queryParamsHandling: 'merge' })
    }

    ngOnDestroy() { }
}
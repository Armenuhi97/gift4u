import { Component, OnInit } from '@angular/core';
import { CatalogService } from './catalog.service';
import { Category, CategoryFilter } from './catalog.models';
import { ServerResponse, Product, Breadcrumbs, Path } from '../../../models/models';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LoadingService } from '../../../services/loading.service';
import { TranslateService1 } from '../../../services';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'catalog-view',
    templateUrl: 'catalog.view.html',
    styleUrls: ['catalog.view.scss']
})
export class CatalogView implements OnInit {
    private _categories: Category[];
    private _products: Product[];
    private _label: string;
    private _productsCount: number = 0;
    private _fullProducts: Product[];
    private _pageLength: number = 12;
    private _filters: CategoryFilter = new CategoryFilter();
    private _page: number = 1;
    private _sort: string = 'none';
    public isGet: boolean = false
    private _categoryId: number;
    private _isShowFilters: boolean = true;
    private _parentId: number;
    public isChangeCategory: boolean = false
    private _previousParentId: number
    private _routeSteps: Breadcrumbs[] = [
        { label: this.translateWord('Main', 'Главная', 'Գլխավոր'), url: '/', queryParams: {}, status: '' }
    ];

    constructor(
        private _catalogService: CatalogService,
        private _activatedRoute: ActivatedRoute,
        private _titleService: Title,
        private _router: Router,
        private _loadingService: LoadingService,
        private _translateService: TranslateService1,
        private _translate:TranslateService
    ) {
        this._checkQueryParams();
    }

    ngOnInit() {       
        if (window.innerWidth <= 973) {
            this._isShowFilters = false;
        }
    }
    public translateWord(key1: string, key2: string, key3: string) {
        return this._translateService.translateImportant(key1, key2, key3)
    }
    private _checkQueryParams(): void {
        this._activatedRoute.queryParams.subscribe((params) => {
            if (params && params.parentcategoryid && params.parentcategoryname) {
                if (params.page) {
                    this._page = +params.page;
                }
                else {
                    this._page = 1;
                }
                if (params.sort) {
                    this._sort = params.sort;
                }
                this._getCategories(params.parentcategoryid, params.parentcategoryname);
                this._parentId = params.parentcategoryid;
                if (params && params.parentcategoryid) {
                    if (params.categoryid) {
                        this._categoryId = params.categoryid
                    } else {
                        if (params.categoryId) {
                            this._categoryId = params.categoryId
                        } else {
                            this._categoryId = params.parentcategoryid
                        }
                    }
                }

                if (params.filter) {
                    this._filters = JSON.parse(params.filter);
                } else {
                    this._filters = new CategoryFilter()
                }
                if (this._previousParentId !== this._parentId) {
                    this.isChangeCategory = true
                }
                this.isGet = false
                this._filters["min"] = this._sort == 'min' ? true : null;
                this._filters["max"] = this._sort == 'max' ? true : null;
                this._filters["page"] = this._page - 1
                this._filters["count"] = this._pageLength
                this._filters["parentId"] = params.parentcategoryid;
                this._filters["categoryId"] = (this._categoryId && this._categoryId !== params.parentcategoryid) ? this._categoryId : null
                this._filterProducts();
                this._previousParentId = params.parentcategoryid
            }
            else {
                this._router.navigate(['/']);
            }
        })
    }
    private _getCategories(id: number, categoryname: string): void {
        this._catalogService.getCategoriesById(id).subscribe((data: ServerResponse<Category[]>) => {
            this._categories = data.messages;
        })
    }
    private _getFiltersProduct(fil) {
        this._loadingService.showLoading()
        this._catalogService.filterCategory(fil).subscribe((data) => {
            this._products = data.messages;
            this.isGet = true
            this._fullProducts = data.messages;
            this._productsCount = data.count;
            this._resetProperties();
            let paths: Path[] = data['path'].reverse();
            paths.forEach((element, index) => {
                if (index == 0) {
                    this._setRouteSteps({ label: this.getAttributeName(element, 'name'), url: `/catalog`, queryParams: { parentcategoryname: paths[0].name, parentcategoryid: paths[0].categoryId }, status: '' });
                }
                else {
                    this._setRouteSteps({ label: this.getAttributeName(element, 'name'), url: `/catalog`, queryParams: { parentcategoryname: paths[0].name, parentcategoryid: paths[0].categoryId, categoryname: element.name, categoryId: element.categoryId }, status: '' });
                }
            })
            this.isChangeCategory = false
            this._loadingService.hideLoading()
        },
            () => {
                this._loadingService.hideLoading()
            })
    }
    public getAttributeName(obj, name: string) {
        return this._translateService.getRequestTranslateAttributeName(obj, name)
    }

    private _filterProducts(): void {
        let fil = this._filters;
        this._getFiltersProduct(fil)
    }

    private _resetProperties(): void {
        this._routeSteps = [
            { label: this.translateWord('Main', 'Главная', 'Գլխավոր'), url: '/', queryParams: {}, status: '' }
        ];
        this._label = this._routeSteps[this._routeSteps.length - 1].label
        this._titleService.setTitle(this._label);
    }

    private _setRouteSteps(routeStep: { label: string, url: string, queryParams: object, status: string }): void {
        this._routeSteps.push(routeStep);
        this._label = this._routeSteps[this._routeSteps.length - 1].label
        this._titleService.setTitle(this._label);
    }

    public onPageChange($event) {
        if ($event.isArrow)
            this._router.navigate([], { relativeTo: this._activatedRoute, queryParams: { page: $event.pageNumber }, queryParamsHandling: 'merge' })
    }

    public onClickShowFilters(): void {
        this._isShowFilters = !this._isShowFilters;
    }

    get categories(): Category[] {
        return this._categories;
    }

    get products(): Product[] {
        return this._products;
    }

    get label(): string {
        return this._label;
    }

    get productsCount(): number {
        return this._productsCount;
    }

    get pageLength(): number {
        return this._pageLength;
    }

    get routeSteps(): Breadcrumbs[] {
        return this._routeSteps;
    }

    get page(): number {
        return this._page;
    }

    get showFilters(): boolean {
        return this._isShowFilters;
    }
    get language() {
        return this._translateService.getActiveLanguage()
    }
}
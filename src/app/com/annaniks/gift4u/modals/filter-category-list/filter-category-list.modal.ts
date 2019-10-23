import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Category, CategoryFilter, City, Reduction } from "../../views/main/catalog/catalog.models";
import { Product, Breadcrumbs, ServerResponse, Path, ModalFilterType } from "../../models/models";
import { Title } from "@angular/platform-browser";
import { LoadingService } from "../../services/loading.service";
import { MainService } from "../../views/main/main.service";
import { Brand } from "../../views/main/brands/brand-details/brand.models";
import { Observable, forkJoin, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Options } from 'ng5-slider';
import { FormGroup } from "@angular/forms";
import { TranslateService } from "../../services";
@Component({
    selector: 'filter-category-list',
    templateUrl: 'filter-category-list.modal.html',
    styleUrls: ['filter-category-list.modal.scss']
})
export class FilterCategoryListModal {
    private _arr = [];
    public reductions = [];
    public sales: Reduction[] = []
    public filterGroup: FormGroup;
    private _activeTab: string = 'categories';
    private _categories: Category[];
    private _products: Product[];
    private _label: string;
    private _productsCount: number = 0;
    private _fixedProducts: Product[] = [];
    private _fullProducts: Product[];
    private _pageLength: number = 12;
    private _filters: CategoryFilter = new CategoryFilter();
    private _page: number = 1;
    private _sort: string = 'none';
    private _categoryId: number;
    public activeCategory: number;
    public brands: Brand[];
    public cities: City[];
    private _subscription: Subscription;
    private _selectedBrands: Array<number> = [];
    private _selectedCity: Array<number> = []
    private _selectedCategory = [];
    private _routeSteps: Breadcrumbs[] = [
        { label: this.translateWord('Main','Главная','Գլխավոր'), url: '/', queryParams: {}, status: '' }
    ];

    public categotyListName: Array<{ name: string, isOpen: boolean }> = [
        {
            name:this.translateWord('Categories','Категории','Կատեգորիաներ') ,
            isOpen: false
        },
        {
            name:this.translateWord('Brands','Бренды','Ապրանքանիշներ') ,
            isOpen: false
        },
        {
            name: this.translateWord('Country','Страна','Երկիրը'),
            isOpen: false
        },
        {
            name:this.translateWord('Price','Цена','Գինը') ,
            isOpen: false
        },
        {
            name: this.translateWord('Discount','Скидка','Զեղչ') ,
            isOpen: false
        },
    ]

    private _options: Options = {
        showTicks: false,
        floor: 0,
        ceil: 100000
    };

    public value: number = 0;
    public highValue: number = 100000;
    constructor(@Inject(MAT_DIALOG_DATA) private _data: any,
        private _dialogRef: MatDialogRef<FilterCategoryListModal>,
        private _mainService: MainService,
        private _activatedRoute: ActivatedRoute,
        private _titleService: Title,
        private _router: Router,
        private _translateService:TranslateService,
        private _loadingService: LoadingService, ) {
        this.compbineObservable()
    }
    ngOnInit() {

    }
    public getHeight() {
        let styles = {};
        styles['min-height'] = (window.innerHeight - 45) + 'px';
        return styles
    }
    public getAttributeName(name: string) {
        return this._translateService.getRequestTranslateAttributeName(name)
    }
    public closeOtherCategory(ind: number) {
        for (let i = 0; i < this.categotyListName.length; i++) {
            if (i !== ind) {
                this.categotyListName[i].isOpen = false
            }
        }
    }
    public translateWord(key1:string,key2:string,key3:string){
       return this._translateService.translateImportant(key1,key2,key3)
    }
    public apply(): void {
        let cityId = this._selectedCity.join(',');
        let brandId = this._selectedBrands.join(',');
        let categoryId = this._selectedCategory.join(',');
        let reduction = this.reductions.join(',')
        let sendObject: ModalFilterType = {};
        if (this.value !== 0 || this.highValue !== 100000) {
            sendObject["priceMin"] = this.value;
            sendObject["priceMax"] = this.highValue
        }
        if (cityId) {
            sendObject["cityId"] = cityId
        }
        if (brandId) {
            sendObject["brandsId"] = brandId
        }
        if (categoryId) {
            sendObject["categoryId"] = categoryId
        }
        if (this.reductions) {
            sendObject["reduction"] = reduction
        }
        this._dialogRef.close(true)
        this._router.navigate(['/catalog'], { relativeTo: this._activatedRoute, queryParams: { page: null, filter: JSON.stringify(sendObject) }, queryParamsHandling: "merge" })
    }
    public reset(): void {
        this.clean();
        this._dialogRef.close(true);
        let queryParam = this._activatedRoute.snapshot.queryParams;
        let sendFilter = {}
        if (queryParam && queryParam.categoryid) {
            sendFilter = JSON.stringify({ 'categoryid': (queryParam.categoryid).toString() })
        } else {
            sendFilter = null
        }
        this._router.navigate(['/catalog'], { queryParams: { filter: sendFilter, page: null, }, relativeTo: this._activatedRoute, queryParamsHandling: "merge" })
    }
    private compbineObservable(): void {
        const combine = forkJoin(
            this._getBrands(),
            this._getCountries(),
            this._getSales()
        )
        this._subscription = combine.subscribe(() => {
            this._checkQueryParams()
        })
    }
    public clean() {
        this._selectedCity = []
        this._selectedCategory = []
        this._selectedBrands = [];
        this.reductions = []
        if (this.cities)
            this.cities.forEach((data) => {
                data.isSelect = false
            })
        if (this.brands)
            this.brands.forEach((data) => {
                data.isSelect = false
            })
        if (this._categories)
            this._categories.forEach((category) => {
                if (category.isSelect) {
                    category.isSelect = false
                }
                if (category.subCategory) {
                    category.subCategory.forEach((subcategory) => {
                        subcategory.isSelect = false
                    })
                }
            })
        this.value = 0;
        this.highValue = 100000;
    }

    public selectedArray(event) {        
        this._arr = []
        for (let ev of event) {
            Object.values(ev).forEach((e: any) => {
                e.forEach((val) => {
                    this._arr.push(val)
                })
            })
        }
        this._selectedCategory = this._arr.filter((item, pos) => {
            return this._arr.indexOf(item) == pos;
        })
    }

    public selectBrand(ev): void {
        this._selectedBrands = ev
    }
    public selectCity(ev): void {
        this._selectedCity = ev;
    }
    private _setParams(array: Array<any>): void {
        for (let arr of array) {
            arr["isSelect"] = false
        }
    }
    public onClickTabItem(tab_name: string): void {
        this._activeTab = tab_name
    }

    public closeModal(): void {
        this._dialogRef.close()
    }
    private _setQueryParamsValue(filter, attributeName, selectArrayName, arrName) {
        if (filter[attributeName]) {
            let arr = filter[attributeName].split(',');
            arr.forEach((data) => {
                selectArrayName.push(parseInt(data))
            })
            arr.forEach((val) => {
                if (attributeName == 'categoryId') {
                    if (!arrName[0]) {
                        if (arrName.id == parseInt(val)) {
                            arrName.isSelect = true
                        }
                    } else {
                        arrName.forEach((data) => {
                            if (data.id == parseInt(val)) {
                                data.isSelect = true
                            }
                        })
                    }
                } else {
                    arrName.forEach((data) => {
                        if (data.id == parseInt(val)) {
                            data.isSelect = true
                        }
                    })
                }
            })
        }
    }
    private _checkQueryParams(): void {
        if (this._data.params && this._data.params.parentcategoryid && this._data.params.parentcategoryname) {
            this._getCategories(this._data.params.parentcategoryid, this._data.params.parentcategoryname);
            if (this._data.params.page) {
                this._page = +this._data.params.page;
            }
            else {
                this._page = 1;
            }
            if (this._data.params.sort) {
                this._sort = this._data.params.sort;
            }
            if (this._data.params.filter) {
                let filter = JSON.parse(this._data.params.filter);
                this.value = filter.priceMin ? filter.priceMin : 0;
                this.highValue = filter.priceMax ? filter.priceMax : 100000;
                if (filter.reduction)
                    this.reductions = filter.reduction.split(',');
                this._setQueryParamsValue(filter, "brandsId", this._selectedBrands, this.brands)
                this._setQueryParamsValue(filter, "cityId", this._selectedCity, this.cities)
            }
            this._label = (this._data.params.categoryname) ? this._data.params.categoryname : this._data.params.parentcategoryname;
            this._titleService.setTitle(this._label);
            let categoryId: number = (this._data.params.parentcategoryid && this._data.params.categoryid) ? this._data.params.categoryid : this._data.params.parentcategoryid;
            if (this._data.params.filter) {
                this._filters = JSON.parse(this._data.params.filter);
            }
            if (this._categoryId !== categoryId) {
                this._getProducts(categoryId, categoryId === this._data.params.parentcategoryid);
            }
            else if (categoryId) {
            }
            this._categoryId = categoryId;
        }
        else {
            this._router.navigate(['/']);
        }
    }
    private _getCategories(id: number, categoryname: string): void {
        this._mainService.getCategoriesById(id).subscribe((data: ServerResponse<Category[]>) => {
            this._categories = data.messages;
            this._setParam()
            if (this._data && this._data.params && this._data.params.filter) {
                let filter = JSON.parse(this._data.params.filter)
                this._categories.forEach((category) => {
                    this._setQueryParamsValue(filter, "categoryId", this._selectedCategory, category.subCategory.length == 0 ? category : category.subCategory);
                })
                this._selectedCategory = this._selectedCategory.filter((item, pos) => {
                    return this._selectedCategory.indexOf(item) == pos;
                })
            }
        })
    }
    private _getBrands(): Observable<ServerResponse<Brand[]>> {
        return this._mainService.getBrands().pipe(
            map((data: ServerResponse<Brand[]>) => {
                this.brands = data.messages;
                this._setParams(this.brands)
                return data
            })
        )
    }
    private _getCountries(): Observable<ServerResponse<City[]>> {
        return this._mainService.getCountries().pipe(
            map((data: ServerResponse<City[]>) => {
                this.cities = data.messages;
                this._setParams(this.cities)
                return data
            })
        )
    }
    private _getSales(): Observable<ServerResponse<Reduction[]>> {
        return this._mainService.getSales().pipe(
            map((data: ServerResponse<Reduction[]>) => {
                this.sales = data.messages;
                return data
            })
        )
    }
    private _setParam() {
        for (let category of this._categories) {
            if (!category.subCategory.length) {
                category["isSelect"] = false
            } else {
                for (let subcategory of category.subCategory) {
                    subcategory['isSelect'] = false
                }
            }
        }
    }

    private _getProducts(categoryId: number, isParent: boolean = false): void {
        this._loadingService.showLoading();
        this._mainService.getProducts(categoryId, isParent, '').subscribe((data) => {
            this._fixedProducts = data.messages['data'];
            this._fullProducts = data.messages['data'];
            this._products = data.messages['data'];
            this._productsCount = data.messages['data'].length;
            this._resetProperties();
            let paths: Path[] = data.messages['path'].reverse();
            paths.forEach((element, index) => {
                if (index == 0) {
                    this._setRouteSteps({ label: element[this.getAttributeName('name')], url: `/catalog`, queryParams: { parentcategoryname: paths[0].name, parentcategoryid: paths[0].categoryId }, status: '' });
                }
                else {
                    this._setRouteSteps({ label: element[this.getAttributeName('name')], url: `/catalog`, queryParams: { parentcategoryname: paths[0].name, parentcategoryid: paths[0].categoryId, categoryname: element.name, categoryId: element.categoryId }, status: '' });
                }
            })
            this._loadingService.hideLoading();

        },
            () => {
                this._loadingService.hideLoading()
            })
    }


    private _resetProperties(): void {
        this._routeSteps = [
            { label: this.translateWord('Main','Главная','Գլխավոր'), url: '/', queryParams: {}, status: '' }
        ];
    }
    public allGet(): boolean {
        return this.brands && this.cities && this._categories ? true : false
    }
    private _setRouteSteps(routeStep: { label: string, url: string, queryParams: object, status: string }): void {
        this._routeSteps.push(routeStep);
    }
    get activeTab() {
        return this._activeTab
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
    get options(): Options {
        return this._options;
    }
}
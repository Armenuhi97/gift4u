import { Component, OnInit, OnDestroy, Output, Input, EventEmitter } from '@angular/core';
import { Options } from 'ng5-slider';
import { Subscription, Observable, forkJoin } from 'rxjs';
import { ServerResponse, CityCountry } from '../../models/models';
import { Brand } from '../../views/main/brands/brands.models';
import { map } from 'rxjs/operators';
import { AttributeFilter, City, CategoryFilter, Reduction } from '../../views/main/catalog/catalog.models';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService, TranslateService1 } from '../../services';
import { MainService } from '../../views/main/main.service';

@Component({
    selector: 'app-filters',
    templateUrl: 'filters.component.html',
    styleUrls: ['filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
    public min = 0;
    public max = 100000;
    public reduction: Reduction[] = []
    private _subscription: Subscription = new Subscription();
    private _cities: City[] = [];
    private _attributes: AttributeFilter[] = [];
    private _brands: Brand[] = [];
    private _filterForm: FormGroup;
    private _options: Options = {
        showTicks: false,
        floor: 0,
        ceil: 100000
    };
    @Input('isBorder') private _isBorder: boolean = false;
    @Input('item')
    set item($event) {
        if ($event) {
            this._formBuilder();
        }
    }
    constructor(
        private _mainService: MainService,
        private _fb: FormBuilder,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _appService: AppService,
        private _translateService:TranslateService1
    ) { }

    ngOnInit() {
        this._formBuilder();
        this._getFilters();
    }
    public getTranslateWord(word:string){
        return this._translateService.getTranslate(word)
    }
    private _formBuilder(): void {
        this._filterForm = this._fb.group({
            price: [[0, 100000]],
            city: [[]],
            brand: [[]],
            sale: [[]]
        })        
        this.min = this.filterForm.get('price').value[0];
        this.max = this.filterForm.get('price').value[1]
    }
    changeMinValue(event: number) {
        if (event) {
            this.filterForm.get('price').setValue([event, this.max])
        }
    }
    changeMaxValue(event: number) {
        if (event) {
            this.filterForm.get('price').setValue([this.min, event])
        }
    }
    changeSlider(ev: Array<number>) {
        if (ev) {
            this.min = ev[0];
            this.max = ev[1]
        }
    }
    public translateWords(key1:string,key2:string,key3:string){
        return this._translateService.translateImportant(key1,key2,key3)
    }
    public getAttributeName(name:string){
        return this._translateService.getRequestTranslateAttribute(name)
    }
    private _getFilters(): void {
        const combined = forkJoin(
            this._getCities(),
            this._getReduction(),
            this._getBrands()
        )
        this._subscription = combined.subscribe(() => {
            this._checkQueryParams();
        });
    }
    private _getReduction(): Observable<ServerResponse<Reduction[]>> {
        return this._mainService.getSales().pipe(
            map((data: ServerResponse<Reduction[]>) => {
                this.reduction = data.messages
                return data
            })
        )
    }
    private _setAttributeControls(): void {
        for (let i of this._attributes) {
            this._filterForm.addControl('att' + i.name, new FormControl(null));
        }
    }

    private _checkQueryParams(): void {
        let queryParams = this._activatedRoute.snapshot.queryParams;
        if (queryParams && queryParams.filter) {
            let filters: CategoryFilter = new CategoryFilter();
            filters = JSON.parse(queryParams.filter);
            if (filters.brandsId !== undefined || filters.cityId !== undefined || filters.priceMax !== undefined && filters.priceMin !== undefined || filters.reduction !== undefined) {
                this._setFormValues(filters);
            }
        }
    }
    private _setQueryParams(): void {
        let filter: CategoryFilter = new CategoryFilter();
        filter.priceMin = this._appService.checkPropertyValue(this._filterForm.get('price').value, 0, 0);
        filter.priceMax = this._appService.checkPropertyValue(this._filterForm.get('price').value, 1, 100000);
        filter.cityId = this._setFilterAttribute('city', 'id')
        filter.brandsId = this._setFilterAttribute('brand', 'id')
        filter.reduction = this._setFilterAttribute('sale', 'reduction')
        this._router.navigate([], { relativeTo: this._activatedRoute, queryParams: { filter: JSON.stringify(filter), page:null }, queryParamsHandling: "merge" })
    }
    private _setFilterAttribute(attribut: string, key: string) {
        let arr = []
        if (this.filterForm.get(attribut).value && this.filterForm.get(attribut).value.length) {
            this.filterForm.get(attribut).value.forEach((data) => {
                arr.push(this._appService.checkPropertyValue(data, key, null));
            })
            return arr.join(',')
        } else {
            return null
        }
    }

    private _setFormValues(values: CategoryFilter): void {
        this._filterForm.patchValue({
            city: this._setAttributValue(values, 'cityId', this._cities, 'id'),
            brand: this._setAttributValue(values, 'brandsId', this.brands, 'id'),
            sale: this._setAttributValue(values, 'reduction', this.reduction, 'reduction'),
            price: [values.priceMin, values.priceMax]
        })
    }
    private _setAttributValue(values, valueAttribut: string, array, key: string) {
        let arr = []
        if (values[valueAttribut]) {
            let ids = values[valueAttribut].split(',');
            for (let id of ids) {
                arr.push(array.filter((data) => {
                    return data[key] == id
                })[0])
            }
        }
        return arr
    }

    private _getCities(): Observable<void> {
        return this._mainService.getCountries().pipe(
            map((data: ServerResponse<City[]>) => {
                this._cities = data.messages;
            })
        )
    }

    private _getAttributes(): Observable<void> {
        return this._mainService.getAttributes().pipe(
            map((data: ServerResponse<AttributeFilter[]>) => {
                this._attributes = data.messages;
                this._attributes.forEach((element, index) => {
                    element.attributValue.map((el) => {
                        let val = el.value.split(',')
                        el.value = (val.length == 2) ? val[0] : el.value;
                    })
                })
                this._setAttributeControls();
            })
        )
    }

    private _getBrands(): Observable<void> {
        return this._mainService.getBrands().pipe(
            map((data: ServerResponse<Brand[]>) => {
                this._brands = data.messages;
            })
        )
    }

    public onClickClearFilters(): void {
        this._filterForm.reset();
        this._filterForm.get('price').setValue([0, 100000])
        this._setQueryParams();
    }
    public onClickFilter(): void {
        this._setQueryParams();
    }

    get filterForm(): FormGroup {
        return this._filterForm;
    }

    get cities(): City[] {
        return this._cities;
    }

    get attributes(): AttributeFilter[] {
        return this._attributes;
    }

    get brands(): Brand[] {
        return this._brands;
    }

    get options(): Options {
        return this._options;
    }
    get isBorder(): boolean {
        return this._isBorder;
    }
    get language(){
        return this._translateService.getActiveLanguage()
    }
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
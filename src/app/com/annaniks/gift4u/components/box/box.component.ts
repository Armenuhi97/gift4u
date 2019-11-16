import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService, TranslateService1 } from '../../services';
import { MatDialog } from '@angular/material';
import { FilterCategoryListModal } from '../../modals';

@Component({
    selector: 'app-box',
    templateUrl: 'box.component.html',
    styleUrls: ['box.component.scss'],

})
export class BoxComponent implements OnInit {
    @Input('header') private _headerLabel: string = '';
    @Input('headerPosition') private _headerPosition: string = 'center';
    @Input('marginTop') private _marginTop: string = window.innerWidth > 920 ? '46px' : '20px';
    @Input('searchVisible') private _searchVisible: boolean = false;
    @Input('isFilter') private _isFilter: boolean
    @Input('isP') private _isP: boolean
    public sort: { name: string, value: string };
    private _sortings: { name: string, value: string }[] = [
        { name: this.getTranslateWord('By default','По умолчанию','Ըստ նախնականի'), value: 'none' },
        { name:this.getTranslateWord('Price min to max','Цена от мин до макс','Գինը մինիմալից մաքսիմում') , value: 'min' },
        { name: this.getTranslateWord('Price max to min','Цена от макс до мин','Գինը մաքսիմումից մինիմալ'), value: 'max' },
        // { name: 'По популярности', value: 'none' },
        // { name: 'По новизне', value: 'none' }
    ]

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _appService: AppService,
        private _matDialog: MatDialog,
        private _translateService:TranslateService1
    ) {
        this._checkQueryParams();
    }

    ngOnInit() { }
    private _checkQueryParams(): void {
        let params = this._activatedRoute.snapshot.queryParams;
        if (params && params.sort) {
            this._findSelectedSort(params.sort);
        }
        else {
            this.sort = {
                name: '',
                value: ''
            };
        }
    }
    public getTranslateWord(key1: string, key2: string, key3: string) {
        return this._translateService.translateImportant(key1, key2, key3)
    }
    public onChangeSort(event): void {
        this._router.navigate([], { relativeTo: this._activatedRoute, queryParams: { sort: event.value }, queryParamsHandling: 'merge' })
    }
    public openFilterCategoryList() {
        let param;
        this._activatedRoute.queryParams.subscribe((params) => {
            param = params
        })
        let dialog = this._matDialog.open(FilterCategoryListModal, {
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            panelClass: 'filter_category_modal',
            data: { params: param }
        })
    }
    private _findSelectedSort(selectedSortValue: string): void {
        this.sort = this._appService.checkPropertyValue(this._sortings.filter((element) => element.value === selectedSortValue), 0, { name: '', value: '' });
    }

    get headerLabel(): string {
        return this._headerLabel;
    }

    get headerPosition(): string {
        return this._headerPosition;
    }

    get marginTop(): string {
        return this._marginTop;
    }

    get searchVisible(): boolean {
        return this._searchVisible;
    }

    get sortings() {
        return this._sortings;
    }
    get isFilter(): boolean {
        return this._isFilter
    }
    get isP(): boolean {
        return this._isP
    }
}
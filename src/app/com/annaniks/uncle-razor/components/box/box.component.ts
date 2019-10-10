import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../services';
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
        { name: 'По умолчанию ', value: 'none' },
        { name: 'Цена от мин до макс', value: 'min' },
        { name: 'Цена от макс до мин', value: 'max' },
        { name: 'По популярности', value: 'none' },
        { name: 'По новизне', value: 'none' }
    ]

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _appService: AppService,
        private _matDialog: MatDialog
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
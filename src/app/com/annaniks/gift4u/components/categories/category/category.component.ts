import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../../views/main/catalog/catalog.models';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItemsService, TranslateService1 } from '../../../services';

@Component({
    selector: 'app-category',
    templateUrl: 'category.component.html',
    styleUrls: ['category.component.scss'],

})
export class CategoryComponent implements OnInit {
    public selectedArray: number[] = [];
    private _isMain: boolean = false
    private _multiSelect: boolean;
    @Input('category') private _category: Category;
    @Input('isCloseMenu') private _isCloseMenu: boolean = false;
    @Input('isParent') private _isParent: boolean = false;
    @Input('isSlideNav') private _isSlideNav: boolean = false;
    @Input('multiSelect')
    set setMultiselectValue($event) {
        this._multiSelect = $event
    }
    @Input('isMain')
    set setMainValue($event) {
        this._isMain = $event
    }
    @Output('getSelectsArray') private _selectArr = new EventEmitter;
    private _activeCategory: boolean = false;

    constructor(private _router: Router, private _activatedRoute: ActivatedRoute,
        private _translateService:TranslateService1, private _menuItemsService: MenuItemsService) { }

    ngOnInit() {
        if (this._category.subCategory.length) {
            for (let category of this._category.subCategory) {
                category['isActive'] = false
            }
        }
        this._checkQueryParams();
    }
    public onClickSubcategoryButton(item) {
        item.isActive = !item.isActive
    }
    private _checkQueryParams(): void {
        this._activatedRoute.queryParams.subscribe((params) => {
            let flag: boolean = false;
            this._checkMultyQueryParams()
            if (params && params.parentcategoryname && params.parentcategoryid) {
                if (+params.parentcategoryid === this._category.id) {
                    flag = true;
                }
            }
            if (params && params.categoryname && params.categoryid) {
                if (+params.categoryid === this._category.id) {
                    if (this._multiSelect) {
                        if (!this._category.subCategory.length) {
                            flag = false
                        } else {
                            flag = true;
                        }
                    } else {
                        flag = true;
                    }
                }
                else {
                    if (this.category.subCategory)
                        this.category.subCategory.forEach((element) => {
                            if (element.id === +params.categoryid) {
                                flag = true;
                                element.isActive = true;

                            } else {
                                element.isActive = false
                            }
                            if (element.subCategory) {
                                element.subCategory.forEach((subcategory) => {
                                    if (subcategory.id == +params.categoryid) {
                                        flag = true;
                                        element.isActive = true;
                                    }
                                })
                            }
                        })
                }

            }
            this._activeCategory = flag;
        })
    }

    public onClickButton(): void {
        this._activeCategory = !this._activeCategory;
    }
    public getAttributeName(obj,name: string) {
        return this._translateService.getRequestTranslateAttributeName(obj,name)
    }
    private _checkMultyQueryParams() {
        let queryParams = this._activatedRoute.snapshot.queryParams;
        if (queryParams && queryParams.filter) {
            let filter = JSON.parse(queryParams.filter)
            if (filter && filter["categoryId"]) {
                let queryArr = filter["categoryId"].split(',');
                if (this._category.subCategory.length) {
                    for (let subcategory of this._category.subCategory) {
                        for (let arr of queryArr) {
                            if (subcategory.id == arr) {
                                this.selectedArray.push(parseInt(arr));
                                this._selectArr.emit(this.selectedArray)
                            }
                        }
                    }
                } else {
                    for (let arr of queryArr) {
                        if (this._category.id == arr) {
                            this.selectedArray.push(parseInt(arr));
                            this._selectArr.emit(this.selectedArray)
                        }
                    }
                }
            }
        }
    }
    public onClickCategory(category: Category, isParent?: boolean): void {
        if (this._multiSelect) {
            category.isSelect = !category.isSelect;
            if (category.isSelect) {
                this.selectedArray.push(category.id);
            } else {
                for (let i = 0; i < this.selectedArray.length; i++) {
                    if (this.selectedArray[i] == category.id) {
                        this.selectedArray.splice(i, 1)
                    }
                }
            }
            this._selectArr.emit(this.selectedArray)
        } else {
            if (this._isCloseMenu && this._menuItemsService.getOpenMenu()) {
                this._menuItemsService.openMenu();
            }
            let params = {};
            if (isParent) {
                params = { parentcategoryname: category.name, parentcategoryid: category.id, page: 1 };
            }
            else {
                if (this._isSlideNav) {
                    params = { parentcategoryname: this._category.name, parentcategoryid: this._category.id, categoryname: category.name, categoryid: category.id, page: 1, filter: JSON.stringify({ categoryId: category.id.toString() }) };
                }
                else {
                    params = { categoryname: category.name, categoryid: category.id, page: 1, filter: JSON.stringify({ categoryId: category.id.toString() }) };
                }
            }
            this._router.navigate(['/catalog'], { queryParams: params, queryParamsHandling: (isParent) ? null : 'merge' });
        }
    }

    get category(): Category {
        return this._category;
    }
    get isSlideNav(): boolean {
        return this._isSlideNav
    }
    get activeCategory(): boolean {
        return this._activeCategory;
    }

    get isParent(): boolean {
        return this._isParent;
    }
    get multiSelect(): boolean {
        return this._multiSelect
    }
    get isMain(): boolean {
        return this._isMain
    }

}
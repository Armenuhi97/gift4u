import { Component, OnInit, Input, Inject } from '@angular/core';
import { MenuItemsService } from '../../services';
import { MenuItem } from '../../models/models';
import { Category } from '../../views/main/catalog/catalog.models';
import { MainService } from '../../views/main/main.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-catalog',
    templateUrl: 'catalog.component.html',
    styleUrls: ['catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
    private _catalogItems: Array<Category> = [];
    @Input('catalogItems')
    set catalogItems($event) {
        this._catalogItems = $event;
    }

    private _activeTab: string = 'catalog';
    private _isSmallDisplay: boolean = false;
    private _scroll: boolean = false
    constructor(private _mainService: MainService,
        private _activatedRoute: ActivatedRoute,
        private _menuItemsService: MenuItemsService, private _router: Router) { }

    ngOnInit() {
        this._checkwindowSize();
        window.addEventListener('scroll', () => {
            let y = window.pageYOffset;
            if (y >= 180) {
                if (!this._scroll)
                    this._scroll = true;
            } else {
                if (this._scroll)
                    this._scroll = false;
            }
        })
    }

    private _checkwindowSize(): void {
        if (window.innerWidth <= 920) {
            this._isSmallDisplay = true;
            this._menuItemsService.openMenu();
        }
    }
    isLinkActive(item): boolean {
        let isActive = false;
        this._activatedRoute.queryParams.subscribe((params) => {
            if (params && params.parentcategoryid) {
                if (+params.parentcategoryid == +item.id) {
                    isActive = true
                }
            }
        })
        return isActive
    }
    public getQuerySendObject(itemName, itemId, subItemName, subItemId) {
        return {
            parentcategoryname: itemName, parentcategoryid: itemId,
            categoryname: subItemName, categoryid: subItemId,
            filter: JSON.stringify({ categoryId: subItemId.toString() })
        }
    }
    public onClickHeader(tabName: string): void {
        this._activeTab = tabName;
    }

    public onClickItem(): void {
        if (this._isSmallDisplay) {
            this._menuItemsService.openMenu();
        }
    }

    get catalogItems(): Category[] {
        if (this._activeTab == 'catalog') {
            return this._catalogItems;
        }

    }

    get activeTab(): string {
        return this._activeTab;
    }

    // get menuOpen(): boolean {
    //     return this._menuItemsService.getOpenMenu();
    // }

    get isSmallDisplay(): boolean {
        return this._isSmallDisplay;
    }

    get scroll(): boolean {
        return this._scroll;
    }

}
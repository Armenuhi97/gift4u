import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainService } from './main.service';
import { ServerResponse, Setting, SocialItem } from '../../models/models';
import { Category } from './catalog/catalog.models';
import { Meta } from '@angular/platform-browser';

@Component({
    selector: 'main-view',
    templateUrl: 'main.view.html',
    styleUrls: ['main.view.scss']
})
export class MainView implements OnInit, OnDestroy {
    private _categories: Category[] = [];
    private _settings: Setting[] = [];
    private _socialItems: SocialItem[] = [];
    private _categoriesMenu: Category[] = [];

    constructor(private _mainService: MainService, private _meta: Meta) { }

    ngOnInit() {
        this._mainService.checkUserBasketPrice();
        this._getCategories();
        this._getCategoriesMenu();
        this._getUser();
        this._getSettings();
        this._getSocialItems();
        this._addMetaTags();
    }

    private _getCategories(): void {
        this._mainService.getCategories().subscribe((data: ServerResponse<Category[]>) => {
            this._categories = data.messages;
        });
    }

    private _getCategoriesMenu(): void {
        this._mainService.getCategoriesMenu().subscribe((data: ServerResponse<Category[]>) => {
            this._categoriesMenu = data.messages;
        })
    }

    private _addMetaTags(): void {
        //this._meta.updateTag({ name: 'description', content: 'Премиальные бритвенные изделия, натуральная косметика, средства по уходу за бородой, стайлинги от ведущих брендов, спешите купить по лучшим ценам в магазине «Дядя Бритва». Достойный выбор, акции и программа лояльности предусмотрены для всех.' });
        console.log('fffff');
    }

    private _getSettings(): void {
        this._mainService.getSettings().subscribe((data) => {
            this._settings = data.messages;
        })
    }

    private _getSocialItems(): void {
        this._mainService.getSocialItems().subscribe((data) => {
            this._socialItems = data.messages;
        })
    }

    private _getUser(): void {
        this._mainService.getUser().subscribe((data) => { })
    }

    get categories(): Category[] {
        return this._categories;
    }

    get settings(): Setting[] {
        return this._settings;
    }

    get socialItems() {
        return this._socialItems;
    }

    get categoriesMenu(): Category[] {
        return this._categoriesMenu;
    }

    ngOnDestroy() { }


}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainService } from './main.service';
import { ServerResponse, Setting, SocialItem, AllSettings } from '../../models/models';
import { Category } from './catalog/catalog.models';
import { Meta } from '@angular/platform-browser';
import { TranslateService1, MenuItemsService } from '../../services';

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

    constructor(private _mainService: MainService, 
        private _meta: Meta, 
        private _translateService: TranslateService1,
        private _menuItemsService:MenuItemsService) { }

    ngOnInit() {
        this._mainService.checkUserBasketPrice();
        this._getSettingsAll()
        this._getUser();
        this._addMetaTags();

    }
    private _getSettingsAll():void {
        this._mainService.getSettingsAll().subscribe((data:ServerResponse<AllSettings>) => {
            this._categories = data.messages.category;
            this._categoriesMenu = data.messages.menu;
            this._settings = data.messages.settings;        
            this._setSettingsLink(this._settings)
            this._socialItems = data.messages.socialNetworks;
        })
    }
    private _setSettingsLink(settings:any[]){
        let pageSettings: {label: string,label_ru:string,label_en:string, routerLink: string}[] = [];
        settings.forEach((element, index) => {
            if (element.isPage && element.isPage == '1') {
                pageSettings.push({ label: element.name, label_ru: element.name_ru, label_en: element.name_en, routerLink: '/settings/' + element.key })
            }
        })
        this._menuItemsService.setMenuItems(pageSettings);
    } 

    private _addMetaTags(): void {
        //this._meta.updateTag({ name: 'description', content: 'Премиальные бритвенные изделия, натуральная косметика, средства по уходу за бородой, стайлинги от ведущих брендов, спешите купить по лучшим ценам в магазине «Дядя Бритва». Достойный выбор, акции и программа лояльности предусмотрены для всех.' });
        console.log('fffff');
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
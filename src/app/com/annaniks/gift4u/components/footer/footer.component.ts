import { Component, OnInit, Input, Inject, ViewEncapsulation } from '@angular/core';
import { Category } from '../../views/main/catalog/catalog.models';
import { Setting, SocialItem } from '../../models/models';
import { AppService, MenuItemsService, TranslateService } from '../../services';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
    selector: 'app-footer',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.scss'],

})
export class FooterComponent implements OnInit {
    private _settings: Setting[] = [];
    private _phone_2:string=""
    private _socialItems: SocialItem[] = [];
    @Input('categories') private _categories: Category[] = [];
    @Input('settings')
    set settings($event) {
        this._settings = $event;
        this._setValues();
    }

    @Input('socialItems')
    set socialItems($event) {
        this._socialItems = $event;
    }
    private _address: string = '';
    private _phone: string = '';
    private _email: string = '';

    constructor(
        @Inject('FILE_URL') private _fileUrl: string,
        private _appService: AppService,
        private _menuItemsService: MenuItemsService,
        private _router: Router,
        private _translateService:TranslateService
    ) { }

    ngOnInit() { }
    public getAttributeName(obj,name: string) {
        return this._translateService.getRequestTranslateAttributeName(obj,name)
    }
    private _filterSettingValues(key: string): Setting {
        let setting: Setting = this._appService.checkPropertyValue(this._settings.filter((element) => element.key === key), 0);
        return setting;
    }

    private _setValues(): void {
        this._address = this._appService.checkPropertyValue(this._filterSettingValues('address'), 'value');
        this._phone = this._appService.checkPropertyValue(this._filterSettingValues('telephone_number'), 'value');
        this._phone_2 = this._appService.checkPropertyValue(this._filterSettingValues('telephone_number_1'), 'value');
        this._email = this._appService.checkPropertyValue(this._filterSettingValues('email'), 'value');
    }

    public onClickSocialItem(item): void {
        window.open(item.link)
    }

    public onClickMenuItem(item: MenuItem): void {
        window.scroll(0, 0);
        this._router.navigate([item.routerLink])
    }

    get categories(): Category[] {
        return this._categories;
    }

    get address(): string {
        return this._address;
    }

    get phone(): string {
        return this._phone;
    }

    get email(): string {
        return this._email;
    }

    get socialItems(): SocialItem[] {
        return this._socialItems;
    }

    get fileUrl(): string {
        return this._fileUrl;
    }

    get menuItems(): MenuItem[] {
        return this._menuItemsService.getMenuItems();
    }
    get phone_2(){
        return this._phone_2
    }

}
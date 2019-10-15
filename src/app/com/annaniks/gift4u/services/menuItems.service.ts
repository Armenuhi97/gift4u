import { Injectable } from '@angular/core';
import { MenuItem } from '../models/models';

const MENUITEMS: MenuItem[] = [
    // { label: 'О нас', routerLink: '##' },
    // { label: 'Доставка', routerLink: '##' },
    // { label: 'Оплата', routerLink: '##' },
    // { label: 'Новости', routerLink: '##' },
    // { label: 'Скидки', routerLink: '##' },
    // { label: 'Партнеры', routerLink: '##' },
    // { label: 'Контакты', routerLink: '/contacts' },
]

const CATALOGITEMS: MenuItem[] = [
    { label: 'Все для бритья', routerLink: '#' },
    { label: 'Уход за бородой и усами', routerLink: '#' },
    { label: 'Мужские аксессуары', routerLink: '#' },
    { label: 'Уход за волосами и стайлингом', routerLink: '#' },
    { label: 'Идеи подарков', routerLink: '#' },
    { label: 'Бренды', routerLink: '#' }
]

@Injectable()
export class MenuItemsService {
    private _menuItems: MenuItem[] = MENUITEMS;
    private _catalogItems: MenuItem[] = CATALOGITEMS;
    private _openMenu: boolean = true;

    public getMenuItems(): MenuItem[] {
        return this._menuItems;
    }

    public setMenuItems(menuItems: MenuItem[]) {
        this._menuItems = menuItems;
    }

    public getCatalogItems(): MenuItem[] {
        return this._catalogItems;
    }

    public openMenu(): void {
        this._openMenu = !this._openMenu;
        document.body.style.overflow = (this._openMenu) ? 'hidden' : 'auto';
    }
    public closeMenu() {
        this._openMenu = false;
        document.body.style.overflow = 'auto';
    }

    public getOpenMenu(): boolean {
        return this._openMenu;
    }

}
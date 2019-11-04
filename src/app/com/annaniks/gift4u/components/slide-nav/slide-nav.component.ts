import { Component, OnInit, Input, HostListener } from '@angular/core';
import { MenuItemsService, TranslateService } from '../../services';
import { Category } from '../../views/main/catalog/catalog.models';
import { MenuItem } from '../../models/models';
import { Router } from '@angular/router';
import { MainService } from '../../views/main/main.service';
import { LoginModal, RegistrationModal } from '../../modals';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-slide-nav',
    templateUrl: 'slide-nav.component.html',
    styleUrls: ['slide-nav.component.scss']
})
export class SlideNavComponent implements OnInit {
    @Input('slideNavItems') private _slideNavItems: Category[] = [];
    @Input('topbarItems') private _topbarItems = [];
    private _visiblity: boolean = true;
    private _activeTab: string = 'catalog';
    @HostListener('window:resize', ['$event'])
    private _checkWindowSize(): void {
        if (window.innerWidth > 920) {
            if (this._menuItemsService.getOpenMenu()) {
                this._menuItemsService.closeMenu();
            }
        } else {
            this._menuItemsService.closeMenu();
        }
    }

    constructor(
        private _menuItemsService: MenuItemsService,
        private _router: Router,
        private _mainService: MainService,
        private _matDialog: MatDialog,
        private _translateService:TranslateService) { }

    ngOnInit() {
        this._checkWindowSize();
    }
    public getAttributeName(obj,name: string) {
        return this._translateService.getRequestTranslateAttributeName(obj,name)
    }
    public onClickSettings(item: MenuItem) {
        this._router.navigate([item.routerLink]);
        this._menuItemsService.openMenu();
    }

    private _openLoginModal(): void {
        let matDialog = this._matDialog.open(LoginModal, {
            width: '371px',
            minHeight: '433px',
            maxHeight: '80vh'
        })
    }

    private _openRegistrationModal(): void {
        let matDialog = this._matDialog.open(RegistrationModal, {
            width: '679px',
            minHeight: '433px',
            maxHeight: '80vh'
        })
        matDialog.afterClosed().subscribe((data) => {
            if (data) {
                this._mainService.getUser();
            }
        })
    }

    public onClickPersonalArea(): void {
        if (this._mainService.isAuthorized()) {
            this._router.navigate(['/personal-area'])
        }
        else {
            this._openLoginModal();
        }
    }

    get userEmail(): string {
        return this._mainService.getUserInfo().email;
    }

    public onClickLogin(): void {
        this._openLoginModal();
        this._menuItemsService.openMenu();
    }

    public onClickRegister(): void {
        this._openRegistrationModal();
        this._menuItemsService.openMenu();
    }

    public onClickTabItem(tabname: string): void {
        this._activeTab = tabname;
    }

    get isAuthorized(): boolean {
        return this._mainService.isAuthorized();
    }

    get slideNavItems(): Category[] {
        return this._slideNavItems;
    }
    get language(){
        return this._translateService.getActiveLanguage()
    }
    get visiblity(): boolean {
        return this._visiblity;
    }

    get menuOpen(): boolean {
        return this._menuItemsService.getOpenMenu();
    }

    get topbarItems() {
        return this._topbarItems
    }

    get menuItems(): MenuItem[] {
        return this._menuItemsService.getMenuItems();
    }

    get activeTab(): string {
        return this._activeTab;
    }
}
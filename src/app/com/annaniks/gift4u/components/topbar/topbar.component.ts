import { Component, OnInit, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { MenuItemsService } from '../../services/menuItems.service';
import { MenuItem, Setting, ServerResponse, User, Product, ServerResponseWithCount } from '../../models/models';
import { MatDialog } from '@angular/material';
import { LoginModal, RegistrationModal, BackCallModal, SelectCityModal } from '../../modals';
import { MainService } from '../../views/main/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService, ApiService, TranslateService1 } from '../../services';
import { CookieService } from '../../services/cookie.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-topbar',
    templateUrl: 'topbar.component.html',
    styleUrls: ['topbar.component.scss']
})
export class TopbarComponent implements OnInit {
    @ViewChild("searchInput", { static: false }) searchEl: ElementRef;
    private _productsCount: number;
    private _phone_2: string = '';
    private _smallText: string
    private _settings: Setting[] = [];
    public active_lng;
    private _windowWidth: number;
    public color: string
    public languages = [
        {
            label: 'en',
            image: 'assets/images/en_flag.png',
            value: 'en'
        },
        {
            label: 'ru',
            image: 'assets/images/ru_flag.png',
            value: 'ru'
        },
        {
            label: 'arm',
            image: 'assets/images/arm_flag.png',
            value: 'arm'
        },

    ]
    @Input('settings')
    set settings($event) {
        this._settings = $event;
        this._setValues();
    }

    private _phone: string = '';
    private _workingTime: string = '';
    public search: string;
    private _similarProducts: string[] = [];
    private _isShowSimilarProducts: boolean = true;

    constructor(
        private _menuItemsService: MenuItemsService,
        private _matDialog: MatDialog,
        private _mainService: MainService,
        private _router: Router,
        private _appService: AppService,
        private _activatedRoute: ActivatedRoute,
        private _apiService: ApiService,
        private _translateService: TranslateService1,
        private _cookieService: CookieService,
        @Inject('FILE_URL') private _fileUrl: string,
        private _translate: TranslateService
    ) {
        this._checkQueryParams();
        this.active_lng = this._translate.currentLang;

        if (this._cookieService.get('color')) {
            document.documentElement.style
                .setProperty('--main-color', this._cookieService.get('color'));
            this.color = this._cookieService.get('color')
        } else {
            this.color = "#00001b";
        }

    }

    ngOnInit() { }
    public focusSearch(event) {
        if (event) {
            this._windowWidth = window.innerWidth
            if (this.searchEl && this.searchEl.nativeElement) {
                this.searchEl.nativeElement.style.width = (+this._windowWidth - 250) + 'px'
            }
        }

    }
    public change($event) {
        document.documentElement.style
            .setProperty('--main-color', $event);
        this._cookieService.set('color', $event)
    }
    public blurSearch(event) {
        if (event) {
            if (this.searchEl && this.searchEl.nativeElement) {
                this.searchEl.nativeElement.style.width = 0
            }
        }
    }
    public changeLanguage(lang_key: string) {
        window.location.reload();
        this._cookieService.set('language', lang_key);
        this._translate.use(lang_key);
    }
    public onClickMenuButton(): void {
        this._menuItemsService.openMenu();
    }
    public closeMenu(): void {
        this._menuItemsService.closeMenu()
    }
    public onClickButton(): void {
        this._openBackCallModal();
    }
    public setScroll() {
        let styles = {}
        if (window.innerHeight < 608) {
            styles['overflow-y'] = "scroll";
            styles['height'] = (window.innerHeight - 50) + 'px'
        }
        return styles
    }
    public getAttributeName(obj, name: string) {
        return this._translateService.getRequestTranslateAttributeName(obj, name)
    }
    public onClickLogin(): void {
        this._openLoginModal(false);
    }

    public onClickRegister(): void {
        this._openRegistrationModal();
    }

    // private _getAllSearchResult(search: string) {
    //     this._apiService.post('/query/product', { name: search }).subscribe((data: ServerResponse<Product[]>) => {
    //         this._productsCount = data.messages.length
    //     })
    // }
    private _openLoginModal(isRegistration: boolean): void {
        let matDialog = this._matDialog.open(LoginModal, {
            width: '371px',
            minHeight: '433px',
            maxHeight: '80vh',
            data: { isRegistr: isRegistration }
        })
    }

    private _checkQueryParams(): void {
        this._activatedRoute.queryParams.subscribe((params) => {
            if (params && params.search) {
                this.search = params.search;
            }
            else {
                this.search = '';
            }
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

    private _openBackCallModal(): void {
        let matDialog = this._matDialog.open(BackCallModal, {
            width: '371px',
            minHeight: '350px',
            maxHeight: '80vh'
        })
    }

    private _openCityModal(): void {
        let matDialog = this._matDialog.open(SelectCityModal, {
            width: '400px',
            height: '270px',
            data: {
                cityname: this._mainService.getUserInfo().cityCountriesName
            },
            panelClass: 'overflow_inherit'
        })
        matDialog.afterClosed().subscribe((data) => {
            if (data && data.city && data.city.name) {
                this._mainService.setUserCity(data.city.name);
            }
        })
    }

    private _setQueryParams(): void {
        this._router.navigate(['/search'], { queryParams: { search: this.search } })
    }

    private _setValues(): void {
        this._phone_2 = this._appService.checkPropertyValue(this._appService.checkPropertyValue(this._appService.filterArray(this._settings, 'key', 'telephone_number_1'), 0), 'value');
        this._smallText = this._appService.checkPropertyValue(this._appService.checkPropertyValue(this._appService.filterArray(this._settings, 'key', 'telephone_number_1'), 0), 'name');
        this._phone = this._appService.checkPropertyValue(this._appService.checkPropertyValue(this._appService.filterArray(this._settings, 'key', 'telephone_number'), 0), 'value');
        this._workingTime = this._appService.checkPropertyValue(this._appService.checkPropertyValue(this._appService.filterArray(this._settings, 'key', 'info'), 0), 'field');
    }

    public onClickPersonalArea(): void {

        if (this._mainService.isAuthorized()) {
            this._router.navigate(['/personal-area'])
        }
        else {
            this._openLoginModal(true);
        }
        this.closeMenu()
    }
    public onClickSearch(bool?: boolean): void {
        if (bool || (!bool && this.search && this.search.length > 0)) {
            this._similarProducts = [];
            this._setQueryParams();
        }
    }

    public onChange($event): void {
        this._mainService.getSimiliarProducts($event).subscribe((data: ServerResponseWithCount<string[]>) => {
            this._similarProducts = data.messages;
            this.closeMenu();
            this._productsCount = data.count;
        })
    }

    public onClickCity(): void {
        this._openCityModal();
    }

    public onKeyPress(e): void {
        if (e && e.keyCode == 13 || e.keyCode == '13') {
            this.onClickSearch();
        }
    }

    public onClickSimilarProducts(productName: string): void {
        this.search = productName;
        this.onClickSearch();
        this._similarProducts = [];
    }

    public onClickedOutside(): void {
        this._similarProducts = [];
    }
    get productsCount(): number {
        return this._productsCount
    }
    get isShowSimilarProducts(): boolean {
        return this._isShowSimilarProducts;
    }
    get menuItems(): MenuItem[] {
        return this._menuItemsService.getMenuItems();
    }

    get basketInfo(): User {
        return this._mainService.getUserInfo();
    }
    get basketCount() {
        if (localStorage.getItem('basket_products'))
            return JSON.parse(localStorage.getItem('basket_products')).length
    }
    get isAuthorized(): boolean {
        return this._mainService.isAuthorized();
    }
    get activeLanguage() {
        return this._translate.currentLang
    }
    get openMenu(): boolean {
        return this._menuItemsService.getOpenMenu();
    }
    get city(): string {
        if(!this._mainService.getUserInfo().cityCountriesName){
            this._mainService.getUserInfo().cityCountriesName =this._translateService.getTranslate('_gyumri')
        }
        return this._mainService.getUserInfo().cityCountriesName 
    }

    get phone(): string {
        return this._phone;
    }

    get workingTime(): string {
        return this._workingTime;
    }
    get language() {
        return this._translate.currentLang
    }
    get similarProducts(): string[] {
        return this._similarProducts;
    }

    get userEmail(): string {
        return this._mainService.getUserInfo().email;
    }

    get fileUrl(): string {
        return this._fileUrl;
    }
    get smallText(): string {
        return this._smallText
    }
    get phone_2(): string {
        return this._phone_2
    }


}
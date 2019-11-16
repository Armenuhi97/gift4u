import { Injectable, Inject } from '@angular/core';
import { ApiService, MenuItemsService, TranslateService1 } from '../../services';
import { Observable, of } from 'rxjs';
import { ServerResponse, CityCountry, Setting, User, SocialItem, Product, AllSettings } from '../../models/models';
import { Category, AttributeFilter, Brand, Reduction } from './catalog/catalog.models';
import { map } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
// import { CookieService } from 'angular2-cookie';

import { MatDialog } from '@angular/material';
import { AddProductBasketModal } from '../../modals/add-product-basket/add-product-basket.modal';
import { CookieService } from '../../services/cookie.service';

@Injectable()
export class MainService {
    private _user: User = new User();
    private _isAuthorized: boolean = false;

    constructor(
        private _apiService: ApiService,
        private _messageService: MessageService,
        private _cookieService: CookieService,
        private _menuItemsService: MenuItemsService,
        private _matDialog: MatDialog,
        private _translateService: TranslateService1
    ) { }

    public getCategories(): Observable<ServerResponse<Category[]>> {
        return this._apiService.get('/category');
    }

    public getCategoriesMenu(): Observable<ServerResponse<Category[]>> {
        return this._apiService.get('/category/menu')
    }

    public getCities(): Observable<ServerResponse<CityCountry[]>> {
        return this._apiService.get('/citycountry');
    }
    public getCountries(): Observable<ServerResponse<CityCountry[]>> {
        return this._apiService.get('/city');
    }
    public getUser(): Observable<User> {
        let accessToken = this._cookieService.get('accessToken');
        if (accessToken) {
            return this._apiService.get('/me', true).pipe(
                map((data: any) => {
                    this._user = data.data[0];
                    this.checkUserBasketPrice();
                    this._isAuthorized = true;
                    return this._user;
                })
            );
        }
        else {
            return of()
        }
    }

    public checkUserBasketPrice(): void {
        this._user['basketPrice'] = 0;
        let baskekProducts = localStorage.getItem('basket_products');
        if (baskekProducts) {
            let products: any[] = JSON.parse(baskekProducts)
            products.forEach((element) => {
                this._user['basketPrice'] += element.count * ((element && element.specificPrice) ? +element.specificPrice : +element.price_with_vat);
            })
        }
    }

    public changePassword(password: string, oldPassword: string): Observable<any> {
        return this._apiService.put('/password', {
            password: password,
            oldPassword: oldPassword
        }, true)
    }

    public addProductBasket(product): void {
        let productsItems = [];
        let products = localStorage.getItem('basket_products');
        if (products) {
            productsItems = JSON.parse(products);
        }
        productsItems.push(product);
        localStorage.setItem('basket_products', JSON.stringify(productsItems));
        this.checkUserBasketPrice();
        this._openAddProductBasketModal(product);
    }

    private _openAddProductBasketModal(product): void {
        let matDialog = this._matDialog.open(AddProductBasketModal, {
            width: '500px',
            minHeight: '300px',
            data: {
                product: product
            }
        })
        matDialog.afterClosed().subscribe((data) => {
            this._messageService.add({ severity: 'success', summary: this._translateService.getTranslate('_message'), detail: this._translateService.getTranslate('_added_product_success_message') })
        })
    }

    public getUserInfo(): User {
        return this._user;
    }

    public isAuthorized(): boolean {
        return this._isAuthorized;
    }

    public changeIsAuthorized(bool: boolean): void {
        this._isAuthorized = bool;
    }

    public backCall(body): Observable<ServerResponse<any>> {
        return this._apiService.post('/backcall', body)
    }

    public getSettings(): Observable<ServerResponse<Setting[]>> {
        return this._apiService.get('/settings').pipe(
            map((settings: ServerResponse<any[]>) => {
                let sett = settings.messages;
                let pageSettings: { label: string, label_ru: string, label_en: string, routerLink: string }[] = [];
                sett.forEach((element, index) => {
                    if (element.isPage && element.isPage == '1') {
                        pageSettings.push({ label: element.name, label_ru: element.name_ru, label_en: element.name_en, routerLink: '/settings/' + element.key })
                    }
                })
                this._menuItemsService.setMenuItems(pageSettings);
                return settings
            })
        )
    }

    public getSocialItems(): Observable<ServerResponse<SocialItem[]>> {
        return this._apiService.get('/socialnetworks')
    }

    public setUserCity(citycountryname: string): void {
        this._user.cityCountriesName = citycountryname;
    }

    public getAnnouncmentType(): Observable<any> {
        return this._apiService.get('/announcmenttype');
    }

    public setProductRating(starsCount: number, productId: string | number): Observable<ServerResponse<any>> {
        return this._apiService.post('/productscore', {
            scores: starsCount,
            productId: productId
        }, true)
    }

    public recoverPassword(email: string): Observable<any> {
        return this._apiService.put('/password/reset', {
            email: email
        })
    }

    public getSimiliarProducts(name: string): Observable<ServerResponse<string[]>> {
        return this._apiService.post('/query/product/like', {
            name: name
        })
    }
    public getProducts(categoryId: number, isParent: boolean = false, search: string = ''): Observable<ServerResponse<Product[]>> {
        return this._apiService.post(`/product/${categoryId}/${isParent}`, {
            name: search,
            isSearch: (search && search.length > 0) ? true : false
        });
    }

    public getCategoriesById(id: number): Observable<ServerResponse<Category[]>> {
        return this._apiService.get(`/category/${id}`);
    }


    public getAttributes(): Observable<ServerResponse<AttributeFilter[]>> {
        return this._apiService.get(`/attribut`);
    }

    public getBrands(): Observable<ServerResponse<Brand[]>> {
        return this._apiService.get(`/brand`);
    }
    public getSales(): Observable<ServerResponse<Reduction[]>> {
        return this._apiService.get(`/reduction`);
    }
    public getReview(productId: number) {
        return this._apiService.get(`/product-comment/${productId}`)
    }
    public addReview(commentBody) {
        return this._apiService.post('/productscomment', commentBody, true)
    }
    public addImage(formData: FormData) {
        return this._apiService.postFormData('/set/image', formData, true, 'response', 'text')
    }
    public getSettingsAll(): Observable<ServerResponse<AllSettings>> {
        return this._apiService.get('/settings/all')
    }

}
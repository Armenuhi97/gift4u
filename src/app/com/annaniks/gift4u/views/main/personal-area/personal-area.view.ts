import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonalAreaService } from './personal-area.service';
// import { CookieService } from 'angular2-cookie';
import { MainService } from '../main.service';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { CookieService } from '../../../services/cookie.service';
import { TranslateService1 } from '../../../services';


@Component({
    selector: 'personal-area-view',
    templateUrl: 'personal-area.view.html',
    styleUrls: ['personal-area.view.scss']
})
export class PersonalAreaView implements OnInit {
    private _activeTab: number = 0;
    private _personalAreaItems = [
        { label: this.translateWord('Personal account','Личный кабинет','Անձնական գրասենյակ'), link: 'user' },
        { label: this.translateWord('User account','Учетная запись','Հաշիվ'), link: 'account' },
        { label: this.translateWord('Delivery address','Адреса доставки','Առաքման հասցեները'), link: 'shipping-addresses' },
        { label:  this.translateWord('My bookmarks','Мои закладки','Նախընտրելիները'), link: 'my-bookmarks' },
        { label: this.translateWord('Order history','История заказов','Պատվերների պատմություն'), link: 'my-orders' },
        { label: this.translateWord('Bonus point','Бонусные баллы','Բոնուսային միավորներ'), link: 'bonus-points' },
        { label: this.translateWord('Payment history','История платежей','Վճարումների պատմություն'), link: 'payment-history' },
        { label:  this.translateWord('News subscription','Подписка на новости','Նորությունների բաժանորդագրություն'), link: 'newsletter-subscription' },
    ]

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _personalAreaService: PersonalAreaService,
        private _cookieService: CookieService,
        private _mainService: MainService,
        private _title: Title,
        private _matDialog: MatDialog,
        private _translateService:TranslateService1
    ) {
        this._getUser();
    }

    ngOnInit() {
    }
    public translateWord(key1:string,key2:string,key3:string){
        return this._translateService.translateImportant(key1,key2,key3)
    }
    public onClickLogOut(): void {
        this._cookieService.remove('accessToken');
        this._mainService.changeIsAuthorized(false);
        this._router.navigate(['/']);
    }

    private _getUser(): void {
        this._personalAreaService.getUser().subscribe((data) => { })
    }
    public scrollTo(body, id: string): void {
        if (body && body.expanded) {
            let scrollToId = document.getElementById(id);
            if (scrollToId) {
                setTimeout(() => {
                    scrollToId.scrollIntoView()
                }, 200)
            }
        }
    }
    public isActive(instruction: any[]): boolean {
        return this._router.isActive(this._router.createUrlTree(instruction), true);
    }

    public onClickItem(item): void {
        this._router.navigate([item.link], { relativeTo: this._activatedRoute });
    }

    get headerLabel(): string {
        return this._title.getTitle();
    }

    get personalAreaItems() {
        return this._personalAreaItems;
    }

    get activateTab(): number {
        return this._activeTab;
    }
    get language(){
        return this._translateService.getActiveLanguage()
    }
}
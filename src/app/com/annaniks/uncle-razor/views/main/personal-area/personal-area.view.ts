import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonalAreaService } from './personal-area.service';
// import { CookieService } from 'angular2-cookie';
import { MainService } from '../main.service';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { CookieService } from '../../../services/cookie.service';
import { window } from 'rxjs/operators';


@Component({
    selector: 'personal-area-view',
    templateUrl: 'personal-area.view.html',
    styleUrls: ['personal-area.view.scss']
})
export class PersonalAreaView implements OnInit {
    private _activeTab: number = 0;
    private _personalAreaItems = [
        { label: 'Личный кабинет', link: 'user' },
        { label: 'Учетная запись', link: 'account' },
        { label: 'Адреса доставки', link: 'shipping-addresses' },
        { label: 'Мои закладки', link: 'my-bookmarks' },
        { label: 'История заказов', link: 'my-orders' },
        { label: 'Бонусные баллы', link: 'bonus-points' },
        { label: 'История платежей', link: 'payment-history' },
        { label: 'Подписка на новости', link: 'newsletter-subscription' },
    ]

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _personalAreaService: PersonalAreaService,
        private _cookieService: CookieService,
        private _mainService: MainService,
        private _title: Title,
        private _matDialog: MatDialog
    ) {
        this._getUser();
    }

    ngOnInit() {
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
}
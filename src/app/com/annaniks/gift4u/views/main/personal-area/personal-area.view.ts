import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonalAreaService } from './personal-area.service';
// import { CookieService } from 'angular2-cookie';
import { MainService } from '../main.service';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { CookieService } from '../../../services/cookie.service';
import { TranslateService1 } from '../../../services';
import { PlatformService } from '../../../services/platform.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'personal-area-view',
    templateUrl: 'personal-area.view.html',
    styleUrls: ['personal-area.view.scss']
})
export class PersonalAreaView implements OnInit {
    private _activeTab: number = 0;
    private _personalAreaItems = [
        { label: this.translateWord('_personal_account'), link: 'user' },
        { label: this.translateWord('_user_account'), link: 'account' },
        { label: this.translateWord('_delivery_address'), link: 'shipping-addresses' },
        { label: this.translateWord('_my_bookmarks'), link: 'my-bookmarks' },
        { label: this.translateWord('_order_history'), link: 'my-orders' },
        { label: this.translateWord('_bonus_point'), link: 'bonus-points' },
        { label: this.translateWord('_payment_history'), link: 'payment-history' },
        { label: this.translateWord('_news_subscription'), link: 'newsletter-subscription' },
    ]

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _personalAreaService: PersonalAreaService,
        private _cookieService: CookieService,
        private _mainService: MainService,
        private _title: Title,
        private _matDialog: MatDialog,
        private _translateService: TranslateService1,
        private _platformService:PlatformService,
        private _translate:TranslateService
    ) {
        this._getUser();
    }

    ngOnInit() {
    }
    public translateWord(key: string):string {
        return this._translate.instant(key)
    }
    public onClickLogOut(): void {
        if (this._platformService.isBrowser) {
            this._cookieService.remove('accessToken');
            this._mainService.changeIsAuthorized(false);
            this._router.navigate(['/']);
        }
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
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { HomeService } from './home.service';
import { ServerResponse, ParfumeInfo, Product, SocialItem, AllSettings } from '../../../models/models';
import { Banner, Partner, Video } from './home.models';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import { LoadingService } from '../../../services/loading.service';
import { TranslateService } from '../../../services';
import { MainService } from '../main.service';

@Component({
    selector: 'home-view',
    templateUrl: 'home.view.html',
    styleUrls: ['home.view.scss']
})
export class HomeView implements OnInit, OnDestroy {
    private _subscription: Subscription = new Subscription();
    public banners: Banner[] = [];
    public partners: Partner[] = [];
    private _videos: Video[] = [];
    public magazinInfo: ParfumeInfo = {} as ParfumeInfo;
    public popularProducts: Product[] = [];
    public specialProducts: Product[] = [];
    public newProducts: Product[] = [];
    public socialNetworks: SocialItem[] = [];
    public emailFormControl = new FormControl(null, [Validators.required, Validators.email]);
    public isSubscribed: boolean = false;
    public imageKey: string = 'image';

    constructor(
        private _homeService: HomeService,
        @Inject('FILE_URL') public fileUrl: string,
        private _titleService: Title,
        private _loadingService: LoadingService,
        private _translateService: TranslateService,
        private _mainService:MainService
    ) { }

    ngOnInit() {
        this._checkWindowSize();
        this._titleService.setTitle('Gift4u');
        // this._titleService.setTitle('Интернет-магазин «Дядя Бритва» - эксклюзив для мужчин');
        this._getHomeData();
    }

    private _getHomeData(): void {
        this._getAllSettings()
    }
    private _getAllSettings():void {
        this._loadingService.showLoading();
        this._mainService.getSettingsAll().subscribe((data:ServerResponse<AllSettings>) => {
            this.banners = data.messages.banner;
            this.socialNetworks = data.messages.socialNetworks;
            this.specialProducts = data.messages.special;
            this.popularProducts = data.messages.popular;
            this.newProducts = data.messages.new;
            this.partners = data.messages.partners;
            this._videos = data.messages.productvideos;
            this._videos.forEach((element: Video, index: number) => {
                element.link = JSON.parse(element.link);
            })
            this.magazinInfo = data.messages.perfumes[0];
            this._loadingService.hideLoading();
        },
            () => {
                this._loadingService.hideLoading();
            })
    }
    public getTranslateWord(key1: string, key2: string, key3: string) {
        return this._translateService.translateImportant(key1, key2, key3)
    }
    private _checkWindowSize(): void {
        if (window.innerWidth <= 445) {
            this.imageKey = 'smallImage';
        }
    }

    private _getBanners(): Observable<void> {
        return this._homeService.getBanners().pipe(
            map((data: ServerResponse<Banner[]>) => {
                this.banners = data.messages;
            })
        )
    }

    private _getProductVideos(): Observable<void> {
        return this._homeService.getProductVideos().pipe(
            map((data: ServerResponse<Video[]>) => {
                this._videos = data.messages;
                this._videos.forEach((element: Video, index: number) => {
                    element.link = JSON.parse(element.link);
                })
            })
        )
    }

    private _getSocialItems(): Observable<void> {
        return this._homeService.getSocialItems().pipe((
            map((data: ServerResponse<SocialItem[]>) => {
                this.socialNetworks = data.messages;
            })
        ))
    }

    private _getPartners(): Observable<void> {
        return this._homeService.getPartners().pipe((
            map((data: ServerResponse<Partner[]>) => {
                this.partners = data.messages;
            })
        ))
    }

    private _getMagazineInfo(): Observable<void> {
        return this._homeService.getMagazineInfo().pipe(
            map((data: ServerResponse<ParfumeInfo[]>) => {
                this.magazinInfo = data.messages[0];
            })
        )
    }

    private _getProducts(status: string, type: string): Observable<void> {
        return this._homeService.getProductsByStatus(status).pipe((
            map((data: ServerResponse<Product[]>) => {
                switch (type) {
                    case 'popular':
                        this.popularProducts = data.messages;
                        break;
                    case 'new':
                        this.newProducts = data.messages;
                        break;
                    case 'special':
                        this.specialProducts = data.messages;
                        break;
                }
            })
        ))
    }

    private _subscribeEmail(email: string): void {
        this._homeService.subscribeEmail({ email: email }).subscribe((data) => {
            this.isSubscribed = true;
        })
    }

    public onClickSocialItems(item): void {
        window.open(item.link);
    }

    public onClickSubscribe(): void {
        if (this.emailFormControl.valid) {
            this._subscribeEmail(this.emailFormControl.value);
        }
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { PersonalAreaService } from '../personal-area.service';
import { ServerResponse } from '../../../../models/models';
import { OrderHistory, Order } from '../personal-area.models';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LoadingService } from '../../../../services/loading.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateService1 } from '../../../../services';


@Component({
    selector: 'my-orders-view',
    templateUrl: 'my-orders.view.html',
    styleUrls: ['my-orders.view.scss'],
    animations: [
        trigger('rowExpansionTrigger', [
            state('void', style({
                transform: 'translateX(-10%)',
                opacity: 0
            })),
            state('active', style({
                transform: 'translateX(0)',
                opacity: 1
            })),
            transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class MyOrdersView implements OnInit, OnDestroy {
    public isGet: boolean = false
    private _subscription = new Subscription();
    // private _orderHistory: OrderHistory = {} as OrderHistory;
    private _orderHistory: Order[] = []

    constructor(
        @Inject('FILE_URL') private _fileUrl: string,
        private _personalAreaService: PersonalAreaService,
        private _loadingService: LoadingService,
        private _title: Title,
        private _activatedRoute: ActivatedRoute,
        private _translateService: TranslateService1
    ) {
        this._title.setTitle(this.translateWord('Order history', 'История заказов', 'Պատվերների պատմություն'));
    }

    ngOnInit() {
        this._getOrders();
    }
    public translateWord(key1: string, key2: string, key3: string) {
        return this._translateService.translateImportant(key1, key2, key3)
    }
    private _getOrders(): void {
        this._loadingService.showLoading();
        this._subscription = this._personalAreaService.getUserOrders().subscribe((data: ServerResponse<OrderHistory>) => {
            this._orderHistory = data.messages.order;            
            this.isGet = true
            this._loadingService.hideLoading();
        },
            () => {
                this._loadingService.hideLoading()
            })
    }

    get orderHistory(): Order[] {
        return this._orderHistory;
    }

    get fileUrl(): string {
        return this._fileUrl;
    }
    get language() {
        return this._translateService.getActiveLanguage()
    }
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
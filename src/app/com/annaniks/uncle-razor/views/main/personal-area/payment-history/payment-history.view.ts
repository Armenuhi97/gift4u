import { Component, OnInit } from "@angular/core";
import { PaymentHistoryService } from "./payment-history.service";
import { PaymentHistory, ServerResponse } from "../../../../models/models";
import { LoadingService } from "../../../../services/loading.service";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'payment-history-view',
    templateUrl: 'payment-history.view.html',
    styleUrls: ['payment-history.view.scss']
})
export class PaymentHistoryView implements OnInit {
    public paymentHistory: PaymentHistory[] = [];
    public isGet: boolean = false
    constructor(private _paymentHistoryService: PaymentHistoryService,
        private _loadingService: LoadingService,
        private _title: Title,
        private _activatedRoute: ActivatedRoute) {
        this._title.setTitle(this._activatedRoute.data['_value'].title);
    }
    ngOnInit() {
        this._getPaymentHistory()
    }
    private _getPaymentHistory() {
        this._loadingService.showLoading()
        this._paymentHistoryService.getHistory().subscribe((data: ServerResponse<PaymentHistory[]>) => {
            this.paymentHistory = data.messages;
            this._changeParamsValue();
            this.isGet = true
            this._loadingService.hideLoading()
        },
            () => {
                this._loadingService.hideLoading()
            })
    }
    private _changeParamsValue() {
        for (let history of this.paymentHistory) {
            //  history.date = this._datePipe.transform(history.date, 'dd.MM.yyyy');
            history.bonus = history.bonus == null ? '-' : history.bonus;
            switch (history.isCash) {
                case 0: {
                    history.cashTitle = "Оплатить сейчас";
                    break
                }
                case 1: {
                    history.cashTitle = "При получении";
                    break
                }
                case 2: {
                    history.cashTitle = "Бонус";
                    break
                }
                case 3: {
                    history.cashTitle = "Баланс";
                    break
                }
                case 4: {
                    history.cashTitle = "Почта России НАЛОЖЕННЫЙ ПЛАТЕЖ 4,5%";
                    break
                }
                case 5: {
                    history.cashTitle = "ТК «СДЭК» НАЛОЖЕННЫЙ ПЛАТЕЖ 3%";
                    break
                }
            }
        }
    }
}
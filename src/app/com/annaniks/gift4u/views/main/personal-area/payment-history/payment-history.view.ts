import { Component, OnInit } from "@angular/core";
import { PaymentHistoryService } from "./payment-history.service";
import { PaymentHistory, ServerResponse } from "../../../../models/models";
import { LoadingService } from "../../../../services/loading.service";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { TranslateService1 } from "../../../../services";
import { TranslateService } from "@ngx-translate/core";

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
        private _activatedRoute: ActivatedRoute,
        private _translateService:TranslateService1,
        private _translate:TranslateService) {
        this._title.setTitle(this.getTranslateWord('_payment_history'));
    }
    ngOnInit() {
        this._getPaymentHistory()
    }

    public getTranslateWord(key: string):string {
        return this._translate.instant(key)
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
    public translateWord(word:string){
        return this._translateService.getTranslate(word)
    }
    private _changeParamsValue() {
        for (let history of this.paymentHistory) {
            history.bonus = history.bonus == null ? '-' : history.bonus;
            switch (history.isCash) {
                case 0: {
                    history.cashTitle = this.getTranslateWord('_pay_now');
                    break
                }
                case 1: {
                    history.cashTitle = this.getTranslateWord('_upon_receipt') ;
                    break
                }
                case 2: {
                    history.cashTitle =this.getTranslateWord('_bonuse') ;
                    break
                }
                case 3: {
                    history.cashTitle =this.getTranslateWord('_balance');
                    break
                }            
            }
        }
    }

}
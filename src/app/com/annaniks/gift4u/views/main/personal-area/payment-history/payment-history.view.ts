import { Component, OnInit } from "@angular/core";
import { PaymentHistoryService } from "./payment-history.service";
import { PaymentHistory, ServerResponse } from "../../../../models/models";
import { LoadingService } from "../../../../services/loading.service";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { TranslateService1 } from "../../../../services";

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
        private _translateService:TranslateService1) {
        this._title.setTitle(this._translateService.translateImportant('Payment history','История платежей','Վճարումների պատմություն'));
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
    public translateWord(word:string){
        return this._translateService.getTranslate(word)
    }
    private _changeParamsValue() {
        for (let history of this.paymentHistory) {
            history.bonus = history.bonus == null ? '-' : history.bonus;
            switch (history.isCash) {
                case 0: {
                    history.cashTitle = this._translateService.translateImportant('Pay now', 'Оплатить сейчас', 'Վճարել հիմա');
                    break
                }
                case 1: {
                    history.cashTitle = this._translateService.translateImportant('Upon receipt', 'При получении', 'Ստանալիս');
                    break
                }
                case 2: {
                    history.cashTitle =this._translateService.translateImportant('Bonus', "Бонус", 'Բոնուս') ;
                    break
                }
                case 3: {
                    history.cashTitle =this._translateService.translateImportant('Balance', "Баланс", 'Բալանս') ;
                    break
                }
                // case 4: {
                //     history.cashTitle = "Почта России НАЛОЖЕННЫЙ ПЛАТЕЖ 4,5%";
                //     break
                // }
                // case 5: {
                //     history.cashTitle = "ТК «СДЭК» НАЛОЖЕННЫЙ ПЛАТЕЖ 3%";
                //     break
                // }
            }
        }
    }
    get language(){
        return this._translateService.getActiveLanguage()
    }
}
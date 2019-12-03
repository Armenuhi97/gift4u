import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DiscountService } from './discount.service';
import { AppService, TranslateService1 } from '../../../services';
import { Announcement, ServerResponse } from '../../../models/models';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'discount-view',
    templateUrl: 'discount.view.html',
    styleUrls: ['discount.view.scss']
})
export class DiscountView implements OnInit, OnDestroy {
    private _discountInfo: Announcement[] = [];

    constructor(
        @Inject('FILE_URL') private _fileUrl: string,
        private _discountService: DiscountService,
        private _appService: AppService,
        private _title: Title,
        private _translateservice:TranslateService1,
        private _translate:TranslateService
    ) { }


    ngOnInit() {
        this._title.setTitle(this.translateWord('_discounts'));
        this._getAnnouncmentType();
    }
    public  translateWord(key:string){
        return this._translate.instant(key)
    }
    private _getAnnouncmentType(): void {
        this._discountService.getAnnouncmentType().subscribe((data) => {
            let id = this._appService.checkPropertyValue(this._appService.checkPropertyValue(this._appService.filterArray(data.messages, 'name', 'Скидки'), 0), 'id');
            this._getDiscountInfo(id);

        })
    }

    private _getDiscountInfo(id: number): void {
        this._discountService.getDiscountInfo(id).subscribe((data: ServerResponse<Announcement[]>) => {
            this._discountInfo = data.messages;
        })
    }


    get fileUrl(): string {
        return this._fileUrl;
    }

    get discountInfo(): Announcement[] {
        return this._discountInfo;
    }

    ngOnDestroy() { }
}
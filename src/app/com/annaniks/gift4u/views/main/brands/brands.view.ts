import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { BrandsService } from './brands.service';
import { ServerResponse } from '../../../models/models';
import { Brand } from './brands.models';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { LoadingService } from '../../../services/loading.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'brands-veiw',
    templateUrl: 'brands.view.html',
    styleUrls: ['brands.view.scss']
})
export class BrandsView implements OnInit, OnDestroy {
    private _subscription: Subscription = new Subscription();
    private _brands: Brand[] = [];
    private _routeSteps = [];

    constructor(
        @Inject('FILE_URL') private _fileUrl: string,
        private _brandsService: BrandsService,
        private _title: Title,
        private _loadingService:LoadingService,
        private _translate:TranslateService
    ) { }

    ngOnInit() {
        this._setRouteSteps();
        this._getBrands();
    }
    public translateWord(key:string){
       return this._translate.instant(key)
    }
    private _getBrands(): void {
        this._loadingService.showLoading()
        this._brandsService.getBrands().subscribe((data: ServerResponse<Brand[]>) => {
            this._brands = data.messages;
            this._loadingService.hideLoading()
        })
    }

    private _setRouteSteps(): void {
        this._title.setTitle(this.translateWord('brands'));
        this._routeSteps.push(
            { label:this.translateWord('_main'), url: '/', queryParams: {}, status: '' },
            { label: this.translateWord('brands'), url: '/brands', queryParams: {}, status: '' }
        )
    }

    get brands(): Brand[] {
        return this._brands;
    }

    get fileUrl(): string {
        return this._fileUrl;
    }

    get routeSteps() {
        return this._routeSteps;
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
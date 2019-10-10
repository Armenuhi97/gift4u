import { Injectable } from '@angular/core';
import { ApiService } from '../../../services';
import { Observable } from 'rxjs';
import { ServerResponse } from '../../../models/models';
import { ShippingPrice, CarrierType, PromoCode } from './basket.models';

@Injectable()
export class BasketService {

    constructor(private _apiSerivce: ApiService) { }

    public getCarriers(): Observable<ServerResponse<CarrierType[]>> {
        return this._apiSerivce.get('/carrier');
    }

    public makeOrder(body, isAuthorized: boolean): Observable<any> {
        return this._apiSerivce.post('/order', body, isAuthorized);
    }

    public checkVerifyPayment(orderId: string): Observable<any> {
        return this._apiSerivce.get(`/order/${orderId}`)
    }

    public checkPromoCode(promocode: string): Observable<ServerResponse<PromoCode>> {
        return this._apiSerivce.get(`/cartrule/${promocode}`)
    }

    public checkShippingPrice(cityId: number, currerId: number): Observable<ServerResponse<ShippingPrice>> {
        return this._apiSerivce.get(`/checkshippingprice/${cityId}/${currerId}`)
    }
    public getAddress() {
        return this._apiSerivce.get('/me/address', true)
    }
    public getAllAddresses() {
        return this._apiSerivce.get('/address', true)
    }
}
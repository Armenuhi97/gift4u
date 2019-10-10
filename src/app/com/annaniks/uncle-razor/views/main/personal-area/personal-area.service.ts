import { Injectable } from '@angular/core';
import { ApiService } from '../../../services';
import { Observable } from 'rxjs';
import { ServerResponse } from '../../../models/models';

@Injectable()
export class PersonalAreaService {

    constructor(private _apiService: ApiService) { }

    public getUser(): Observable<ServerResponse<any>> {
        return this._apiService.get('/me', true)
    }

    public getUserOrders(): Observable<ServerResponse<any>> {
        return this._apiService.get('/user/order', true);
    }

    public changeUser(body): Observable<ServerResponse<any>> {
        return this._apiService.put('', body, true);
    }

    public activateGiftCertificate(code: string): Observable<ServerResponse<any>> {
        return this._apiService.get(`/giftcertificate/${code}`,true)
    }
}
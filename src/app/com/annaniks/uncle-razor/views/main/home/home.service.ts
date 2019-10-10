import { Injectable } from '@angular/core';
import { ApiService } from '../../../services';
import { Observable } from 'rxjs';
import { ServerResponse, ParfumeInfo, Product, SocialItem } from '../../../models/models';
import { Banner, Partner } from './home.models';

@Injectable()
export class HomeService {

    constructor(private _apiService: ApiService) { }

    public getBanners(): Observable<ServerResponse<Banner[]>> {
        return this._apiService.get('/banner');
    }

    public getProductVideos(): Observable<ServerResponse<any>> {
        return this._apiService.get('/productvideos');
    }

    public getPartners(): Observable<ServerResponse<Partner[]>> {
        return this._apiService.get('/partners');
    }

    public getMagazineInfo(): Observable<ServerResponse<ParfumeInfo[]>> {
        return this._apiService.get('/perfumes');
    }

    public getProductsByStatus(status: string): Observable<ServerResponse<Product[]>> {
        return this._apiService.post('/status/product', {
            status: status
        })
    }

    public getSocialItems(): Observable<ServerResponse<SocialItem[]>> {
        return this._apiService.get('/socialnetworks')
    }

    public subscribeEmail(body): Observable<ServerResponse<any>> {
        return this._apiService.post('/subscriber', body)
    }
}
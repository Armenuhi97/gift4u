import { Injectable } from '@angular/core';
import { ApiService } from '../../../services';
import { ServerResponse } from '../../../models/models';
import { Observable } from 'rxjs';
import { Brand } from './brands.models';

@Injectable()
export class BrandsService {

    constructor(private _apiService: ApiService) { }

    public getBrands(): Observable<ServerResponse<Brand[]>> {
        return this._apiService.get('/brand');
    }

    public getBrandById(id: number, page: number, count: number, max, min) {
        return this._apiService.get(`/brand/${id}/${page}/${count}/${max}/${min}`)
    }
}
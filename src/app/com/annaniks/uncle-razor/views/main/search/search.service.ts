import { Injectable } from '@angular/core';
import { ApiService } from '../../../services';
import { Observable } from 'rxjs';
import { ServerResponse, Product } from '../../../models/models';

@Injectable()
export class SearchService {

    constructor(private _apiService: ApiService) { }

    public searchProduct(search: string): Observable<ServerResponse<Product[]>> {
        return this._apiService.post('/query/product', { name: search })
    }
}
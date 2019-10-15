import { Injectable } from '@angular/core';
import { ApiService } from '../../../services';
import { Observable } from 'rxjs';
import { ServerResponse, Product, ProductFull, CityCountry } from '../../../models/models';
import { Category, Brand, AttributeFilter } from './catalog.models';


@Injectable()
export class CatalogService {

    constructor(private _apiService: ApiService) { }

    public getCategories(): Observable<ServerResponse<Category[]>> {
        return this._apiService.get('/category');
    }

    public getProducts(categoryId: number, isParent: boolean = false, search: string = ''): Observable<ServerResponse<Product[]>> {
        return this._apiService.post(`/product/${categoryId}/${isParent}`, {
            name: search,
            isSearch: (search && search.length > 0) ? true : false
        });
    }

    public getProductById(id: number): Observable<ServerResponse<ProductFull>> {
        return this._apiService.get(`/current/product/${id}`);
    }

    public getCategoriesById(id: number): Observable<ServerResponse<Category[]>> {
        return this._apiService.get(`/category/${id}`);
    }

    public getCities(): Observable<ServerResponse<CityCountry[]>> {
        return this._apiService.get(`/city`);
    }

    public getAttributes(): Observable<ServerResponse<AttributeFilter[]>> {
        return this._apiService.get(`/attribut`);
    }

    public getBrands(): Observable<ServerResponse<Brand[]>> {
        return this._apiService.get(`/brand`);
    }
    public filterCategory(body) {
        return this._apiService.post('/query/product/search', body)
    }
}
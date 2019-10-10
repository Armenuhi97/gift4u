import { Injectable } from "@angular/core";
import { ApiService } from "../../../../services";

@Injectable()
export class ProductDetailsService {
    constructor(private _apiService: ApiService) { }
    /**
     * 
     * @param id 
     */
    public getFavoriteBookmark(id: number) {
        return this._apiService.get(`/favorite/bookmark/${id}`,true)
    }
    /**
     * 
     * @param id 
     */
    public deleteBookmark(id: number) {
        return this._apiService.delete(`/bookmark/${id}`, true)
    }
    public addBookmark(id:number) {
        return this._apiService.post('/bookmark', {productId:id}, true)
    }
}
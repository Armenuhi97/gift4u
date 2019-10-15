import { Injectable } from "@angular/core";
import { ApiService } from "../../../../services";

@Injectable()
export class MyBookmarksService{
    constructor(private _apiService:ApiService){}
    public getBookmarks(){
        return this._apiService.get('/bookmark',true)
    }

}
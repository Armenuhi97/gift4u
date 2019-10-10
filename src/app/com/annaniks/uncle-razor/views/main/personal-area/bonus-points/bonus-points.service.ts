import { ApiService } from "../../../../services";
import { Injectable } from "@angular/core";

@Injectable()
export class BonusPointsServices{
    constructor(private _apiService:ApiService){}
    public getBonusPoints(){
        return this._apiService.get('/bonus',true)
    }
}
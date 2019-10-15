import { Injectable } from "@angular/core";
import { ApiService } from "../../../../services";

@Injectable()
export class PaymentHistoryService{
    constructor(private _apiService:ApiService){}
    public getHistory(){
        return this._apiService.get('/history',true)
    }
}
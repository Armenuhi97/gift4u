import { Injectable } from "@angular/core";
import { ApiService } from "../../../../services";

@Injectable()
export class NewsletterSubscriptionService{
    constructor(private _apiService:ApiService){}
}
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { NewsletterSubscriptionService } from "./newsletter-subscription.service";

@Component({
    selector:'newsletter-subscription-view',
    templateUrl:'newsletter-subscription.view.html',
    styleUrls:['newsletter-subscription.view.scss']
})
export class NewsletterSubscriptionView{
    constructor(private _activatedRoute:ActivatedRoute,
        private _title: Title,
        private _newsletterSubscriptionService:NewsletterSubscriptionService){
        this._title.setTitle(this._activatedRoute.data['_value'].title);

    }
}
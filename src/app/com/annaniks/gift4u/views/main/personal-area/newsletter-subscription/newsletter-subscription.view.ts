import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { NewsletterSubscriptionService } from "./newsletter-subscription.service";
import { TranslateService1 } from "../../../../services";

@Component({
    selector:'newsletter-subscription-view',
    templateUrl:'newsletter-subscription.view.html',
    styleUrls:['newsletter-subscription.view.scss']
})
export class NewsletterSubscriptionView{
    constructor(private _activatedRoute:ActivatedRoute,
        private _title: Title,
        private _newsletterSubscriptionService:NewsletterSubscriptionService,
        private _translateService:TranslateService1){
        this._title.setTitle(this._translateService.getTranslate(this._activatedRoute.data['_value'].title));

    }
}
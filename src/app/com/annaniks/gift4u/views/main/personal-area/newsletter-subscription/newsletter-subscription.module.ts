import { NgModule } from "@angular/core";
import { SharedModule } from "../../../../shared/shared.module";
import { NewsletterSubscriptionView } from "./newsletter-subscription.view";
import { NewsletterSubscriptionRoutingModule } from "./newsletter-subscription.routing.module";
import { NewsletterSubscriptionService } from "./newsletter-subscription.service";

@NgModule({
    declarations: [NewsletterSubscriptionView],
    imports: [SharedModule, NewsletterSubscriptionRoutingModule],
    exports:[NewsletterSubscriptionView],
    providers:[NewsletterSubscriptionService]
})
export class NewsletterSubscriptionModule {

}
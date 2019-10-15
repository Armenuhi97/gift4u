import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewsletterSubscriptionView } from "./newsletter-subscription.view";
let newsletterSubscriptionRoutes:Routes=[{path:'',component:NewsletterSubscriptionView}]
@NgModule({
    imports:[RouterModule.forChild(newsletterSubscriptionRoutes)],
    exports:[RouterModule]
})
export class NewsletterSubscriptionRoutingModule{

}
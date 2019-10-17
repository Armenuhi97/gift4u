import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { PersonalAreaView } from "./personal-area.view";
import { transcode } from "buffer";
import { translate } from "../../../translate-params/translate";

let personalAreaRoutes: Routes = [
    {
        path: '', component: PersonalAreaView, children: [
            { path: '', redirectTo: 'user', pathMatch: 'full' },
            { path: 'user', data: { title: translate('_personal_account') }, loadChildren: () => import('src/app/com/annaniks/gift4u/views/main/personal-area/user-info/user-info.module').then(m => m.UserInfoModule) },
            { path: 'my-orders', data: { title: translate('_order_history') }, loadChildren: () => import('src/app/com/annaniks/gift4u/views/main/personal-area/my-orders/my-orders.module').then(m => m.MyOrdersModule) },
            { path: 'account', data: { title: translate('_user_account') }, loadChildren: () => import('src/app/com/annaniks/gift4u/views/main/personal-area/account/account.module').then(m => m.AccountModule) },
            { path: 'shipping-addresses', data: { title: translate('_delivery_address') }, loadChildren: () => import('src/app/com/annaniks/gift4u/views/main/personal-area/shipping-addresses/shipping-addresses.module').then(m => m.ShippingAddressesModule) },
            { path: 'bonus-points', data: { title: translate('_bonus_point') }, loadChildren: () => import('src/app/com/annaniks/gift4u/views/main/personal-area/bonus-points/bonus-points.module').then(m => m.BonusPointsModule) },
            { path: 'payment-history', data: { title: translate('_payment_history') }, loadChildren: () => import('src/app/com/annaniks/gift4u/views/main/personal-area/payment-history/payment-history.module').then(m => m.PaymentHistoryModule) },
            { path: 'my-bookmarks', data: { title: translate('_my_bookmarks') }, loadChildren: () => import('src/app/com/annaniks/gift4u/views/main/personal-area/my-bookmarks/my-bookmarks.module').then(m => m.MyBookmarksModule) },
            { path: 'newsletter-subscription', data: { title: translate('_news_subscription') }, loadChildren: () => import('src/app/com/annaniks/gift4u/views/main/personal-area/newsletter-subscription/newsletter-subscription.module').then(m => m.NewsletterSubscriptionModule) }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(personalAreaRoutes)],
    exports: [RouterModule]
})
export class PersonalAreaRoutingModule { }
import { NgModule } from '@angular/core';
import { PersonalAreaView } from './personal-area.view';
import { PersonalAreaRoutingModule } from './personal-area.routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { PersonalAreaService } from './personal-area.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { CollapsibleModule } from 'angular2-collapsible';
import { UserInfoModule } from './user-info/user-info.module';
import { AccountModule } from './account/account.module';
import { BonusPointsModule } from './bonus-points/bonus-points.module';
import { MyBookmarksModule } from './my-bookmarks/my-bookmarks.module';
import { PaymentHistoryModule } from './payment-history/payment-history.module';
import { MyOrdersModule } from './my-orders/my-orders.module';
import { ShippingAddressesModule } from './shipping-addresses/shipping-addresses.module';
import { NewsletterSubscriptionModule } from './newsletter-subscription/newsletter-subscription.module';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
    declarations: [PersonalAreaView],
    imports: [
        PersonalAreaRoutingModule,
        UserInfoModule,
        AccountModule,
        BonusPointsModule,
        MyBookmarksModule,
        MyOrdersModule,
        PaymentHistoryModule,
        ShippingAddressesModule,
        NewsletterSubscriptionModule,
        CollapsibleModule,
        SharedModule,
        ReactiveFormsModule,
        MatDialogModule,
        TranslateModule
    ],
    providers: [PersonalAreaService],
    entryComponents: [],
    exports: []
})
export class PersonalAreaModule { }
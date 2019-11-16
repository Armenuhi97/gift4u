import { NgModule } from '@angular/core';
import { DiscountView } from './discount.view';
import { DiscountRoutingModule } from './discount.routing.module';
import { DiscountService } from './discount.service';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [DiscountView],
    imports: [DiscountRoutingModule,TranslateModule,SharedModule],
    providers: [DiscountService]
})
export class DiscountModule { }
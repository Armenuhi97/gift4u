import { NgModule } from '@angular/core';
import { DiscountView } from './discount.view';
import { DiscountRoutingModule } from './discount.routing.module';
import { DiscountService } from './discount.service';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    declarations: [DiscountView],
    imports: [DiscountRoutingModule,SharedModule],
    providers: [DiscountService]
})
export class DiscountModule { }
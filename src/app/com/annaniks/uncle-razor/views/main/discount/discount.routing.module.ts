import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscountView } from './discount.view';

let discountRoutes: Routes = [
    { path: '', component: DiscountView }
]

@NgModule({
    imports: [RouterModule.forChild(discountRoutes)],
    exports: [RouterModule]
})
export class DiscountRoutingModule { }
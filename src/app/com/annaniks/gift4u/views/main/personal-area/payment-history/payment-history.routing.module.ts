import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PaymentHistoryView } from "./payment-history.view";
let paymentHistoryRoutes: Routes = [{ path: '', component: PaymentHistoryView }]
@NgModule({
    imports: [RouterModule.forChild(paymentHistoryRoutes)],
    exports: [RouterModule]
})
export class PaymentHistoryRoutingModule {

}
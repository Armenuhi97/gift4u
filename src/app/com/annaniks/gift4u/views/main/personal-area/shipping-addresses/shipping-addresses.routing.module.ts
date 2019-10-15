import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShippingAddressesView } from "./shipping-addresses.view";
let shippingAddressRoutes: Routes = [{ path: '', component: ShippingAddressesView }]
@NgModule({
    imports: [RouterModule.forChild(shippingAddressRoutes)],
    exports: [RouterModule]
})
export class ShippingAddressesRoutingModule { }
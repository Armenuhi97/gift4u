import { NgModule } from "@angular/core";
import { ShippingAddressesView } from "./shipping-addresses.view";
import { ShippingAddressesRoutingModule } from "./shipping-addresses.routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material";
import { SharedModule } from "../../../../shared/shared.module";
import { ShippingAddressesServices } from "./shipping-addresses.service";
import { AddAddressModal } from "../../../../modals/add-address/add-address.modal";

@NgModule({
    declarations: [ShippingAddressesView, AddAddressModal],
    entryComponents:[AddAddressModal],
    imports: [
        ShippingAddressesRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        MatDialogModule
    ],
    providers: [ShippingAddressesServices],
    exports:[ShippingAddressesView]

})
export class ShippingAddressesModule { }
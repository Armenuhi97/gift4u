import { NgModule } from "@angular/core";
import { PaymentHistoryView } from "./payment-history.view";
import { PaymentHistoryRoutingModule } from "./payment-history.routing.module";
import { SharedModule } from "../../../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material";
import { PaymentHistoryService } from "./payment-history.service";
import { DatePipe } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations: [PaymentHistoryView],
    imports: [
        PaymentHistoryRoutingModule,
        TranslateModule,
        SharedModule,
        MatDialogModule,
        ReactiveFormsModule
    ],
    providers: [PaymentHistoryService, DatePipe],
    exports: [PaymentHistoryView]
})
export class PaymentHistoryModule {

}
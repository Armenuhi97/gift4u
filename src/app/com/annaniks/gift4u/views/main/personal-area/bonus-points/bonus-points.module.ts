import { NgModule } from "@angular/core";
import { BonusPointsView } from "./bonus-points.view";
import { BonusPointesRoutingModule } from "./bonus-points.routing.module";
import { SharedModule } from "../../../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material";
import { BonusPointsServices } from "./bonus-points.service";
import { DatePipe } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations: [BonusPointsView],
    imports: [
        BonusPointesRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        MatDialogModule,
        TranslateModule
    ],
    providers: [BonusPointsServices, DatePipe],
    exports: [BonusPointsView]
})
export class BonusPointsModule { }
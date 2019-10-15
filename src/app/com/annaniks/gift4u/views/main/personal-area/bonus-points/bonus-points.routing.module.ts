import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BonusPointsView } from "./bonus-points.view";
let bonusPointsRoutes: Routes = [{ path: '', component: BonusPointsView }]
@NgModule({
    imports: [RouterModule.forChild(bonusPointsRoutes)],
    exports: [RouterModule]
})
export class BonusPointesRoutingModule {

}
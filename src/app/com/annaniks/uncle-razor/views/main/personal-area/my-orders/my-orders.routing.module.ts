import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyOrdersView } from './my-orders.view';

let myOrdersRoutes: Routes = [
    { path: '', component: MyOrdersView }
]

@NgModule({
    imports: [RouterModule.forChild(myOrdersRoutes)],
    exports: [RouterModule]
})
export class MyOrdersRoutingModule { }
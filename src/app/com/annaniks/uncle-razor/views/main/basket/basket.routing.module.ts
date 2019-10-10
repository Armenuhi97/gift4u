import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketView } from './basket.view';

let basketRoutes: Routes = [
    { path: '', component: BasketView }
]

@NgModule({
    imports: [RouterModule.forChild(basketRoutes)],
    exports: [RouterModule]
})
export class BasketRoutingModule { }
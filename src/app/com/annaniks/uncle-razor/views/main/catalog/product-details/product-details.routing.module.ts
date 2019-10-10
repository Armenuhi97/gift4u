import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsView } from './product-details.view';

let productDetailsRoutes: Routes = [
    { path: '', component: ProductDetailsView }
]

@NgModule({
    imports: [RouterModule.forChild(productDetailsRoutes)],
    exports: [RouterModule]
})
export class ProductDetailsRoutingModule { }
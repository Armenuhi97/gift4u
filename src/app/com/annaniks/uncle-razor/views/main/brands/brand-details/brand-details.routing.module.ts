import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandDetailsView } from './brand-details.view';

let brandDetailsRoutes: Routes = [
    { path: '', component: BrandDetailsView }
]

@NgModule({
    imports: [RouterModule.forChild(brandDetailsRoutes)],
    exports: [RouterModule]
})
export class BrandDetailsRoutingModule { }
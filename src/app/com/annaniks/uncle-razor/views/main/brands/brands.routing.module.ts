import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandsView } from './brands.view';

let brandRoutes: Routes = [
    { path: '', component: BrandsView },
    { path: ':id', loadChildren: () => import('src/app/com/annaniks/uncle-razor/views/main/brands/brand-details/brand-details.module').then(m => m.BrandDetailsModule) }
]
@NgModule({
    imports: [RouterModule.forChild(brandRoutes)],
    exports: [RouterModule]
})
export class BrandsRoutingModule { }
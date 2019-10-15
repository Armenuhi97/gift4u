import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogView } from './catalog.view';

let catalogRoutes: Routes = [
    { path: '', component: CatalogView },
    { path: ':id', loadChildren: () => import('src/app/com/annaniks/gift4u/views/main/catalog/product-details/product-details.module').then(m => m.ProductDetailsModule) }
]
@NgModule({
    imports: [RouterModule.forChild(catalogRoutes)],
    exports: [RouterModule]
})
export class CatalogRoutingModule { }
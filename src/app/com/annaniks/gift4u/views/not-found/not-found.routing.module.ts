import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundView } from './not-found.view';

let notFoundRoutes: Routes = [
    { path: '', component: NotFoundView }
]

@NgModule({
    imports: [RouterModule.forChild(notFoundRoutes)],
    exports: [RouterModule]
})
export class NotFoundRoutingModule { }
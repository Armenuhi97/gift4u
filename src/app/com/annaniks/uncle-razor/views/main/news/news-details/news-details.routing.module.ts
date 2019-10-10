import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsDetailsView } from './news-details.view';

let settingDetailsRoutes: Routes = [
    { path: '', component: NewsDetailsView }
]

@NgModule({
    imports: [RouterModule.forChild(settingDetailsRoutes)],
    exports: [RouterModule]
})
export class NewsDetailsRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ReviewsView } from './reviews.view';

let reviewsRoutes:Routes = [
    { path: '',component:ReviewsView }
]

@NgModule({
    imports:[RouterModule.forChild(reviewsRoutes)],
    exports:[RouterModule]
})
export class ReviewsRoutingModule{}
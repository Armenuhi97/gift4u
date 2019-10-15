import { NgModule } from '@angular/core';
import { ReviewsView } from './reviews.view';
import { ReviewsRoutingModule } from './reviews.routing.module';

@NgModule({
    declarations:[ReviewsView],
    imports:[ReviewsRoutingModule],
    providers:[]
})
export class ReviewsModule{}
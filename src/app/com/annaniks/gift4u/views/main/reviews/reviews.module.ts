import { NgModule } from '@angular/core';
import { ReviewsView } from './reviews.view';
import { ReviewsRoutingModule } from './reviews.routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations:[ReviewsView],
    imports:[ReviewsRoutingModule,TranslateModule],
    providers:[]
})
export class ReviewsModule{}
import { NgModule } from '@angular/core';
import { NewsDetailsRoutingModule } from './news-details.routing.module';
import { NewsDetailsView } from './news-details.view';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
    declarations: [NewsDetailsView],
    imports: [
        NewsDetailsRoutingModule,
        SharedModule
    ],
    providers: [],
    exports: []
})
export class NewsDetailsModule { }
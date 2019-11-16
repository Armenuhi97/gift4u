import { NgModule } from '@angular/core';
import { NewsDetailsRoutingModule } from './news-details.routing.module';
import { NewsDetailsView } from './news-details.view';
import { SharedModule } from '../../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [NewsDetailsView],
    imports: [
        NewsDetailsRoutingModule,
        SharedModule,
        TranslateModule
    ],
    providers: [],
    exports: []
})
export class NewsDetailsModule { }
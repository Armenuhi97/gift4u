import { NgModule } from '@angular/core';
import { NewsView } from './news.view';
import { NewsRoutingModule } from './news.routing.module';
import { NewsService } from './news.service';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [NewsView],
    imports: [NewsRoutingModule,TranslateModule,SharedModule],
    providers: [NewsService]
})
export class NewsModule { }
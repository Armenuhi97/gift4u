import { NgModule } from '@angular/core';
import { NewsView } from './news.view';
import { NewsRoutingModule } from './news.routing.module';
import { NewsService } from './news.service';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    declarations: [NewsView],
    imports: [NewsRoutingModule,SharedModule],
    providers: [NewsService]
})
export class NewsModule { }
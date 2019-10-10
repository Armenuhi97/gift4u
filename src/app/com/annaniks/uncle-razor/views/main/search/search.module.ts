import { NgModule } from '@angular/core';
import { SearchView } from './search.view';
import { SearchRoutingModule } from './search.routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { SearchService } from './search.service';

@NgModule({
    declarations: [SearchView],
    imports: [SearchRoutingModule, SharedModule],
    providers: [SearchService]
})
export class SearchModule { }
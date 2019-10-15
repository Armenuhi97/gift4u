import { NgModule } from '@angular/core';
import { NotFoundView } from './not-found.view';
import { NotFoundRoutingModule } from './not-found.routing.module';

@NgModule({
    declarations: [NotFoundView],
    imports: [NotFoundRoutingModule],
    providers: [],
})
export class NotFoundModule { }
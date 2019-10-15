import { NgModule } from '@angular/core';
import { BrandDetailsView } from './brand-details.view';
import { SharedModule } from '../../../../shared/shared.module';
import { BrandDetailsRoutingModule } from './brand-details.routing.module';
import { BrandDetailsService } from './brand-details.service';

@NgModule({
    declarations: [BrandDetailsView],
    imports: [SharedModule, BrandDetailsRoutingModule],
    providers: [BrandDetailsService],
    exports: []
})
export class BrandDetailsModule { }
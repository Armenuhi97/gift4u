import { NgModule } from '@angular/core';
import { BrandsView } from './brands.view';
import { BrandsRoutingModule } from './brands.routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { BrandsService } from './brands.service';

@NgModule({
    declarations: [BrandsView],
    imports: [BrandsRoutingModule, SharedModule],
    providers: [BrandsService]
})
export class BrandsModule { }
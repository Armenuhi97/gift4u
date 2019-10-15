import { NgModule } from '@angular/core';
import { CatalogRoutingModule } from './catalog.routing.module';
import { CatalogView } from './catalog.view';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CatalogService } from './catalog.service';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    declarations: [
        CatalogView,
    ],
    imports: [
        CatalogRoutingModule,
        CommonModule,
        DropdownModule,
        SharedModule,     
    ],
    providers: [CatalogService]
})
export class CatalogModule { }
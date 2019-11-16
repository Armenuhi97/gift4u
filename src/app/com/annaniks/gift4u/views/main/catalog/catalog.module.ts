import { NgModule } from '@angular/core';
import { CatalogRoutingModule } from './catalog.routing.module';
import { CatalogView } from './catalog.view';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CatalogService } from './catalog.service';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        CatalogView,
    ],
    imports: [
        CatalogRoutingModule,
        CommonModule,
        DropdownModule,
        SharedModule,     
        TranslateModule
    ],
    providers: [CatalogService]
})
export class CatalogModule { }
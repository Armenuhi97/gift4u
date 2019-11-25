import { NgModule } from '@angular/core';
import { BasketView } from './basket.view';
import { BasketRoutingModule } from './basket.routing.module';
import { BasketService } from './basket.service';
import { SharedModule } from '../../../shared/shared.module';
import { BastketListComponent, BasketListItemComponent } from '../../../components';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/primeng';
import {CalendarModule} from 'primeng/calendar';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@NgModule({
    declarations: [
        BasketView,
        BastketListComponent,
        BasketListItemComponent
    ],
    imports: [
        BasketRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        DropdownModule,
        CalendarModule,
        TranslateModule
    ],
    providers: [BasketService,DatePipe]
})
export class BasketModule { }
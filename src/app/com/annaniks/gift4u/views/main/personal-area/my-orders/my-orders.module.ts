import { NgModule } from '@angular/core';
import { MyOrdersView } from './my-orders.view';
import { MyOrdersRoutingModule } from './my-orders.routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { MyOrdersTableComponent } from '../../../../components';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    declarations: [
        MyOrdersView,
        MyOrdersTableComponent,
    ],
    imports: [
        MyOrdersRoutingModule,
        SharedModule,
        TranslateModule
    ],
    providers: [],
    exports:[MyOrdersView]
})
export class MyOrdersModule { }
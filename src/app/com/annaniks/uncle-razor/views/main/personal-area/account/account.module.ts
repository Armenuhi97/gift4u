import { NgModule } from '@angular/core';
import { AccountView } from './account.view';
import { AccountRoutingModule } from './account.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/primeng';
import { SharedModule } from '../../../../shared/shared.module';
import { DatePipe } from '@angular/common';
import { ChangePasswordComponent } from '../../../../components';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
@NgModule({
    declarations: [
        AccountView,
        ChangePasswordComponent
    ],
    imports: [
        AccountRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        DropdownModule,
        SharedModule,
        MatCheckboxModule,
        MatRadioModule
    ],
    providers: [DatePipe],
    exports:[AccountView]
})
export class AccountModule { }
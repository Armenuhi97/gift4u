import { NgModule } from '@angular/core';
import { UserInfoRoutingModule } from './user-info.routing.module';
import { UserInfoView } from './user-info.view';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material';
@NgModule({
    declarations: [
        UserInfoView,
    ],
    imports: [
        UserInfoRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        MatDialogModule
    ],
    providers: [DatePipe],
    exports:[UserInfoView]

})
export class UserInfoModule { }
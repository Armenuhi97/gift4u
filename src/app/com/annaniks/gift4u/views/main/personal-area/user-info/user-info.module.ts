import { NgModule } from '@angular/core';
import { UserInfoRoutingModule } from './user-info.routing.module';
import { UserInfoView } from './user-info.view';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
    declarations: [
        UserInfoView,
    ],
    imports: [
        UserInfoRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        MatDialogModule,
        TranslateModule
    ],
    providers: [DatePipe],
    exports:[UserInfoView]

})
export class UserInfoModule { }
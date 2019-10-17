import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInfoView } from './user-info.view';
import { translate } from '../../../../translate-params/translate';

let userInfoRoutes: Routes = [
    { path: '', component: UserInfoView, data: { title: translate('_personal_account') } }
]

@NgModule({
    imports: [RouterModule.forChild(userInfoRoutes)],
    exports: [RouterModule]
})
export class UserInfoRoutingModule { }
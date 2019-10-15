import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountView } from './account.view';

let accountRoutes: Routes = [
    { path: '', component: AccountView }
]

@NgModule({
    imports: [RouterModule.forChild(accountRoutes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
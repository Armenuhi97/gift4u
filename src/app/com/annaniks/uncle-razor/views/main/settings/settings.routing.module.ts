import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsView } from './settings.view';

let settingsRoutes: Routes = [
    { path: '', component: SettingsView },
]

@NgModule({
    imports: [RouterModule.forChild(settingsRoutes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }
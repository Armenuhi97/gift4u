import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsView } from './settings.view';

let settingsRoutes: Routes = [
    { path: '', component: SettingsView },
    { path: ':id', loadChildren: () => import('src/app/com/annaniks/gift4u/views/main/news/news-details/news-details.module').then(m => m.NewsDetailsModule) }
]

@NgModule({
    imports: [RouterModule.forChild(settingsRoutes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }
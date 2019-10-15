import { NgModule } from '@angular/core';
import { HomeView } from './home.view';
import { RouterModule, Routes } from '@angular/router';

let homeRoutes:Routes = [
    { path: '',component:HomeView }
]

@NgModule({
    imports:[RouterModule.forChild(homeRoutes)],
    exports:[RouterModule]
})
export class HomeRoutingModule{}
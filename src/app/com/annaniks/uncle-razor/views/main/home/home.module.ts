import { NgModule } from '@angular/core';
import { HomeView } from './home.view';
import { HomeRoutingModule } from './home.routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { HomeService } from './home.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [HomeView],
    imports: [
        HomeRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ],
    providers: [HomeService]
})
export class HomeModule { }
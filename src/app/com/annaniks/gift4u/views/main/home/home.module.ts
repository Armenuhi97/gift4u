import { NgModule } from '@angular/core';
import { HomeView } from './home.view';
import { HomeRoutingModule } from './home.routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { HomeService } from './home.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    declarations: [HomeView],
    imports: [
        HomeRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        TranslateModule
    ],
    providers: [HomeService]
})
export class HomeModule { }
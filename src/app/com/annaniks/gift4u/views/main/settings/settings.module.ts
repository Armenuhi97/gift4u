import { NgModule } from '@angular/core';
import { SettingsRoutingModule } from './settings.routing.module';
import { SettingsView } from './settings.view';
import { SettingsService } from './settings.service';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [SettingsView],
    imports: [
        SettingsRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        TranslateModule
    ],
    providers: [SettingsService]
})
export class SettingsModule { }
import { NgModule } from '@angular/core';
import { ContactsView } from './contacts.view';
import { ContactsRoutingModule } from './contacts.routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations:[ContactsView],
    imports:[ContactsRoutingModule,TranslateModule],
    providers:[]
})
export class ContactsModule{}
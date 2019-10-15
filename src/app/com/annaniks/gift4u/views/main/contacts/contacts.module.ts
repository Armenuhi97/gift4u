import { NgModule } from '@angular/core';
import { ContactsView } from './contacts.view';
import { ContactsRoutingModule } from './contacts.routing.module';

@NgModule({
    declarations:[ContactsView],
    imports:[ContactsRoutingModule],
    providers:[]
})
export class ContactsModule{}
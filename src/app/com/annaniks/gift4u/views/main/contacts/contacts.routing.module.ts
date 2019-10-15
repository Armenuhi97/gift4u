import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ContactsView } from './contacts.view';

let contactsRoutes:Routes = [
    { path: '',component:ContactsView }
]

@NgModule({
    imports:[RouterModule.forChild(contactsRoutes)],
    exports:[RouterModule]
})
export class ContactsRoutingModule{}
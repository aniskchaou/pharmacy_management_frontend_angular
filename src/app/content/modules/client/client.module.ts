import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewClientComponent } from './components/view-client/view-client.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { ClientComponent } from './components/client/client.component';
import { EditBuyComponent } from '../buy/components/edit-buy/edit-buy.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalClientComponent } from './components/modal-client/modal-client.component';
import { ClientListComponent } from './components/client-list/client-list.component';

@NgModule({
  declarations: [
    ClientListComponent,
    ViewClientComponent,
    AddClientComponent,
    ClientComponent,
    EditClientComponent,
    ModalClientComponent,
  ],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class ClientModule {}

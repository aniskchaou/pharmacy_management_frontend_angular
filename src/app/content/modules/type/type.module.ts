import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeComponent } from './components/type/type.component';
import { AddTypeComponent } from './components/add-type/add-type.component';
import { EditTypeComponent } from './components/edit-type/edit-type.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalTypeComponent } from './components/modal-type/modal-type.component';
import { TypeListComponent } from './components/type-list/type-list.component';

@NgModule({
  declarations: [
    TypeListComponent,
    ModalTypeComponent,
    TypeComponent,
    AddTypeComponent,
    EditTypeComponent,
  ],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class TypeModule {}

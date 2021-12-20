import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddConstructorComponent } from './components/add-constructor/add-constructor.component';
import { EditConstructorComponent } from './components/edit-constructor/edit-constructor.component';
import { CustructorComponent } from './components/custructor/custructor.component';
import { ViewConstructorComponent } from './components/view-constructor/view-constructor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalConstructorComponent } from './components/modal-constructor/modal-constructor.component';
import { HttpClientModule } from '@angular/common/http';
import { ConstractorListComponent } from './components/constractor-list/constractor-list.component';

@NgModule({
  declarations: [
    ModalConstructorComponent,
    AddConstructorComponent,
    EditConstructorComponent,
    CustructorComponent,
    ViewConstructorComponent,
    ConstractorListComponent,
  ],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
})
export class ConstructorModule {}

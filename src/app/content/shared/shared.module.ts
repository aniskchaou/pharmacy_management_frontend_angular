import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddButtonComponent } from './add-button/add-button.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoadingComponent } from './loading/loading.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AddButtonComponent, LoadingComponent, DashboardComponent],
  imports: [CommonModule],
})
export class SharedModule {}

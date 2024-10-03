import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { SharedModule } from '../shared/shared.module';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzListModule } from 'ng-zorro-antd/list';


@NgModule({
  declarations: [
    EmployeeComponent,
    AddEditEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    NzDrawerModule,
    FormsModule,
    NzModalModule,
    NzCalendarModule,
    NzListModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[]
})
export class EmployeeModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'employee-list',
    pathMatch:'full'
  },
  {
    path:'employee-list',
    component: EmployeeComponent
  },
  {
    path:'add-employee',
    component:AddEditEmployeeComponent
  },
  {
    path:'edit-employee/:id',
    component:AddEditEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }

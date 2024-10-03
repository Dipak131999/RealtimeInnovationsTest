import { Component, ChangeDetectorRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { addDays, getNextMonday, getNextTuesday } from './date-utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.scss']
})
export class AddEditEmployeeComponent {


  employeeForm: FormGroup;
  isFormSubmitted = false;
  visible = false;
  selectedRole: string | null = null;

  isToDateVisible = false;
  isFromDateVisible = false;
  selectedFromDate = new Date();
  selectedToDate = new Date();

  constructor(private cdr: ChangeDetectorRef, private formBuilder: FormBuilder, private employeeService: EmployeeService, private router: Router,private activatedRout:ActivatedRoute) {

  }

  ngOnInit(): void {

    if(this.activatedRout.snapshot.params['id']){
      this.employeeService.headerTitle.next('Edit Employee Details');
      this.getEmployeeDetails();
    } else{
      this.employeeService.headerTitle.next('Add Employee Details');
    }

    this.initForm();
  }

  initForm() {
    this.employeeForm = this.formBuilder.group({
      emmployeeName: ['', [Validators.required]],
      empRole: ['', [Validators.required]],
      fromDate: ['', [Validators.required]],
      toDate: ['']
    });
  }

  get f() {
    return this.employeeForm.controls;
  }

  async getEmployeeDetails(){
    let emplList = await this.employeeService.getDataFromIndexedDB() as any[];
    let emplDetails = emplList.find((x:any)=>x.id === this.activatedRout.snapshot.params['id']);

    this.employeeForm.controls['emmployeeName'].setValue(emplDetails.name);
    this.employeeForm.controls['empRole'].setValue(emplDetails.role);
    this.employeeForm.controls['fromDate'].setValue(emplDetails.fromDate);
    this.employeeForm.controls['toDate'].setValue(emplDetails.toDate);

    this.selectedFromDate = new Date(emplDetails.fromDate);
    this.selectedToDate = emplDetails.toDate || new Date(emplDetails.toDate);
  }

  openDrawer(): void {
    this.visible = true;
  }


  closeDrawer(): void {
    this.visible = false;
  }


  selectRole(role: string): void {
    this.employeeForm.controls['empRole'].setValue(role);
    this.closeDrawer();
  }


  handleOk(): void {
    console.log('Selected Date:', this.selectedFromDate);
    this.employeeForm.controls['fromDate'].setValue(this.selectedFromDate);
    this.isFromDateVisible = false;
  }

  handleToDateOk(): void {
    console.log('Selected Date:', this.selectedToDate);
    this.employeeForm.controls['toDate'].setValue(this.selectedToDate);
    this.isToDateVisible = false;
  }

  handleCancel(): void {
    this.isFromDateVisible = false;
  }

  handleToDateCancel(): void {
    this.isToDateVisible = false;
  }

  selectToday(): void {
    this.selectedFromDate = new Date();
  }

  selectToDateToday(): void {
    this.selectedToDate = new Date();
  }

  removeToDate(): void {
    this.selectedToDate = new Date();
    this.employeeForm.controls['toDate'].setValue('');
    this.isToDateVisible = false;
  }

  selectNextMonday(): void {
    this.selectedFromDate = getNextMonday(new Date());
  }

  selectNextTuesday(): void {
    this.selectedFromDate = getNextTuesday(new Date());
  }

  selectAfterOneWeek(): void {
    this.selectedFromDate = addDays(new Date(), 7);
  }

  prevMonth(): void {
    console.log('Previous Month');
    const currentMonth = this.selectedFromDate.getMonth();
    this.selectedFromDate.setMonth(currentMonth - 1);

    if (this.selectedFromDate.getMonth() === currentMonth - 1) {
      this.selectedFromDate.setFullYear(this.selectedFromDate.getFullYear());
    }
    setTimeout(() => {
      this.selectedFromDate = new Date(this.selectedFromDate);
    });
  }

  nextMonth(): void {
    console.log('Next Month');
    const currentMonth = this.selectedFromDate.getMonth();
    this.selectedFromDate.setMonth(currentMonth + 1);
    if (this.selectedFromDate.getMonth() === currentMonth + 1) {
      this.selectedFromDate.setFullYear(this.selectedFromDate.getFullYear());
    }
    setTimeout(() => {
      this.selectedFromDate = new Date(this.selectedFromDate);
    });
  }

  disableBeforeFromDate = (current: Date): boolean => {
    return this.employeeForm.value.fromDate ? current < this.employeeForm.value.fromDate : false;
  };

  async onSubmit() {

    this.isFormSubmitted = true;


    if (this.employeeForm.invalid) {
      return;
    }

    const employeeData = {
      id: this.activatedRout.snapshot.params['id'] ? this.activatedRout.snapshot.params['id']:this.generateUniqueId(),
      name: this.employeeForm.value.emmployeeName,
      role: this.employeeForm.value.empRole,
      fromDate: this.employeeForm.value.fromDate,
      toDate: this.employeeForm.value.toDate
    };

    let empList: any[] = await this.employeeService.getDataFromIndexedDB() as any[];

    let empDataIndex:any = empList.findIndex((x:any)=>x.id === this.activatedRout.snapshot.params['id']);

    if(empDataIndex || empDataIndex==0){
      empList[empDataIndex] = employeeData;
    }

    if (!empList) {
      empList = [];
    } else {
      if(!empDataIndex){
        empList.push(employeeData);
      }
    }

    this.employeeService.setDataInIndexedDB(empList).then((res: any) => {
      this.employeeService.toastNotification(empDataIndex ? 'Employee Updated Successfully':'Employee Added Successfully');
      this.employeeForm.reset();
      this.isFormSubmitted = false;
      this.goToEmployeeList();
    });

  }

  generateUniqueId(): string {
    const now = new Date();
    const formattedDate = now.toISOString().replace(/[-:.]/g, '').substring(0, 14);
    return `EMP-${formattedDate}`;
  }

  goToEmployeeList() {
    this.router.navigate(['/employee-list']);
  }

}

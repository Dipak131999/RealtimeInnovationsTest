import { Component, HostListener, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CdkDragMove, CdkDragRelease } from '@angular/cdk/drag-drop';
import { EmployeeService } from '../services/employee.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  swipeStartX = 0;
  translateX: string[] = [];
  swipedIndex: number | null = null;
  swipeEmpId:any='';
  isMobile = false;
  currentEmployeeList: any = [];
  previousEmployeeList: any = [];

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private employeeService: EmployeeService,
  ) {
    this.items.forEach(() => this.translateX.push('translateX(0px)'));
    this.isMobile = window.innerWidth < 768;
  }

  ngOnInit(): void {
    this.employeeService.headerTitle.next('Employee List');
    this.getEmployeeList();
  }

  onAddEmployee(empId?:any) {
    if(empId){
      this.router.navigate(['/edit-employee/'+empId]);
      return;
    }
    this.router.navigate(['/add-employee']);
    this.employeeService.toastNotification('success');
  }

  async getEmployeeList() {

    let empList: any[] = await this.employeeService.getDataFromIndexedDB() as any[];

    this.currentEmployeeList = empList.filter((x:any)=>{
      return !x.toDate;
    });

    console.log(this.currentEmployeeList)

    this.previousEmployeeList = empList.filter((x:any)=>{
      return x.toDate;
    })

    console.log(this.previousEmployeeList)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth < 768;
  }

  startSwipe(event: TouchEvent, index: number) {
    this.swipeStartX = event.touches[0].clientX;
    if (this.swipeEmpId === index) {
      this.translateX[index] = 'translateX(0px)';
      this.swipeEmpId = null;
      return;
    }

    if (this.swipeEmpId !== null && this.swipeEmpId !== index) {
      this.translateX[this.swipeEmpId] = 'translateX(0px)';
    }
    this.swipeEmpId = null;
  }

  onSwipe(event: TouchEvent, index: number) {
    const swipeDistance = event.touches[0].clientX - this.swipeStartX;

    if (swipeDistance < 0) {
      const swipeAmount = Math.max(swipeDistance, -100);
      this.translateX[index] = `translateX(${swipeAmount}px)`;
    }
  }

  endSwipe(index: number) {
    const currentTranslation = parseInt(this.translateX[index].replace('translateX(', '').replace('px)', ''), 10);

    if (currentTranslation <= -50) {
      this.swipeEmpId = index;
    } else {
      this.translateX[index] = 'translateX(0px)';
    }
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
    this.translateX.splice(index, 1);
    this.swipeEmpId = null;
  }

  async deleteEmployee(empId: number) {
    let empList: any[] = await this.employeeService.getDataFromIndexedDB() as any[];

    let rowIndex = empList.findIndex((x)=>{
      return x.id === empId;
    });

    empList.splice(rowIndex, 1);
    await this.employeeService.setDataInIndexedDB(empList);
    this.employeeService.toastNotification('Employee deleted Successfully');
    this.getEmployeeList();

  }


}

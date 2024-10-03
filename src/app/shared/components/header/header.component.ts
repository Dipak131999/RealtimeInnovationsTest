import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  headerTitle: any = '';

  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.employeeService.headerTitle.subscribe((title: string) => {
      this.headerTitle = title;
    });
  }
}

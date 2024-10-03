import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    NzPageHeaderModule,
    NzIconModule,
    NzInputModule,
    NzSelectModule
  ],
  exports:[
    HeaderComponent,
    NzIconModule,
    NzInputModule,
    NzSelectModule
  ]
})
export class SharedModule { }

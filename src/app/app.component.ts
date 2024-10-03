import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  //Swipe Delete Code :  https://github.com/leifermendez/swipe-angular-list?tab=readme-ov-file

  title = 'mydemo';

  // Custom button actions
  setToday(picker: any) {
    picker.select(new Date());
  }

  setNextMonday(picker: any) {
    const date = new Date();
    const day = date.getDay();
    const nextMonday = new Date(date);
    nextMonday.setDate(date.getDate() + (1 + 7 - day) % 7);
    picker.select(nextMonday);
  }
}

import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.services';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  addTransaction(data) {
    this.appService.addTransaction(data).subscribe((response: any) => {
      if (response.error || !response.result) {
        return alert(response.message);
      }
      alert(response.message);
    }, error => {
      console.error(error);
    });
  }
}

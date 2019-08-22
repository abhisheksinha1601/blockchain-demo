import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name: string;
  username: string;
  password: string;

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      return this.router.navigate(['/home']);
    }
  }

  signup() {
    this.appService.signup({ name: this.name, username: this.username, password: this.password }).subscribe((response: any) => {
      if (response.error || !response.result) {
        return alert(response.message);
      }
      alert(response.message)
      return this.router.navigate(['/login']);
    }, error => {
      console.error(error);
    });
  }
}

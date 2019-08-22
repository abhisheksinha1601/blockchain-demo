import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      return this.router.navigate(['/home']);
    }
  }

  login() {
    this.appService.login({ username: this.username, password: this.password }).subscribe((response: any) => {
      if (response.error || !response.result) {
        return alert(response.message);
      }
      localStorage.setItem("token", response.result);
      return this.router.navigate(['/home']);
    }, error => {
      console.error(error);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/service/alertify.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService: AuthService, private alerifyService: AlertifyService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm) {
    const token = this.authService.authUser(loginForm.value);
    console.log(token);
    if(token) {
      localStorage.setItem('token', token.username)
      this.alerifyService.success("Login Successful");
      this.router.navigate(['/']);
    } else {
      this.alerifyService.error("User id or Password is wrong");
    }
  }
}

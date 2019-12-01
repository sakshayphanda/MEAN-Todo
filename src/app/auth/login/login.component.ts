import { LoginService } from './../../services/login.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  password = '';
  email = '';
  constructor(private http: HttpClient,
    private loginService: LoginService) { }

  ngOnInit() {
  }

  signIn() {
    this.http.post('http://localhost:3000/api/user/login', {
      email: this.email,
      password: this.password
    }).subscribe(
      response => {
        console.log(response);
        this.loginService.token = response['token'];
        localStorage.setItem('token',response['token']);
      }
    );


  }
}

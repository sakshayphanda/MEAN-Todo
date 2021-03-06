import { LoginService } from './../../services/login.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

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
    this.http.post(environment.baseApiUrl + 'user/login', {
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

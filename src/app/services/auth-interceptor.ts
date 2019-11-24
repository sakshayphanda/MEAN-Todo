import { LoginService } from './login.service';
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.loginService.token;
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', token ? token : localStorage.getItem('token') ? localStorage.getItem('token') : 'abc')
        });
        return next.handle(authRequest);
    }
}

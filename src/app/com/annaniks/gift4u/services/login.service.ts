import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/models';

@Injectable()
export class LoginService {

    constructor(private _apiService: ApiService) { }

    public userLogin(body): Observable<LoginResponse> {
        return this._apiService.post('/login', body)
    }

    public registerUser(body): Observable<LoginResponse> {
        return this._apiService.post('/register', body)
    }

}
import { Injectable } from '@angular/core';
import { ApiService } from '../../../services';
import { ServerResponse } from '../../../models/models';
import { Observable } from 'rxjs';

@Injectable()
export class SettingsService {

    constructor(private _apiService: ApiService) { }

    public sendFeedback(body: { phone: string, email: string, message: string, name: string }): Observable<ServerResponse<any>> {
        return this._apiService.post('/feedback', body);
    }
}
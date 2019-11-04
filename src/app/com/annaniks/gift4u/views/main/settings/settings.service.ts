import { Injectable } from '@angular/core';
import { ApiService } from '../../../services';
import { ServerResponse, AnnouncementType, Announcement } from '../../../models/models';
import { Observable } from 'rxjs';

@Injectable()
export class SettingsService {

    constructor(private _apiService: ApiService) { }

    public sendFeedback(body: { phone: string, email: string, message: string, name: string }): Observable<ServerResponse<any>> {
        return this._apiService.post('/feedback', body);
    }
    public getAnnouncmentType(): Observable<ServerResponse<AnnouncementType[]>> {
        return this._apiService.get('/announcmenttype');
    }

    public getNews(id: number): Observable<ServerResponse<Announcement[]>> {
        return this._apiService.get(`/announcment/${id}`)
    }

    public getNewsById(id: number) {
        return this._apiService.get(`/current/announcment/${id}`)
    }
}
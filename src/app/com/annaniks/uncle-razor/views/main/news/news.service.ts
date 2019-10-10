import { Injectable } from '@angular/core';
import { ApiService } from '../../../services';
import { Observable } from 'rxjs';
import { ServerResponse, Announcement, AnnouncementType } from '../../../models/models';

@Injectable()
export class NewsService {

    constructor(private _apiService: ApiService) { }

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
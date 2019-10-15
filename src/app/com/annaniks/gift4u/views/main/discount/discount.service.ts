import { Injectable } from '@angular/core';
import { ApiService } from '../../../services';
import { Observable } from 'rxjs';
import { ServerResponse, AnnouncementType, Announcement } from '../../../models/models';

@Injectable()
export class DiscountService {

    constructor(private _apiService: ApiService) { }

    public getAnnouncmentType(): Observable<ServerResponse<AnnouncementType[]>> {
        return this._apiService.get('/announcmenttype');
    }

    public getDiscountInfo(id: number): Observable<ServerResponse<Announcement[]>> {
        return this._apiService.get(`/announcment/${id}`)
    }
}
import { Component, OnInit, Input, Inject, ViewEncapsulation } from '@angular/core';
import { Announcement } from '../../../models/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'announcement-list-item',
    templateUrl: 'announcement-list-item.component.html',
    styleUrls: ['announcement-list-item.component.scss'],

})
export class AnnouncementListItem implements OnInit {
    @Input('value') private _announcementInfo: Announcement;

    constructor(@Inject('FILE_URL') private _fileUrl: string, private _router: Router, private _activatedRoute: ActivatedRoute) { }

    ngOnInit() { }

    public onClickItem(): void {
        this._navToDetails();
    }

    private _navToDetails(): void {
        this._router.navigate([this._announcementInfo.id], { relativeTo: this._activatedRoute });
    }

    get announcementInfo():Announcement {
        return this._announcementInfo;
    }

    get fileUrl(): string {
        return this._fileUrl;
    }
}
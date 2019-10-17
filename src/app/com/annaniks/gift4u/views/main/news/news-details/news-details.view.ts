import { Component, OnInit, Inject } from '@angular/core';
import { NewsService } from '../news.service';
import { ActivatedRoute } from '@angular/router';
import { Announcement } from '../../../../models/models';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService } from '../../../../services';

@Component({
    selector: 'news-details-view',
    templateUrl: 'news-details.view.html',
    styleUrls: ['news-details.view.scss']
})
export class NewsDetailsView implements OnInit {
    private _announcementInfo: Announcement;
    private _showMore: boolean = false;
    constructor(
        private _newsService: NewsService,
        private _activatedRoute: ActivatedRoute,
        @Inject('FILE_URL') private _fileUrl: string,
        private _title: Title,
        private _meta: Meta,
        private _translateService: TranslateService
    ) { }

    ngOnInit() {
        this._checkNewsId();
    }
    public translateWords(key1: string, key2: string, key3: string) {
        return this._translateService.translateImportant(key1, key2, key3)
    }
    private _checkNewsId(): void {
        let announcementId: number = this._activatedRoute.snapshot.params.id
        this._getNewsById(announcementId);
    }

    private _getNewsById(id: number): void {
        this._newsService.getNewsById(id).subscribe((data) => {
            this._announcementInfo = data.messages[0];
            this._title.setTitle(this._announcementInfo.title);
            this._meta.updateTag({ name: 'description', content: this._announcementInfo.description })
            this._meta.updateTag({ name: 'keywords', content: this._announcementInfo.keywords })
        })
    }

    public onClickShowMore(): void {
        this._showMore = !this._showMore;
    }

    get announcementInfo(): Announcement {
        return this._announcementInfo;
    }

    get fileUrl(): string {
        return this._fileUrl;
    }

    get showMore(): boolean {
        return this._showMore
    }

    get showText(): string {
        return (this._showMore) ? this.translateWords('', 'свернуть', '') : this.translateWords('', 'развернуть', '')
    }
}
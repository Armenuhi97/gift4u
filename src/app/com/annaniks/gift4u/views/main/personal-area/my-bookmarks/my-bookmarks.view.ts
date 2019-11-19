import { Component, OnInit } from "@angular/core";
import { MyBookmarksService } from "./my-bookmarks.service";
import { Bookmark } from "../../../../models/models";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingService } from "../../../../services/loading.service";
import { TranslateService1 } from "../../../../services";
import { PlatformService } from "../../../../services/platform.service";

@Component({
    selector: 'my-bookmarks-view',
    templateUrl: 'my-bookmarks.view.html',
    styleUrls: ['my-bookmarks.view.scss']
})
export class MyBookmarksView implements OnInit {
    public _bookmarks: Bookmark[] = [];
    private _bookmarkCount: number = 0;
    private _pageLength: number = 12;
    public isGet: boolean = false;
    private _products: Bookmark[] = [];
    private _page: number = 1;
    constructor(private _bookmarkService: MyBookmarksService,
        private _title: Title,
        private _loadingService: LoadingService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _translateService: TranslateService1,
        private _platformService: PlatformService) {
        this._title.setTitle(this._translateService.translateImportant('My bookmarks', 'Мои закладки', 'Նախընտրելիները'));
        this._checkQueryParams();
    }
    ngOnInit() { }
    private _checkQueryParams(): void {
        this._activatedRoute.queryParams.subscribe((params) => {
            if (params) {
                if (params.page) {
                    this._page = +params.page;
                }
                else {
                    this._page = 1;
                }
                this._getBookmark();
            }
            else {
                this._router.navigate(['/']);
            }
        })
    }
    private _getBookmark(): void {
        this._loadingService.showLoading()
        this._bookmarkService.getBookmarks().subscribe((data: { status: string, messages: Bookmark[] }) => {
            this._bookmarks = data.messages;
            this._bookmarkCount = this._bookmarks.length;
            this._setPage(this._page);
            this.isGet = true;
            this._loadingService.hideLoading()
        },
            () => {
                this._loadingService.hideLoading()
            })
    }
    private _setPage(pageNumber: number): void {
        this._products = this._bookmarks.slice((pageNumber - 1) * this._pageLength, pageNumber * this._pageLength);
        if (this._platformService.isBrowser)
            if (window.innerWidth > 920)
                window.scrollTo(0, 0)
    }
    public onPageChange($event) {
        this._setPage($event.pageNumber);
        if ($event.isArrow) {
            this._router.navigate([], { relativeTo: this._activatedRoute, queryParams: { page: $event.pageNumber }, queryParamsHandling: 'merge' })
            if (this._platformService.isBrowser)
                if (window.innerWidth > 920)
                    window.scrollTo(0, 0)
        }
        // this._setPage($event.pageNumber);
        // this._router.navigate([], { relativeTo: this._activatedRoute, queryParams: { page: $event.pageNumber }, queryParamsHandling: 'merge' })
    }
    get bookmarkCount(): number {
        return this._bookmarkCount;
    }
    get pageLength(): number {
        return this._pageLength;
    }
    get products() {
        return this._products
    }
    get page() {
        return this._page
    }
    get bookmarks() {
        return this._bookmarks
    }
    get language() {
        return this._translateService.getActiveLanguage()
    }
}
import { Component, OnInit, Input, Inject, ViewChild, HostListener, NgZone } from '@angular/core';
import { Partner } from '../../views/main/home/home.models';

@Component({
    selector: 'app-slider',
    templateUrl: 'slider.component.html',
    styleUrls: ['slider.component.scss']
})
export class SliderComponent implements OnInit {
    @Input('carouselType') private _carouselType: string;
    @Input('itemHeight') private _itemHeight: number = 400;
    @Input('carouselItems') private _carouselItems: object[] = [];
    @Input('prefix') private _prefix: string = 'banner/';
    @Input('startSlideIndex') private _startSlideIndex = undefined;
    @Input('imageKey') private _imageKey: string = 'image';
    @ViewChild('slickModal', { static: false }) carousel;
    public isInit: boolean = false
    private _currentIndex: number = 1;
    private _slideConfig = {
        "slidesToShow": 1,
        "slidesToScroll": 1,
        "speed": 300,
        "prevArrow": "<img class='a-left control-c prev slick-prev' src='assets/images/baseline_keyboard_arrow_left_white.png'>",
        "nextArrow": "<img class='a-right control-c next slick-next' src='assets/images/baseline_keyboard_arrow_right_white.png'>",
    };

    constructor(@Inject('FILE_URL') private _fileUrl: string, private _ngZone: NgZone) { }

    ngOnInit() {
        this._checkCarouselType();
    }

    ngAfterViewInit() {
        if (this._startSlideIndex) {
            this.carousel.moveTo(this._startSlideIndex);
        }
    }
    slickInit($event) {
        if ($event) {
            setTimeout(() => {
                this.isInit = true
            }, 10)
        }
    }
    public onClickMoreInfo(item): void {
        if (item.link)
            window.open(item.link);
    }

    public onClickCarouselItem(item: Partner): void {
        window.open(item.link);
    }

    private _checkCarouselType(): void {
        if (this._carouselType == 'main') {
            this._slideConfig['autoplay'] = true;
            this._slideConfig['autoplayspeed'] = "3000",
                this._slideConfig['dots'] = true;
        }
        if (this._carouselType == 'small') {
            this._slideConfig['slidesToShow'] = 6;

            this._slideConfig['responsive'] = [
                {
                    breakpoint: 0,
                    settings: {
                        slidesToShow: 5,
                    }
                },
                {
                    breakpoint: 1144,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 968,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 720,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 540,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        }
        if (this._carouselType == 'good') {
            this._slideConfig['slidesToShow'] = 5;
            this._slideConfig['autoplay'] = true;
            this._slideConfig['autoplayspeed'] = "900",
                this._slideConfig['responsive'] = [
                    {
                        breakpoint: 0,
                        settings: {
                            slidesToShow: 5,
                        }
                    },
                    {
                        breakpoint: 1144,
                        settings: {
                            slidesToShow: 4,
                        }
                    },
                    {
                        breakpoint: 968,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 720,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 540,
                        settings: {
                            slidesToShow: 2,
                        }
                    }
                ]
        }
        if (window.innerWidth <= 470) {
            this._slideConfig['slidesToShow'] = 1;
        }
    }



    get itemHeight(): number {
        return this._itemHeight;
    }

    get fileUrl(): string {
        return this._fileUrl;
    }

    get carouselItems(): object[] {
        return this._carouselItems;
    }

    get carouselType(): string {
        return this._carouselType;
    }

    get prefix(): string {
        return this._prefix;
    }

    get imageKey(): string {
        return this._imageKey;
    }

    get currentIndex(): number {
        return this._currentIndex;
    }

    get slideConfig(): object {
        return this._slideConfig;
    }
}
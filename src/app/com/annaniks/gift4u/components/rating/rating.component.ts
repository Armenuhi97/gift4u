import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { PlatformService } from '../../services/platform.service';

@Component({
    selector: 'app-rating',
    templateUrl: 'rating.component.html',
    styleUrls: ['rating.component.scss']
})

export class RatingComponent implements OnInit {
    @Input('size') private _size: number = 9;
    @Input('color') private _color: string = 'black';
    @Input('starsCount') private _starsCount: number = 5;
    @Input('rating')
    set rating($event) {
        this._rating = $event;
        this._starIndex = $event;
        this._checkClass();
    }
    @Output('onSetRaing') private _onSetRating: EventEmitter<number> = new EventEmitter<number>();
    @ViewChild('starContainer', { static: false }) private _starContainer: ElementRef;
    private _width: number = 0;
    private _starsCountArray: number[] = [];
    private _starIndex: number = 0;
    private _selected: boolean = false;
    private _rating: number = 0;
    private _className: string;
    private _halfStarIndex: number = -1;
    private _starsElements = [];
    constructor(private _platformService: PlatformService) { }

    ngOnInit() {
        this._setStarsCount();
        this._checkWidth();
    }

    private _checkWidth(): void {
        this._width = this._size * 5 + 8;
    }

    private _setStarsCount(): void {
        this._starIndex = this._rating;
        for (let i = 0; i < this._starsCount; i++) {
            this._starsCountArray.push(i);
        }
    }

    public onHoverStar(starIndex: number): void {
        if (this._halfStarIndex != -1) {
            this._starsElements[this._halfStarIndex].classList.remove('br-unit-fracion');
        }
        if (!this._selected) {
            this._starIndex = starIndex + 1;
        }
    }

    public onOutStars(): void {
        if (this._halfStarIndex != -1 && !this._selected) {
            this._starsElements[this._halfStarIndex].classList.add('br-unit-fracion')
        }
        if (!this._selected) {
            this._starIndex = this._rating;
        }
    }

    public onClickStar(): void {
        if (!this._selected) {
            this._onSetRating.emit(this._starIndex);
        }
        this._selected = true;
    }

    private _checkClass() {
        setTimeout(() => {
            if (this._platformService.isBrowser)
                if (this._starContainer.nativeElement.children) {
                    let childArray = Array.prototype.slice.call(this._starContainer.nativeElement.children);
                    this._starsElements = childArray;
                    childArray.forEach((element, starIndex) => {
                        if (!this._selected) {
                            if (this._rating > starIndex) {
                                if (starIndex === Math.floor(this._rating)) {
                                    if (this._rating / 10 != 0 && this._rating != Math.floor(this._rating)) {
                                        element.classList.add('br-unit-fracion');
                                        this._halfStarIndex = starIndex;
                                    }
                                    else {
                                        element.classList.add('selected');
                                    }
                                }
                                else {
                                    element.classList.add('selected');
                                }

                            }
                        }
                    })
                }
        })
    }

    get size(): number {
        return this._size;
    }

    get width(): number {
        return this._width;
    }

    get color(): string {
        return this._color;
    }

    get starsCountArray(): number[] {
        return this._starsCountArray
    }

    get starIndex(): number {
        return this._starIndex
    }

    get className(): string {
        return this._className;
    }
}
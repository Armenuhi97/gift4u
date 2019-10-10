import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
    selector: 'lightbox-modal',
    templateUrl: 'lightbox.modal.html',
    styleUrls: ['lightbox.modal.scss']
})
export class LightboxModal implements OnInit {
    // @ViewChild('img', { static: true }) private _imageElement: ElementRef<HTMLElement>;
    private _currentIndex: number;
    private _currentImage: string;
    public startIndex:number
    public config: SwiperConfigInterface;
    constructor(@Inject(MAT_DIALOG_DATA) private _data: any,
        private _dialogRef: MatDialogRef<LightboxModal>, @Inject('FILE_URL') private _fileUrl: string) { 
            this.startIndex= this._data.imageIndex,
             this.config = {                 
                direction: 'horizontal',
                slidesPerView: this._data.imageIndex,
                keyboard: true,
                mousewheel: true,
                scrollbar: false,
                navigation: true,
                pagination: true,
                breakpoints:{
                   640:{
                        slidesPerView: 1, 
                       }
                }
            };
        }


    ngOnInit() {
        this._currentIndex = this._data.imageIndex;
        this._currentImage = this._data.images[this._data.imageIndex].image;
        this._checkImageSize();
    }
    public close() {
        this._dialogRef.close()
    }
    public getImage(image?) {        
        let styles = {}
        styles["background-image"] = "url(" + this.fileUrl + 'products/' + image.image + ")";
        styles["height"] = window.innerHeight + 'px'
        styles["width"] = window.innerWidth + 'px';
        return styles
    }
    public onClickArrow(event: string) {
        if (event == 'next') {
            if (this._currentIndex == this._data.images.length - 1) {
                this._currentIndex = 0;
            }
            else {
                this._currentIndex++;
            }
            this._currentImage = this._data.images[this._currentIndex].image;


        }
        if (event == 'pervious') {
            if (this._currentIndex == 0) {
                this._currentIndex = this._data.images.length - 1;
            }
            else {
                this._currentIndex--;
            }
            this._currentImage = this._data.images[this._currentIndex].image;
        }
        this._checkImageSize();
    }

    private _checkImageSize(): void {
        // let image = new Image();
        // image.src = `${this._fileUrl}products/${this._currentImage}`;
        // let width = image.width;
        // let height = image.height;
        // this._imageElement.nativeElement.style.width = width + 'px';
        // this._imageElement.nativeElement.style.height = height + 'px';
    }



    get images(): string[] {
        return this._data.images;
    }

    get imageIndex(): number {
        return this._data.imageIndex;
    }

    get currentImage(): string {
        return this._currentImage;
    }

    get fileUrl(): string {
        return this._fileUrl;
    }

}
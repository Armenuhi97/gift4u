import { Component, OnInit, ViewChild, HostListener, Input , Inject} from '@angular/core';
import { Video } from '../../views/main/home/home.models';

@Component({
    selector: 'app-slider-3d',
    templateUrl: 'slider-3d.component.html',
    styleUrls: ['slider-3d.component.scss']
})
export class Slider3dComponent implements OnInit {
    private _carouselItems: Video[] = [];
    @Input('carouselItems') 
        set carouselItems($event){
            if($event.length<3){
                this.options['visible']=$event.length;
            }
            this._carouselItems = $event;
        }
    @HostListener('window:resize', ['$event'])
    private _onResize(): void {
        if (window.innerWidth <= 768) {
            this.options['width'] = 387;
            this.options['height'] = 220;
            this.options['space'] = 300;
        }
    }
    @ViewChild('carousel',{static:false}) carousel: any;
    slides: Array<object> = [];
    options: object = {
        clicking: true,
        sourceProp: 'src',
        visible: 3,
        perspective: 1,
        startSlide: 0,
        border: 0,
        dir: 'ltr',
        width: 522,
        height: 347,
        space: 500,
        autoRotationSpeed: 500000,
        loop: true
    };
    constructor() { }

    ngOnInit() {
        this._onResize();
    }

    public slideClicked(index): void {}

    public onClickButton(type: string) {
        let index = this.carousel.carousel3d.currentIndex;
        this.carousel.slideClicked(index++);
    }

    get carouselItems(): Video[] {
        return this._carouselItems;
    }
}
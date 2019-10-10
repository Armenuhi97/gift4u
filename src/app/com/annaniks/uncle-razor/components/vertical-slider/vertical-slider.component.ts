import { Component, OnInit, Input, Inject, ViewChild, Output, EventEmitter } from '@angular/core';
import { SwiperConfigInterface, SwiperComponent } from 'ngx-swiper-wrapper';


@Component({
  selector: 'app-vertical-slider',
  templateUrl: 'vertical-slider.component.html',
  styleUrls: ['vertical-slider.component.scss']
})
export class VerticalSliderComponent implements OnInit {
  private _sliderItems: Array<object> = [];
  private _loading: boolean = true;
  @Input('config') private _config = {
    direction: 'vertical',
    slidesPerView: 3
  }
  @Input('sliderItems')
  set sliderItems($event) {
    this._loading = true;
    this._setSliderItems($event);
  }
  @Output('mainImageEvent') private _mainImageEvent = new EventEmitter();
  @ViewChild('swiper',{static:false}) swiper: SwiperComponent;

  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'vertical',
    slidesPerView: 3,
    keyboard: false,
    mousewheel: false,
    scrollbar: false,
    navigation: true,
    pagination: false,
  };

  constructor(@Inject('FILE_URL') private _fileUrl: string) { }

  ngOnInit() {
    this.config.direction = this._config.direction;
    this.config.slidesPerView = this._config.slidesPerView;

  }

  private _setMainImageEvent(index: number): void {
    this._mainImageEvent.emit(index);
  }

  private _setSliderItems($event): void {
    this._sliderItems = $event;
    this.config.direction = this._config.direction;
    this.config.slidesPerView = this._config.slidesPerView;
    setTimeout(()=>{
      this._loading = false;
    },10)
    
  }


  public onClickImage(index: number): void {
    this._setMainImageEvent(index);
  }

  get sliderItems() {
    return this._sliderItems;
  }

  get fileUrl(): string {
    return this._fileUrl;
  }

  get loading(): boolean {
    return this._loading;
  }


}

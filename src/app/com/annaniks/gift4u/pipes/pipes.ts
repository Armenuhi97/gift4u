import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Translate } from '../models/models';
import { DatePipe } from '@angular/common';
import { TranslateService1 } from '../services';

@Pipe({
    name: 'splice_text'
})
export class SpliceText implements PipeTransform {

    transform(text: string, symbolsWebCount: number, symbolsMobileCount: number) {
        if (window.innerWidth >= 700) {
            if (text && text.length > symbolsWebCount) {
                return text.slice(0, symbolsWebCount) + '...';
            }
        } else {
            if (text && text.length > symbolsMobileCount) {
                return text.slice(0, symbolsMobileCount) + '...';
            }
        }
        return text;
    }
}
@Pipe({
    name: 'splice_search'
})
export class SpliceSearch implements PipeTransform {
    transform(text: string, symbolsWebCount: number) {
        if (window.innerWidth >= 919 && window.innerWidth <= 1076) {
            if (text && text.length > symbolsWebCount) {
                return text.slice(0, symbolsWebCount) + '...';
            }
        }
        return text;
    }
}
@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}

@Pipe({ name: 'translate' })
export class TranslatePipe implements PipeTransform {
    private _translates: Translate = {
        color: 'Цвет',
        size: 'Размер'
    }

    constructor() { }

    transform(key: string) {
        return this._translates[key.toLowerCase()]
    }
}
@Pipe({ name: 'date_format' })
export class DateFormat implements PipeTransform {
    transform(birthday: string) {
        if (birthday)
            return birthday.replace(/-/g, '.');;
    }
}

@Pipe({ name: 'price_format' })
export class PriceFormat implements PipeTransform {
    transform(value: string | number) {
        if(value){
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }else{
            return value
        }
        
    }
}

@Pipe({ name: 'date_locale_format' })
export class DateLocaleFormat implements PipeTransform {
    transform(value: string) {
        let date = new Date(value)
        let datePipe = new DatePipe('ru');
        let localeDate = datePipe.transform(date, 'dd MMMM yyyy');
        return localeDate

    }
}
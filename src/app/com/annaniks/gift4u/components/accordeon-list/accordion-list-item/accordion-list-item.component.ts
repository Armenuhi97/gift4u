import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateService1 } from "../../../services";

@Component({
    selector: 'accordion-list-item',
    templateUrl: 'accordion-list-item.component.html',
    styleUrls: ['accordion-list-item.component.scss']
})
export class AccordionListItemComponent {
    public searchValue: string;
    public searchArray = [];
    public array;
    @Input('array')
    set settings($event) {
        this.array = $event;
        this.searchArray = $event
    }
    @Input() isBrand: boolean;
    @Output('getSelectedParams') private _sendSelectedParams = new EventEmitter;
    @Input('category') private _category: string;
    private _selectArr = []
    constructor(private _activatedRoute: ActivatedRoute,private _translateService:TranslateService1) { }
    ngOnInit(){
        this._checkQueryParams()
    }
    private _checkQueryParams() {
        let queryParams = this._activatedRoute.snapshot.queryParams;
        if (queryParams && queryParams.filter) {
            let filter = JSON.parse(queryParams.filter)
            if (filter && filter[this._category]) {
                let arr = filter[this._category].split(',');
                arr.forEach((data) => {
                    this._selectArr.push(parseInt(data))
                })
            }
        }
    }
    public getAttributeName(obj,name:string){
        return this._translateService.getRequestTranslateAttributeName(obj,name)
    }
    public select(item) {        
        item.isSelect = !item.isSelect;
        if (item.isSelect) {
            this._selectArr.push(item.id);
        } else {
            for (let i = 0; i < this._selectArr.length; i++) {
                if (this._selectArr[i] == item.id) {
                    this._selectArr.splice(i, 1)
                }
            }
        }
        this._sendSelectedParams.emit(this._selectArr)
    }
    public search(event: string) {
        if (event && event.trim() !== '') {
            this.array = this.searchArray.filter((data) => {
                return data.name.toLowerCase().indexOf(event.trim().toLowerCase()) > -1
            })
        } else {            
            this.array=this.searchArray
        }
    }
    get language(){
        return this._translateService.getActiveLanguage()
    }

}
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CombinedAttribute } from '../../models/models';
import { TranslateService } from '../../services';

@Component({
    selector: "app-product-attribute",
    templateUrl: 'product-attribute.component.html',
    styleUrls: ['product-attribute.component.scss']
})
export class ProductAttributeComponent implements OnInit {
    private _attribute: CombinedAttribute;
    private _activeSizeItem: number;
    @Input('attribute')
    set attribute($event) {
        this._attribute = $event;
        if ($event.name.toLowerCase() == 'цвет') {
            $event.values.map((element) => {
                let val = element.value.split(',');
                element.value = (val.length == 2) ? val[1] : element.value;
            })
        }
    }
    @Output('selectAttribute') private _selectAttribute = new EventEmitter();

    constructor(private _translateService:TranslateService) { }

    ngOnInit() { }

    public setAttributeStyle(item: CombinedAttribute, attr): object {
        let styles = { 'background-color': '' }
        if (item.name.toLowerCase() == 'цвет') {
            styles["background-color"] = attr.value;
            styles["border-color"] = attr.value;
        }
        return styles;
    }

    public onClickItem(index: number): void {
        this._setActiveSizeItem(index);
    }

    private _setActiveSizeItem(index: number): void {
        this._activeSizeItem = index;
        this._selectAttribute.emit(this._attribute.values[index]);
    }

    get activeSizeItem(): number {
        return this._activeSizeItem;
    }

    get attribute(): CombinedAttribute {
        return this._attribute;
    }

    get attrCondition():boolean{
        return (this._attribute.name.toLowerCase() != 'цвет')
    }
    get language(){
        return this._translateService.getActiveLanguage()
    }
}
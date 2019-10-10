import { Component, Input } from "@angular/core";

@Component({
    selector:'accordion-list',
    templateUrl:'accordeon-list.component.html',
    styleUrls:['accordeon-list.component.scss']
})
export class AccordeonListComponent{
    @Input('category')category
    public openCategory(item) {
        item.isOpen = !item.isOpen;
    }
    public rotate(item) {
        let styles = {}
        styles['transform'] = item.isOpen ? 'rotate(90deg)' : 'rotate(0deg)';
        return styles
    }
}
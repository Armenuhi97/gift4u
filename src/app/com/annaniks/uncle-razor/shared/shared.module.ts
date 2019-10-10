import { NgModule } from '@angular/core';
import {
    RatingComponent,
    GoodsListItemComponent,
    GoodsListComponent,
    Slider3dComponent,
    BoxComponent,
    RouteStepComponent,
    SliderComponent,
    PaginatorComponent,
    AnnouncementList,
    AnnouncementListItem,
    CategoriesComponent,
    FiltersComponent,
    CategoryComponent,
    AccordeonListComponent,
    AccordionListItemComponent
} from '../components';
import { CommonModule } from '@angular/common';
import { NgxCarousel3dModule } from '../modules/ngx-carousel-3d/ngx-carousel-3d.module';
import { SpliceText, SafePipe, TranslatePipe, DateFormat, SpliceSearch, DateLocaleFormat } from '../pipes/pipes';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { OnlyNumberDirective, OpenLinkInNewWindowDirective } from '../directives';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TableModule } from 'primeng/table';
import { ClickOutsideModule } from 'ng-click-outside';
import { Ng5SliderModule } from 'ng5-slider';
import {MultiSelectModule} from 'primeng/multiselect';

@NgModule({
    declarations: [
        RatingComponent,
        GoodsListComponent,
        GoodsListItemComponent,
        Slider3dComponent,
        BoxComponent,
        RouteStepComponent,
        SpliceText,
        SpliceSearch,
        SafePipe,
        SliderComponent,
        PaginatorComponent,
        TranslatePipe,
        DateFormat,
        DateLocaleFormat,
        OnlyNumberDirective,
        AnnouncementList,
        AnnouncementListItem,
        OpenLinkInNewWindowDirective,
        CategoriesComponent,
        CategoryComponent,
        FiltersComponent,
        AccordeonListComponent,
        AccordionListItemComponent
    ],
    imports: [
        CommonModule,
        NgxCarousel3dModule,
        SlickCarouselModule,
        RouterModule,
        NgxMaskModule.forRoot(),
        FormsModule,
        DropdownModule,
        TableModule,
        ClickOutsideModule,
        ReactiveFormsModule,
        Ng5SliderModule,
        MultiSelectModule,
        
    ],
    exports: [
        RatingComponent,
        GoodsListComponent,
        GoodsListItemComponent,
        Slider3dComponent,
        RouteStepComponent,
        BoxComponent,
        CommonModule,
        SpliceText,
        SpliceSearch,
        SafePipe,
        SliderComponent,
        PaginatorComponent,
        TranslatePipe,
        DateFormat,
        DateLocaleFormat,
        NgxMaskModule,
        OnlyNumberDirective,
        DropdownModule,
        AnnouncementList,
        AnnouncementListItem,
        TableModule,
        ClickOutsideModule,
        OpenLinkInNewWindowDirective,
        CategoriesComponent,
        CategoryComponent,
        FiltersComponent,
        ReactiveFormsModule,
        Ng5SliderModule,
        AccordeonListComponent,
        AccordionListItemComponent,
        MultiSelectModule,
        
        
    ]
})
export class SharedModule { }
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyBookmarksView } from "./my-bookmarks.view";
let myBookmarksRoutes:Routes=[{path:'',component:MyBookmarksView}]
@NgModule({
    declarations:[],
    imports:[RouterModule.forChild(myBookmarksRoutes)]
})
export class MyBookmarksRoutingModule{}
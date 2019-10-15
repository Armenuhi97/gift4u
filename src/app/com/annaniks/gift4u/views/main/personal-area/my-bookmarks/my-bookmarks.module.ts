import { NgModule } from "@angular/core";
import { MyBookmarksRoutingModule } from "./my-bookmarks.routing.module";
import { MyBookmarksView } from "./my-bookmarks.view";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material";
import { MyBookmarksService } from "./my-bookmarks.service";
import { SharedModule } from "../../../../shared/shared.module";

@NgModule({
    declarations: [MyBookmarksView],
    imports: [
        MyBookmarksRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        MatDialogModule
    ],
    providers:[MyBookmarksService],
    exports:[MyBookmarksView]
})
export class MyBookmarksModule { }
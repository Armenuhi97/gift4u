import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsView } from './news.view';

let newsRoutes: Routes = [
    { path: "", component: NewsView },
    { path: ':id', loadChildren: () => import('src/app/com/annaniks/uncle-razor/views/main/news/news-details/news-details.module').then(m => m.NewsDetailsModule) }
]

@NgModule({
    imports: [RouterModule.forChild(newsRoutes)],
    exports: [RouterModule]
})
export class NewsRoutingModule { }
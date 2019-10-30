import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainView } from './main.view';

let mainRoutes: Routes = [
    {
        path: '', component: MainView, data: { title: 'Главная' }, children: [
            { path: 'home', redirectTo: '', pathMatch: 'full' },
            { path: '', loadChildren: () => import('src/app/com/annaniks/gift4u/views/main/home/home.module').then(m => m.HomeModule) },
            { path: 'contacts', loadChildren: () => import('src/app/com/annaniks/gift4u/views/main/contacts/contacts.module').then(m => m.ContactsModule), data: { title: 'Контакты' } },
            { path: 'reviews', loadChildren: () => import('src/app/com/annaniks/gift4u/views/main/reviews/reviews.module').then(m => m.ReviewsModule), data: { title: 'Отзыв' } },
            { path: 'catalog', loadChildren: () => import('src/app/com/annaniks/gift4u/views/main/catalog/catalog.module').then(m => m.CatalogModule), data: { title: 'Каталог товаров' } },
            { path: 'personal-area', loadChildren: () => import('src/app/com/annaniks/gift4u/views/main/personal-area/personal-area.module').then(m => m.PersonalAreaModule), data: { title: 'Личный кабинет' } },
            { path: 'basket', loadChildren: () => import('src/app/com/annaniks/gift4u/views/main/basket/basket.module').then(m => m.BasketModule), data: { title: 'Корзина' } },
            { path: 'brands', loadChildren: () => import('src/app/com/annaniks/gift4u/views/main/brands/brands.module').then(m => m.BrandsModule), data: { title: 'Бренды' } },
            { path: 'search', loadChildren: () => import('src/app/com/annaniks/gift4u/views/main/search/search.module').then(m => m.SearchModule), data: { title: 'Поиск' } },
            { path: 'news', loadChildren: () => import('src/app/com/annaniks/gift4u/views/main/news/news.module').then(m => m.NewsModule) },
            { path: 'discounts', loadChildren: () => import('src/app/com/annaniks/gift4u/views/main/discount/discount.module').then(m => m.DiscountModule) },
            { path: 'settings/:settingname', loadChildren: () => import('src/app/com/annaniks/gift4u/views/main/settings/settings.module').then(m => m.SettingsModule) },
            { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
            { path: 'not-found', loadChildren: () => import('src/app/com/annaniks/gift4u/views/not-found/not-found.module').then(m => m.NotFoundModule) },
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
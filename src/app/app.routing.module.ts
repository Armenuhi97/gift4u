import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  { path: '', loadChildren: () => import('src/app/com/annaniks/uncle-razor/views/main/main.module').then(m => m.MainModule) },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
  { path: 'not-found', loadChildren: () => import('src/app/com/annaniks/uncle-razor/views/not-found/not-found.module').then(m => m.NotFoundModule) },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

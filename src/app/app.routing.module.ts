import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  { path: '', loadChildren: () => import('src/app/com/annaniks/gift4u/views/main/main.module').then(m => m.MainModule) },
  
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

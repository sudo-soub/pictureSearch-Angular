import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavouritesComponent } from './favourites/favourites.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'favourites', component: FavouritesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

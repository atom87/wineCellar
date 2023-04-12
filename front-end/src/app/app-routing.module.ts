import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WineListComponent } from './wine/wine-list/wine-list.component';
import { EditWineComponent } from './wine/edit-wine/edit-wine.component';
import { AboutComponent } from './wine/about/about.component';


export const routes: Routes = [
  { path: 'wines', component: WineListComponent},
  { path: 'wines/home', component: WineListComponent},
  { path: 'wines/add', component: EditWineComponent},
  { path: 'wines/about', component: AboutComponent},
  { path: 'wines/:id', component: EditWineComponent}, //mora ici posle add, da ne bi add bilo interpretirano kao vrednost id parametra putanje
  { path: "", redirectTo: '/wines', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

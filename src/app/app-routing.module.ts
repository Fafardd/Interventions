import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ProblemeComponent } from './probleme/probleme.component';

const routes: Routes = [
  { path:'accueil',component: AccueilComponent},
  { path:'', redirectTo:'accueil', pathMatch: 'full'},
  { path:'probleme',component: ProblemeComponent},
  { path:'', redirectTo:'probleme', pathMatch: 'full'},
  { path:'**', redirectTo:'accueil', pathMatch: 'full'} //si la route est inexistante redirigé l'utilisateur sur accueil
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

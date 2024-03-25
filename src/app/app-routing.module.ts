import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieComponent } from './categorie/categorie.component';
import { RedevableComponent } from './redevable/redevable.component';
import { TauxsComponent } from './tauxs/tauxs.component';
import { TerrainComponent } from './terrain/terrain.component';
import { HomeComponent } from './home/home.component';
import { AddTarrainComponent } from './add-tarrain/add-tarrain.component';

const routes: Routes = [
//  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'categories', component: CategorieComponent },
  { path: 'Redevable', component: RedevableComponent },
  { path: 'taux', component: TauxsComponent},
  { path: 'terrain', component: TerrainComponent},
  { path: 'add', component: AddTarrainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

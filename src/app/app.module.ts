import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategorieComponent } from './categorie/categorie.component';
import { RedevableComponent } from './redevable/redevable.component';
import { TerrainComponent } from './terrain/terrain.component';
import { TauxsComponent } from './tauxs/tauxs.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AddTarrainComponent } from './add-tarrain/add-tarrain.component';


@NgModule({
  declarations: [
    AppComponent,
    CategorieComponent,
    RedevableComponent,
    TerrainComponent,
    TauxsComponent,
    HomeComponent,
    AddTarrainComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
    ReactiveFormsModule,
   
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component } from '@angular/core';
import { TerrainService } from '../services/terrain.service';
import { Terrain } from '../models/terrain.model';

@Component({
  selector: 'app-add-tarrain',
  templateUrl: './add-tarrain.component.html',
  styleUrls: ['./add-tarrain.component.css']
})
export class AddTarrainComponent {
  terrain!: Terrain;
  submitted = false;
currentTerrain: any;


  constructor(private terrainService: TerrainService) {
    this.terrain=new Terrain;
  }
 

  saveTerraine(): void {
    this.terrainService.saveTerrain(this.terrain).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newTerrain(): void {
    this.submitted = false;
    this.terrain = new Terrain(); // Reset to a new instance
  }

 

}

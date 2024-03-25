import { Component, OnInit } from '@angular/core';
import { Terrain } from '../models/terrain.model';
import { TerrainService } from '../services/terrain.service';
import { CategorieService } from '../services/categorie.service';
import { Categorie } from '../models/categorie.model';
import { RedevableService } from '../services/redevable.service';
import { Redevable } from '../models/redevable.model';

@Component({
  selector: 'app-terrain',
  templateUrl: './terrain.component.html',
  styleUrls: ['./terrain.component.css']
})
export class TerrainComponent implements OnInit {

  terrains: Terrain[] = [];
  currentTerran: Terrain = {};  // Assurez-vous que cela est cohérent avec votre modèle
  currentIndex = -1;
  name = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  pages: number[] = [];
  showAddModal: boolean = false;
  showUpdateModal: boolean = false; // pour contrôler l'affichage du modal
  selectedTerrain: any; 
  
  newTerrain: Terrain = {
    id: null,
    nom: '',
    discription: '',
    categorie: undefined, // Initialized to null
    redevable: undefined, // Initialized to null
  };
  categories: Categorie[] | undefined;
  redevables: Redevable[] | undefined;
  constructor(private terrainService: TerrainService,
    private categorieService: CategorieService,
    private redevableService: RedevableService) {}

  ngOnInit(): void {
    this.retrieveTerrains();
    this.loadCategories();
    this.loadRedevables();
  }
 

  retrieveTerrains(): void {
    this.terrainService.getAll().subscribe({
      next: (data: Terrain[]) => {
        this.terrains = data;
        this.totalItems = this.terrains.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.generatePageNumbers();
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retrieveTerrains();
    this.currentTerran = {};
    this.currentIndex = -1;
  }

  setActiveTerrains(terrain: Terrain, index: number): void {
    this.currentTerran= terrain;
    this.currentIndex = index;
  }

  removeAllTerrains(): void {
    this.terrainService.deleteAll().subscribe({
      next: (res) => {
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  searchByName(): void {
    this.currentTerran = {};
    this.currentIndex = -1;

    if (this.name.trim()) {
      this.terrainService.findByName(this.name).subscribe({
        next: (data) => {
          this.terrains = data;
          this.totalItems = this.terrains.length;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          this.generatePageNumbers();
        },
        error: (e) => console.error(e)
      });
    } else {
      this.refreshList();
    }
  }

  updateTerraine(): void {
    if (this.selectedTerrain) {
      this.terrainService.updateTerrain(this.selectedTerrain).subscribe(
        response => {
          console.log('Terrain updated successfully:', response);
          this.refreshList(); // Reload the list to reflect the changes
          this.closeUpdateModal();
        },
        error => {
          console.error('There was an error while updating the terrain!', error);
        }
      );
    }
  }

  deleteTerrains(id: number): void {
    this.terrainService.deleteTerrain(id).subscribe({
      next: (res) => {
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  generatePageNumbers() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  changePage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      // Implémenter ici la logique pour charger les données de la page sélectionnée
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }
  // pour stocker le terrain sélectionné

  loadCategories(): void {
    this.categorieService.getAll().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadRedevables(): void {
    this.redevableService.getAll().subscribe(
      (data) => {
        this.redevables = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  openUpdateModal(terrain: any) {
    this.selectedTerrain = terrain;
    this.showUpdateModal = true;
  }

  closeUpdateModal() {
    this.showUpdateModal = false;
  }
/*model add*/
  openAddModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
    this.newTerrain = new Terrain();
  }
  /*add teran*/
  addTerrain(): void {
    if (this.newTerrain.categorie && this.newTerrain.redevable) {
      this.terrainService.saveTerrain(this.newTerrain).subscribe(
        response => {
          this.retrieveTerrains();
          this.closeAddModal();
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error('Categorie and Redevable must be selected');
    }
  }

  onCategorySelected(category: Categorie): void {
    this.newTerrain.categorie = category;
  }
  onRedevableSelected(redevable: Redevable): void {
    this.newTerrain.redevable = redevable;
  }

}
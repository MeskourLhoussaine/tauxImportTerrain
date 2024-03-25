import { Component, OnInit } from '@angular/core';
import { Taux } from '../models/taux.model';
import { TauxService } from '../services/taux.service';
import { CategorieService } from '../services/categorie.service';
import { Categorie } from '../models/categorie.model';
import { Terrain } from '../models/terrain.model';

@Component({
  selector: 'app-tauxs',
  templateUrl: './tauxs.component.html',
  styleUrls: ['./tauxs.component.css']
})
export class TauxsComponent  implements OnInit {

  tauxs: Taux[] = [];
  currentTaux: Taux = {};  // Assurez-vous que cela est cohérent avec votre modèle
  currentIndex = -1;
  name = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  pages: number[] = [];
  categories: Categorie[] | undefined;
  showAddModal: boolean = false;
  showUpdateModal: boolean = false; // pour contrôler l'affichage du modal
  selectedTaux: any; 
  newTaux: Taux = {
    id: null,
    montant: null,
    categorie: undefined, // Initialized to null
    
  };
  constructor(private tauxService: TauxService,
    private categorieService: CategorieService) {}

  ngOnInit(): void {
    this.retrieveTauxs();
    this.loadCategories();
  }
 

  retrieveTauxs(): void {
    this.tauxService.getAll().subscribe({
      next: (data: Taux[]) => {
        this.tauxs = data;
        this.totalItems = this.tauxs.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.generatePageNumbers();
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retrieveTauxs();
    this.currentTaux = {};
    this.currentIndex = -1;
  }

  setActiveTauxs(taux: Taux, index: number): void {
    this.currentTaux= taux;
    this.currentIndex = index;
  }

  removeAllTauxs(): void {
    this.tauxService.deleteAll().subscribe({
      next: (res) => {
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  searchByName(): void {
    this.currentTaux = {};
    this.currentIndex = -1;

    if (this.name.trim()) {
      this.tauxService.findByName(this.name).subscribe({
        next: (data) => {
          this.tauxs = data;
          this.totalItems = this.tauxs.length;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          this.generatePageNumbers();
        },
        error: (e) => console.error(e)
      });
    } else {
      this.refreshList();
    }
  }

  deleteTaux(id: number): void {
    this.tauxService.deleteTaux(id).subscribe({
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
  updateTaux(): void {
    if (this.selectedTaux) {
      this.tauxService.updateTaux(this.selectedTaux).subscribe(
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

  openUpdateModal(taux: any) {
    this.selectedTaux = taux;
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
    this.newTaux = new Taux();
  }
  /*add teran*/
  addTaux(): void {
    if (this.newTaux.categorie ) {
      this.tauxService.saveTaux(this.newTaux).subscribe(
        response => {
          this.retrieveTauxs();
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
    this.newTaux.categorie = category;
  }
 

}

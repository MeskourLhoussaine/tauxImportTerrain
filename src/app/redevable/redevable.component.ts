import { Component, OnInit } from '@angular/core';
import { Redevable } from '../models/redevable.model';
import { RedevableService } from '../services/redevable.service';


@Component({
  selector: 'app-redevable',
  templateUrl: './redevable.component.html',
  styleUrls: ['./redevable.component.css']
})
export class RedevableComponent implements OnInit {

  redevables: Redevable[] = [];
  currentRedevable: Redevable = {};  // Assurez-vous que cela est cohérent avec votre modèle
  currentIndex = -1;
  name = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  pages: number[] = [];
/**attribut of model*/
showAddModal: boolean = false;
  showUpdateModal: boolean = false; // pour contrôler l'affichage du modal
  selectedRedevable: any; 
  newRedevable: Redevable = {
    id: null,
    nom: '',
    prenom: '',
    cin: '', // Initialized to null
   
  };

  constructor(private redevableService: RedevableService) {}

  ngOnInit(): void {
    this.retrieveRedevables();
  }
 

  retrieveRedevables(): void {
    this.redevableService.getAll().subscribe({
      next: (data: Redevable[]) => {
        this.redevables = data;
        this.totalItems = this.redevables.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.generatePageNumbers();
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retrieveRedevables();
    this.currentRedevable = {};
    this.currentIndex = -1;
  }

  setActiveRedevables(redevable: Redevable, index: number): void {
    this.currentRedevable= redevable;
    this.currentIndex = index;
  }

  removeAllRedevables(): void {
    this.redevableService.deleteAll().subscribe({
      next: (res) => {
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  searchByName(): void {
    this.currentRedevable = {};
    this.currentIndex = -1;

    if (this.name.trim()) {
      this.redevableService.findByName(this.name).subscribe({
        next: (data) => {
          this.redevables = data;
          this.totalItems = this.redevables.length;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          this.generatePageNumbers();
        },
        error: (e) => console.error(e)
      });
    } else {
      this.refreshList();
    }
  }

  deleteRedevables(id: number): void {
    this.redevableService.deleteRedevable(id).subscribe({
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

  updateRedevable(): void {
    if (this.selectedRedevable) {
      this.redevableService.updateRedevable(this.selectedRedevable).subscribe(
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

  openUpdateModal(terrain: any) {
    this.selectedRedevable = terrain;
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
    this.newRedevable = new Redevable();
  }
  /*add teran*/
  addRedevable(): void {
    if (this.newRedevable.prenom && this.newRedevable.cin) {
      this.redevableService.saveRedevable(this.newRedevable).subscribe(
        response => {
          this.retrieveRedevables();
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

  

}
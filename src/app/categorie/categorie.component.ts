import { Component, OnInit } from '@angular/core';
import { Categorie } from '../models/categorie.model';
import { CategorieService } from '../services/categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  categories: Categorie[] = [];
  currentCategorie: Categorie = new Categorie();  // Correction ici
  currentIndex = -1;
  name = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  pages: number[] = [];
  showAddModal: boolean = false;
  showUpdateModal: boolean = false;
  selectedCategorie: any; 
  newCategorie: Categorie = {
    id: null,
    type: '',
    label: '',
    discription: '',
  };

  constructor(private categorieService: CategorieService) {}

  ngOnInit(): void {
    this.retrieveCategories();
  }

  retrieveCategories(): void {
    this.categorieService.getAll().subscribe({
      next: (data: Categorie[]) => {
        this.categories = data;
        this.totalItems = this.categories.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.generatePageNumbers();
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retrieveCategories();
    this.currentCategorie = new Categorie();  // Correction ici
    this.currentIndex = -1;
  }

  setActiveCategorie(categorie: Categorie, index: number): void {
    this.currentCategorie = categorie;
    this.currentIndex = index;
  }

  removeAllCategories(): void {
    this.categorieService.deleteAll().subscribe({
      next: (res) => {
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  searchByName(): void {
    this.currentCategorie = new Categorie();  // Correction ici
    this.currentIndex = -1;

    if (this.name.trim()) {
      this.categorieService.findByName(this.name).subscribe({
        next: (data) => {
          this.categories = data;
          this.totalItems = this.categories.length;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          this.generatePageNumbers();
        },
        error: (e) => console.error(e)
      });
    } else {
      this.refreshList();
    }
  }

  deleteCategorie(id: number): void {
    this.categorieService.deleteCategorie(id).subscribe({
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
    if (this.selectedCategorie) {
      this.categorieService.updateCategorie(this.selectedCategorie).subscribe(  // Correction ici
        response => {
          console.log('Categorie updated successfully:', response);
          this.refreshList();
          this.closeUpdateModal();
        },
        error => {
          console.error('There was an error while updating the Categorie!', error);
        }
      );
    }
  }

  openUpdateModal(categorie: any) {
    this.selectedCategorie = categorie;
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
    this.newCategorie = new Categorie();
  }

  /*add teran*/
  addRedevable(): void {
    if (this.newCategorie.label && this.newCategorie.type) {
      this.categorieService.saveCategorie(this.newCategorie).subscribe(  // Correction ici
        response => {
          this.retrieveCategories();
          this.closeAddModal();
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error('Type and Label must be selected');
    }
  }
}

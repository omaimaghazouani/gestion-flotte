import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { AddVehiculeComponent } from '../add-vehicule/add-vehicule.component';
import { Vehicule } from '../vehicule';
import { VehiculeService } from '../vehicule.service';

@Component({
  selector: 'app-vehicule',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,    
    MatTableModule,
    MatIconModule,
    FormsModule, 
    MatSortModule,
    MatPaginatorModule
  ],
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.css']
})
export class VehiculeComponent implements AfterViewInit{
  numparc: any= undefined;
  annee: any= undefined;

  displayedColumns: string[] = ['idvehicule', 'numparc', 'immatricule', 'modele','annee','etat','actions'];
  dataSource = new MatTableDataSource<Vehicule>();

  constructor(private vehiculeService: VehiculeService, public dialog: MatDialog){}

  //@ViewChild() permet d’accéder à l'élément <p> du template.
  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any ;


  vehicule: Vehicule = {
    idvehicule: 0,
    numparc: this.numparc, 
    immatricule: '', 
    modele: '', 
    annee: this.annee, 
    etat: '' 
  }

  //vehicules est une propriété de la classe qui contient un tableau d'objets de type Vehicule.
  vehicules: Vehicule[] = [];
  filteredVehicules: Vehicule[] = [];

  //ngAfterViewInit() modifie le texte du paragraphe une fois que la vue est complètement rendue.
  ngAfterViewInit(): void{
    this.vehiculeService.fetchAllVehicules().subscribe((data) => {
      this.vehicules = data;
      this.dataSource = new MatTableDataSource<Vehicule>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, (error) => {
      console.error('Erreur lors de la récupération des véhicules :', error); // Gestion des erreurs
    }
  );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddVehiculeComponent, {
      width: '400px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vehiculeService.createVehicule(result).subscribe(
          () => {
            console.log('Nouveau véhicule créé avec succès !');
            window.location.reload(); // Recharger la liste après ajout
          },
          (error) => {
            console.log(error);
            window.location.reload();
          }
        );
      }
    });
  } 
  
  editVehicule(vehicule: Vehicule) {
    const dialogRef = this.dialog.open(AddVehiculeComponent, {
      width: '400px',
      data: { ...vehicule } // Passer les données du véhicule
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vehiculeService.updateVehicule(result).subscribe(
          () => {
            console.log("Véhicule mis à jour !");
            window.location.reload(); // Rafraîchir après mise à jour
          },
          (error) => {
            console.error("Erreur lors de la mise à jour :", error);
          }
        );
      }
    });
  }
  


    

    /*if(vehicule.idvehicule!=0){

    }else{

    }
*/
    /*dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vehiculeService.createVehicule(result).subscribe(() => {
          
          window.location.reload(); // Recharger la liste après ajout
        });
      }
    });*/
  

  searchVehicule(input: any){
    this.filteredVehicules= this.vehicules.filter(item=> item.numparc.toString().includes(input)
    || item.immatricule.toLowerCase().includes(input.toLowerCase())
    || item.modele.toLowerCase().includes(input.toLowerCase())
    || item.annee.toString().includes(input)
    || item.etat.toLowerCase().includes(input.toLowerCase()))
    this.dataSource = new MatTableDataSource<Vehicule>(this.filteredVehicules);
  }

  /* 
  createVehicule(){
  }
  */

  /*editVehicule(vehicule: Vehicule){
    this.vehicule.idvehicule= vehicule.idvehicule;
    this.vehicule.numparc= vehicule.numparc;
    this.vehicule.immatricule= vehicule.immatricule;
    this.vehicule.modele= vehicule.modele;
    this.vehicule.annee= vehicule.annee;
    this.vehicule.etat= vehicule.etat;
  }*/

  deleteVehicule(idvehicule: Number){
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if(isConfirmed){
      this.vehiculeService.deleteVehicule(idvehicule).subscribe((data)=>{
        this.vehicules = this.vehicules.filter(item => item.idvehicule!==idvehicule);
        window.location.reload();
      })
    }
  }
}

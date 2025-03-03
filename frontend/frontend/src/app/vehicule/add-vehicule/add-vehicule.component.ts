import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Vehicule } from '../vehicule';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { VehiculeService } from '../vehicule.service';

@Component({
  selector: 'app-add-vehicule',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './add-vehicule.component.html',
  styleUrls: ['./add-vehicule.component.css']
})
export class AddVehiculeComponent implements OnInit{
  numparc: any= undefined;
  annee: any= undefined;

  vehicule: Vehicule = {
    idvehicule: 0,
    numparc: this.numparc, 
    immatricule: '', 
    modele: '', 
    annee: this.annee, 
    etat: '' 
  };

  constructor( private vehiculeService: VehiculeService ,
    public dialogRef: MatDialogRef<AddVehiculeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if (this.data) {
      this.vehicule = { ...this.data }; // Pré-remplir le formulaire avec les données du véhicule
    }
  }

  saveVehicule() {
    console.log('Données envoyées:', this.vehicule);

    if (this.vehicule.idvehicule) {
      // Mettre à jour un véhicule existant
      this.vehiculeService.updateVehicule(this.vehicule).subscribe(() => {
          console.log('Véhicule mis à jour avec succès !');
          this.dialogRef.close(this.vehicule);
        },
        (error: any) => {
          console.error('Erreur lors de la mise à jour :', error);
        }
      );
    } else {
      // Ajouter un nouveau véhicule
      this.vehiculeService.createVehicule(this.vehicule).subscribe(
        () => {
          this.dialogRef.close(this.vehicule);
        },
        (error: any) => {
          console.error('Erreur lors de la création :', error);
        }
      );
    }
  }
  
  /*saveVehicule(): void {
    this.dialogRef.close(this.vehicule);
  }*/

}
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
  standalone:true,
  imports: [FormsModule,CommonModule,]
})
export class DashboardAdminComponent implements OnInit {
  users: any[] = [];
  isFormVisible = false;
  isEditing = false;
  userForm: any = {
    nom: '',
    prenom: '',
    telephone:'',
    email: '',
    password: '',
    roles: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<any[]>('http://localhost:3005/utilisateur').subscribe((data) => {
      this.users = data;
    });
  }

  openCreateUserForm() {
    this.isFormVisible = true;
    this.isEditing = false;
    this.userForm = { nom: '', prenom: '', email: '', password: '', roles: '' };
  }

  openEditUserForm(user: any) {
    this.isFormVisible = true;
    this.isEditing = true;
    this.userForm = { ...user };
  }
  onSubmit() {
    if (!this.userForm.nom || !this.userForm.prenom || !this.userForm.email || !this.userForm.password || !this.userForm.roles) {
      alert("Tous les champs sont obligatoires !");
      return;
    }
  
    if (this.isEditing) {
      this.http.put(`http://localhost:3005/utilisateur/${this.userForm.id}`, this.userForm)
        .subscribe(() => {
          this.fetchUsers();
          this.isFormVisible = false;
        });
    } else {
      this.http.post('http://localhost:3005/utilisateur', this.userForm)
        .subscribe(() => {
          this.fetchUsers();
          this.isFormVisible = false;
        });
    }
  }

  deleteUser(id: number) {
    this.http.delete(`http://localhost:3005/utilisateur/${id}`)
      .subscribe(() => {
        this.fetchUsers();
      });
  }
}

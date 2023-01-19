import { TestService } from './../../../testservice/test.service';
import { Component , OnInit , TemplateRef} from '@angular/core';
import {CdkDragDrop, CdkDragEnd, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Voiture } from './Voiture';
import { Router } from '@angular/router';
import { _isTestEnvironment } from '@angular/cdk/platform';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CdkDrage } from './CdkdDrage';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})

export class AcceuilComponent implements OnInit {
  emplist: any;
  form!: FormGroup;
  formError!: boolean;
    constructor(private fb: FormBuilder,private service:TestService,private router: Router){
      this.form = this.fb.group({
        nom: ['', [Validators.required, Validators.maxLength(150)]],
        description: ['', [Validators.required, Validators.maxLength(150)]]
    });
    }

    onSubmit() {
      // if (this.form.valid) {
      if (this.form.value.nom.valid) {
        this.service.saveData({nom: this.form.value.nom,description: this.form.value.description}).subscribe(() => {
            this.updateData();
        });
      } else {
        this.formError = true;
      }
    }
    recherche:any;

    updateData(){
        this.service.getDataEmp().subscribe(result => {  this.emplist = result; });
    }
    
    ngOnInit(): void {
      this.updateData();
    }

    
    voitures: Voiture[] = [
      {id: 1, marque: 'Peugeot', modele: '308', annee: 2016, etat: true},
      {id: 2, marque: 'Renault', modele: 'Megane', annee: 2018, etat: false},
      {id: 3, marque: 'Citroen', modele: 'C3', annee: 2019, etat: true},
      {id: 4, marque: 'Opel', modele: 'Astra', annee: 2012, etat: true},
      {id: 5, marque: 'Renault', modele: 'Clio-C3', annee: 2015, etat: false},
  ];
  garage: Voiture[] = [];
  


  drop(event: CdkDragDrop<Voiture[]>) {
    console.log(event.previousContainer.data[event.previousIndex]);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let canDrop = true;
      if (event.previousContainer.id === 'list-voitures' && event.previousContainer.data[event.previousIndex].annee > 2016) {
        canDrop = false;
      }
      //   // event.previousContainer est l element en cours de deplacement
      //   // event.previousIndex est l index de l' element dans le tableau qui est en cours de deplacement
      // // if (event.previousContainer.id === 'list-garage' && event.previousContainer.data[event.previousIndex].etat ==  true) {
      // //   canDrop = false;
      // // }
      if (canDrop) {
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      }
    }
  }

 
  }

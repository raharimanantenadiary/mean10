import { Component , OnInit } from '@angular/core';
import {CdkDragDrop, CdkDragEnd, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Todo } from './Todo';
// import { CdkDrage } from './CdkdDrage';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})

export class AcceuilComponent implements OnInit {
  
    constructor(){}
    
    ngOnInit(): void {}
    todo: Todo[] = [
      {name: "liste 1", description: "This is the first list", valeur: true}, 
      {name: "liste 2", description: "This is the second list", valeur: false}, 
      {name: "liste 3", description: "This is the third list", valeur: true},
      ];
      progres: Todo[] = [];
      done: Todo[] = [];
      loaders = false;
      // this.todo.push(  {name: "liste 1", description: "This is the first list", valeur: true});  
    
    drop(event: CdkDragDrop<Todo[]>){
        for(let i =0; i<event.item.dropContainer.data.length; i++ ){
          if(event.item.dropContainer.data[i].valeur === true){
            if(event.previousContainer === event.container ){
              moveItemInArray(this.todo, event.previousIndex, event.currentIndex);
            }else{
              console.log(event.item.dropContainer.data[i].valeur);
              transferArrayItem(event.previousContainer.data,event.container.data, event.previousIndex,event.currentIndex);
            }
          }
        }
    }
  }

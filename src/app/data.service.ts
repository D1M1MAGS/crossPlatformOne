import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from './models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  taskList:Array<Task> = new Array();
  list$ = new BehaviorSubject<Task[]>( this.taskList ) ;
  constructor() {
    this.loadGoals().then((data:Array<Task>) => {
      data.forEach((item) => {
        this.taskList.push(item)
      })
      this.sortGoals();
      this.list$.next( this.taskList );
    })
  }

  addToGoalsList( task:Task ) {
    this.taskList.push( task );
    this.list$.next( this.taskList );
    this.sortGoals();
    this.updateGoals();
  }

  disperseItems( id:number ) {
    this.taskList.forEach( (task:Task, index ) => {
      if( task.start == id ) {
        this.taskList.splice( index, 1 );
      }
    });
    this.list$.next( this.taskList );
    this.updateGoals();
  }

  updateGoals() {
    let data = JSON.stringify( this.taskList );
    try {
      window.localStorage.setItem("tasks" , data );
      if( !window.localStorage.getItem("tasks") ) {
        throw("local storage isn't available yet");
      }
    }
    catch( exc ) {
      console.log( exc );
    }
  }

  loadGoals() {
    return new Promise( (resolve,reject) => {
      if( !window.localStorage.getItem("tasks") ) {
        reject( false );
      }
      else{
        let data = JSON.parse( window.localStorage.getItem("tasks") );
        resolve( data );
      }
    } );
  }

  sortGoals(){
    this.taskList.sort( (task1:Task, task2:Task ) => {
      return task2.stop - task1.stop;
    })
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from './models/task.interface';

@Injectable({
  providedIn: 'root'
})

export class DataService
 {
   //creating an array for the list of tasks input by the user
  taskList:Array<Task> = new Array();
  //creating the new task and inserting it into the array we just made
  list$ = new BehaviorSubject<Task[]>( this.taskList ) ;
  constructor() {
    this.loadGoals().then((data:Array<Task>) => {
      data.forEach((item) => {
        this.taskList.push(item)
      })
      //sorts the tasks/goals and puts the newest one up the top of the list
      this.sortGoals();
      this.list$.next( this.taskList );
    })
  }

  //add the tasks into the array list
  addToGoalsList( task:Task ) {
    //gets the current date and time
    new Date().getTime();

    //pushes task into the list
    this.taskList.push( task );
    this.list$.next( this.taskList);
    //sorts and refreshes the list so the task is shown
    this.sortGoals();
    this.updateGoals();
  }

  //deleting items from list
  disperseItems( id:number ) {
    //loops through items in list
    this.taskList.forEach( (task:Task, index ) => {
      if( task.created == id ) {
        //deletes the task here
        this.taskList.splice( index, 1 );
      }
    });

    //updates the list of tasks/goals in the background
    this.list$.next( this.taskList );
    //refreshes the page to show new list
    this.updateGoals();
    
  }

  //updates the goals in the list
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
    //updates the task list in the background
    this.list$.next( this.taskList );
  }

  loadGoals() {
    //loads all the tasks/goals onto the page
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

  //sorts them to put the newest goals at the top of the list
  sortGoals(){
    this.taskList.sort( (task1:Task, task2:Task ) => {
      return task2.created - task1.created;
    })
  }
}

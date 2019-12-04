//import
import { Component } from '@angular/core';
import { Task } from '../models/task.interface';
import { Subscription} from 'rxjs';
import { DataService } from '../data.service';
import { discardPeriodicTasks } from '@angular/core/testing';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {

  history:Array<Task> = [];
  historySub:Subscription;

  constructor(
    private dataService:DataService
  ) {}

  //grabs all history data
  ngOnInit(){
    this.historySub = this.dataService.list$.subscribe( taskData => this.history = taskData);
  }

//deletes items and updates db
  disperseItems(itemStart: number){
    this.dataService.disperseItems(itemStart);
  }

  //changes status of a task and updates db
  changeItemStatus(id:number){
    this.dataService.taskList.forEach((tasks)=>{
      if(tasks.created == id){
        tasks.status = true;
      }
    });

    //updates/refreshes the task list
    this.dataService.updateGoals();
    
  }
}

import { Component } from '@angular/core';
import { Task } from '../models/task.interface';
import { Subscription} from 'rxjs';
import { DataService } from '../data.service';

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

  ngOnInit(){
    this.historySub = this.dataService.list$.subscribe( taskData => this.history = taskData);
  }

  disperseItems(itemStart: number){
    this.dataService.disperseItems(itemStart);
  }

}

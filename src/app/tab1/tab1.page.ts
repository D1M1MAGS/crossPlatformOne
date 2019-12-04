import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, Form} from '@angular/forms';
import { Subscription} from 'rxjs';
import { Task } from '../models/task.interface';
import { DataService } from '../data.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  taskForm:FormGroup;
  timeCreated: number;
  stopTime: number;
  
  constructor(
    private formBuilder:FormBuilder,
    private dataService:DataService
  ) {}

  ngOnInit(){
    this.taskForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)] ]
    });
  }

  save(){
    let task:Task = {
      name: this.taskForm.get('name').value,
      created: new Date().getTime(),
      status: false
    }
    this.dataService.addToGoalsList(task);
    this.taskForm.reset();
  }

}
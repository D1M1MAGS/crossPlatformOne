//imports
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
  //creating formGroup
  taskForm:FormGroup;
  //initializing time created variable
  timeCreated: number;
  
  constructor(
    private formBuilder:FormBuilder,
    private dataService:DataService
  ) {}

  //code forces the 'add' button to be disable until a character 
  //is entered into the task textbox
  ngOnInit(){
    this.taskForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)] ] //needs only one character to work
    });
  }

  //function saves the data from the task textbox
  save(){
    let task:Task = {
      //grabs text from textbox and places it into name
      name: this.taskForm.get('name').value,
      //retrieves current data and time and places it into created
      created: new Date().getTime(),
      //makes the checkbox not ticked when created in list
      status: false
    }
    //adds the newest addition to the list
    this.dataService.addToGoalsList(task);
    //resets the textbox so it is empty
    this.taskForm.reset();
  }

}
export interface Task {
    //initializing variables

    //this is the text that is entered into the textbox on the homepage
    name:string;
    //this holds when the task was creating including time and date
    //this is shown in the list on the second tab
    created:number;
    //this is the status of whether the task has been checked or not
    //meaning it has been completed
    status:boolean;
}
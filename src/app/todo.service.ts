import { Injectable } from '@angular/core';

interface Task {
  name: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  tasks: Task[] = [];
  constructor() {
    this.loadTasks();
   }

  addTask(name: string) {
    this.tasks.push({ name, completed: false });
    this.saveTasksLocalStorage()
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasksLocalStorage()
  }

  updateTask(index: number, newName: string) {
    this.tasks[index].name = newName;
    this.saveTasksLocalStorage()
  }
  
  toggleTaskCompletion(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    console.log("Task status changed:", this.tasks[index]); 
    this.saveTasksLocalStorage();
  }


  public saveTasksLocalStorage() {
    localStorage.setItem('task', JSON.stringify(this.tasks)); // Save tasks
  }

  public loadTasks() {
    const savedTasks = localStorage.getItem('task');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

}

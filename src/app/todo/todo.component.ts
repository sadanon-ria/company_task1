import { Component } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
  
export class TodoComponent {
  newTask: string = '';
  
  editingIndex: number | null = null; // Track which task is being edited
  editedTaskName: string = ''; // Store the edited task name

  constructor(public todoService: TodoService) {}

  addTask() {
    if (this.newTask.trim()) {
      this.todoService.addTask(this.newTask);
      this.newTask = '';
    }
  }

  startEditing(index: number, taskName: string) {
    this.editingIndex = index;
    this.editedTaskName = taskName;
  }

  saveTask(index: number) {
    if (this.editedTaskName.trim()) {
      this.todoService.updateTask(index, this.editedTaskName);
      this.editingIndex = null; 
      this.todoService.saveTasksLocalStorage()
    }
  }

  updateTaskStatus(index: number) {
    console.log("Before toggle:", this.todoService.tasks[index].completed);
    this.todoService.toggleTaskCompletion(index); 
    console.log("After toggle:", this.todoService.tasks[index].completed);
  }

  cancelEditing() {
    this.editingIndex = null; 
  }
}

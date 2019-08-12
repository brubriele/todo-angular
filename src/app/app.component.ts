import { Component } from '@angular/core';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root', //<app-root></app-root>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: Todo[] = [];
  public title: String = 'Minhas tarefas';

  //Incluindo Tasks - quando componente iniciado
  constructor() {
    this.todos.push(new Todo(1, 'Passear com o cachorro', false));
    this.todos.push(new Todo(2, 'Ir ao supermecado', false));
    this.todos.push(new Todo(3, 'Cortar o cabelo', true));
  }

  alteraTexto() {
    this.title = 'Lista de tarefas'
  }

  //Métodos de Ação

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }

  markAsDone(todo: Todo) {
    todo.done = true
  }

  markAsUndone(todo) {
    todo.done = false
  }
}

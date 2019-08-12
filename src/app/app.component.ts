import { Component } from '@angular/core';
import { Todo } from 'src/models/todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root', //<app-root></app-root>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: Todo[] = [];
  public title: String = 'Minhas tarefas';
  public form: FormGroup;

  //Incluindo Tasks - quando componente iniciado
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required,
      ])]
    });

    this.load();
    //Tarefas duras
    // this.todos.push(new Todo(1, 'Passear com o cachorro', false));
    // this.todos.push(new Todo(2, 'Ir ao supermecado', false));
    // this.todos.push(new Todo(3, 'Cortar o cabelo', true));
  }

  add() {
    //this.form.value => { title: 'Título' }
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  clear() {
    this.form.reset();
  }

  //Métodos de Ação

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true
    this.save();
  }

  markAsUndone(todo) {
    todo.done = false
    this.save();
  }

  //persistir dados em localStorage
  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
  }

  //ler do localStorage e popular tarefas
  load() {
    const data = localStorage.getItem('todos');
    data ? this.todos = JSON.parse(data) : this.todos[''];
  }
}

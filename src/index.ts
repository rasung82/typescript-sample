import TodoItem from "./TodoItem";
import { data } from "./assets/data";
import TodoCollection from "./TodoCollection";

const sampleTodos : TodoItem[] = data.map(
  (item) => new TodoItem(item.id, item.task, item.complete)
);

const myTodoCollection = new TodoCollection("My TODO List!", sampleTodos);

myTodoCollection.addTodo("버스타기");
myTodoCollection.addTodo("잠자기");
myTodoCollection.addTodo("책읽기");

console.log(`${myTodoCollection.userName}`);
myTodoCollection.getTodoItems().forEach( item => item.printDetails() );
console.log('====================');
myTodoCollection.getTodoItems(false).forEach( item => item.printDetails() );
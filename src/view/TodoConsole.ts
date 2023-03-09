import * as inquirer from 'inquirer';
import TodoItem from '../model/TodoItem';
import TodoCollection from '../service/TodoCollection';
import { data } from '../assets/data';
import { Commands } from '../model/Commands';


class TodoConsole {
  private todoCollection: TodoCollection;

  private showComplete: boolean;

  /**
   * 생성자.
   */
  constructor() {

    const sampleTodos: TodoItem[] = data.map(
      item => new TodoItem(item.id, item.task, item.complete)
    );

    this.showComplete = true;
    this.todoCollection = new TodoCollection('My Todo List', sampleTodos);;
  }


  displayTodoList() : void {
    console.log(
      `======${this.todoCollection.userName}======` + 
      `(${this.todoCollection.getItemCounts().incomplete} items todo)`
    )
    this.todoCollection
    .getTodoItems()
    .forEach( item => item.printDetails() );
  }


  /**
   * 사용자 입력
   */
  promptUser() : void {
    console.clear();
    this.displayTodoList();

    inquirer.prompt({
      type: 'list',
      name: 'command',
      message: 'Choose option',
      choices: Object.values(Commands)
    }).then( answers => {
      switch(answers['command']){
        case Commands.Toggle:
          this.showComplete = !this.showComplete;
          this.promptUser()
          break;

        case Commands.Add:
          this.promptAdd();
          break;

        case Commands.Purge:
          this.todoCollection.removeComplete();
          this.promptUser();
          break;

        case Commands.Complete:
          if(this.todoCollection.getItemCounts().incomplete > 0 ) {
            this.promptComplete();
          } else {
            this.promptUser();
          }
          break;

        case Commands.Quit:
          return;
      }
    })
  }

  /**
   * Todo 추가
   */
  promptAdd() : void {
    console.clear();

    inquirer.prompt({
      type: 'input',
      name: 'add',
      message: 'Enter Task : '
    }).then( answers => {
      if(answers['add'] !== ""){
        this.todoCollection.addTodo(answers['add']);
      }
      this.promptUser();
    });
  }


  /**
   * 완료 Todo 삭제
   */
  promptComplete() : void {
    console.clear();

    inquirer.prompt({
      type: 'checkbox',
      name: 'complete',
      message: 'Mark Tasks Complete',
      choices: this.todoCollection.getTodoItems(this.showComplete).map( item => ({
        name: item.task, 
        value: item.id,
        checked: item.complete
      }))
    }).then(answers => {
      let completedTasks = answers['complete'] as number[];
      this.todoCollection.getTodoItems(true).forEach( item => {
        this.todoCollection.markComplete(
          item.id,
          completedTasks.find(id => id === item.id) != undefined
        )

      })
      this.promptUser();
    })
  }
}

export default TodoConsole;
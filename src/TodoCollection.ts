import TodoItem from "./TodoItem";


class TodoCollection {
  private nextId: number = 1;

  /**
   * 생성자
   * @param userName 
   * @param todoItems 
   */
  constructor(public userName:string, public todoItems:TodoItem[] = []) {

  }

  /**
   * 찾기
   * @param id 
   * @returns 
   */
   getTodoById(id: number) : TodoItem | undefined {
    return this.todoItems.find( item => item.id === id);
   }

   /**
    * 생성
    * @param task 
    * @returns 
    */
   addTodo(task: string) : number {
    while(this.getTodoById(this.nextId)) {
      this.nextId++;
    }
    this.todoItems.push( new TodoItem(this.nextId, task) );   
    return this.nextId;
   }

   /**
    * 완료 처리
    * @param id 
    * @param compele 
    */
   markComplete(id: number, compele:boolean) : void {
    const todoItem = this.getTodoById(id);
    if(todoItem) {
      todoItem.complete = compele;
    }
   }
}

export default TodoCollection;
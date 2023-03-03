import TodoItem from "./TodoItem";


class TodoCollection {
  private nextId: number = 1;
  private itemMap: Map<number, TodoItem>; // Generic Type 

  /**
   * 생성자
   * @param userName 
   * @param todoItems 
   */
  constructor(public userName:string, todoItems:TodoItem[] = []) {
    this.itemMap = new Map<number, TodoItem>;
    todoItems.forEach( item => this.itemMap.set(item.id, item));
  }

  /**
   * 찾기
   * @param id 
   * @returns 
   */
  getTodoById(id: number) : TodoItem | undefined {
    return this.itemMap.get(id);
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
    this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));   
    return this.nextId;
  }


  /**
   * 조회
   * @param includeComplete 
   * @returns 
   */
  getTodoItems(includeComplete: boolean = true): TodoItem[] {
    return [...this.itemMap.values()].filter(item => !item.complete || includeComplete);
  }


  /**
   * 제거
   */
  removeComplete(): void {
    this.itemMap.forEach( item => {
      if(item.complete) {
        this.itemMap.delete(item.id);
      }
    })
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
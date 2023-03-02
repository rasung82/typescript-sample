class TodoItem {
  // private id: number;
  // private task: string;
  // protected complete: boolean;

  /**
   * 생성자
   * @param id 
   * @param task 
   * @param complete 
   */
  constructor(public id: number, public task: string, public complete: boolean = false) {
    this.id = id;
    this.task = task;
    this.complete = complete;
  }

  /**
   * 출력
   */
  printDetails(): void {
    console.log(
      `${this.id}\t${this.task}\t${this.complete ? "\t(complete)" : ""}`
      );
  }
}

export default TodoItem;
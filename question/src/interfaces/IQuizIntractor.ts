export interface IQuizInteractor {
    createUser(user: any): Promise<any>;
    login(data:any): Promise<any>;
    addQuiz(data:any): Promise<any>;
    
  }
  
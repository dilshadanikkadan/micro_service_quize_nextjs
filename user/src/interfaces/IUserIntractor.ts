export interface IUserInteractor {
    createUser(user: any): Promise<any>;
    login(data:any): Promise<any>;
    
  }
  
export interface IUser{
    _id: string,
    username: string,
    email: string,
    password: string
}

export interface ITask {
    _id: string;
    userId: string;
    title: string;
    description: string;
    category: 'personal' | 'work' | 'education';
    status: 'todo' | 'ongoing' | 'completed';
    createdAt: string;
    updatedAt: string;
  }
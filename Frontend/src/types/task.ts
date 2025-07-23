export interface Task {
  _id: string;
  text: string;
  status: 'pending' | 'in progress' | 'completed';
  createdAt: string;
  user: {
    _id: string;
    email: string;
  };
}

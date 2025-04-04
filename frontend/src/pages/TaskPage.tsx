import { useState } from 'react';
import { Button } from '../components/ui/button';
import { useTaskStore } from '../store/useTaskStore';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import LoadingPage from '../components/LoadingPage';
import CreateTask from '../components/CreateTask';
import TaskCard from '../components/TaskCard';

const TaskPage = () => {
  const { tasks, isGettingTasks } = useTaskStore();
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  if (isGettingTasks) {
    return <LoadingPage />;
  }

  // Filter tasks based on selected filters
  const filteredTasks = tasks?.filter(task => {
    const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">My Tasks</h1>
          <p className="mt-2">Manage and organize your projects efficiently</p>
        </div>
      </header>
      
      {/* Task Management Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Controls and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <CreateTask />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              {/* Category filter using shadcn/ui Select */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Status filter buttons */}
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('all')}
              className={statusFilter === 'all' ? 'bg-blue-600' : 'border-gray-300 cursor-pointer'}
            >
              All
            </Button>
            <Button 
              variant={statusFilter === 'todo' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('todo')}
              className={statusFilter === 'todo' ? 'bg-gray-600' : 'border-gray-300 cursor-pointer'}
            >
              To Do
            </Button>
            <Button 
              variant={statusFilter === 'ongoing' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('ongoing')}
              className={statusFilter === 'ongoing' ? 'bg-purple-600' : 'border-gray-300 cursor-pointer'}
            >
              In Progress
            </Button>
            <Button 
              variant={statusFilter === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('completed')}
              className={statusFilter === 'completed' ? 'bg-blue-600' : 'border-gray-300 cursor-pointer'}
            >
              Completed
            </Button>
          </div>
        </div>
        
        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks?.map(task => (
            <TaskCard key={task._id} task={task} />
          ))}
          
          {/* Empty State */}
          {filteredTasks?.length === 0 && (
            <div className="col-span-full bg-white rounded-lg shadow-md p-12 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
              <p className="text-gray-600 mb-6">
                {categoryFilter !== 'all' || statusFilter !== 'all' 
                  ? 'There are no tasks matching your current filters.' 
                  : 'You have no tasks yet.'}
              </p>
              <CreateTask/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
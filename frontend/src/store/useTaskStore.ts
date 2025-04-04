import { create } from "zustand";
import { ITask } from "../utils/interfaces.js";
import { toast } from "react-toastify";
import taskapi from "../utils/axios.js";

export interface ITaskStore {
  tasks: ITask[];
  task: ITask
  isCreatingTask: boolean;
  isGettingTasks: boolean;
  isUpdatingTask: boolean;
  isDeletingTask: boolean;
  createTask: (title: string, description: string, category: string) => Promise<boolean>;
  fetchAllTasks: () => Promise<boolean>;
  getTaskById: (id: string) => Promise<boolean>;
  updateTask: (id: string, title: string, description: string, category: string, status:string) => Promise<boolean>
  deleteTask: (id: string) => Promise<boolean>
}

export const useTaskStore = create<ITaskStore>((set) => ({
  tasks: [],
  task: {
    _id: "",
    userId: "",
    title: "",
    description: "",
    category: "work",
    status: "todo",
    createdAt: "",
    updatedAt: "",
  },
  isCreatingTask: false,
  isGettingTasks: false,
  isUpdatingTask: false,
  isDeletingTask: false,

  createTask: async (title, description, category) => {
    set({ isCreatingTask: true });

    if (!title || !description || !category) {
      toast.error("All fields are required");
      set({ isCreatingTask: false });
      return false;
    }

    try {
      const response = await taskapi.post("/task/create", { title, description, category });

      if (!response.data.success) {
        toast.error(response.data.message || "Something went wrong");
        return false;
      }

      // Correctly update state by spreading previous tasks
      set((state) => ({
        tasks: [...state.tasks, response.data.task],
        isCreatingTask: false,
      }));

      toast.success("Task created successfully!");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      return false;
    } finally {
      set({ isCreatingTask: false });
    }
  },

  fetchAllTasks: async () => {
    set({ isGettingTasks: true });
    try {
      const response = await taskapi.get("/task/get");
      if (!response.data.success) {
        toast.error(response.data.message || "Something went wrong");
        return false;
      }

      set({ tasks: response.data.tasks, isGettingTasks: false });
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      return false;
    } finally {
      set({ isGettingTasks: false });
    }
  },

  getTaskById: async(id) => {
    try {
      const response = await taskapi.get(`/task/get/${id}`);
      if (!response.data.success) {
        toast.error(response.data.message || "Something went wrong");
        return false;
      }
      set({ task: response.data.task });
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      return false;
    }
  },

  updateTask: async (id, title, description, category, status) => {
    set({ isUpdatingTask: true });
  
    if (!title || !description || !category || !status) {
      toast.error("All fields are required");
      set({ isUpdatingTask: false });
      return false;
    }
  
    try {
      const response = await taskapi.put(`/task/update/${id}`, {
        title,
        description,
        category,
        status,
      });
  
      if (!response.data.success) {
        toast.error(response.data.message || "Failed to update task");
        return false;
      }
  
      const updatedTask = response.data.task;
  
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task._id === id ? updatedTask : task
        ),
        task: state.task._id === id ? updatedTask : state.task,
        isUpdatingTask: false,
      }));
  
      toast.success("Task updated successfully!");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating the task");
      return false;
    } finally {
      set({ isUpdatingTask: false });
    }
  },

  deleteTask: async (id) => {
    set({ isDeletingTask: true });
  
    try {
      const response = await taskapi.delete(`/task/delete/${id}`);
  
      if (!response.data.success) {
        toast.error(response.data.message || "Failed to delete task");
        return false;
      }
  
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== id),
        isDeletingTask: false,
      }));
  
      toast.success("Task deleted successfully!");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting the task");
      return false;
    } finally {
      set({ isDeletingTask: false });
    }
  },
  
}));

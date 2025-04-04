import { create } from "zustand";
import { IUser } from "../utils/interfaces.js";
import { toast } from "react-toastify";
import taskapi from "../utils/axios.js";

export interface IAuthStore {
  user: IUser | null;
  signUpLoading: boolean;
  loginLoading: boolean;
  checkAuthLoading: boolean;
  checkingAuth: boolean;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<IAuthStore>((set, get) => ({
  user: null,
  signUpLoading: false,
  loginLoading: false,
  checkAuthLoading: false,
  checkingAuth: true,

  signup: async (username, email, password) => {
    set({ signUpLoading: true });

    if (!username || !email || !password) {
      toast.error("All fields are required");
      set({ signUpLoading: false });
      return false;
    }

    try {
      const response = await taskapi.post("/user/signup", { username, email, password });

      if (!response.data.success) {
        toast.error(response.data.message || "Something went wrong");
        return false;
      }

      set({ user: response.data.user });
      toast.success("Account created successfully!");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      return false;
    } finally {
      set({ signUpLoading: false });
    }
  },

  login: async (email, password) => {
    set({ loginLoading: true });

    if (!email || !password) {
      toast.error("All fields are required");
      set({ loginLoading: false });
      return false;
    }

    try {
      const response = await taskapi.post("/user/login", { email, password });

      if (!response.data.success) {
        toast.error(response.data.message || "Something went wrong");
        return false;
      }

      set({ user: response.data.user });
      toast.success("Login successful!");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      return false;
    } finally {
      set({ loginLoading: false });
    }
  },

  logout: async () => {
    try {
      await taskapi.post("/user/logout");
      set({ user: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true, checkAuthLoading: true });

    try {
      const response = await taskapi.get("/user/profile");

      if (!response.data.success) {
        set({ user: null });
        return;
      }

      set({ user: response.data.user });
    } catch (error) {
      console.error("Auth error:", error);
      set({ user: null });
    } finally {
      set({ checkingAuth: false, checkAuthLoading: false });
    }
  },
}));

import { Navigate, Route, Routes } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import LoadingPage from "./components/LoadingPage";
import TaskPage from "./pages/TaskPage";
import { useTaskStore } from "./store/useTaskStore";
import EditTaskPage from "./pages/EditTaskPage";

function App() {
  const { user, checkAuth, checkingAuth } = useAuthStore();
  const { fetchAllTasks } = useTaskStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) {
      fetchAllTasks();
    }
  }, [user]);

  if (checkingAuth) return <LoadingPage />;

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/tasks" /> : <Signup />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/tasks" /> : <Login />}
        />
        <Route
          path="/tasks"
          element={user ? <TaskPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit/:taskId"
          element={user ? <EditTaskPage /> : <Navigate to="/login" />}
        />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </div>
  );
}

export default App;

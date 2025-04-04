import { useState } from "react";
import { ITask } from "../utils/interfaces";
import { Button } from "./ui/button";
import { formatDistanceToNow } from "date-fns";
import { Edit, Loader2, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useTaskStore } from "../store/useTaskStore";

const TaskCard = ({ task }: { task: ITask }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const {deleteTask, isDeletingTask} = useTaskStore();

  const handleDeleteTask = () => {
    deleteTask(task._id);
  }

  // Format the updated date
  const updatedTimeAgo = task.updatedAt
    ? formatDistanceToNow(new Date(task.updatedAt), { addSuffix: true })
    : "recently";

  // Get first 30 words for the truncated description
  const words = task.description.split(" ");
  const truncatedDescription = words.slice(0, 30).join(" ");
  const isTruncated = words.length > 30;

  // Status styling
  const statusStyles = {
    todo: {
      badge: "bg-gray-100 text-gray-800",
      border: "border-l-4 border-gray-400",
    },
    ongoing: {
      badge: "bg-purple-100 text-purple-800",
      border: "border-l-4 border-purple-500",
    },
    completed: {
      badge: "bg-blue-100 text-blue-800",
      border: "border-l-4 border-blue-500",
    },
  };

  // Category styling
  const categoryStyles = {
    personal: "bg-green-100 text-green-800",
    work: "bg-orange-100 text-orange-800",
    education: "bg-indigo-100 text-indigo-800",
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${
        statusStyles[task.status].border
      }`}
    >
      {/* Task Status Badge and Category */}
      <div className="flex justify-between items-center mb-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            statusStyles[task.status].badge
          }`}
        >
          {task.status === "completed"
            ? "Completed"
            : task.status === "ongoing"
            ? "In Progress"
            : "To Do"}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            categoryStyles[task.category]
          }`}
        >
          {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
        </span>
      </div>

      {/* Task Title */}
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{task.title}</h3>

      {/* Task Description */}
      <div className="mb-4">
        <p className="text-gray-600">
          {showFullDescription ? task.description : truncatedDescription}
          {isTruncated && !showFullDescription && "..."}
        </p>
        {isTruncated && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-blue-600 text-sm mt-1 hover:underline cursor-pointer"
          >
            {showFullDescription ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {/* Last Updated */}
      <div className="text-xs text-gray-500 mb-4">
        Last updated: {updatedTimeAgo}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <Link to={`/edit/${task._id}`}>
          <Button
            variant="outline"
            size="sm"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white flex-1 cursor-pointer"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </Link>
        <Button
          size="sm"
          variant={"destructive"}
          className=" text-white hover:bg-red-700 cursor-pointer"
          onClick={handleDeleteTask}
        >
          <Trash className="mr-2 h-4 w-4" />
          {isDeletingTask ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : "Delete"}
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;

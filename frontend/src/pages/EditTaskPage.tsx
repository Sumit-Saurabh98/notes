import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useParams } from "react-router-dom";

import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import { Loader2 } from "lucide-react";
import { useTaskStore } from "../store/useTaskStore";

// Define task categories
const categories = [
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
  { value: "education", label: "Education" },
];

// Define task statuses
const statuses = [
  { value: "todo", label: "To Do" },
  { value: "ongoing", label: "On Going" },
  { value: "completed", label: "Completed" },
];

// Form validation schema
const EditTaskSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Task title must be at least 3 characters long" })
    .max(100, { message: "Task title cannot exceed 100 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(500, { message: "Description cannot exceed 500 characters" }),
  category: z.string({
    required_error: "Please select a category",
  }),
  status: z.string({
    required_error: "Please select the status",
  }),
});

type FormValues = z.infer<typeof EditTaskSchema>;

const EditTaskPage = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const { task, getTaskById, updateTask, isUpdatingTask } = useTaskStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(EditTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "work",
      status: "todo",
    },
  });

  // Fetch task on mount
  useEffect(() => {
    if (taskId) getTaskById(taskId);
  }, [taskId]);

  // Reset form when task is loaded
  useEffect(() => {
    if (task && task._id) {
      form.reset({
        title: task.title,
        description: task.description,
        category: task.category,
        status: task.status,
      });
    }
  }, [task]);

  // Form submit handler
  const onSubmit = async (values: FormValues) => {
    const res = await updateTask(
      taskId!,
      values.title,
      values.description,
      values.category,
      values.status
    );
    if (res) {
      form.reset(values);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Task</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter task title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your task"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Add more context to your task</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="cursor-pointer">
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value} >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statuses.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
          >
            {isUpdatingTask ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Update Task"
            )}
          </Button>
          <Link to="/tasks">
          <Button
            type="submit"
            variant={"secondary"}
            className="w-full hover:bg-gray-300 cursor-pointer"
          >
              Go Back
          </Button>
          </Link>
        </form>
      </Form>
    </div>
  );
};

export default EditTaskPage;

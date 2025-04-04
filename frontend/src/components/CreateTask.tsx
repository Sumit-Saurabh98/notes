
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog';
import { Button } from '../components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Loader2, PlusCircle } from 'lucide-react';
import { useTaskStore } from '../store/useTaskStore';

// Define task categories
const categories = [
  { value: 'work', label: 'Work' },
  { value: 'personal', label: 'Personal' },
  { value: 'education', label: 'Education' },
];

// Define the form schema with Zod
const formSchema = z.object({
  title: z.string()
    .min(3, { message: 'Task title must be at least 3 characters long' })
    .max(100, { message: 'Task title cannot exceed 100 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long' })
    .max(500, { message: 'Description cannot exceed 500 characters' }),
  category: z.string({
    required_error: 'Please select a category',
  }),
});

// Define type from schema
type FormValues = z.infer<typeof formSchema>;

const CreateTask = () => {

    const {createTask, isCreatingTask} = useTaskStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
    },
  });

  // Form submission handler
  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    const res = await createTask(values.title, values.description, values.category);
    if(res){
      form.reset();
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
          <PlusCircle className="mr-2 h-4 w-4" />
           Add New Task
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold">Add New Task</AlertDialogTitle>
          <AlertDialogDescription>
            Create a new task for your list. Fill in the details below.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter task title" 
                      {...field} 
                      className="focus-visible:ring-blue-600"
                    />
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
                      placeholder="Add details about your task"
                      className="resize-none focus-visible:ring-blue-600"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Add more context to your task
                  </FormDescription>
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
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="focus:ring-blue-600">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem 
                          key={category.value} 
                          value={category.value}
                        >
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <AlertDialogFooter className="sm:justify-end gap-2 pt-4">
              <AlertDialogCancel asChild>
                <Button type="button" variant="outline" className='bg-gray-600 hover:bg-gray-700 cursor-pointer'>
                  Cancel
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
                {isCreatingTask ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Add Task"
                )}
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateTask;
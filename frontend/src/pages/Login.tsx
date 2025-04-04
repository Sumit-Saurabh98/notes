
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Loader2 } from 'lucide-react';

// Define the validation schema using Zod
const loginSchema = z.object({
  email: z.string()
    .email({ message: 'Please enter a valid email address' }),
  password: z.string()
    .min(1, { message: 'Password is required' }),
  rememberMe: z.boolean().optional()
});

const Login = () => {
  const navigate = useNavigate()

  const {login, loginLoading} = useAuthStore();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const res = await login(values.email, values.password);
    form.reset();
    if(res){
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 bg-blue-600 rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Sign in to your TaskMaster account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="Enter your email" 
                        {...field} 
                        className="focus:border-blue-600 focus:ring-blue-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>Password</FormLabel>
                      <a href="#" className="text-sm text-blue-600 hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Enter your password" 
                        {...field} 
                        className="focus:border-blue-600 focus:ring-blue-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="text-sm leading-none">
                      Remember me
                    </div>
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mt-6 cursor-pointer">
              {loginLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Log in"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
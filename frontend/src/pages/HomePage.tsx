
import { ClipboardList, Clock, Tag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Manage Tasks Like Never Before</h1>
                <p className="text-xl mb-8">Streamline your workflow, boost productivity, and never miss a deadline again.</p>
                  <Link to="/login">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-200 cursor-pointer">Get Started</Button>
                  </Link>
              </div>
              <div className="md:w-1/2">
                <img src="https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2 " alt="Task Management Dashboard" className="rounded-lg shadow-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Task Manager</h2>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <ClipboardList className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Intuitive Task Management</h3>
        <p className="text-gray-600">Simple, user-friendly interface makes organizing tasks effortless and efficient.</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Clock className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Change Anytime</h3>
        <p className="text-gray-600">Effortless task updates and changes, ensuring your tasks are always up-to-date and accurate.</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Tag className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Free of cost</h3>
        <p className="text-gray-600">TaskMaster is completely free to use, no hidden fees or subscriptions.</p>
      </div>
    </div>
  </div>
</section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="italic mb-4">"This task manager has completely transformed how our team works. We're more organized and productive than ever before."</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3">
                    <img className='w-full h-full rounded-full' src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Sarah" />
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-gray-600">Task Manager</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="italic mb-4">"The intuitive interface and smart features have helped me stay on top of my tasks and deadlines effortlessly."</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3">
                    <img className='w-full h-full rounded-full' src='https://images.pexels.com/photos/262391/pexels-photo-262391.jpeg?auto=compress&cs=tinysrgb&w=800' alt="Mark" />
                  </div>
                  <div>
                    <p className="font-semibold">Mark Thompson</p>
                    <p className="text-sm text-gray-600">Freelance Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of users who have transformed their productivity with our task management solution.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-200 cursor-pointer">Sign Up Free</Button>
              </Link>
              <Link to="/tasks">
              <Button size="lg" variant="outline" className="bg-transparent hover:bg-gray-100 cursor-pointer">Go to Dashboard</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
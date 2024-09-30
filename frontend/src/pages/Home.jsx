import React from 'react';

const HomePage = () => {
  return (
    <div className="bg-gray-100 font-sans">
      <header className="bg-blue-600 text-white">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="text-xl font-bold">NoteWise</div>
          <div>
            <a href="#features" className="mx-3 hover:text-blue-200">Features</a>
            <a href="/signup" className="mx-3 hover:text-blue-200">Get Started</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero bg-blue-500 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Simplify Your Note-Taking</h1>
            <p className="text-xl mb-8">Create, update, and manage your notes with ease.</p>
            <a href="#get-started" className="bg-white text-blue-500 py-2 px-6 rounded-full text-lg font-semibold hover:bg-blue-100 transition duration-300">
              Get Started
            </a>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                title="Create Notes"
                description="Easily create new notes and jot down your ideas in seconds."
              />
              <FeatureCard
                title="Update Anytime"
                description="Edit and update your notes whenever you need to keep them current."
              />
              <FeatureCard
                title="Delete with Ease"
                description="Remove unwanted notes quickly to keep your workspace clean."
              />
            </div>
          </div>
        </section>

        <section id="get-started" className="bg-gray-200 py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
            <p className="text-xl mb-8">Join thousands of users who have simplified their note-taking process.</p>
            <a href="/login" className="bg-blue-500 text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-blue-600 transition duration-300">
              Create Your First Note
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 NoteWise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default HomePage;
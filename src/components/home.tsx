import React from "react";
import PizzaConfigurator from "./PizzaConfigurator";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-amber-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-1 sm:px-4">
          <h1 className="text-4xl font-bold text-center">Pizza-Konfigurator</h1>
          <p className="text-center mt-2 max-w-2xl mx-auto">
            Erstelle deine perfekte hausgemachte Pizza mit unserem Konfigurator
          </p>
        </div>
      </header>

      <main className="container mx-auto px-1 sm:px-4 py-8">
        <PizzaConfigurator />
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-1 sm:px-4 text-center">
          <p>© {new Date().getFullYear()} Pizza-Konfigurator</p>
          <p className="text-sm mt-2 text-gray-400">
            Erstelle deine perfekte hausgemachte Pizza mit unserem Konfigurator
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

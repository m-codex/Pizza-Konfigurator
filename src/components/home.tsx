import React from "react";
import PizzaConfigurator from "./PizzaConfigurator";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="text-white -mx-10 px-10 shadow-md bg-center bg-cover bg-[url('https://storage.googleapis.com/tempo-public-images/github%7C97963158-1743606315193-Pizzajpg')]">
        <div className="flex flex-col py-6 gap-2 w-full mx-auto px-2 sm:px-4 bg-black/30">
          <h1 className="text-4xl font-bold text-center">
            Der Ultimative Pizza-Konfigurator
          </h1>
          <p className="text-xl text-center mt-2 max-w-2xl mx-auto">
            Erstelle deine perfekte hausgemachte Pizza mit unserem Konfigurator
          </p>
        </div>
      </header>
      <main className="container mx-auto px-1 sm:px-4 py-1">
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

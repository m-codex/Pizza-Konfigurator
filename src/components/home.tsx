import React from "react";
import PizzaConfigurator from "./PizzaConfigurator";
import { Language } from "../lib/i18n";

interface HomeProps {
  language?: Language;
}

const Home: React.FC<HomeProps> = ({ language = "de" }) => {
  return <PizzaConfigurator language={language} />;
};

export default Home;

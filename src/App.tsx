import "./App.css";
import Header from "./components/Header.tsx";
import NotebookPage from "./components/Notebook/NotebookPage.tsx";
import setupGlobals from "./globals.js";
import { NotebookProvider } from "./hooks/useNotebook.tsx";

setupGlobals();

function App() {
  return (
    <>
      <NotebookProvider>
        <h1 className="text-3xl bg-white">
          Zecimal Notebook<sub>(open-beta)</sub>
        </h1>
        <Header />
        <NotebookPage />
      </NotebookProvider>
    </>
  );
}

export default App;

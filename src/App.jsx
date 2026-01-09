import Navigation from './components/Navigation';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Thinking from './components/Thinking';
import Experience from './components/Experience';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <ThemeToggle />
        <Navigation />
        <About />
        <Experience />
        <Projects />
        <Thinking />
        <Contact />
      </div>
    </ThemeProvider>
  );
}

export default App;

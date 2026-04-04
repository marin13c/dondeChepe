import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import About from './components/About';
import Location from './components/Location';
import Reviews from './components/Reviews';
import Contact from './components/Contact';

function App() {
  return (
    <div className="w-full">
      <Navbar />
      <Hero />
      <Menu />
      <About />
      <Location />
      <Reviews />
      <Contact />
    </div>
  );
}

export default App;

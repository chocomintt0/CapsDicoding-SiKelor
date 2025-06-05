import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import About from './components/About';
import Event from './components/Event'

function App() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <Gallery/>
      <About/>
      <Event/>
    </div>
  );
}

export default App;

import NavbarHome from './components/NavbarHome';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import About from './components/About';
import Event from './components/Event'

function App() {
  return (
    <div className="relative">
      <NavbarHome />
      <Hero />
      <Gallery/>
      <About/>
      <Event/>
    </div>
  );
}

export default App;

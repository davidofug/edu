import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Outline from './components/Outline';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/second-cohort-fullstak-outline"
          element={<Outline id="fullstack-cohort-2" />}
        />
      </Routes>
    </Router>
  );
};

export default App;

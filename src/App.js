import Routing from "./Routing";
import { AuthProvider } from './components/helpers/AuthProvider'
function App() {
  return (
    <AuthProvider>
      <Routing />
    </AuthProvider>
  );
}

export default App;

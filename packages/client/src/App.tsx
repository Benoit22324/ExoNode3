import './App.css'
import { AuthProvider } from './context/authContext';
import { Router } from './router/Router';

function App() {
  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  )
}

export default App

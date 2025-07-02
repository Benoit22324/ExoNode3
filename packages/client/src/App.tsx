import './App.css'
import { AuthProvider } from './context/authContext';
import { MainRouter } from './router/MainRouter';

function App() {
  return (
    <>
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </>
  )
}

export default App

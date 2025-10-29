
import AppRoutes from './routes/AppRoutes'
import './App.css'

function App() {

  return <>
    <div className="background-container">
      <div className="glow-lines"></div>
      <div className="grid-pattern"></div>
    </div>

    <div className="position-relative" style={{ zIndex: 1 }}>
      <AppRoutes />
    </div>
  </>
}

export default App

import './App.css'
import Sidebar from "./Sidebar.tsx";
import Dashboard from "./Dashboard.tsx";

function App() {

  return (
      <div className="app">
          <div className="sidebar">
              <div className="sidebar-content">
                  <Sidebar/>
              </div>
          </div>
          <div className="main-content">
              <Dashboard/>
          </div>
      </div>
  )
}

export default App

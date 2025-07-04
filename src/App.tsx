import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import HomePage from './pages/HomePage/HomePage'
import NovelDetailPage from './pages/NovelDetailPage/NovelDetailPage'
import VisualizePage from './pages/VisualizePage/VisualizePage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/novel/:id" element={<NovelDetailPage />} />
          <Route path="/visualize/:id" element={<VisualizePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App 
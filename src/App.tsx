import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ResumePage from './pages/ResumePage'
import BucketListPage from './pages/BucketListPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/bucket-list" element={<BucketListPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

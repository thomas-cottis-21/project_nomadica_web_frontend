import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import LandingPage from './pages/LandingPage'
import ResumePage from './pages/ResumePage'
import BucketListPage from './pages/BucketListPage'
import BlogIndexPage from './pages/BlogIndexPage'
import BlogPostPage from './pages/BlogPostPage'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/bucket-list" element={<BucketListPage />} />
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

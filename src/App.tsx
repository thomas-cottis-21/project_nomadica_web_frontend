import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'
import LandingPage from './pages/LandingPage'
import ResumePage from './pages/ResumePage'
import BucketListPage from './pages/BucketListPage'
import BlogIndexPage from './pages/BlogIndexPage'
import BlogPostPage from './pages/BlogPostPage'
import LoginPage from './pages/LoginPage'
import OAuthCallbackPage from './pages/OAuthCallbackPage'
import ProfilePage from './pages/ProfilePage'
import PostEditorPage from './pages/PostEditorPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/bucket-list" element={<BucketListPage />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/callback" element={<OAuthCallbackPage />} />

          {/* Protected — any authenticated user */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />

          {/* Protected — EDITOR role only */}
          <Route path="/editor/new" element={
            <ProtectedRoute requiredRole="EDITOR">
              <PostEditorPage />
            </ProtectedRoute>
          } />
          <Route path="/editor/:id" element={
            <ProtectedRoute requiredRole="EDITOR">
              <PostEditorPage />
            </ProtectedRoute>
          } />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

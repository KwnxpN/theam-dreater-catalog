import DefaultLayout from './components/layout/DefaultLayout'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import OurStory from './pages/OurStory'
import ProductDetailPage from './pages/ProductDetailPage'
import NotFound from './pages/NotFound'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <DefaultLayout>
          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DefaultLayout>
      </BrowserRouter>
    </>
  )
}

export default App

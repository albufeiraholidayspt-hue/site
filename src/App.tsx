import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { DataBackup } from './components/DataBackup';
import { CookieBanner } from './components/CookieBanner';
import MobileCacheBuster from './lib/mobileCacheBuster';
import MobileDebug from './lib/mobileDebug';
import AggressiveMobileSolution from './lib/aggressiveMobileSolution';

// Lazy load pages for code splitting - reduces initial bundle size
const ApartmentDetail = lazy(() => import('./pages/ApartmentDetail').then(m => ({ default: m.ApartmentDetail })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Algarve = lazy(() => import('./pages/Algarve').then(m => ({ default: m.Algarve })));
const RentACar = lazy(() => import('./pages/RentACar').then(m => ({ default: m.RentACar })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const Login = lazy(() => import('./pages/admin/Login').then(m => ({ default: m.Login })));
const Dashboard = lazy(() => import('./pages/admin/Dashboard').then(m => ({ default: m.Dashboard })));
const UploadDemo = lazy(() => import('./pages/UploadDemo'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-500">A carregar...</p>
    </div>
  </div>
);

function App() {
  useEffect(() => {
    // Defer non-critical initialization to reduce main thread blocking
    const initTimeout = setTimeout(() => {
      // Inicializar Mobile Cache Buster
      const cacheBuster = MobileCacheBuster.getInstance();
      cacheBuster.initMobileOptimizations();
      
      // Inicializar solução para mobile
      const aggressive = AggressiveMobileSolution.getInstance();
      aggressive.init();
      
      // Debug apenas em desenvolvimento
      if (import.meta.env.DEV) {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
          const debug = MobileDebug.getInstance();
          debug.debugFullSystem();
        }
        (window as any).mobileDebug = MobileDebug.getInstance();
        (window as any).aggressiveMobile = AggressiveMobileSolution.getInstance();
      }
    }, 100); // Defer by 100ms to let critical content render first
    
    return () => clearTimeout(initTimeout);
  }, []);

  return (
    <>
      <DataBackup />
      <CookieBanner />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="apartamento/:slug" element={<ApartmentDetail />} />
            <Route path="contacto" element={<Contact />} />
            <Route path="politica-privacidade" element={<PrivacyPolicy />} />
            <Route path="algarve" element={<Algarve />} />
            <Route path="rent-a-car" element={<RentACar />} />
            <Route path="upload-demo" element={<UploadDemo />} />
          </Route>
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;

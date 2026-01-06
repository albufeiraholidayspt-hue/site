import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { ApartmentDetail } from './pages/ApartmentDetail';
import { Contact } from './pages/Contact';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import UploadDemo from './pages/UploadDemo';
import { DataBackup } from './components/DataBackup';
import MobileCacheBuster from './lib/mobileCacheBuster';
import MobileDebug from './lib/mobileDebug';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Inicializar Mobile Cache Buster (sem elementos visuais)
    const cacheBuster = MobileCacheBuster.getInstance();
    cacheBuster.initMobileOptimizations();
    
    // Debug completo no mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      console.log('📱 Mobile detectado - iniciando debug completo...');
      const debug = MobileDebug.getInstance();
      debug.debugFullSystem();
    }
    
    // Adicionar debug global para fácil acesso
    (window as any).mobileDebug = MobileDebug.getInstance();
    console.log('🔍 Debug disponível em: window.mobileDebug.debugFullSystem()');
    console.log('🔄 Reset disponível em: window.mobileDebug.forceFullReset()');
  }, []);

  return (
    <>
      <DataBackup />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="apartamento/:slug" element={<ApartmentDetail />} />
          <Route path="contacto" element={<Contact />} />
          <Route path="upload-demo" element={<UploadDemo />} />
        </Route>
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;

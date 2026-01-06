import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { ApartmentDetail } from './pages/ApartmentDetail';
import { Contact } from './pages/Contact';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import UploadDemo from './pages/UploadDemo';
import { CacheBuster } from './components/CacheBuster';

function App() {
  // Versão baseada na data atual para forçar updates
  const currentVersion = new Date().toISOString().split('T')[0];

  return (
    <>
      <CacheBuster version={currentVersion} />
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

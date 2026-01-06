// Componente para forçar refresh mobile
import MobileCacheBuster from '../lib/mobileCacheBuster';

const MobileRefreshButton = () => {
  const cacheBuster = MobileCacheBuster.getInstance();

  const handleForceRefresh = () => {
    cacheBuster.forcePageRefresh();
  };

  // Só mostrar em mobile
  if (!cacheBuster.isMobile()) return null;

  return (
    <button
      onClick={handleForceRefresh}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        fontSize: '20px',
        cursor: 'pointer',
        zIndex: 9999,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      title="Forçar refresh mobile"
    >
      🔄
    </button>
  );
};

export default MobileRefreshButton;

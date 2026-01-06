import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// Configuração Firebase do ambiente
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "albufeira-holidays.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "albufeira-holidays",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "albufeira-holidays.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "demo-app-id"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Funções para persistência de dados
export class FirebasePersistence {
  private static instance: FirebasePersistence;
  
  static getInstance(): FirebasePersistence {
    if (!FirebasePersistence.instance) {
      FirebasePersistence.instance = new FirebasePersistence();
    }
    return FirebasePersistence.instance;
  }

  // Salvar dados no Firestore
  async saveData(data: any): Promise<void> {
    try {
      const docRef = doc(db, 'siteData', 'main');
      await setDoc(docRef, {
        ...data,
        lastUpdated: new Date().toISOString()
      });
      console.log('✅ Dados salvos no Firebase');
    } catch (error) {
      console.error('❌ Erro ao salvar no Firebase:', error);
      // Fallback para localStorage
      localStorage.setItem('albufeira-holidays-fallback', JSON.stringify(data));
    }
  }

  // Carregar dados do Firestore
  async loadData(): Promise<any> {
    try {
      const docRef = doc(db, 'siteData', 'main');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log('✅ Dados carregados do Firebase');
        return docSnap.data();
      } else {
        console.log('📋 Nenhum dado encontrado no Firebase');
        return null;
      }
    } catch (error) {
      console.error('❌ Erro ao carregar do Firebase:', error);
      // Tentar fallback
      const fallback = localStorage.getItem('albufeira-holidays-fallback');
      if (fallback) {
        console.log('🔄 Usando fallback localStorage');
        return JSON.parse(fallback);
      }
      return null;
    }
  }

  // Sincronização automática
  async syncData(data: any): Promise<void> {
    await this.saveData(data);
  }
}

export default FirebasePersistence;

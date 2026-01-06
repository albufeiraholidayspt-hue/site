import { MongoClient, Db, Collection } from 'mongodb';

// Configuração MongoDB Atlas
const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'albufeira-holidays';
const COLLECTION_NAME = 'siteData';

export class MongoDBPersistence {
  private static instance: MongoDBPersistence;
  private client: MongoClient | null = null;
  private db: Db | null = null;
  private collection: Collection<any> | null = null;

  static getInstance(): MongoDBPersistence {
    if (!MongoDBPersistence.instance) {
      MongoDBPersistence.instance = new MongoDBPersistence();
    }
    return MongoDBPersistence.instance;
  }

  // Conectar ao MongoDB
  async connect(): Promise<void> {
    try {
      this.client = new MongoClient(MONGODB_URI);
      await this.client.connect();
      this.db = this.client.db(DB_NAME);
      this.collection = this.db.collection(COLLECTION_NAME);
      console.log('✅ Conectado ao MongoDB Atlas');
    } catch (error) {
      console.error('❌ Erro ao conectar ao MongoDB:', error);
      throw error;
    }
  }

  // Salvar dados no MongoDB
  async saveData(data: any): Promise<void> {
    try {
      if (!this.collection) {
        await this.connect();
      }

      const document = {
        _id: 'main',
        ...data,
        lastUpdated: new Date().toISOString()
      };

      await this.collection!.replaceOne(
        { _id: 'main' },
        document,
        { upsert: true }
      );

      console.log('✅ Dados salvos no MongoDB Atlas');
    } catch (error) {
      console.error('❌ Erro ao salvar no MongoDB:', error);
      // Fallback para localStorage
      localStorage.setItem('albufeira-holidays-mongodb-fallback', JSON.stringify(data));
    }
  }

  // Carregar dados do MongoDB
  async loadData(): Promise<any> {
    try {
      if (!this.collection) {
        await this.connect();
      }

      const document = await this.collection!.findOne({ _id: 'main' });
      
      if (document) {
        console.log('✅ Dados carregados do MongoDB Atlas');
        return document;
      } else {
        console.log('📋 Nenhum dado encontrado no MongoDB');
        return null;
      }
    } catch (error) {
      console.error('❌ Erro ao carregar do MongoDB:', error);
      // Tentar fallback
      const fallback = localStorage.getItem('albufeira-holidays-mongodb-fallback');
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

  // Desconectar
  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      this.collection = null;
    }
  }
}

export default MongoDBPersistence;

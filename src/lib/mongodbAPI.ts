// Cliente MongoDB API para browser
class MongoDBAPI {
  private static instance: MongoDBAPI;
  private baseURL: string;

  constructor() {
    this.baseURL = '/api/mongodb';
  }

  static getInstance(): MongoDBAPI {
    if (!MongoDBAPI.instance) {
      MongoDBAPI.instance = new MongoDBAPI();
    }
    return MongoDBAPI.instance;
  }

  async loadData(): Promise<any> {
    try {
      const response = await fetch(this.baseURL);
      if (!response.ok) throw new Error('Failed to load data');
      const data = await response.json();
      console.log('✅ Dados carregados via API MongoDB');
      return data;
    } catch (error) {
      console.error('❌ Erro ao carregar dados via API:', error);
      // Fallback para localStorage
      const fallback = localStorage.getItem('albufeira-holidays-api-fallback');
      if (fallback) {
        console.log('🔄 Usando fallback localStorage');
        return JSON.parse(fallback);
      }
      return null;
    }
  }

  async saveData(data: any): Promise<void> {
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to save data');
      
      console.log('✅ Dados salvos via API MongoDB');
      
      // Salvar fallback no localStorage
      localStorage.setItem('albufeira-holidays-api-fallback', JSON.stringify(data));
    } catch (error) {
      console.error('❌ Erro ao salvar dados via API:', error);
      // Salvar apenas no localStorage como fallback
      localStorage.setItem('albufeira-holidays-api-fallback', JSON.stringify(data));
    }
  }

  async syncData(data: any): Promise<void> {
    await this.saveData(data);
  }
}

export default MongoDBAPI;

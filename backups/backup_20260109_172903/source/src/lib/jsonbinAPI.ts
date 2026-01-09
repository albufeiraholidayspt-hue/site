// Cliente JSONBin público (sem autenticação)
class JSONBinAPI {
  private static instance: JSONBinAPI;
  private baseURL: string;

  constructor() {
    // URL do JSONBin (sem autenticação)
    this.baseURL = 'https://api.jsonbin.io/v3/b/695d114343b1c97be91d181a';
  }

  static getInstance(): JSONBinAPI {
    if (!JSONBinAPI.instance) {
      JSONBinAPI.instance = new JSONBinAPI();
    }
    return JSONBinAPI.instance;
  }

  async loadData(): Promise<any> {
    try {
      // Tentar ler sem autenticação (bin público)
      const response = await fetch(this.baseURL + '/latest');
      if (!response.ok) throw new Error('Failed to load data');
      const data = await response.json();
      console.log('✅ Dados carregados do JSONBin:', data);
      
      // JSONBin retorna { record: { data: {...} } }
      return data.record?.data || data;
    } catch (error) {
      console.error('❌ Erro ao carregar dados:', error);
      // Fallback para localStorage
      const fallback = localStorage.getItem('albufeira-holidays-jsonbin-fallback');
      if (fallback) {
        console.log('🔄 Usando fallback localStorage');
        return JSON.parse(fallback);
      }
      return null;
    }
  }

  async saveData(data: any): Promise<void> {
    try {
      // Tentar salvar sem autenticação (se o bin permitir escrita pública)
      const response = await fetch(this.baseURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          record: data,
          lastUpdated: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        // Se não permitir escrita, salvar apenas no localStorage
        console.log('📝 JSONBin não permite escrita, salvando apenas no localStorage');
      } else {
        console.log('✅ Dados salvos no JSONBin');
      }
      
      // Sempre salvar no localStorage como fallback
      localStorage.setItem('albufeira-holidays-jsonbin-fallback', JSON.stringify(data));
    } catch (error) {
      console.error('❌ Erro ao salvar dados:', error);
      // Salvar apenas no localStorage como fallback
      localStorage.setItem('albufeira-holidays-jsonbin-fallback', JSON.stringify(data));
    }
  }

  async syncData(data: any): Promise<void> {
    await this.saveData(data);
  }
}

export default JSONBinAPI;

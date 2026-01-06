// Cliente JSONBin para persistência simples
class JSONBinAPI {
  private static instance: JSONBinAPI;
  private baseURL: string;

  constructor() {
    // URL real do JSONBin
    this.baseURL = 'https://api.jsonbin.io/v3/b/695d0dcc43b1c97be91d10d9';
  }

  static getInstance(): JSONBinAPI {
    if (!JSONBinAPI.instance) {
      JSONBinAPI.instance = new JSONBinAPI();
    }
    return JSONBinAPI.instance;
  }

  // Método para configurar a URL
  setURL(url: string) {
    this.baseURL = url;
  }

  async loadData(): Promise<any> {
    try {
      const response = await fetch(this.baseURL + '/latest', {
        headers: {
          'X-Master-Key': '$2a$10$h9piqeXbWlDcWcVqUy74AO1FMW6jJDxJWe315GZPwrEK0i6YLZtK'
        }
      });
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
      const response = await fetch(this.baseURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': '$2a$10$h9piqeXbWlDcWcVqUy74AO1FMW6jJDxJWe315GZPwrEK0i6YLZtK',
          'X-Bin-Meta': '{"name":"Albufeira Holidays","private":false}'
        },
        body: JSON.stringify({
          record: data,
          lastUpdated: new Date().toISOString()
        }),
      });

      if (!response.ok) throw new Error('Failed to save data');
      
      console.log('✅ Dados salvos no JSONBin');
      
      // Salvar fallback no localStorage
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

// Cliente JSONBin para persistência simples
class JSONBinAPI {
  private static instance: JSONBinAPI;
  private baseURL: string;

  constructor() {
    // Você vai obter esta URL no jsonbin.org
    // Substitua 'SUA_ID_AQUI' com o ID real
    this.baseURL = 'https://api.jsonbin.io/v3/b/SUA_ID_AQUI';
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
      const response = await fetch(this.baseURL + '/latest');
      if (!response.ok) throw new Error('Failed to load data');
      const data = await response.json();
      console.log('✅ Dados carregados do JSONBin');
      return data.record;
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
        },
        body: JSON.stringify({
          data: data,
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

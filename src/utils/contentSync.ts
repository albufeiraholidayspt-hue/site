// Sincronizar dados do localStorage com o initialContent
export const syncContentToInitial = () => {
  try {
    // Obter dados do localStorage
    const storedData = localStorage.getItem('albufeira-holidays-storage');
    if (!storedData) {
      console.log('❌ Nenhum dado encontrado no localStorage');
      return false;
    }

    const parsed = JSON.parse(storedData);
    const content = parsed.state?.content;
    
    if (!content) {
      console.log('❌ Conteúdo não encontrado nos dados');
      return false;
    }

    // Criar string do conteúdo formatado
    const contentString = JSON.stringify(content, null, 2);
    
    console.log('📋 Conteúdo sincronizado com sucesso');
    console.log('⚠️  Copie este conteúdo para src/data/initialContent.ts');
    console.log('🔄 Depois execute "npm run build"');
    
    // Mostrar o conteúdo para copiar
    console.log('\n=== CONTEÚDO PARA COPIAR ===\n');
    console.log(contentString);
    console.log('\n=== FIM DO CONTEÚDO ===\n');
    
    return contentString;
  } catch (error) {
    console.error('❌ Erro ao sincronizar conteúdo:', error);
    return false;
  }
};

// Função para executar no console do navegador
declare global {
  interface Window {
    syncContent: typeof syncContentToInitial;
  }
}

// Disponibilizar globalmente
if (typeof window !== 'undefined') {
  window.syncContent = syncContentToInitial;
}

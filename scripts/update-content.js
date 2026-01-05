const fs = require('fs');
const path = require('path');

// Caminho para o arquivo de conteúdo inicial
const contentPath = path.join(__dirname, '../src/data/initialContent.ts');
const localStoragePath = path.join(__dirname, '../localStorage-backup.json');

// Ler dados do localStorage exportado
function updateInitialContent() {
  try {
    // Verificar se existe backup do localStorage
    if (fs.existsSync(localStoragePath)) {
      const localStorageData = JSON.parse(fs.readFileSync(localStoragePath, 'utf8'));
      const content = localStorageData.state?.content;
      
      if (content) {
        // Ler o arquivo atual
        const currentContent = fs.readFileSync(contentPath, 'utf8');
        
        // Extrair o conteúdo atual entre export const initialContent: SiteContent = { e };
        const startMarker = 'export const initialContent: SiteContent = {';
        const endMarker = '};';
        
        const startIndex = currentContent.indexOf(startMarker);
        const endIndex = currentContent.lastIndexOf(endMarker);
        
        if (startIndex !== -1 && endIndex !== -1) {
          const before = currentContent.substring(0, startIndex + startMarker.length);
          const after = currentContent.substring(endIndex);
          
          // Converter o conteúdo para string formatada
          const contentString = JSON.stringify(content, null, 2)
            .replace(/"/g, "'")
            .replace(/'/g, "'");
          
          // Criar novo conteúdo
          const newContent = `${before}\n${contentString}\n${after}`;
          
          // Escrever no arquivo
          fs.writeFileSync(contentPath, newContent);
          
          console.log('✅ Conteúdo atualizado com sucesso!');
          console.log('📁 Arquivo:', contentPath);
          console.log('🔄 Execute "npm run build" para aplicar as mudanças');
        }
      }
    } else {
      console.log('❌ Arquivo localStorage-backup.json não encontrado');
      console.log('💡 Exporte os dados do backoffice primeiro');
    }
  } catch (error) {
    console.error('❌ Erro ao atualizar conteúdo:', error.message);
  }
}

updateInitialContent();

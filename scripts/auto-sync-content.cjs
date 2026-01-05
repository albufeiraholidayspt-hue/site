const fs = require('fs');
const path = require('path');

// Caminhos
const contentPath = path.join(__dirname, '../src/data/initialContent.ts');
const localStoragePath = path.join(__dirname, '../localStorage-data.json');

// Função para extrair dados do localStorage simulado
function getLocalStorageData() {
  try {
    // Tentar ler do arquivo de backup
    if (fs.existsSync(localStoragePath)) {
      const data = fs.readFileSync(localStoragePath, 'utf8');
      return JSON.parse(data);
    }
    
    // Tentar ler do localStorage do navegador (via arquivo exportado)
    const exportedDataPath = path.join(__dirname, '../exported-content.json');
    if (fs.existsSync(exportedDataPath)) {
      const data = fs.readFileSync(exportedDataPath, 'utf8');
      return JSON.parse(data);
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao ler dados do localStorage:', error.message);
    return null;
  }
}

// Função para atualizar o initialContent.ts
function updateInitialContent() {
  console.log('🔄 Verificando por atualizações de conteúdo...');
  
  const localData = getLocalStorageData();
  
  if (!localData) {
    console.log('ℹ️ Nenhum dado local encontrado. Usando conteúdo inicial.');
    return false;
  }

  try {
    // Extrair o conteúdo dos dados
    const content = localData.state?.content || localData.content;
    
    if (!content) {
      console.log('❌ Conteúdo não encontrado nos dados');
      return false;
    }

    // Ler o arquivo atual
    const currentContent = fs.readFileSync(contentPath, 'utf8');
    
    // Verificar se o conteúdo já está atualizado
    const currentContentStr = JSON.stringify(content);
    if (currentContent.includes(currentContentStr.substring(0, 100))) {
      console.log('✅ Conteúdo já está atualizado');
      return false;
    }

    // Gerar novo conteúdo
    const newContent = `// Auto-generated content - ${new Date().toISOString()}
// Este arquivo foi atualizado automaticamente com as alterações mais recentes

import { SiteContent } from '../types';

export const initialContent: SiteContent = ${JSON.stringify(content, null, 2)};

/*
Última atualização: ${new Date().toLocaleString()}
Para verificar alterações: execute "npm run dev" e abra o backoffice
*/

// Mantido para compatibilidade
export default initialContent;`;

    // Fazer backup do arquivo atual
    const backupPath = contentPath.replace('.ts', `.backup.${Date.now()}.ts`);
    fs.writeFileSync(backupPath, currentContent);
    
    // Escrever novo conteúdo
    fs.writeFileSync(contentPath, newContent);
    
    console.log('✅ Conteúdo atualizado automaticamente!');
    console.log(`📁 Backup salvo em: ${backupPath}`);
    console.log('🔄 Execute "npm run build" para aplicar as mudanças');
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao atualizar conteúdo:', error.message);
    return false;
  }
}

// Executar atualização
if (require.main === module) {
  updateInitialContent();
}

module.exports = { updateInitialContent, getLocalStorageData };

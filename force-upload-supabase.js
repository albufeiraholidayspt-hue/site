import { createClient } from '@supabase/supabase-js';
import { initialContent } from './src/data/initialContent.ts';

const supabaseUrl = 'https://lposelwkdhpfgyqpxeyw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwb3NlbHdrZGhwZmd5cXB4ZXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MDM2MzUsImV4cCI6MjA4MzI3OTYzNX0.Nf6IgklIQTEkbI85JBa_7q9P8lAUJay-lTtHM882qFw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function forceUpload() {
  console.log('🔄 FORÇANDO upload dos dados corretos para o Supabase...');
  console.log('');
  
  // Verificar dados antes
  console.log('📸 Verificando dados locais:');
  console.log('- Prestige image 1:', initialContent.apartments[1].images[0]);
  console.log('- Prestige hero:', initialContent.apartments[1].heroImage);
  console.log('');
  
  // Criar estrutura completa
  const fullData = {
    state: {
      content: initialContent,
      user: { username: '', isAuthenticated: false }
    },
    version: 24
  };
  
  try {
    // Deletar dados antigos
    console.log('🗑️  Deletando dados antigos...');
    await supabase.from('site_data').delete().eq('id', 'main');
    
    // Inserir dados novos
    console.log('📤 Inserindo dados corretos...');
    const { data, error } = await supabase
      .from('site_data')
      .insert({
        id: 'main',
        data: fullData,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      console.error('❌ Erro ao inserir:', error);
      return;
    }
    
    console.log('✅ Dados inseridos com sucesso!');
    console.log('');
    
    // Verificar dados inseridos
    console.log('🔍 Verificando dados no Supabase...');
    const { data: checkData, error: checkError } = await supabase
      .from('site_data')
      .select('*')
      .eq('id', 'main')
      .single();
    
    if (checkError) {
      console.error('❌ Erro ao verificar:', checkError);
      return;
    }
    
    console.log('📊 Dados no Supabase:');
    console.log('- Apartamentos:', checkData.data?.state?.content?.apartments?.length || 0);
    if (checkData.data?.state?.content?.apartments?.[1]) {
      const prestige = checkData.data.state.content.apartments[1];
      console.log('- Prestige image 1:', prestige.images[0]);
      console.log('- Prestige hero:', prestige.heroImage);
    }
    console.log('');
    console.log('✅ UPLOAD COMPLETO! O site deve atualizar em alguns segundos.');
    
  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

forceUpload();

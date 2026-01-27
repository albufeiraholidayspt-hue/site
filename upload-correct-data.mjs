import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lposelwkdhpfgyqpxeyw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwb3NlbHdrZGhwZmd5cXB4ZXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MDM2MzUsImV4cCI6MjA4MzI3OTYzNX0.Nf6IgklIQTEkbI85JBa_7q9P8lAUJay-lTtHM882qFw';

const supabase = createClient(supabaseUrl, supabaseKey);

// Dados corretos com fotos do ImgBB
const correctData = {
  state: {
    content: {
      apartments: [
        {
          id: '2',
          name: 'Prestige',
          images: [
            'https://i.ibb.co/8Xq4bWf/prestige-1.jpg',
            'https://i.ibb.co/2nJ6z7L/prestige-2.jpg',
            'https://i.ibb.co/6RqY8p9/prestige-3.jpg',
            'https://i.ibb.co/9vK4m3d/prestige-4.jpg',
            'https://i.ibb.co/4gM7T2k/prestige-5.jpg',
          ],
          heroImage: 'https://i.ibb.co/4gM7T2k/prestige-hero.jpg',
        }
      ]
    }
  }
};

async function uploadData() {
  console.log('🔄 Carregando dados atuais do Supabase...');
  
  const { data: currentData, error: fetchError } = await supabase
    .from('site_data')
    .select('*')
    .eq('id', 'main')
    .single();
  
  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('❌ Erro ao buscar dados:', fetchError);
    return;
  }
  
  if (!currentData) {
    console.log('⚠️  Nenhum dado encontrado no Supabase');
    return;
  }
  
  console.log('📊 Dados atuais:');
  const currentPrestige = currentData.data?.state?.content?.apartments?.find(a => a.id === '2');
  if (currentPrestige) {
    console.log('- Prestige image 1 (atual):', currentPrestige.images?.[0]);
  }
  
  // Atualizar apenas o apartamento Prestige
  const updatedData = { ...currentData.data };
  if (updatedData.state?.content?.apartments) {
    const prestigeIndex = updatedData.state.content.apartments.findIndex(a => a.id === '2');
    if (prestigeIndex !== -1) {
      updatedData.state.content.apartments[prestigeIndex] = {
        ...updatedData.state.content.apartments[prestigeIndex],
        images: correctData.state.content.apartments[0].images,
        heroImage: correctData.state.content.apartments[0].heroImage,
      };
    }
  }
  
  console.log('');
  console.log('📤 Atualizando Supabase com fotos corretas...');
  
  const { error: updateError } = await supabase
    .from('site_data')
    .update({
      data: updatedData,
      updated_at: new Date().toISOString()
    })
    .eq('id', 'main');
  
  if (updateError) {
    console.error('❌ Erro ao atualizar:', updateError);
    return;
  }
  
  console.log('✅ Dados atualizados!');
  console.log('');
  console.log('🔍 Verificando...');
  
  const { data: verifyData } = await supabase
    .from('site_data')
    .select('*')
    .eq('id', 'main')
    .single();
  
  const verifyPrestige = verifyData.data?.state?.content?.apartments?.find(a => a.id === '2');
  if (verifyPrestige) {
    console.log('✅ Prestige image 1 (novo):', verifyPrestige.images?.[0]);
    console.log('✅ Prestige hero (novo):', verifyPrestige.heroImage);
  }
  
  console.log('');
  console.log('🎉 CONCLUÍDO! Recarrega o site: https://albufeira-holidays.onrender.com');
}

uploadData();

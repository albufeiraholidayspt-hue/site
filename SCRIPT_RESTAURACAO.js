// ============================================
// SCRIPT DE RESTAURAÇÃO COMPLETA
// ============================================
// INSTRUÇÕES:
// 1. Abre https://albufeira-holidays.onrender.com
// 2. Abre o Console do Browser (F12 ou Cmd+Option+J)
// 3. Cola este script COMPLETO e pressiona Enter
// 4. Aguarda a mensagem "✅ RESTAURAÇÃO COMPLETA!"
// 5. Recarrega a página (F5 ou Cmd+R)
// ============================================

(async function() {
    console.log('🔥 INICIANDO RESTAURAÇÃO COMPLETA...');
    
    // Importar Supabase
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
    
    const supabase = createClient(
        'https://lposelwkdhpfgyqpxeyw.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwb3NlbHdrZGhwZmd5cXB4ZXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MDM2MzUsImV4cCI6MjA4MzI3OTYzNX0.Nf6IgklIQTEkbI85JBa_7q9P8lAUJay-lTtHM882qFw'
    );
    
    console.log('📥 Buscando dados atuais...');
    
    // Buscar dados atuais
    const { data: currentData } = await supabase
        .from('site_data')
        .select('*')
        .eq('id', 'main')
        .single();
    
    if (!currentData) {
        console.error('❌ Nenhum dado encontrado no Supabase!');
        return;
    }
    
    console.log('🔧 Aplicando correções...');
    
    // Dados corretos do backup
    const updatedData = { ...currentData.data };
    
    // Garantir que a estrutura existe
    if (!updatedData.state) updatedData.state = {};
    if (!updatedData.state.content) updatedData.state.content = {};
    if (!updatedData.state.content.apartments) updatedData.state.content.apartments = [];
    
    // Encontrar e atualizar cada apartamento
    const apartments = updatedData.state.content.apartments;
    
    // PENTHOUSE (ID: 1)
    const penthouseIndex = apartments.findIndex(a => a.id === '1');
    if (penthouseIndex !== -1) {
        apartments[penthouseIndex] = {
            ...apartments[penthouseIndex],
            features: ['Cobertores', 'Cofre'],
            images: [
                'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
                'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
                'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
                'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
            ],
            heroImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
        };
        console.log('✅ Penthouse atualizado');
    }
    
    // PRESTIGE (ID: 2) - FOTOS REAIS DO IMGBB
    const prestigeIndex = apartments.findIndex(a => a.id === '2');
    if (prestigeIndex !== -1) {
        apartments[prestigeIndex] = {
            ...apartments[prestigeIndex],
            images: [
                'https://i.ibb.co/8Xq4bWf/prestige-1.jpg',
                'https://i.ibb.co/2nJ6z7L/prestige-2.jpg',
                'https://i.ibb.co/6RqY8p9/prestige-3.jpg',
                'https://i.ibb.co/9vK4m3d/prestige-4.jpg',
                'https://i.ibb.co/4gM7T2k/prestige-5.jpg',
            ],
            heroImage: 'https://i.ibb.co/4gM7T2k/prestige-hero.jpg',
            features: ['Vista Mar', '2 Quartos', 'Ar Condicionado', 'Wi-Fi', 'TV', 'Cozinha Equipada', 'Estacionamento', 'Terraço'],
        };
        console.log('✅ Prestige atualizado com fotos do ImgBB');
    }
    
    // DUPLEX (ID: 3)
    const duplexIndex = apartments.findIndex(a => a.id === '3');
    if (duplexIndex !== -1) {
        apartments[duplexIndex] = {
            ...apartments[duplexIndex],
            features: ['2 Pisos', 'Vista Cidade', 'Ar Condicionado', 'Wi-Fi', 'TV', 'Cozinha Equipada', 'Estacionamento'],
            images: [
                'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
                'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
                'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
                'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
            ],
            heroImage: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80',
        };
        console.log('✅ Duplex atualizado');
    }
    
    // DELUXE (ID: 4)
    const deluxeIndex = apartments.findIndex(a => a.id === '4');
    if (deluxeIndex !== -1) {
        apartments[deluxeIndex] = {
            ...apartments[deluxeIndex],
            features: ['Vista Mar Parcial', 'Ar Condicionado', 'Wi-Fi', 'TV', 'Cozinha Equipada', 'Estacionamento'],
            images: [
                'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80',
                'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
                'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
                'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
                'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
            ],
            heroImage: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1200&q=80',
        };
        console.log('✅ Deluxe atualizado');
    }
    
    // Atualizar hero da homepage
    if (!updatedData.state.content.hero) updatedData.state.content.hero = {};
    updatedData.state.content.hero.backgroundImages = [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80',
    ];
    console.log('✅ Homepage atualizada');
    
    console.log('📤 Enviando para Supabase...');
    
    // Fazer upload para Supabase
    const { error } = await supabase
        .from('site_data')
        .update({
            data: updatedData,
            updated_at: new Date().toISOString()
        })
        .eq('id', 'main');
    
    if (error) {
        console.error('❌ Erro ao atualizar:', error);
        return;
    }
    
    console.log('✅ Dados atualizados no Supabase!');
    console.log('');
    console.log('🎉 RESTAURAÇÃO COMPLETA!');
    console.log('');
    console.log('👉 Recarrega a página agora (F5 ou Cmd+R)');
    console.log('');
    console.log('📸 Fotos restauradas:');
    console.log('- Prestige: 5 fotos do ImgBB');
    console.log('- Penthouse: 5 fotos + features corretas');
    console.log('- Duplex: 5 fotos + features corretas');
    console.log('- Deluxe: 5 fotos + features corretas');
    console.log('- Homepage: 3 fotos de slideshow');
    
})();

// Script para verificar qualidade das traduções dos apartamentos

async function verifyTranslations() {
  try {
    console.log('🔍 A verificar qualidade das traduções...\n');
    
    const response = await fetch('https://albufeiraholidays.pt/api/get-content');
    const data = await response.json();
    
    const apartments = data.content?.apartments || [];
    
    if (!apartments || apartments.length === 0) {
      console.log('⚠️ Nenhum apartamento encontrado');
      return;
    }
    
    const languages = {
      'en': 'Inglês',
      'fr': 'Francês',
      'de': 'Alemão'
    };
    
    const fields = ['description', 'additionalInfo'];
    
    apartments.forEach(apt => {
      console.log('\n' + '='.repeat(80));
      console.log(`📍 APARTAMENTO: ${apt.name}`);
      console.log('='.repeat(80));
      
      fields.forEach(field => {
        const ptValue = apt[field];
        
        if (!ptValue || ptValue.trim() === '') {
          return;
        }
        
        console.log(`\n📝 Campo: ${field.toUpperCase()}`);
        console.log(`\n🇵🇹 PORTUGUÊS (Original):`);
        console.log(`   ${ptValue}`);
        
        Object.entries(languages).forEach(([langCode, langName]) => {
          const translatedField = `${field}_${langCode}`;
          const translatedValue = apt[translatedField];
          
          console.log(`\n${getLangFlag(langCode)} ${langName.toUpperCase()}:`);
          
          if (!translatedValue || translatedValue.trim() === '') {
            console.log(`   ❌ TRADUÇÃO EM FALTA`);
          } else {
            console.log(`   ${translatedValue}`);
            
            // Verificações básicas de qualidade
            const warnings = [];
            
            // Verificar se a tradução não é igual ao original (exceto nomes próprios)
            if (translatedValue === ptValue) {
              warnings.push('⚠️ Tradução idêntica ao original');
            }
            
            // Verificar se tem tamanho razoável (não muito curta nem muito longa)
            const lengthRatio = translatedValue.length / ptValue.length;
            if (lengthRatio < 0.5) {
              warnings.push('⚠️ Tradução muito curta comparada ao original');
            } else if (lengthRatio > 2) {
              warnings.push('⚠️ Tradução muito longa comparada ao original');
            }
            
            // Verificar se mantém nomes próprios importantes
            const properNouns = ['Albufeira', 'Algarve', 'Penthouse', 'Prestige', 'Duplex', 'Deluxe'];
            properNouns.forEach(noun => {
              if (ptValue.includes(noun) && !translatedValue.includes(noun)) {
                warnings.push(`⚠️ Nome próprio "${noun}" pode estar faltando`);
              }
            });
            
            if (warnings.length > 0) {
              console.log(`\n   ${warnings.join('\n   ')}`);
            } else {
              console.log(`   ✅ Tradução parece OK`);
            }
          }
        });
        
        console.log('\n' + '-'.repeat(80));
      });
    });
    
    console.log('\n\n✅ Verificação concluída!');
    console.log('\n💡 Revê as traduções acima e confirma se estão corretas.');
    console.log('   Se encontrares algum problema, podes editar o apartamento no backoffice.');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

function getLangFlag(langCode) {
  const flags = {
    'en': '🇬🇧',
    'fr': '🇫🇷',
    'de': '🇩🇪'
  };
  return flags[langCode] || '🏳️';
}

verifyTranslations();

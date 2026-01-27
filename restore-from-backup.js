// Script para restaurar dados do backup para o Supabase
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://lposelwkdhpfgyqpxeyw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwb3NlbHdrZGhwZmd5cXB4ZXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MDM2MzUsImV4cCI6MjA4MzI3OTYzNX0.Nf6IgklIQTEkbI85JBa_7q9P8lAUJay-lTtHM882qFw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function restoreFromBackup(backupFile) {
  try {
    console.log('🔄 Iniciando restauração do backup...');

    // Ler arquivo de backup
    const backupsDir = path.join(process.cwd(), 'backups');
    const filepath = backupFile 
      ? path.join(backupsDir, backupFile)
      : getLatestBackup(backupsDir);

    if (!fs.existsSync(filepath)) {
      console.error('❌ Arquivo de backup não encontrado:', filepath);
      return;
    }

    const backupData = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    console.log('📂 Backup carregado:', path.basename(filepath));

    // Restaurar no Supabase
    const { error } = await supabase
      .from('site_data')
      .upsert({
        id: 'main',
        data: backupData.data,
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('❌ Erro ao restaurar no Supabase:', error.message);
      return;
    }

    console.log('✅ Dados restaurados com sucesso no Supabase!');
    console.log('📊 Apartamentos restaurados:', backupData.data?.content?.apartments?.length || 0);

  } catch (error) {
    console.error('❌ Erro na restauração:', error);
  }
}

function getLatestBackup(backupsDir) {
  const files = fs.readdirSync(backupsDir)
    .filter(f => f.startsWith('supabase-backup-'))
    .sort()
    .reverse();
  
  if (files.length === 0) {
    throw new Error('Nenhum backup encontrado');
  }

  return path.join(backupsDir, files[0]);
}

// Executar restauração
const backupFile = process.argv[2]; // Opcional: passar nome do arquivo
restoreFromBackup(backupFile);

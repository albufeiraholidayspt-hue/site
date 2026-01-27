// Script para fazer backup automático dos dados do Supabase
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://lposelwkdhpfgyqpxeyw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwb3NlbHdrZGhwZmd5cXB4ZXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MDM2MzUsImV4cCI6MjA4MzI3OTYzNX0.Nf6IgklIQTEkbI85JBa_7q9P8lAUJay-lTtHM882qFw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function backupSupabaseData() {
  try {
    console.log('🔄 Iniciando backup do Supabase...');
    
    // Buscar dados do Supabase
    const { data, error } = await supabase
      .from('site_data')
      .select('*')
      .eq('id', 'main')
      .single();

    if (error) {
      console.error('❌ Erro ao buscar dados:', error.message);
      return;
    }

    if (!data) {
      console.log('⚠️  Nenhum dado encontrado no Supabase');
      return;
    }

    // Criar pasta de backups se não existir
    const backupsDir = path.join(process.cwd(), 'backups');
    if (!fs.existsSync(backupsDir)) {
      fs.mkdirSync(backupsDir, { recursive: true });
    }

    // Gerar nome do arquivo com timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const filename = `supabase-backup-${timestamp}.json`;
    const filepath = path.join(backupsDir, filename);

    // Salvar backup
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));

    console.log('✅ Backup criado com sucesso:', filename);
    console.log('📊 Última atualização:', data.updated_at);
    console.log('📁 Apartamentos:', data.data?.content?.apartments?.length || 0);

    // Manter apenas os últimos 10 backups
    const files = fs.readdirSync(backupsDir)
      .filter(f => f.startsWith('supabase-backup-'))
      .sort()
      .reverse();

    if (files.length > 10) {
      const toDelete = files.slice(10);
      toDelete.forEach(f => {
        fs.unlinkSync(path.join(backupsDir, f));
        console.log('🗑️  Backup antigo removido:', f);
      });
    }

  } catch (error) {
    console.error('❌ Erro no backup:', error);
  }
}

// Executar backup
backupSupabaseData();

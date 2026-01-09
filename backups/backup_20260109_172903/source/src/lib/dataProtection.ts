import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lposelwkdhpfgyqpxeyw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwb3NlbHdrZGhwZmd5cXB4ZXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MDM2MzUsImV4cCI6MjA4MzI3OTYzNX0.Nf6IgklIQTEkbI85JBa_7q9P8lAUJay-lTtHM882qFw';

export class DataProtectionService {
  private static instance: DataProtectionService;
  private supabase = createClient(supabaseUrl, supabaseKey);

  static getInstance(): DataProtectionService {
    if (!DataProtectionService.instance) {
      DataProtectionService.instance = new DataProtectionService();
    }
    return DataProtectionService.instance;
  }

  // 🛡️ Criar backup automático antes de qualquer alteração
  async createBackup(data: any, description: string): Promise<void> {
    try {
      const backup = {
        id: `backup_${Date.now()}`,
        data: data,
        description: description,
        created_at: new Date().toISOString(),
        version: 'auto_backup'
      };

      await this.supabase.from('data_backups').insert(backup);
      console.log('✅ Backup automático criado:', description);
    } catch (error) {
      console.error('❌ Erro ao criar backup:', error);
    }
  }

  // 🔍 Verificar se existem dados antes de sobrepôr
  async hasExistingData(): Promise<boolean> {
    try {
      const { data, error } = await this.supabase
        .from('site_data')
        .select('data')
        .eq('id', 'main')
        .single();

      if (error) return false;

      const content = data?.data?.state?.content;
      return content && content.apartments && content.apartments.length > 0;
    } catch (error) {
      console.error('❌ Erro ao verificar dados existentes:', error);
      return false;
    }
  }

  // 🚫 NUNCA sobrepôr dados existentes
  async safeUpdate(newData: any, description: string): Promise<boolean> {
    try {
      // 1. Verificar se já existem dados
      const hasData = await this.hasExistingData();
      
      if (hasData) {
        console.log('🛡️ PROTEÇÃO: Dados existentes encontrados - CANCELANDO sobrescrita!');
        console.log('📋 Use updateData() para atualizações específicas');
        return false;
      }

      // 2. Criar backup antes de inserir
      await this.createBackup(newData, `INSERT: ${description}`);

      // 3. Inserir novos dados
      const { error } = await this.supabase
        .from('site_data')
        .upsert({ id: 'main', data: newData });

      if (error) {
        console.error('❌ Erro ao inserir dados:', error);
        return false;
      }

      console.log('✅ Dados inseridos com segurança:', description);
      return true;
    } catch (error) {
      console.error('❌ Erro na atualização segura:', error);
      return false;
    }
  }

  // 🔄 Atualizações específicas (sem sobrepôr)
  async updateData(path: string, value: any, description: string): Promise<boolean> {
    try {
      // 1. Buscar dados atuais
      const { data: currentData, error } = await this.supabase
        .from('site_data')
        .select('data')
        .eq('id', 'main')
        .single();

      if (error) {
        console.error('❌ Erro ao buscar dados atuais:', error);
        return false;
      }

      // 2. Criar backup
      await this.createBackup(currentData.data, `UPDATE: ${description}`);

      // 3. Atualizar apenas o caminho específico
      const updatedData = { ...currentData.data };
      const pathParts = path.split('.');
      let current = updatedData;

      for (let i = 0; i < pathParts.length - 1; i++) {
        current[pathParts[i]] = current[pathParts[i]] || {};
        current = current[pathParts[i]];
      }

      current[pathParts[pathParts.length - 1]] = value;

      // 4. Salvar dados atualizados
      const { error: updateError } = await this.supabase
        .from('site_data')
        .update({ data: updatedData })
        .eq('id', 'main');

      if (updateError) {
        console.error('❌ Erro ao atualizar dados:', updateError);
        return false;
      }

      console.log('✅ Dados atualizados com segurança:', description);
      return true;
    } catch (error) {
      console.error('❌ Erro na atualização específica:', error);
      return false;
    }
  }

  // 📋 Listar todos os backups
  async listBackups(): Promise<any[]> {
    try {
      const { data, error } = await this.supabase
        .from('data_backups')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Erro ao listar backups:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('❌ Erro ao listar backups:', error);
      return [];
    }
  }

  // 🔄 Restaurar de backup
  async restoreBackup(backupId: string): Promise<boolean> {
    try {
      const { data: backup, error } = await this.supabase
        .from('data_backups')
        .select('data')
        .eq('id', backupId)
        .single();

      if (error) {
        console.error('❌ Erro ao buscar backup:', error);
        return false;
      }

      // Criar backup antes de restaurar
      await this.createBackup(backup.data, `RESTORE: Antes de restaurar backup ${backupId}`);

      // Restaurar dados
      const { error: restoreError } = await this.supabase
        .from('site_data')
        .update({ data: backup.data })
        .eq('id', 'main');

      if (restoreError) {
        console.error('❌ Erro ao restaurar backup:', restoreError);
        return false;
      }

      console.log('✅ Backup restaurado com sucesso:', backupId);
      return true;
    } catch (error) {
      console.error('❌ Erro ao restaurar backup:', error);
      return false;
    }
  }
}

// Exportar instância global
export const dataProtection = DataProtectionService.getInstance();

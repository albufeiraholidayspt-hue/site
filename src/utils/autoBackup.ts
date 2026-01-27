// Sistema de Backup Automático
// Guarda dados em 3 locais: localStorage + Git + Cloudinary

import { cloudinaryService } from '../services/cloudinary';

interface BackupData {
  timestamp: string;
  version: number;
  data: any;
}

class AutoBackupService {
  private backupInterval: number = 30 * 60 * 1000; // 30 minutos
  private lastBackup: Date | null = null;

  /**
   * Iniciar backups automáticos
   */
  startAutoBackup() {
    // Backup inicial
    this.performBackup();

    // Backup a cada 30 minutos
    setInterval(() => {
      this.performBackup();
    }, this.backupInterval);

    console.log('✅ Sistema de backup automático iniciado');
  }

  /**
   * Fazer backup completo
   */
  private async performBackup() {
    try {
      // 1. Obter dados do localStorage
      const storageData = localStorage.getItem('albufeira-holidays-storage');
      
      if (!storageData) {
        console.log('⚠️ Nenhum dado para backup');
        return;
      }

      const data = JSON.parse(storageData);
      
      // 2. Criar objeto de backup
      const backup: BackupData = {
        timestamp: new Date().toISOString(),
        version: data.version || 24,
        data: data,
      };

      // 3. Guardar no localStorage (backup local)
      const backupKey = `backup-${new Date().toISOString().split('T')[0]}`;
      localStorage.setItem(backupKey, JSON.stringify(backup));
      
      // 4. Limpar backups antigos (manter últimos 7 dias)
      this.cleanOldBackups();

      // 5. Upload para Cloudinary (backup cloud) - apenas 1x por dia
      if (this.shouldUploadToCloud()) {
        await this.uploadToCloud(backup);
      }

      this.lastBackup = new Date();
      console.log('✅ Backup automático concluído:', new Date().toLocaleString());
      
    } catch (error) {
      console.error('❌ Erro no backup automático:', error);
    }
  }

  /**
   * Verificar se deve fazer upload para cloud
   */
  private shouldUploadToCloud(): boolean {
    if (!this.lastBackup) return true;
    
    const hoursSinceLastBackup = 
      (new Date().getTime() - this.lastBackup.getTime()) / (1000 * 60 * 60);
    
    return hoursSinceLastBackup >= 24; // 1x por dia
  }

  /**
   * Upload de backup para Cloudinary
   */
  private async uploadToCloud(backup: BackupData) {
    try {
      const filename = `backup-${backup.timestamp.split('T')[0]}`;
      const url = await cloudinaryService.backupData(backup, filename);
      
      // Guardar URL do backup
      const cloudBackups = JSON.parse(
        localStorage.getItem('cloud-backups') || '[]'
      );
      cloudBackups.push({ date: backup.timestamp, url });
      
      // Manter apenas últimos 30 backups
      if (cloudBackups.length > 30) {
        cloudBackups.shift();
      }
      
      localStorage.setItem('cloud-backups', JSON.stringify(cloudBackups));
      
      console.log('☁️ Backup enviado para Cloudinary:', url);
    } catch (error) {
      console.error('❌ Erro ao enviar backup para cloud:', error);
    }
  }

  /**
   * Limpar backups antigos do localStorage
   */
  private cleanOldBackups() {
    const keys = Object.keys(localStorage);
    const backupKeys = keys.filter(k => k.startsWith('backup-'));
    
    // Ordenar por data (mais recente primeiro)
    backupKeys.sort().reverse();
    
    // Manter apenas últimos 7
    const toDelete = backupKeys.slice(7);
    toDelete.forEach(key => localStorage.removeItem(key));
    
    if (toDelete.length > 0) {
      console.log(`🗑️ ${toDelete.length} backups antigos removidos`);
    }
  }

  /**
   * Listar backups disponíveis
   */
  listBackups(): { local: string[]; cloud: any[] } {
    const keys = Object.keys(localStorage);
    const localBackups = keys
      .filter(k => k.startsWith('backup-'))
      .sort()
      .reverse();
    
    const cloudBackups = JSON.parse(
      localStorage.getItem('cloud-backups') || '[]'
    );
    
    return { local: localBackups, cloud: cloudBackups };
  }

  /**
   * Restaurar de backup
   */
  async restoreBackup(source: 'local' | 'cloud', identifier: string) {
    try {
      let data: any;
      
      if (source === 'local') {
        const backup = localStorage.getItem(identifier);
        if (!backup) throw new Error('Backup não encontrado');
        data = JSON.parse(backup);
      } else {
        // Restaurar do Cloudinary
        data = await cloudinaryService.restoreData(identifier);
      }
      
      // Restaurar dados
      localStorage.setItem('albufeira-holidays-storage', JSON.stringify(data.data));
      
      console.log('✅ Backup restaurado com sucesso');
      
      // Recarregar página
      window.location.reload();
      
    } catch (error) {
      console.error('❌ Erro ao restaurar backup:', error);
      throw error;
    }
  }

  /**
   * Fazer backup manual
   */
  async manualBackup() {
    console.log('📦 Iniciando backup manual...');
    await this.performBackup();
    
    // Forçar upload para cloud
    const storageData = localStorage.getItem('albufeira-holidays-storage');
    if (storageData) {
      const data = JSON.parse(storageData);
      const backup: BackupData = {
        timestamp: new Date().toISOString(),
        version: data.version || 24,
        data: data,
      };
      await this.uploadToCloud(backup);
    }
  }
}

export const autoBackupService = new AutoBackupService();
export default autoBackupService;

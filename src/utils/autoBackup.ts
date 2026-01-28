// Sistema de Backup Automático
// Guarda dados no localStorage

interface BackupData {
  timestamp: string;
  version: number;
  data: any;
}

class AutoBackupService {
  private backupInterval: number = 30 * 60 * 1000; // 30 minutos

  startAutoBackup() {
    this.performBackup();
    setInterval(() => {
      this.performBackup();
    }, this.backupInterval);
    console.log('✅ Sistema de backup automático iniciado');
  }

  private async performBackup() {
    try {
      const storageData = localStorage.getItem('albufeira-holidays-storage');
      if (!storageData) {
        console.log('⚠️ Nenhum dado para backup');
        return;
      }

      const data = JSON.parse(storageData);
      const backup: BackupData = {
        timestamp: new Date().toISOString(),
        version: data.version || 25,
        data: data,
      };

      const backupKey = `backup-${new Date().toISOString().split('T')[0]}`;
      localStorage.setItem(backupKey, JSON.stringify(backup));
      this.cleanOldBackups();
      console.log('✅ Backup automático concluído:', new Date().toLocaleString());
    } catch (error) {
      console.error('❌ Erro no backup automático:', error);
    }
  }

  private cleanOldBackups() {
    const keys = Object.keys(localStorage);
    const backupKeys = keys.filter(k => k.startsWith('backup-'));
    backupKeys.sort().reverse();
    const toDelete = backupKeys.slice(7);
    toDelete.forEach(key => localStorage.removeItem(key));
    if (toDelete.length > 0) {
      console.log(`🗑️ ${toDelete.length} backups antigos removidos`);
    }
  }

  listBackups(): string[] {
    const keys = Object.keys(localStorage);
    return keys.filter(k => k.startsWith('backup-')).sort().reverse();
  }

  async restoreBackup(identifier: string) {
    try {
      const backup = localStorage.getItem(identifier);
      if (!backup) throw new Error('Backup não encontrado');
      const data = JSON.parse(backup);
      localStorage.setItem('albufeira-holidays-storage', JSON.stringify(data.data));
      console.log('✅ Backup restaurado com sucesso');
      window.location.reload();
    } catch (error) {
      console.error('❌ Erro ao restaurar backup:', error);
      throw error;
    }
  }

  async manualBackup() {
    console.log('📦 Iniciando backup manual...');
    await this.performBackup();
  }
}

export const autoBackupService = new AutoBackupService();
export default autoBackupService;

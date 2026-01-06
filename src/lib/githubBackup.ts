// Sistema de persistência com GitHub backup
class GitHubBackup {
  private static instance: GitHubBackup;
  private token: string;
  private repo: string;
  private filePath: string;

  constructor() {
    // Configuração GitHub
    this.token = 'ghp_YOUR_GITHUB_TOKEN'; // Você vai precisar criar
    this.repo = 'albufeiraholidayspt-hue/site';
    this.filePath = 'data/backup.json';
  }

  static getInstance(): GitHubBackup {
    if (!GitHubBackup.instance) {
      GitHubBackup.instance = new GitHubBackup();
    }
    return GitHubBackup.instance;
  }

  async saveToGitHub(data: any): Promise<void> {
    try {
      const content = JSON.stringify({
        data: data,
        timestamp: new Date().toISOString(),
        version: '1.0'
      }, null, 2);

      const response = await fetch(`https://api.github.com/repos/${this.repo}/contents/${this.filePath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Backup automático dos dados',
          content: btoa(content),
          sha: await this.getFileSha()
        })
      });

      if (response.ok) {
        console.log('✅ Backup salvo no GitHub');
      } else {
        console.log('📝 GitHub backup falhou, usando apenas localStorage');
      }
    } catch (error) {
      console.log('📝 GitHub backup falhou, usando apenas localStorage');
    }
  }

  async loadFromGitHub(): Promise<any> {
    try {
      const response = await fetch(`https://api.github.com/repos/${this.repo}/contents/${this.filePath}`, {
        headers: {
          'Authorization': `token ${this.token}`,
        }
      });

      if (response.ok) {
        const data = await response.json();
        const content = JSON.parse(atob(data.content));
        console.log('✅ Dados recuperados do GitHub');
        return content.data;
      }
    } catch (error) {
      console.log('📝 GitHub backup não encontrado, usando localStorage');
    }
    return null;
  }

  private async getFileSha(): Promise<string | null> {
    try {
      const response = await fetch(`https://api.github.com/repos/${this.repo}/contents/${this.filePath}`, {
        headers: {
          'Authorization': `token ${this.token}`,
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data.sha;
      }
    } catch (error) {
      // File doesn't exist
    }
    return null;
  }

  // Método para configurar o token
  setToken(token: string) {
    this.token = token;
  }
}

export default GitHubBackup;

import { useState } from 'react';
import { Search, RefreshCw, CheckCircle, XCircle, AlertTriangle, ExternalLink, Gauge, Eye, Accessibility, Zap } from 'lucide-react';

interface AuditItem {
  id: string;
  title: string;
  description: string;
  score: number | null;
  displayValue?: string;
}

interface CategoryResult {
  score: number;
  auditRefs: Array<{ id: string; weight: number }>;
}

interface LighthouseResult {
  categories: {
    performance: CategoryResult;
    accessibility: CategoryResult;
    'best-practices': CategoryResult;
    seo: CategoryResult;
  };
  audits: Record<string, AuditItem>;
  finalUrl: string;
  fetchTime: string;
}

interface AnalysisResult {
  lighthouseResult: LighthouseResult;
}

const SITE_URL = 'https://albufeiraholidays.pt';

export function SEOAnalysis() {
  const [url, setUrl] = useState(SITE_URL);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [strategy, setStrategy] = useState<'mobile' | 'desktop'>('mobile');

  const analyzeUrl = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=performance&category=accessibility&category=best-practices&category=seo`;
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao analisar URL');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.9) return 'text-green-600 bg-green-100';
    if (score >= 0.5) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 0.9) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (score >= 0.5) return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    return <XCircle className="h-5 w-5 text-red-600" />;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance': return <Zap className="h-5 w-5" />;
      case 'accessibility': return <Accessibility className="h-5 w-5" />;
      case 'best-practices': return <CheckCircle className="h-5 w-5" />;
      case 'seo': return <Search className="h-5 w-5" />;
      default: return <Gauge className="h-5 w-5" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'performance': return 'Performance';
      case 'accessibility': return 'Acessibilidade';
      case 'best-practices': return 'Boas Práticas';
      case 'seo': return 'SEO';
      default: return category;
    }
  };

  const getFailedAudits = () => {
    if (!result) return [];
    
    const audits = result.lighthouseResult.audits;
    const failed: Array<AuditItem & { category: string }> = [];
    
    // Get SEO audits that failed
    const seoRefs = result.lighthouseResult.categories.seo.auditRefs;
    seoRefs.forEach(ref => {
      const audit = audits[ref.id];
      if (audit && audit.score !== null && audit.score < 1) {
        failed.push({ ...audit, category: 'SEO' });
      }
    });

    // Get Performance audits that failed
    const perfRefs = result.lighthouseResult.categories.performance.auditRefs;
    perfRefs.forEach(ref => {
      const audit = audits[ref.id];
      if (audit && audit.score !== null && audit.score < 0.5 && ref.weight > 0) {
        failed.push({ ...audit, category: 'Performance' });
      }
    });

    // Get Accessibility audits that failed
    const a11yRefs = result.lighthouseResult.categories.accessibility.auditRefs;
    a11yRefs.forEach(ref => {
      const audit = audits[ref.id];
      if (audit && audit.score !== null && audit.score < 1) {
        failed.push({ ...audit, category: 'Acessibilidade' });
      }
    });

    return failed.slice(0, 20); // Limit to 20 items
  };

  const getPassedAudits = () => {
    if (!result) return [];
    
    const audits = result.lighthouseResult.audits;
    const passed: Array<AuditItem & { category: string }> = [];
    
    const seoRefs = result.lighthouseResult.categories.seo.auditRefs;
    seoRefs.forEach(ref => {
      const audit = audits[ref.id];
      if (audit && audit.score === 1) {
        passed.push({ ...audit, category: 'SEO' });
      }
    });

    return passed;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Análise SEO</h1>
          <p className="text-gray-600">Analise o SEO, performance e acessibilidade do seu website usando Google PageSpeed Insights</p>
        </div>

        {/* URL Input */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">URL a analisar</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://albufeiraholidays.pt"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dispositivo</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setStrategy('mobile')}
                  className={`px-4 py-3 rounded-lg border transition-colors ${
                    strategy === 'mobile' 
                      ? 'bg-primary-600 text-white border-primary-600' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  📱 Mobile
                </button>
                <button
                  onClick={() => setStrategy('desktop')}
                  className={`px-4 py-3 rounded-lg border transition-colors ${
                    strategy === 'desktop' 
                      ? 'bg-primary-600 text-white border-primary-600' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  🖥️ Desktop
                </button>
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={analyzeUrl}
                disabled={loading || !url}
                className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    A analisar...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    Analisar
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-500">Páginas rápidas:</span>
            <button 
              onClick={() => setUrl(`${SITE_URL}`)}
              className="text-sm text-primary-600 hover:underline"
            >
              Homepage
            </button>
            <button 
              onClick={() => setUrl(`${SITE_URL}/algarve`)}
              className="text-sm text-primary-600 hover:underline"
            >
              Algarve
            </button>
            <button 
              onClick={() => setUrl(`${SITE_URL}/contacto`)}
              className="text-sm text-primary-600 hover:underline"
            >
              Contacto
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 text-red-700">
              <XCircle className="h-5 w-5" />
              <span className="font-medium">Erro:</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <RefreshCw className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
            <p className="text-gray-600">A analisar o website...</p>
            <p className="text-sm text-gray-400 mt-2">Isto pode demorar 30-60 segundos</p>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <>
            {/* Scores Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {(['performance', 'accessibility', 'best-practices', 'seo'] as const).map((category) => {
                const score = result.lighthouseResult.categories[category].score;
                return (
                  <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                    <div className="flex justify-center mb-3">
                      {getCategoryIcon(category)}
                    </div>
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getScoreColor(score)} mb-3`}>
                      <span className="text-2xl font-bold">{Math.round(score * 100)}</span>
                    </div>
                    <h3 className="font-medium text-gray-900">{getCategoryName(category)}</h3>
                  </div>
                );
              })}
            </div>

            {/* Analysis Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 text-blue-700">
                <Eye className="h-5 w-5" />
                <span>
                  Análise de <strong>{result.lighthouseResult.finalUrl}</strong> em modo <strong>{strategy}</strong>
                </span>
                <a 
                  href={`https://pagespeed.web.dev/report?url=${encodeURIComponent(url)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto flex items-center gap-1 text-blue-600 hover:underline"
                >
                  Ver relatório completo <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Failed Audits */}
            {getFailedAudits().length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  Problemas a Corrigir ({getFailedAudits().length})
                </h2>
                <div className="space-y-4">
                  {getFailedAudits().map((audit, index) => (
                    <div key={index} className="border-l-4 border-yellow-400 pl-4 py-2">
                      <div className="flex items-start gap-2">
                        {audit.score !== null && getScoreIcon(audit.score)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900">{audit.title}</h3>
                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">{audit.category}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{audit.description}</p>
                          {audit.displayValue && (
                            <p className="text-sm text-yellow-700 mt-1 font-medium">{audit.displayValue}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Passed Audits */}
            {getPassedAudits().length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  Auditorias SEO Aprovadas ({getPassedAudits().length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {getPassedAudits().map((audit, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{audit.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="mt-6 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 border border-primary-100">
              <h2 className="text-lg font-bold text-gray-900 mb-3">💡 Dicas para Melhorar o SEO</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Imagens:</strong> Use formatos modernos (WebP) e adicione atributos alt descritivos</li>
                <li>• <strong>Meta Tags:</strong> Cada página deve ter título único e descrição até 160 caracteres</li>
                <li>• <strong>Performance:</strong> Comprima imagens e use lazy loading</li>
                <li>• <strong>Mobile:</strong> Garanta que todos os elementos são clicáveis em dispositivos móveis</li>
                <li>• <strong>HTTPS:</strong> O site já usa HTTPS ✓</li>
                <li>• <strong>Sitemap:</strong> Submeta o sitemap ao Google Search Console</li>
              </ul>
            </div>
          </>
        )}

        {/* Initial State */}
        {!result && !loading && !error && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Gauge className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">Pronto para Analisar</h2>
            <p className="text-gray-600 mb-4">Clique em "Analisar" para verificar o SEO, performance e acessibilidade do seu website</p>
            <p className="text-sm text-gray-400">Powered by Google PageSpeed Insights API (gratuito)</p>
          </div>
        )}
      </div>
    </div>
  );
}

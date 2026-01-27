import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, MapPin, Loader2, RefreshCw, CloudSun, Snowflake, CloudFog } from 'lucide-react';

interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    surface_pressure: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    wind_speed_10m_max: number[];
    sunrise: string[];
    sunset: string[];
  };
}

// Códigos WMO para condições meteorológicas
const getWeatherDescription = (code: number): string => {
  const descriptions: Record<number, string> = {
    0: 'Céu limpo',
    1: 'Principalmente limpo',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Nevoeiro',
    48: 'Nevoeiro com geada',
    51: 'Chuvisco leve',
    53: 'Chuvisco moderado',
    55: 'Chuvisco intenso',
    61: 'Chuva leve',
    63: 'Chuva moderada',
    65: 'Chuva forte',
    71: 'Neve leve',
    73: 'Neve moderada',
    75: 'Neve forte',
    80: 'Aguaceiros leves',
    81: 'Aguaceiros moderados',
    82: 'Aguaceiros fortes',
    95: 'Trovoada',
    96: 'Trovoada com granizo leve',
    99: 'Trovoada com granizo forte',
  };
  return descriptions[code] || 'Desconhecido';
};

const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Usar Open-Meteo API (gratuita, sem chave necessária)
      // Albufeira: lat=37.0882, lon=-8.2503
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=37.0882&longitude=-8.2503&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,sunrise,sunset&timezone=Europe%2FLisbon&forecast_days=3'
      );
      
      if (!response.ok) {
        throw new Error('Falha ao carregar dados meteorológicos');
      }
      
      const data = await response.json();
      setWeather(data);
      setLastUpdate(new Date());
    } catch (err) {
      setError('Não foi possível carregar a meteorologia');
      console.error('Weather error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    // Atualizar a cada 10 minutos
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (code: number, size: string = 'w-8 h-8') => {
    if (code === 0 || code === 1) {
      return <Sun className={`${size} text-yellow-500`} />;
    } else if (code === 2) {
      return <CloudSun className={`${size} text-yellow-400`} />;
    } else if (code === 3) {
      return <Cloud className={`${size} text-gray-500`} />;
    } else if (code === 45 || code === 48) {
      return <CloudFog className={`${size} text-gray-400`} />;
    } else if (code >= 51 && code <= 67) {
      return <CloudRain className={`${size} text-blue-500`} />;
    } else if (code >= 71 && code <= 77) {
      return <Snowflake className={`${size} text-blue-300`} />;
    } else if (code >= 80 && code <= 82) {
      return <CloudRain className={`${size} text-blue-600`} />;
    } else if (code >= 95) {
      return <CloudRain className={`${size} text-purple-500`} />;
    }
    return <Cloud className={`${size} text-gray-400`} />;
  };

  const getBackgroundGradient = (code: number) => {
    if (code === 0 || code === 1) {
      return 'from-yellow-400 to-orange-500';
    } else if (code === 2 || code === 3) {
      return 'from-gray-400 to-gray-600';
    } else if (code >= 51 && code <= 82) {
      return 'from-blue-400 to-blue-600';
    } else if (code >= 71 && code <= 77) {
      return 'from-blue-200 to-blue-400';
    } else if (code >= 95) {
      return 'from-purple-400 to-purple-600';
    }
    return 'from-blue-400 to-cyan-500';
  };

  if (loading && !weather) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="ml-3 text-gray-600">A carregar meteorologia...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
        <div className="text-center py-6">
          <Cloud className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-3 text-sm">{error}</p>
          <button
            onClick={fetchWeather}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  const currentCode = weather.current.weather_code;
  const currentDescription = getWeatherDescription(currentCode);

  return (
    <div className="space-y-4">
      {/* Current Weather - Compact */}
      <div className={`bg-gradient-to-r ${getBackgroundGradient(currentCode)} rounded-xl text-white p-5`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="font-semibold text-sm">Albufeira</span>
          </div>
          <div className="flex items-center gap-1 text-xs opacity-80">
            <RefreshCw className="w-3 h-3" />
            <span>{new Date(lastUpdate).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            {getWeatherIcon(currentCode)}
          </div>
          <div>
            <div className="text-3xl font-bold">{Math.round(weather.current.temperature_2m)}°C</div>
            <div className="text-white/90 text-sm">{currentDescription}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 opacity-70" />
            <span>{Math.round(weather.current.wind_speed_10m)} km/h {getWindDirection(weather.current.wind_direction_10m)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 opacity-70" />
            <span>{weather.current.relative_humidity_2m}%</span>
          </div>
        </div>
      </div>

      {/* 3-Day Forecast - Compact */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Próximos 3 Dias</h4>
        <div className="space-y-2">
          {weather.daily.time.map((date, index) => (
            <div key={date} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                {getWeatherIcon(weather.daily.weather_code[index], 'w-5 h-5')}
                <span className="text-sm text-gray-700">
                  {index === 0 ? 'Hoje' : index === 1 ? 'Amanhã' : new Date(date).toLocaleDateString('pt-PT', { weekday: 'short' })}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-blue-500 flex items-center gap-1">
                  <Droplets className="w-3 h-3" />
                  {weather.daily.precipitation_probability_max[index]}%
                </span>
                <div className="flex gap-1">
                  <span className="font-semibold text-gray-900">{Math.round(weather.daily.temperature_2m_max[index])}°</span>
                  <span className="text-gray-400">{Math.round(weather.daily.temperature_2m_min[index])}°</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sun Times - Compact */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-3 flex items-center gap-3">
          <Sun className="w-5 h-5 text-yellow-500" />
          <div>
            <div className="text-xs text-gray-500">Nascer</div>
            <div className="text-sm font-semibold text-gray-900">
              {new Date(weather.daily.sunrise[0]).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3 flex items-center gap-3">
          <Sun className="w-5 h-5 text-orange-500" />
          <div>
            <div className="text-xs text-gray-500">Pôr do Sol</div>
            <div className="text-sm font-semibold text-gray-900">
              {new Date(weather.daily.sunset[0]).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

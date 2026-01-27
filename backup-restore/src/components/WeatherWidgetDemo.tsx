import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge, MapPin, Loader2, RefreshCw } from 'lucide-react';

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    wind_dir: string;
    pressure_mb: number;
    precip_mm: number;
    humidity: number;
    feelslike_c: number;
    vis_km: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
        };
        daily_chance_of_rain: number;
        maxwind_kph: number;
      };
      astro: {
        sunrise: string;
        sunset: string;
      };
    }>;
  };
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Dados simulados para demonstração
  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados simulados realistas para Albufeira
      const simulatedData: WeatherData = {
        location: {
          name: "Albufeira",
          region: "Faro",
          country: "Portugal",
          localtime: new Date().toLocaleString('pt-PT')
        },
        current: {
          temp_c: 22 + Math.random() * 8, // 22-30°C típico de verão
          condition: {
            text: ["Sunny", "Partly cloudy", "Clear", "Patchy rain possible"][Math.floor(Math.random() * 4)],
            icon: ""
          },
          wind_kph: 10 + Math.random() * 15,
          wind_dir: ["NW", "N", "W", "SW"][Math.floor(Math.random() * 4)],
          pressure_mb: 1010 + Math.random() * 10,
          precip_mm: Math.random() > 0.7 ? Math.random() * 2 : 0,
          humidity: 50 + Math.random() * 30,
          feelslike_c: 21 + Math.random() * 8,
          vis_km: 8 + Math.random() * 2
        },
        forecast: {
          forecastday: [
            {
              date: new Date().toISOString().split('T')[0],
              day: {
                maxtemp_c: 25 + Math.random() * 5,
                mintemp_c: 18 + Math.random() * 4,
                condition: {
                  text: ["Sunny", "Partly cloudy", "Clear"][Math.floor(Math.random() * 3)]
                },
                daily_chance_of_rain: Math.floor(Math.random() * 30),
                maxwind_kph: 15 + Math.random() * 10
              },
              astro: {
                sunrise: "06:30 AM",
                sunset: "08:45 PM"
              }
            },
            {
              date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
              day: {
                maxtemp_c: 24 + Math.random() * 6,
                mintemp_c: 17 + Math.random() * 4,
                condition: {
                  text: ["Sunny", "Partly cloudy", "Clear", "Patchy rain possible"][Math.floor(Math.random() * 4)]
                },
                daily_chance_of_rain: Math.floor(Math.random() * 40),
                maxwind_kph: 12 + Math.random() * 12
              },
              astro: {
                sunrise: "06:31 AM",
                sunset: "08:44 PM"
              }
            },
            {
              date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
              day: {
                maxtemp_c: 23 + Math.random() * 7,
                mintemp_c: 16 + Math.random() * 5,
                condition: {
                  text: ["Partly cloudy", "Sunny", "Clear", "Patchy rain possible"][Math.floor(Math.random() * 4)]
                },
                daily_chance_of_rain: Math.floor(Math.random() * 35),
                maxwind_kph: 14 + Math.random() * 11
              },
              astro: {
                sunrise: "06:32 AM",
                sunset: "08:43 PM"
              }
            }
          ]
        }
      };
      
      setWeather(simulatedData);
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
    // Atualizar a cada 5 minutos para demonstração
    const interval = setInterval(fetchWeather, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('sun') || conditionLower.includes('clear')) {
      return <Sun className="w-8 h-8 text-yellow-500" />;
    } else if (conditionLower.includes('cloud')) {
      return <Cloud className="w-8 h-8 text-gray-500" />;
    } else if (conditionLower.includes('rain')) {
      return <CloudRain className="w-8 h-8 text-blue-500" />;
    } else {
      return <Cloud className="w-8 h-8 text-gray-400" />;
    }
  };

  const getBackgroundGradient = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('sun') || conditionLower.includes('clear')) {
      return 'from-yellow-400 to-orange-500';
    } else if (conditionLower.includes('cloud')) {
      return 'from-gray-400 to-gray-600';
    } else if (conditionLower.includes('rain')) {
      return 'from-blue-400 to-blue-600';
    } else {
      return 'from-blue-400 to-cyan-500';
    }
  };

  if (loading && !weather) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-3 text-gray-600">A carregar meteorologia...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center py-8">
          <Cloud className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchWeather}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="space-y-6">
      {/* Current Weather */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${getBackgroundGradient(weather.current.condition.text)} text-white p-6`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span className="font-semibold">{weather.location.name}, {weather.location.region}</span>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-90">
              <RefreshCw className="w-4 h-4" />
              <span>Atualizado {new Date(lastUpdate).toLocaleTimeString('pt-PT')}</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                {getWeatherIcon(weather.current.condition.text)}
              </div>
              <div>
                <div className="text-4xl font-bold">{Math.round(weather.current.temp_c)}°C</div>
                <div className="text-white/90">{weather.current.condition.text}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-white/70">Sensação</div>
                <div className="font-semibold">{Math.round(weather.current.feelslike_c)}°C</div>
              </div>
              <div>
                <div className="text-white/70">Humidade</div>
                <div className="font-semibold">{weather.current.humidity}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <Wind className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Vento</div>
              <div className="font-semibold text-gray-900">{Math.round(weather.current.wind_kph)} km/h</div>
              <div className="text-xs text-gray-500">{weather.current.wind_dir}</div>
            </div>
            
            <div className="bg-cyan-50 rounded-xl p-4 text-center">
              <Droplets className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Precipitação</div>
              <div className="font-semibold text-gray-900">{weather.current.precip_mm} mm</div>
            </div>
            
            <div className="bg-teal-50 rounded-xl p-4 text-center">
              <Eye className="w-6 h-6 text-teal-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Visibilidade</div>
              <div className="font-semibold text-gray-900">{weather.current.vis_km} km</div>
            </div>
            
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <Gauge className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Pressão</div>
              <div className="font-semibold text-gray-900">{Math.round(weather.current.pressure_mb)} mb</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Day Forecast */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Previsão para 3 Dias</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {weather.forecast.forecastday.map((day, index) => (
            <div key={day.date} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 text-center">
              <div className="font-semibold text-gray-900 mb-2">
                {index === 0 ? 'Hoje' : index === 1 ? 'Amanhã' : new Date(day.date).toLocaleDateString('pt-PT', { weekday: 'long' })}
              </div>
              <div className="text-sm text-gray-600 mb-3">
                {new Date(day.date).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' })}
              </div>
              
              <div className="flex justify-center mb-3">
                {getWeatherIcon(day.day.condition.text)}
              </div>
              
              <div className="text-sm text-gray-600 mb-2">{day.day.condition.text}</div>
              
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="font-semibold text-gray-900">{Math.round(day.day.maxtemp_c)}°</span>
                <span className="text-gray-500">{Math.round(day.day.mintemp_c)}°</span>
              </div>
              
              <div className="mt-3 pt-3 border-t border-blue-100">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Droplets className="w-3 h-3" />
                    <span>{day.day.daily_chance_of_rain}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wind className="w-3 h-3" />
                    <span>{Math.round(day.day.maxwind_kph)}km/h</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sun Times */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Sol e Lua</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Nascer do Sol</div>
                <div className="text-lg font-semibold text-gray-900">
                  {weather.forecast.forecastday[0].astro.sunrise}
                </div>
              </div>
              <Sun className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Pôr do Sol</div>
                <div className="text-lg font-semibold text-gray-900">
                  {weather.forecast.forecastday[0].astro.sunset}
                </div>
              </div>
              <Sun className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

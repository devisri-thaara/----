import React, { useState } from 'react';
import { 
  Search, MapPin, Wind, Droplets, Cloud, Sun, 
  CloudRain, CloudLightning, CloudSnow, Loader2, 
  AlertCircle, ChevronRight, Globe, Shield, 
  Zap, BarChart3, Menu, X, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types for OpenWeatherMap API response
interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(cityName)}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch weather data.');
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const getWeatherIcon = (condition: string) => {
    const c = condition.toLowerCase();
    if (c.includes('clear')) return <Sun className="w-12 h-12 text-yellow-400" />;
    if (c.includes('rain')) return <CloudRain className="w-12 h-12 text-blue-400" />;
    if (c.includes('cloud')) return <Cloud className="w-12 h-12 text-slate-400" />;
    if (c.includes('thunderstorm')) return <CloudLightning className="w-12 h-12 text-indigo-500" />;
    if (c.includes('snow')) return <CloudSnow className="w-12 h-12 text-blue-200" />;
    return <Sun className="w-12 h-12 text-yellow-400" />;
  };

  return (
    <div className="min-h-screen bg-[#fcfcf9] text-slate-900 font-sans selection:bg-indigo-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Cloud className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">SkyCast<span className="text-indigo-600">.</span></span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
              <a href="#demo" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Live Demo</a>
              <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Pricing</a>
              <button className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                Get Started
              </button>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase text-indigo-600 bg-indigo-50 rounded-full">
              Weather Intelligence for Enterprise
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
              Predict the atmosphere <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                with precision.
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-10 leading-relaxed">
              SkyCast delivers hyper-local weather data and predictive analytics to help businesses 
              make informed decisions in an ever-changing climate.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group">
                Start Free Trial
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto bg-white text-slate-900 border-2 border-slate-100 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
                View Documentation
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Engineered for Accuracy</h2>
            <p className="text-slate-600">Built on top of global sensor networks and proprietary AI models.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Globe className="w-6 h-6" />, title: "Global Coverage", desc: "Access real-time data from over 200,000 weather stations worldwide." },
              { icon: <Zap className="w-6 h-6" />, title: "Hyper-Local", desc: "Get precision down to the city block with our advanced downscaling models." },
              { icon: <BarChart3 className="w-6 h-6" />, title: "Predictive Insights", desc: "Utilize ML-driven forecasts to anticipate weather patterns up to 14 days out." },
              { icon: <Shield className="w-6 h-6" />, title: "Enterprise Security", desc: "Bank-grade encryption and 99.99% uptime SLA for mission-critical apps." },
              { icon: <CloudLightning className="w-6 h-6" />, title: "Severe Alerts", desc: "Instant notifications for extreme weather events via API or Webhooks." },
              { icon: <Wind className="w-6 h-6" />, title: "Wind Dynamics", desc: "Detailed atmospheric pressure and wind vector analysis for aviation." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section id="demo" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 p-12 bg-indigo-600 text-white flex flex-col justify-center">
              <h2 className="text-4xl font-bold mb-6">Experience the Precision.</h2>
              <p className="text-indigo-100 mb-8 text-lg">
                Test our real-time engine. Enter any city worldwide to see SkyCast Intelligence in action.
              </p>
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  placeholder="e.g. Tokyo, Japan"
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder:text-indigo-200 outline-none focus:bg-white/20 transition-all"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="absolute right-2 top-2 bottom-2 bg-white text-indigo-600 px-6 rounded-xl font-bold hover:bg-indigo-50 transition-all disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Search"}
                </button>
              </form>
            </div>
            
            <div className="md:w-1/2 p-12 flex flex-col justify-center items-center min-h-[400px]">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex items-center gap-3 text-red-500 bg-red-50 p-4 rounded-2xl"
                  >
                    <AlertCircle />
                    <span className="font-medium">{error}</span>
                  </motion.div>
                )}
                
                {weather && !loading ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full text-center"
                  >
                    <div className="flex items-center justify-center gap-2 text-slate-400 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span className="uppercase tracking-widest text-xs font-bold">{weather.name}</span>
                    </div>
                    <div className="flex justify-center mb-6">
                      {getWeatherIcon(weather.weather[0].main)}
                    </div>
                    <div className="text-7xl font-black text-slate-900 mb-2 leading-none">
                      {Math.round(weather.main.temp)}°
                    </div>
                    <div className="text-lg font-bold text-slate-500 capitalize mb-8">
                      {weather.weather[0].description}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-2xl text-left">
                        <div className="text-slate-400 text-xs font-bold uppercase mb-1">Humidity</div>
                        <div className="text-xl font-bold">{weather.main.humidity}%</div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl text-left">
                        <div className="text-slate-400 text-xs font-bold uppercase mb-1">Wind</div>
                        <div className="text-xl font-bold">{weather.wind.speed} m/s</div>
                      </div>
                    </div>
                  </motion.div>
                ) : !loading && !error && (
                  <div className="text-center text-slate-300">
                    <Cloud className="w-20 h-20 mx-auto mb-4 opacity-20" />
                    <p className="font-medium">Waiting for input...</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Scalable Pricing</h2>
            <p className="text-slate-600">Choose the plan that fits your scale.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Starter", price: "0", features: ["1,000 API calls/mo", "Standard Support", "Global Coverage", "Basic Analytics"] },
              { name: "Professional", price: "49", featured: true, features: ["50,000 API calls/mo", "Priority Support", "Hyper-local Data", "Predictive Insights", "Custom Alerts"] },
              { name: "Enterprise", price: "Custom", features: ["Unlimited API calls", "Dedicated Account Manager", "Custom ML Models", "99.99% Uptime SLA", "On-premise Options"] }
            ].map((plan, i) => (
              <div 
                key={i}
                className={`p-10 rounded-[2rem] border ${plan.featured ? 'bg-white border-indigo-600 shadow-2xl scale-105 relative z-10' : 'bg-white border-slate-100 shadow-sm'}`}
              >
                {plan.featured && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-8">
                  <span className="text-4xl font-black">${plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-slate-400 font-medium">/mo</span>}
                </div>
                <ul className="space-y-4 mb-10">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-indigo-600" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.featured ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Cloud className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">SkyCast<span className="text-indigo-600">.</span></span>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed">
              The world's most advanced weather intelligence platform. 
              Empowering businesses with precision atmospheric data since 2024.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-600">API Reference</a></li>
              <li><a href="#" className="hover:text-indigo-600">Status Page</a></li>
              <li><a href="#" className="hover:text-indigo-600">SDKs</a></li>
              <li><a href="#" className="hover:text-indigo-600">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-600">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
              <li><a href="#" className="hover:text-indigo-600">Contact</a></li>
              <li><a href="#" className="hover:text-indigo-600">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-slate-50 text-center text-xs text-slate-400 font-bold uppercase tracking-widest">
          © 2026 SkyCast Intelligence. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

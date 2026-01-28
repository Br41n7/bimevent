
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { SERVICES, PORTFOLIO, WHATSAPP_NUMBER, INITIAL_REVIEWS, THEMES, LAYOUTS, COLORS, THEME_OPTIONS } from './constants';
import { ServicePackage, PortfolioItem, Review, CustomizationOptions } from './types';

// --- Icons (SVG) ---
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const WhatsAppIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.4-11.3 2.5-2.6 5.5-6.1 8.3-9.2 2.8-3.1 3.7-5.2 5.5-8.8 1.8-3.6.9-6.7-.5-9.4-1.4-2.8-12.5-30.1-17.1-41-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.7 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>;
const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${filled ? 'text-amber-500' : 'text-neutral-300'}`} fill={filled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>;

const LayoutIcon: React.FC<{ type: string; active: boolean }> = ({ type, active }) => {
  const color = active ? 'text-amber-600' : 'text-neutral-300';
  switch (type) {
    case 'Traditional':
      return (
        <svg className={`w-12 h-12 ${color} transition-colors`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="3" y="3" width="6" height="6" rx="1" />
          <rect x="15" y="3" width="6" height="6" rx="1" />
          <rect x="3" y="15" width="6" height="6" rx="1" />
          <rect x="15" y="15" width="6" height="6" rx="1" />
          <path d="M12 2v20M2 12h20" strokeDasharray="2 2" />
        </svg>
      );
    case 'Open-Flow':
      return (
        <svg className={`w-12 h-12 ${color} transition-colors`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2 2M17 17l2 2M19 5l-2 2M5 19l2-2" />
          <circle cx="12" cy="12" r="9" strokeDasharray="4 4" />
        </svg>
      );
    case 'Intimate-Clusters':
      return (
        <svg className={`w-12 h-12 ${color} transition-colors`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="18" r="3" />
          <path d="M10 6h4M10 18h4M6 10v4M18 10v4" strokeDasharray="2 2" />
        </svg>
      );
    case 'Immersive-360':
      return (
        <svg className={`w-12 h-12 ${color} transition-colors`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" fill="currentColor" fillOpacity="0.2" />
          <path d="M12 2v20M2 12h20" strokeDasharray="1 3" />
        </svg>
      );
    default:
      return null;
  }
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'AI Dreamer', href: '#ai-dreamer' },
    { name: 'Reviews', href: '#reviews' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <span className="text-neutral-900 serif">BIM</span>
          <span className="gradient-text font-bold">EVENT</span>
        </a>

        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-semibold tracking-wide hover:text-amber-600 transition-colors uppercase">
              {link.name}
            </a>
          ))}
          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold text-white px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-all shadow-lg flex items-center gap-2"
          >
            <WhatsAppIcon />
            Inquire Now
          </a>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 transform ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col p-6 space-y-4">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-lg font-medium border-b border-neutral-100 pb-2">
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000" 
          alt="Hero Background" 
          className="w-full h-full object-cover scale-110"
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 text-white mt-20">
        <div className="max-w-2xl animate-fade-in-up">
          <h2 className="text-amber-500 font-bold uppercase tracking-[0.3em] mb-4 text-sm">Exquisite Event Craftsmanship</h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight">
            Where Every Detail <br /> <span className="serif italic">Becomes a Memory</span>
          </h1>
          <p className="text-lg text-neutral-300 mb-10 max-w-lg leading-relaxed font-light">
            BIM Event specializes in creating world-class, bespoke experiences that blend timeless elegance with modern sophistication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#portfolio" className="bg-gold text-white px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:scale-105 transition-transform text-center shadow-xl">
              View Our Works
            </a>
            <a href="#ai-dreamer" className="border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all text-center">
              AI Event Dreamer
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceSection: React.FC = () => (
  <section id="services" className="py-24 bg-white">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h3 className="gradient-text font-bold uppercase tracking-widest text-sm mb-2">Our Offerings</h3>
        <h2 className="text-4xl md:text-5xl">Curated Service Packages</h2>
        <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {SERVICES.map((pkg) => (
          <div key={pkg.id} className="group bg-neutral-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="relative h-64 overflow-hidden">
              <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold uppercase text-amber-600 shadow-md">
                {pkg.category}
              </div>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-2xl font-semibold serif">{pkg.name}</h4>
                <span className="text-amber-700 font-bold">{pkg.price}</span>
              </div>
              <p className="text-neutral-600 mb-6 text-sm leading-relaxed">{pkg.description}</p>
              <ul className="space-y-3 mb-8">
                {pkg.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                    <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => {
                  const msg = encodeURIComponent(`Hi BIM Event! I'm interested in the "${pkg.name}" package. Can we discuss the details?`);
                  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
                }}
                className="w-full py-4 bg-neutral-900 text-white rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-amber-600 transition-colors flex justify-center items-center gap-2 shadow-lg"
              >
                <WhatsAppIcon />
                Order via WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PortfolioCard: React.FC<{ item: PortfolioItem }> = ({ item }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`group relative h-[400px] overflow-hidden rounded-2xl cursor-pointer transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">{item.category}</span>
        <h4 className="text-xl font-medium serif mt-1">{item.title}</h4>
        <p className="text-xs text-neutral-400 mt-2 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          {item.location}
        </p>
      </div>
    </div>
  );
};

const PortfolioSection: React.FC = () => (
  <section id="portfolio" className="py-24 bg-neutral-900 text-white">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-xl">
          <h3 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-2">Our Legacy</h3>
          <h2 className="text-4xl md:text-5xl mb-4">Past Masterpieces</h2>
          <p className="text-neutral-400 font-light">Take a glimpse into the magical atmospheres we've crafted for our distinguished clients around the globe.</p>
        </div>
        <a href="#reviews" className="text-amber-500 font-bold tracking-widest uppercase text-sm border-b-2 border-amber-500/30 pb-1 hover:border-amber-500 transition-all">
          Client Feedback
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PORTFOLIO.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  </section>
);

const EventDreamerSection: React.FC = () => {
  const [eventType, setEventType] = useState('Wedding');
  const [customization, setCustomization] = useState<CustomizationOptions>({
    theme: 'Bohemian',
    layout: 'Open-Flow',
    colorPalette: 'Champagne Gold'
  });

  const eventTypes = [
    { id: 'Wedding', icon: '💍', label: 'Wedding' },
    { id: 'Corporate', icon: '🏢', label: 'Corporate Gala' },
    { id: 'Birthday', icon: '🎂', label: 'Birthday Bash' },
    { id: 'Anniversary', icon: '🍷', label: 'Anniversary' },
    { id: 'Launch', icon: '🚀', label: 'Product Launch' },
    { id: 'Private', icon: '🤫', label: 'Private Soirée' }
  ];

  const dreamVision = useMemo(() => {
    const descriptions: Record<string, string> = {
      'Royal': 'A majestic atmosphere filled with velvet textures and grand entrances.',
      'Minimalist': 'Clean lines, purposeful spaces, and a sophisticated lack of clutter.',
      'Bohemian': 'Whimsical textures, earthy palettes, and a free-spirited energy.',
      'Industrial': 'Raw materials, Edison bulbs, and an urban edge that feels both modern and historic.',
      'Futuristic': 'Holographic accents, sleek surfaces, and a neon-infused nightlife vibe.',
      'Vintage Chic': 'Nostalgic charm, lace overlays, and timeless romantic artifacts.',
      'Modern Luxury': 'High-gloss finishes, contemporary art, and absolute peak elegance.',
      'Tropical Escape': 'Lush greenery, exotic florals, and the warm breeze of a paradise getaway.',
      'Solar Punk': 'The intersection of nature and high-tech, featuring living walls and biometric lighting.',
      'Old Money': 'Silent luxury, heirloom-quality settings, and a focus on generational prestige.',
      'Dark Academia': 'Mood lighting, heavy wood, leather-bound aesthetics, and intellectual mystery.',
      'Desert Mirage': 'Sandstone textures, warm ambient glow, and a high-fashion oasis feel.'
    };
    
    const layoutDetails: Record<string, string> = {
      'Traditional': 'Structured seating and a focus on centralized ceremony or stage.',
      'Open-Flow': 'Encouraging movement and networking with an airy, borderless feel.',
      'Intimate-Clusters': 'Small, private seating groups designed for deep conversation.',
      'Immersive-360': 'Surrounding guests with sights and sounds for a true sensory journey.'
    };

    const flowPreview: Record<string, string> = {
      'Traditional': 'Formal & Directed',
      'Open-Flow': 'Social & Kinetic',
      'Intimate-Clusters': 'Private & Cozy',
      'Immersive-360': 'Symmetric & Deep'
    };

    return {
      title: `${customization.theme} ${eventType} Vision`,
      summary: `Our planners will architect a ${customization.theme.toLowerCase()} experience using an ${customization.layout.toLowerCase()} layout, saturated with ${customization.colorPalette} tones. ${descriptions[customization.theme] || 'A unique bespoke experience.'}`,
      vibe: `${customization.theme} & ${customization.layout}`,
      flow: layoutDetails[customization.layout],
      previewLabel: flowPreview[customization.layout]
    };
  }, [eventType, customization]);

  const handleWhatsAppShare = () => {
    const msg = encodeURIComponent(
      `Hi BIM Event! I've designed a custom event vision:\n\n` +
      `- Type: ${eventType}\n` +
      `- Theme Selection: ${customization.theme}\n` +
      `- Spatial Layout: ${customization.layout}\n` +
      `- Palette: ${customization.colorPalette}\n\n` +
      `I love the vision: "${dreamVision.title}". Can we architect this?`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <section id="ai-dreamer" className="py-24 bg-neutral-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="gradient-text font-bold uppercase tracking-widest text-sm mb-2">Architect Your Atmosphere</h3>
            <h2 className="text-4xl md:text-5xl mb-6">AI Event Dreamer</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto font-light leading-relaxed">
              Instantly visualize your event's DNA. Our dreamer engine reflects your aesthetic and spatial choices in real-time.
            </p>
          </div>

          {/* Specify Event Category */}
          <div className="mb-12 bg-white p-8 rounded-[2.5rem] shadow-xl border border-neutral-100">
            <h4 className="text-xl font-bold serif mb-6 text-center">0. Specify Event Category</h4>
            <div className="flex flex-wrap justify-center gap-3">
              {eventTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setEventType(type.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 text-sm font-bold uppercase tracking-widest ${
                    eventType === type.id 
                    ? 'bg-neutral-900 text-white shadow-xl scale-105' 
                    : 'bg-neutral-50 text-neutral-400 hover:bg-neutral-100'
                  }`}
                >
                  <span className="text-lg">{type.icon}</span>
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Customization Panel */}
            <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl border border-neutral-100 flex flex-col gap-12">
              <div>
                <h4 className="text-2xl font-bold serif mb-8 text-neutral-800">1. Curated Themes</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {THEME_OPTIONS.map(opt => (
                    <button 
                      key={opt.name}
                      onClick={() => setCustomization({...customization, theme: opt.name})}
                      className={`group relative aspect-[4/5] overflow-hidden rounded-2xl transition-all duration-300 border-4 ${customization.theme === opt.name ? 'border-amber-500 scale-105 shadow-2xl' : 'border-transparent opacity-80 hover:opacity-100'}`}
                    >
                      <img src={opt.image} alt={opt.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-center">
                        <span className="text-[10px] text-white font-bold uppercase tracking-[0.2em]">{opt.name}</span>
                      </div>
                      {customization.theme === opt.name && (
                         <div className="absolute top-2 right-2 bg-amber-500 text-white p-1 rounded-full shadow-lg">
                           <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                         </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-bold serif mb-8 text-neutral-800">2. Spatial Logic</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {LAYOUTS.map(l => (
                    <button 
                      key={l}
                      onClick={() => setCustomization({...customization, layout: l as any})}
                      className={`flex items-center gap-5 p-6 rounded-3xl border-2 transition-all group relative overflow-visible ${customization.layout === l ? 'border-amber-500 bg-amber-50/50 shadow-inner' : 'border-neutral-50 bg-neutral-50/30 hover:border-neutral-200'}`}
                    >
                      <div className="relative group/icon-wrapper">
                        <LayoutIcon type={l} active={customization.layout === l} />
                        {/* Elegant Tooltip */}
                        <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-2 rounded-lg opacity-0 group-hover/icon-wrapper:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-2xl transform translate-y-2 group-hover/icon-wrapper:translate-y-0 z-20">
                          {l} Blueprint
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 rotate-45" />
                        </div>
                      </div>
                      <div className="text-left">
                        <span className={`block text-xs font-bold uppercase tracking-[0.2em] mb-1 ${customization.layout === l ? 'text-amber-800' : 'text-neutral-500'}`}>{l}</span>
                        <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-medium">Flow Profile</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-bold serif mb-8 text-neutral-800">3. Atmosphere Palette</h4>
                <div className="flex flex-wrap gap-6">
                  {COLORS.map(c => (
                    <button 
                      key={c.name}
                      onClick={() => setCustomization({...customization, colorPalette: c.name})}
                      className="flex flex-col items-center gap-3 group"
                    >
                      <div className={`w-14 h-14 rounded-full ${c.class} shadow-lg transition-transform group-hover:scale-110 border-4 ${customization.colorPalette === c.name ? 'border-white ring-2 ring-amber-500 scale-110' : 'border-transparent'}`} />
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${customization.colorPalette === c.name ? 'text-amber-700' : 'text-neutral-400'}`}>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Blueprint Vision Card */}
            <div className="lg:col-span-5 sticky top-24 h-fit">
              <div className="bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border border-neutral-100 flex flex-col relative">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={THEME_OPTIONS.find(t => t.name === customization.theme)?.image} 
                    alt="Preview" 
                    className="w-full h-full object-cover grayscale opacity-30 mix-blend-multiply" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                  <div className="absolute top-10 left-10 flex items-center gap-3">
                     <span className="bg-neutral-900 text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] shadow-2xl">BIM Blueprint</span>
                     <span className="bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest">{dreamVision.previewLabel}</span>
                  </div>
                </div>

                <div className="px-12 pb-12 -mt-16 relative z-10">
                  <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white/50">
                    <h5 className="text-[11px] font-bold text-amber-600 uppercase tracking-[0.4em] mb-4 text-center">Vision Manifested</h5>
                    <h4 className="text-3xl md:text-4xl font-bold serif mb-8 leading-tight text-neutral-900 text-center">{dreamVision.title}</h4>
                    
                    <div className="space-y-8">
                      <div className="flex gap-6 p-7 bg-neutral-900 rounded-3xl text-white shadow-xl">
                         <div className="w-1.5 h-auto bg-amber-500 rounded-full flex-shrink-0" />
                         <div>
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Narrative Core</span>
                            <p className="text-sm font-light leading-relaxed italic opacity-90">"{dreamVision.summary}"</p>
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-5 border border-neutral-100 rounded-3xl bg-neutral-50/50">
                          <span className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Spatial Logic</span>
                          <span className="text-xs text-neutral-800 font-semibold">{dreamVision.flow}</span>
                        </div>
                        <div className="p-5 border border-neutral-100 rounded-3xl bg-neutral-50/50">
                          <span className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Signature Aura</span>
                          <span className="text-xs text-amber-700 font-black uppercase tracking-tighter">{dreamVision.vibe}</span>
                        </div>
                      </div>

                      <button 
                        onClick={handleWhatsAppShare}
                        className="w-full bg-gold text-white py-6 rounded-3xl text-xs font-bold tracking-[0.2em] uppercase hover:scale-[1.02] hover:shadow-gold/20 active:scale-95 transition-all flex justify-center items-center gap-3 shadow-2xl"
                      >
                        <WhatsAppIcon />
                        Architect via WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-6">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">Consultation Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    
    const review: Review = {
      id: Math.random().toString(36).substr(2, 9),
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      avatar: `https://i.pravatar.cc/150?u=${newReview.name}`
    };
    
    setReviews([review, ...reviews]);
    setNewReview({ name: '', rating: 5, comment: '' });
    setShowForm(false);
  };

  return (
    <section id="reviews" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 text-center md:text-left">
          <div>
            <h3 className="gradient-text font-bold uppercase tracking-widest text-sm mb-2">Social Proof</h3>
            <h2 className="text-4xl md:text-5xl mb-4">Client Love Letters</h2>
            <p className="text-neutral-500 font-light">Join our growing list of satisfied partners and visionary clients.</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="px-8 py-4 border-2 border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all shadow-md"
          >
            {showForm ? 'Cancel Review' : 'Leave a Review'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-16 max-w-2xl mx-auto bg-neutral-50 p-8 rounded-3xl shadow-lg animate-fade-in border border-neutral-100">
            <h4 className="text-xl serif font-semibold mb-6">Share Your Experience</h4>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full bg-white border border-neutral-100 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20"
                value={newReview.name}
                onChange={(e) => setNewReview({...newReview, name: e.target.value})}
              />
              <div className="flex items-center gap-4 py-2">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Your Rating:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button key={num} type="button" onClick={() => setNewReview({...newReview, rating: num})}>
                      <StarIcon filled={num <= newReview.rating} />
                    </button>
                  ))}
                </div>
              </div>
              <textarea 
                placeholder="What did you love about BIM Event?" 
                rows={4}
                className="w-full bg-white border border-neutral-100 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20"
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              />
              <button className="w-full bg-neutral-900 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-xl hover:bg-amber-600 transition-colors">
                Publish Feedback
              </button>
            </div>
          </form>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100 hover:shadow-xl transition-all group flex flex-col h-full">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < rev.rating} />)}
              </div>
              <p className="text-neutral-600 text-sm italic mb-8 font-light leading-relaxed flex-1">"{rev.comment}"</p>
              <div className="flex items-center gap-4">
                <img src={rev.avatar} className="w-12 h-12 rounded-full border-2 border-white shadow-md grayscale group-hover:grayscale-0 transition-all" alt={rev.name} />
                <div>
                  <h5 className="text-sm font-bold serif">{rev.name}</h5>
                  <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-widest">{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-neutral-900 text-white py-20">
    <div className="container mx-auto px-6 text-center">
      <div className="grid md:grid-cols-4 gap-12 mb-16 text-left">
        <div className="col-span-1 md:col-span-2">
          <a href="#" className="text-3xl font-bold tracking-tighter flex items-center gap-2 mb-6">
            <span className="serif">BIM</span>
            <span className="gradient-text">EVENT</span>
          </a>
          <p className="text-neutral-400 max-w-sm font-light leading-relaxed">
            Crafting legendary experiences through meticulous planning and innovative design. From intimate soirees to grand celebrations.
          </p>
          <div className="flex gap-6 mt-8">
            {['Instagram', 'Pinterest', 'LinkedIn', 'YouTube'].map(social => (
              <a key={social} href="#" className="text-neutral-500 hover:text-amber-500 transition-colors text-sm font-medium uppercase tracking-widest">
                {social}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h5 className="font-bold uppercase tracking-[0.2em] text-xs text-amber-500 mb-8">Navigation</h5>
          <ul className="space-y-4 text-sm font-light text-neutral-400">
            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
            <li><a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a></li>
            <li><a href="#ai-dreamer" className="hover:text-white transition-colors">AI Dreamer</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold uppercase tracking-[0.2em] text-xs text-amber-500 mb-8">Connect</h5>
          <ul className="space-y-4 text-sm font-light text-neutral-400">
            <li className="flex items-center gap-3">hello@bimevent.com</li>
            <li className="flex items-center gap-3">123 Elegance St, Beverly Hills</li>
            <li className="flex items-center gap-3 underline decoration-amber-500/30">Careers</li>
          </ul>
        </div>
      </div>
      <div className="pt-12 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-neutral-500 text-xs tracking-widest uppercase">
          &copy; 2024 BIM EVENT. ALL RIGHTS RESERVED.
        </p>
        <p className="text-neutral-500 text-xs tracking-widest uppercase">
          STAY MAGICAL
        </p>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ServiceSection />
        <PortfolioSection />
        <EventDreamerSection />
        <ReviewSection />
      </main>
      <Footer />

      {/* Persistent WhatsApp FAB */}
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-[60] group"
      >
        <WhatsAppIcon />
        <span className="absolute right-full mr-4 bg-white text-neutral-900 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Message Us
        </span>
      </a>
    </div>
  );
};

export default App;

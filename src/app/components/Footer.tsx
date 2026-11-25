import { Mail, MapPin, Globe, Linkedin, Instagram, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#141414] border-t border-white/10 mt-12 md:mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#B3B3B3] mt-1" />
            <div>
              <p className="text-[#B3B3B3] text-xs md:text-sm mb-1">Email</p>
              <a 
                href="mailto:hello@muneezahmed.com" 
                className="text-white hover:text-[#E50914] transition-colors text-sm md:text-base"
              >
                hello@muneezahmed.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#B3B3B3] mt-1" />
            <div>
              <p className="text-[#B3B3B3] text-xs md:text-sm mb-1">Location</p>
              <p className="text-white text-sm md:text-base">Dubai, UAE</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Globe className="w-4 h-4 md:w-5 md:h-5 text-[#B3B3B3] mt-1" />
            <div>
              <p className="text-[#B3B3B3] text-xs md:text-sm mb-1">Website</p>
              <a 
                href="https://www.muneezahmed.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#E50914] transition-colors text-sm md:text-base"
              >
                www.muneezahmed.com
              </a>
            </div>
          </div>

          <div>
            <p className="text-[#B3B3B3] text-xs md:text-sm mb-3">Connect</p>
            <div className="flex gap-4">
              <a 
                href="https://wa.me/971586388362" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#E50914] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a 
                href="https://www.linkedin.com/in/mrmnz/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#E50914] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a 
                href="https://www.instagram.com/mr_mnz/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#E50914] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 md:pt-6">
          <p className="text-[#B3B3B3] text-center text-xs md:text-sm">
            © 2025 Muneez Ahmed's portfolio! Built like Netflix.
          </p>
        </div>
      </div>
    </footer>
  );
}
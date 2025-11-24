import React from 'react';
import { Facebook, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialIcons = [
    { icon: Facebook, label: 'Facebook', url: 'https://www.facebook.com/people/black-sheep/61573694167892/' },
    { icon: Linkedin, label: 'Linkedin', url: 'https://www.linkedin.com/company/blcksheep/' },
    { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/black_sheepft/?hl=es' },
  ];

  return (
    <footer className="section-padding pt-20 pb-8">
      
      <div className="border-t border-gray-700 pt-6">
                <h5 className="font-semibold text-white mb-4 text-center">Síguenos en redes sociales</h5>
                <div className="flex justify-center space-x-4">
                  {socialIcons.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-yellow-400 hover:to-orange-500 transition-all duration-300 transform hover:scale-110 group"
                        aria-label={social.label}
                      >
                        <IconComponent
                          size={24}
                          className="text-white group-hover:text-gray-900 transition-colors"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>

      <div className="border-t border-gray-800 mt-12 pt-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm flex items-center">
              © {currentYear} black_sheep®. Todos los derechos reservados.
            </div>
            
            <div className="flex items-center">
              <a 
                href="https://blck-sheep.com/aviso_privacidad.php" 
                className="text-gray-400 hover:text-yellow-400 transition duration-300 text-sm hover:underline flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Política de privacidad
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
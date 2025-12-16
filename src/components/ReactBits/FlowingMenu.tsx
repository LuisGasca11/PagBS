import React from 'react';
import { gsap } from 'gsap';
import './FlowingMenu.css';

interface MenuItemProps {
  externalLink: string;
  internalLink: string;
  text: string;
  image: string;
  imageSize?: { width: number; height: number };
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
  return (
    <div className="menu-wrap">
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ externalLink, internalLink, text, image, imageSize }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);
  const linksContainerRef = React.useRef<HTMLDivElement>(null);
  
  const [showLinks, setShowLinks] = React.useState(false);

  const animationDefaults: gsap.TweenVars = { duration: 0.6, ease: 'expo' };

  const distMetric = (x: number, y: number, x2: number, y2: number): number => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });

    tl.set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    
    // No cerrar el marquee si estamos sobre los botones
    if (linksContainerRef.current?.contains(ev.relatedTarget as Node)) {
      return;
    }
    
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    const tl = gsap.timeline({ defaults: animationDefaults });

    tl.to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0).to(
      marqueeInnerRef.current,
      { y: edge === 'top' ? '101%' : '-101%' },
      0
    );
    
    setShowLinks(false);
  };

  const handleClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setShowLinks(!showLinks);
  };

  const repeatedMarqueeContent = React.useMemo(() => {
    const imgStyle: React.CSSProperties = {
      backgroundImage: `url(${image})`,
      ...(imageSize && {
        width: `${imageSize.width}px`,
        height: `${imageSize.height}px`
      })
    };

    return Array.from({ length: 4 }).map((_, idx) => (
      <React.Fragment key={idx}>
        <span>{text}</span>
        <div className="marquee__img" style={imgStyle} />
      </React.Fragment>
    ));
  }, [text, image, imageSize]);

  return (
    <div className="menu__item" ref={itemRef}>
      <div 
        className="menu__item-link" 
        onClick={handleClick}
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </div>
      
      <div className="marquee" ref={marqueeRef} onMouseLeave={handleMouseLeave}>
        <div className="marquee__inner-wrap" ref={marqueeInnerRef}>
          <div className="marquee__inner" aria-hidden="true">
            {repeatedMarqueeContent}
          </div>
        </div>
        
        <div 
          ref={linksContainerRef}
          className={`links-container ${showLinks ? 'links-container--active' : ''}`}
        >
          <a 
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="link-button link-button--external"
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            Visitar Sitio
          </a>
          
          <a 
            href={internalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="link-button link-button--internal"
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            Ver Highlights
          </a>
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;
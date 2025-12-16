"use client";

import FlowingMenu from "../ReactBits/FlowingMenu";

const demoItems = [
  { 
    externalLink: 'https://elyssia.com.mx/',
    internalLink: '/RetosElyssia',
    text: 'ELYSSIA', 
    image: '/ely.png',
    imageSize: { width: 300, height: 80 } 
  },
  { 
    externalLink: 'https://goumam.com',
    internalLink: '/RetosGoumam',
    text: 'Goumam', 
    image: '/gmn.png',
    imageSize: { width: 450, height: 350 } 
  },
  { 
    externalLink: 'https://fyttsa.com',
    internalLink: '/RetosFyttsa',
    text: 'FYTTSA', 
    image: '/FYTTSAGO.png',
    imageSize: { width: 350, height: 200 }
  },
  { 
    externalLink: 'https://fyttsuite.com',
    internalLink: '/BmktPage',
    text: 'Fyttsuite', 
    image: '/fyttsuite.png',
    imageSize: { width: 500, height: 150 } 
  }
];

export default function CExito() {
  return (
    <div style={{ height: "950px", position: "relative" }}>
      <FlowingMenu items={demoItems} />
    </div>
  );
}
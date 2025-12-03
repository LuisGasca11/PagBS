"use client"

import { Twitter, Github, Linkedin } from "lucide-react"
import { useLocation } from "react-router-dom"

export function FooterSection() {

  const location = useLocation();
  const isMicroPage = location.pathname === "/MicroPage";

  const textMain = isMicroPage ? "text-black" : "text-foreground";
  const textMuted = isMicroPage ? "text-black/60" : "text-muted-foreground";

  return (
    <footer
      className={`
        w-full max-w-[1320px] mx-auto px-5 text-white
        flex flex-col md:flex-row justify-between items-start 
        gap-8 md:gap-0 py-10 md:py-[70px]
      `}
    >
      {/* Left Section */}
      <div className="flex flex-col justify-start items-start gap-8 p-4 md:p-8">
        <div className="flex gap-3 items-stretch justify-center">
          <div className={`text-xl font-semibold leading-4 ${textMain}`}>
            Pointer
          </div>
        </div>

        <p className={`${isMicroPage ? "text-black/70" : "text-foreground/90"} text-sm font-medium leading-[18px]`}>
          Coding made effortless
        </p>

        <div className="flex justify-start items-start gap-3">
          <Twitter className={`w-4 h-4 ${textMuted}`} />
          <Github className={`w-4 h-4 ${textMuted}`} />
          <Linkedin className={`w-4 h-4 ${textMuted}`} />
        </div>
      </div>

      {/* Right Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 p-4 md:p-8 w-full md:w-auto text-white">
        
        {/* Column 1 */}
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className={`${textMuted} text-sm font-medium leading-5`}>Product</h3>
          <div className="flex flex-col gap-2">
            <a className={`${textMain} text-sm hover:underline`}>Features</a>
            <a className={`${textMain} text-sm hover:underline`}>Pricing</a>
            <a className={`${textMain} text-sm hover:underline`}>Integrations</a>
            <a className={`${textMain} text-sm hover:underline`}>Real-time Previews</a>
            <a className={`${textMain} text-sm hover:underline`}>Multi-Agent Coding</a>
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className={`${textMuted} text-sm`}>Company</h3>
          <div className="flex flex-col gap-2">
            <a className={`${textMain} text-sm hover:underline`}>About us</a>
            <a className={`${textMain} text-sm hover:underline`}>Our team</a>
            <a className={`${textMain} text-sm hover:underline`}>Careers</a>
            <a className={`${textMain} text-sm hover:underline`}>Brand</a>
            <a className={`${textMain} text-sm hover:underline`}>Contact</a>
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className={`${textMuted} text-sm`}>Resources</h3>
          <div className="flex flex-col gap-2">
            <a className={`${textMain} text-sm hover:underline`}>Terms of use</a>
            <a className={`${textMain} text-sm hover:underline`}>API Reference</a>
            <a className={`${textMain} text-sm hover:underline`}>Documentation</a>
            <a className={`${textMain} text-sm hover:underline`}>Community</a>
            <a className={`${textMain} text-sm hover:underline`}>Support</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

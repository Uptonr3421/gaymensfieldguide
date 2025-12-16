
import { Metadata } from 'next';
import React from 'react';
import { VibeBento, BentoItem } from '@/components/Antigravity/VibeBento';
import { SimulatorEngine } from '@/components/Antigravity/SimulatorEngine';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Hardware Arsenal | GMFG",
  description: "Tactical hardware for the modern Vibe Coder. Curated tools for privacy, security, and local AI development.",
  keywords: ['Flipper Zero', 'Raspberry Pi', 'Hardware Wallet', 'Privacy Tools', 'Local LLM', 'Vibe Coder'],
  openGraph: {
    title: 'Hardware Arsenal // GMFG',
    description: 'Tactical hardware for the modern Vibe Coder. Tools, not toys.',
    images: ['/images/blog/gpu-rig-thumb.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hardware Arsenal // GMFG',
    description: 'Tactical hardware for the modern Vibe Coder.',
  },
};

export default function ArsenalPage() {
  return (
    <div className="min-h-screen p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-8">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4 uppercase">
          Hardware
        </h1>
        <div className="flex items-center gap-4 font-mono text-xs text-zinc-500">
          <span>CURATED TOOLS FOR THE MODERN VIBE CODER</span>
        </div>
      </div>

      <VibeBento>

        <BentoItem span={2} title="HARDWARE" className="flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white text-lg">Flipper Zero (Black Edition)</h3>
                    <span className="font-mono text-zinc-600 line-through">$169</span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">Multi-tool device for geeks. RFID, NFC, Sub-GHz. The ultimate pen-testing toy.</p>
                
                <div className="w-full h-32 bg-zinc-900 border border-zinc-800 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none" />
                     <div className="flex items-center justify-center h-full text-zinc-600 font-mono text-xs">
                        [IMG: flipper-zero]
                     </div>
                </div>
            </div>
            
            
            <div className="mt-4 border-t border-zinc-800 pt-4">
                <p className="text-[10px] text-zinc-500 mb-2 uppercase">VIRTUAL_DEMO_MODE:</p>
                <SimulatorEngine type="frequency" autoStart={false} />
            </div>
            
            
            <button className="w-full mt-4 bg-zinc-800 text-white py-2 hover:bg-neon-yellow hover:text-black transition-colors font-mono text-xs uppercase tracking-widest border border-zinc-700">
                ADD_TO_CART
            </button>
        </BentoItem>
        
        <BentoItem span={1} title="COMPUTE" className="flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white text-lg">Raspberry Pi 5 (8GB)</h3>
                    <span className="font-mono text-zinc-600 line-through">$80</span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">The new standard. PCIe lane included. Run a local LLM (slowly).</p>
                
                <div className="w-full h-32 bg-zinc-900 border border-zinc-800 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none" />
                     <div className="flex items-center justify-center h-full text-zinc-600 font-mono text-xs">
                        [IMG: raspberry-pi-5]
                     </div>
                </div>
            </div>
            
            
            
            <button className="w-full mt-4 bg-zinc-800 text-white py-2 hover:bg-neon-yellow hover:text-black transition-colors font-mono text-xs uppercase tracking-widest border border-zinc-700">
                ADD_TO_CART
            </button>
        </BentoItem>
        
        <BentoItem span={1} title="SECURITY" className="flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white text-lg">USB Rubber Ducky</h3>
                    <span className="font-mono text-zinc-600 line-through">$55</span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">Keystroke injection tool. Don't plug this into your work laptop.</p>
                
                <div className="w-full h-32 bg-zinc-900 border border-zinc-800 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none" />
                     <div className="flex items-center justify-center h-full text-zinc-600 font-mono text-xs">
                        [IMG: rubber-ducky]
                     </div>
                </div>
            </div>
            
            
            <div className="mt-4 border-t border-zinc-800 pt-4">
                <p className="text-[10px] text-zinc-500 mb-2 uppercase">VIRTUAL_DEMO_MODE:</p>
                <SimulatorEngine type="jailbreak" autoStart={false} />
            </div>
            
            
            <button className="w-full mt-4 bg-zinc-800 text-white py-2 hover:bg-neon-yellow hover:text-black transition-colors font-mono text-xs uppercase tracking-widest border border-zinc-700">
                ADD_TO_CART
            </button>
        </BentoItem>
        
        <BentoItem span={1} title="SECURITY" className="flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white text-lg">Proxmark 3 Easy</h3>
                    <span className="font-mono text-zinc-600 line-through">$85</span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">The gold standard for RFID analysis. Clone your office badge.</p>
                
                <div className="w-full h-32 bg-zinc-900 border border-zinc-800 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none" />
                     <div className="flex items-center justify-center h-full text-zinc-600 font-mono text-xs">
                        [IMG: proxmark-3]
                     </div>
                </div>
            </div>
            
            
            <div className="mt-4 border-t border-zinc-800 pt-4">
                <p className="text-[10px] text-zinc-500 mb-2 uppercase">VIRTUAL_DEMO_MODE:</p>
                <SimulatorEngine type="fingerprint" autoStart={false} />
            </div>
            
            
            <button className="w-full mt-4 bg-zinc-800 text-white py-2 hover:bg-neon-yellow hover:text-black transition-colors font-mono text-xs uppercase tracking-widest border border-zinc-700">
                ADD_TO_CART
            </button>
        </BentoItem>
        
        <BentoItem span={1} title="COMMS" className="flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white text-lg">Heltec V3 Meshtastic Kit</h3>
                    <span className="font-mono text-zinc-600 line-through">$35</span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">Off-grid LoRa communicator. When the internet dies, this still works.</p>
                
                <div className="w-full h-32 bg-zinc-900 border border-zinc-800 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none" />
                     <div className="flex items-center justify-center h-full text-zinc-600 font-mono text-xs">
                        [IMG: meshtastic-kit]
                     </div>
                </div>
            </div>
            
            
            <div className="mt-4 border-t border-zinc-800 pt-4">
                <p className="text-[10px] text-zinc-500 mb-2 uppercase">VIRTUAL_DEMO_MODE:</p>
                <SimulatorEngine type="frequency" autoStart={false} />
            </div>
            
            
            <button className="w-full mt-4 bg-zinc-800 text-white py-2 hover:bg-neon-yellow hover:text-black transition-colors font-mono text-xs uppercase tracking-widest border border-zinc-700">
                ADD_TO_CART
            </button>
        </BentoItem>
        
        <BentoItem span={1} title="MOBILE" className="flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white text-lg">PinePhone Pro</h3>
                    <span className="font-mono text-zinc-600 line-through">$399</span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">Linux on a phone. Hardware kill switches for mic/camera. For the paranoid.</p>
                
                <div className="w-full h-32 bg-zinc-900 border border-zinc-800 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none" />
                     <div className="flex items-center justify-center h-full text-zinc-600 font-mono text-xs">
                        [IMG: pinephone-pro]
                     </div>
                </div>
            </div>
            
            
            
            <button disabled className="w-full mt-4 bg-zinc-900 text-zinc-600 py-2 font-mono text-xs uppercase tracking-widest border border-zinc-800 cursor-not-allowed">
                WAITLIST_FULL
            </button>
        </BentoItem>
              </VibeBento>
      
      <div className="mt-12 p-8 border border-zinc-800 bg-zinc-950/50 text-center font-mono text-zinc-500 text-xs">
        <p>DISCLAIMER: WE ARE NOT RESPONSIBLE FOR HOW YOU USE THESE TOOLS.</p>
        <p className="mt-2 text-neon-red">DO NOT BE EVIL.</p>
      </div>
    </div>
  );
}

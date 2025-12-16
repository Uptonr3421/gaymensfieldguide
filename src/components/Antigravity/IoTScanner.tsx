"use client";
import React, { useState } from 'react';
import { InteractiveContainer } from './InteractiveContainer';

export function IoTScanner() {
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState<{name: string, ip: string, vuln: boolean}[]>([]);

  const scan = () => {
    setScanning(true);
    setDevices([]);
    
    const mockDevices = [
        { name: 'Samsung Smart Fridge', ip: '192.168.1.45', vuln: true },
        { name: 'Philips Hue Bridge', ip: '192.168.1.12', vuln: false },
        { name: 'Baby Monitor (Unknown)', ip: '192.168.1.88', vuln: true },
        { name: 'Amazon Echo Dot', ip: '192.168.1.20', vuln: false },
        { name: 'Cheap WiFi Plug', ip: '192.168.1.99', vuln: true },
    ];

    mockDevices.forEach((d, i) => {
        setTimeout(() => {
            setDevices(prev => [...prev, d]);
            if (i === mockDevices.length - 1) setScanning(false);
        }, (i + 1) * 600);
    });
  };

  return (
    <InteractiveContainer title="HOME_NETWORK_VULNERABILITY_SCAN" type="exploit">
      <div className="font-mono text-xs p-4">
        {!scanning && devices.length === 0 ? (
            <div className="text-center py-8">
                <button 
                    onClick={scan}
                    className="bg-zinc-800 text-neon-red border border-neon-red px-6 py-3 hover:bg-neon-red hover:text-black transition-colors font-bold tracking-widest"
                >
                    INITIATE_SCAN
                </button>
            </div>
        ) : (
            <div className="space-y-2">
                {devices.map((d, i) => (
                    <div key={i} className="flex justify-between items-center p-2 border border-zinc-800 bg-zinc-900/50 animate-in fade-in slide-in-from-left-2">
                        <div>
                            <span className="text-white block">{d.name}</span>
                            <span className="text-zinc-600">{d.ip}</span>
                        </div>
                        <div className={`px-2 py-1 ${d.vuln ? 'bg-neon-red text-black' : 'bg-neon-green text-black'} font-bold`}>
                            {d.vuln ? 'VULNERABLE (Default PW)' : 'SECURE'}
                        </div>
                    </div>
                ))}
                {scanning && (
                     <div className="text-center text-zinc-500 animate-pulse pt-4">SCANNING_SUBNET...</div>
                )}
                 {!scanning && devices.length > 0 && (
                     <div className="text-center pt-6">
                        <p className="text-neon-red mb-2 font-bold">3 CRITICAL THREATS FOUND</p>
                        <p className="text-zinc-400">Your fridge is mining crypto.</p>
                        <button onClick={scan} className="text-zinc-600 underline mt-2 hover:text-white">Rescan</button>
                     </div>
                 )}
            </div>
        )}
      </div>
    </InteractiveContainer>
  );
}

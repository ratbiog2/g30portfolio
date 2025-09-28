import React, { useMemo, useRef, useState } from "react";
import { Play, Pause, ShoppingCart, Music2, Mail, Instagram, Twitter } from "lucide-react";

// Single-file React site for producer "g3o" — opium-inspired dark aesthetic.
// TailwindCSS recommended. Drop this into a Vite/CRA app as App.jsx and run.
// Place your MP3/WAV files under /public/beats and update the BEATS array.

const BEATS = [
  {
    id: "void-angel",
    title: "VOID ANGEL",
    bpm: 146,
    key: "Dm",
    tags: ["opium", "rage", "dark"],
    prices: { mp3: 29, wav: 59, stems: 99 },
    url: "/beats/void-angel.mp3",
    cover: "/covers/void-angel.jpg",
  },
  {
    id: "neon-blood",
    title: "NEON BLOOD",
    bpm: 150,
    key: "Em",
    tags: ["pluggnb", "ethereal"],
    prices: { mp3: 29, wav: 59, stems: 99 },
    url: "/beats/neon-blood.mp3",
    cover: "/covers/neon-blood.jpg",
  },
  {
    id: "glasgow",
    title: "GLASGOW",
    bpm: 138,
    key: "Fm",
    tags: ["opium", "industrial"],
    prices: { mp3: 29, wav: 59, stems: 99 },
    url: "/beats/glasgow.mp3",
    cover: "/covers/glasgow.jpg",
  },
];

export default function App() {
  const [currentId, setCurrentId] = useState(null);
  const audioRef = useRef(null);
  const currentBeat = useMemo(() => BEATS.find(b => b.id === currentId) || null, [currentId]);

  function toggle(beat) {
    if (!audioRef.current) return;
    if (currentId === beat.id) {
      if (!audioRef.current.paused) audioRef.current.pause();
      else audioRef.current.play();
    } else {
      setCurrentId(beat.id);
      // slight delay to allow src to mount
      setTimeout(() => audioRef.current?.play(), 50);
    }
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-fuchsia-600 selection:text-black">
      {/* grain/noise overlay */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.09] mix-blend-soft-light" style={{backgroundImage: "radial-gradient(#fff1, transparent 40%)"}} />

      <Nav />

      <header className="relative overflow-hidden">
        <div className="absolute inset-0 blur-3xl opacity-30" style={{
          background: "conic-gradient(from 120deg, rgba(236,72,153,.2), rgba(147,51,234,.25), rgba(99,102,241,.2))"
        }} />
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-zinc-400">
            <span className="h-px w-6 bg-zinc-600" /> g3o — producer
          </div>
          <h1 className="mt-6 text-5xl md:text-7xl font-black leading-[0.9]">
            <span className="text-zinc-200">OPIUM</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500">INFUSED BEAT STORE</span>
          </h1>
          <p className="mt-5 max-w-xl text-zinc-400">cold, glossy, high-contrast soundscapes designed for the underground. tap in, pick a license, and float.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#beats" className="px-5 py-2 rounded-2xl bg-white text-black text-sm font-medium">Listen now</a>
            <a href="#contact" className="px-5 py-2 rounded-2xl border border-zinc-700 text-sm">Custom beats</a>
          </div>

          <Marquee />
        </div>
      </header>

      {/* Beats Grid */}
      <section id="beats" className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl tracking-wider uppercase text-zinc-300">Beats</h2>
          <span className="text-xs text-zinc-500">mp3 / wav / stems</span>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BEATS.map(beat => (
            <BeatCard key={beat.id} beat={beat} currentId={currentId} onToggle={() => toggle(beat)} />
          ))}
        </div>
      </section>

      {/* Kits */}
      <section id="kits" className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl tracking-wider uppercase text-zinc-300">Kits</h2>
          <span className="text-xs text-zinc-500">drum kits / midi / one-shots</span>
        </div>
        <div className="mt-6 rounded-3xl border border-zinc-800 p-6 bg-gradient-to-b from-zinc-950 to-zinc-900">
          <p className="text-zinc-400 text-sm">Coming soon. Want early access to g3o kits? <a href="#contact" className="underline decoration-fuchsia-500/50 underline-offset-4">hit me</a>.</p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl tracking-wider uppercase text-zinc-300">Contact</h2>
            <p className="mt-3 text-zinc-400 max-w-prose text-sm">for exclusive licenses, customs, or placements, reach out. serious inquiries only.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="mailto:contact@g3o.audio" className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-800 hover:border-zinc-700"> <Mail size={16}/> contact@g3o.audio</a>
              <a href="https://instagram.com/" className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-800 hover:border-zinc-700"> <Instagram size={16}/> @g3o</a>
              <a href="https://x.com/" className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-800 hover:border-zinc-700"> <Twitter size={16}/> @g3o</a>
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-800 p-6 bg-gradient-to-b from-zinc-950 to-zinc-900">
            <h3 className="font-semibold">Rates</h3>
            <ul className="mt-3 text-sm text-zinc-400 space-y-2">
              <li>MP3 Lease — $29</li>
              <li>WAV Lease — $59</li>
              <li>Stems — $99</li>
              <li>Exclusive — email for quote</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer / Player Dock */}
      <footer className="sticky bottom-0 inset-x-0 z-20">
        <div className="backdrop-blur bg-zinc-950/70 border-t border-zinc-800">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 rounded-xl bg-zinc-900 border border-zinc-800 grid place-items-center">
                <Music2 size={18} className="opacity-70" />
              </div>
              <div className="truncate">
                <div className="truncate text-sm font-medium">{currentBeat ? currentBeat.title : "Select a beat to play"}</div>
                <div className="text-xs text-zinc-500">{currentBeat ? `${currentBeat.bpm} BPM • ${currentBeat.key}` : ""}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button onClick={() => currentBeat && toggle(currentBeat)} className="h-10 w-10 rounded-xl border border-zinc-800 grid place-items-center">
                {audioRef.current && !audioRef.current.paused && currentBeat ? <Pause size={18}/> : <Play size={18}/>}
              </button>
              {currentBeat && (
                <div className="hidden sm:flex gap-2">
                  <a href="#" className="px-3 py-2 text-xs rounded-xl border border-zinc-800 hover:border-zinc-700">MP3 ${currentBeat.prices.mp3}</a>
                  <a href="#" className="px-3 py-2 text-xs rounded-xl border border-zinc-800 hover:border-zinc-700">WAV ${currentBeat.prices.wav}</a>
                  <a href="#" className="px-3 py-2 text-xs rounded-xl border border-zinc-800 hover:border-zinc-700">STEMS ${currentBeat.prices.stems}</a>
                </div>
              )}
            </div>
          </div>
        </div>
        <audio ref={audioRef} src={currentBeat?.url || undefined} />
      </footer>
    </div>
  );
}

function Nav() {
  return (
    <div className="sticky top-0 z-30 backdrop-blur bg-black/40 border-b border-zinc-900">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center">
        <a href="#" className="text-xl font-black tracking-[0.3em] uppercase">g3o</a>
        <nav className="ml-auto hidden sm:flex items-center gap-6 text-sm text-zinc-400">
          <a href="#beats" className="hover:text-zinc-200">Beats</a>
          <a href="#kits" className="hover:text-zinc-200">Kits</a>
          <a href="#contact" className="hover:text-zinc-200">Contact</a>
          <a href="#" className="px-3 py-1 rounded-full border border-zinc-800 hover:border-zinc-700">Buy Licenses</a>
        </nav>
      </div>
    </div>
  );
}

function BeatCard({ beat, currentId, onToggle }) {
  const active = currentId === beat.id;
  return (
    <div className="group rounded-3xl border border-zinc-800 overflow-hidden bg-gradient-to-b from-zinc-950 to-zinc-900">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 to-zinc-800 opacity-60"/>
        {/* cover img placeholder */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-6xl font-black tracking-widest text-zinc-900/40">{beat.title.slice(0,1)}</div>
        </div>
        {/* Top badges */}
        <div className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.25em] text-zinc-300">{beat.bpm} bpm • {beat.key}</div>
        <button onClick={onToggle} className="absolute bottom-3 left-3 px-3 py-2 rounded-xl border border-zinc-800 bg-black/50 backdrop-blur-sm flex items-center gap-2 text-sm">
          {active ? <Pause size={14}/> : <Play size={14}/>} {active ? "Pause" : "Play"}
        </button>
        <div className="absolute bottom-3 right-3 flex gap-2">
          <a href="#" className="px-3 py-2 text-xs rounded-xl border border-zinc-800 hover:border-zinc-700">MP3 ${beat.prices.mp3}</a>
          <a href="#" className="px-3 py-2 text-xs rounded-xl border border-zinc-800 hover:border-zinc-700">WAV ${beat.prices.wav}</a>
          <a href="#" className="px-3 py-2 text-xs rounded-xl border border-zinc-800 hover:border-zinc-700">STEMS ${beat.prices.stems}</a>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{beat.title}</h3>
          <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">{beat.tags.join(" · ")}</span>
        </div>
        {/* Faux waveform */}
        <div className="mt-3 h-12 w-full grid grid-cols-48 gap-[2px]">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="bg-zinc-800 rounded" style={{ height: `${(Math.sin(i/2)+1)*22 + 4}px` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Marquee() {
  return (
    <div className="mt-12 overflow-hidden">
      <div className="flex gap-8 animate-[marquee_18s_linear_infinite] whitespace-nowrap text-zinc-600 text-xs uppercase tracking-[0.3em]">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="h-px w-8 bg-zinc-700" /> opium • rage • dark • ethereal • pluggnb • glitch • ambient • minimal
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
    </div>
  );
}

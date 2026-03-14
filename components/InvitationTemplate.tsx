"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Heart, Copy, MessageSquare, Image as ImageIcon, Music as MusicIcon, Send, User } from "lucide-react";
import MusicPlayer from "./MusicPlayer";

interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  description: string;
}

interface InvitationData {
  partner1: string;
  partner2: string;
  receptionDate: string;
  ceremonyDate: string;
  bankAccount: string;
  hasMusic: string;
  hasPhoto: string;
  hasWishes: string;
  timeline: TimelineEvent[];
}

export default function InvitationTemplate({ data }: { data: InvitationData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [wishes, setWishes] = useState<{ id: number; name: string; message: string; createdAt: string }[]>([
    { id: 1, name: "Sahabat", message: "Barakallahu lakum wa baraka alaikum wa jama'a bainakuma fii khoir!", createdAt: "Baru saja" },
  ]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Nomor rekening berhasil disalin!");
  };

  return (
    <div className="min-h-screen bg-[#FCF8F5] text-zinc-800 font-montserrat overflow-x-hidden">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -1000 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 bg-white"
            style={{
              backgroundImage: "url('/wedding_invitation_bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
            <div className="relative z-10 text-center space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <p className="text-rose-500 uppercase tracking-[0.4em] text-xs font-black">The Wedding of</p>
                <div className="w-12 h-px bg-rose-200 mx-auto" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="text-7xl md:text-9xl font-cormorant font-bold text-rose-950 mb-8 italic drop-shadow-sm"
              >
                {data.partner1} & {data.partner2}
              </motion.h1>
              <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.6 }}
                 className="space-y-4"
              >
                <p className="text-zinc-500 text-sm tracking-widest uppercase font-light">Kepada Bapak/Ibu/Saudara/i</p>
                <h3 className="text-2xl font-cormorant font-bold text-rose-900 italic">Tamu Undangan</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(true)}
                  className="flex items-center gap-3 bg-rose-600 hover:bg-rose-700 text-white px-10 py-4 rounded-full font-black shadow-2xl transition-all uppercase tracking-widest text-xs"
                >
                  <Send size={16} />
                  Buka Undangan
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Hero Section */}
          <section className="h-screen relative flex flex-col items-center justify-center text-center px-4 overflow-hidden">
            <div className="absolute inset-0 opacity-20 transition-opacity duration-1000">
              <div className="w-full h-full bg-[url('/wedding_invitation_bg.png')] bg-cover bg-center scale-110" />
            </div>
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <p className="font-cormorant italic text-3xl text-rose-700">Om Swastiastu</p>
                <h2 className="text-7xl md:text-9xl font-cormorant font-bold text-rose-950 italic">
                   {data.partner1} <span className="font-sans not-italic text-4xl">&</span> {data.partner2}
                </h2>
                <div className="w-48 h-px bg-rose-300 mx-auto" />
                <p className="text-xl tracking-[0.3em] font-light text-zinc-600 uppercase font-montserrat">
                  {formatDate(data.ceremonyDate)}
                </p>
              </motion.div>
            </div>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-12"
            >
              <div className="w-6 h-10 border-2 border-rose-200 rounded-full flex justify-center p-1">
                <motion.div 
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-1.5 h-1.5 bg-rose-300 rounded-full" 
                />
              </div>
            </motion.div>
          </section>

          {/* Couple Section */}
          <section className="py-32 px-6 bg-white relative overflow-hidden">
             <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center text-center">
                <motion.div
                   initial={{ opacity: 0, x: -50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="space-y-6"
                >
                   <div className="w-72 h-72 bg-zinc-50 rounded-full mx-auto border-[12px] border-[#FCF8F5] overflow-hidden relative shadow-inner">
                      {data.hasPhoto === "yes" ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-rose-50 text-rose-200 italic">
                           <ImageIcon size={60} strokeWidth={1} />
                        </div>
                      ) : (
                         <div className="absolute inset-0 flex items-center justify-center bg-zinc-50 text-zinc-200">
                           <User size={100} strokeWidth={1} />
                         </div>
                      )}
                   </div>
                   <h3 className="text-5xl font-cormorant font-bold text-rose-950 italic">{data.partner1}</h3>
                   <div className="space-y-1">
                      <p className="text-rose-600 font-bold text-xs uppercase tracking-widest italic">Mempelai Wanita</p>
                      <p className="text-zinc-400 text-sm font-light">Putri dari Bapak Nama & Ibu Nama</p>
                   </div>
                </motion.div>

                <motion.div
                   initial={{ opacity: 0, x: 50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="space-y-6"
                >
                   <div className="w-72 h-72 bg-zinc-50 rounded-full mx-auto border-[12px] border-[#FCF8F5] overflow-hidden relative shadow-inner">
                      {data.hasPhoto === "yes" ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-rose-50 text-rose-200 italic">
                           <ImageIcon size={60} strokeWidth={1} />
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-50 text-zinc-200">
                           <User size={100} strokeWidth={1} />
                         </div>
                      )}
                   </div>
                   <h3 className="text-5xl font-cormorant font-bold text-rose-950 italic">{data.partner2}</h3>
                   <div className="space-y-1">
                      <p className="text-rose-600 font-bold text-xs uppercase tracking-widest italic">Mempelai Pria</p>
                      <p className="text-zinc-400 text-sm font-light">Putra dari Bapak Nama & Ibu Nama</p>
                   </div>
                </motion.div>
             </div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
                <Heart size={600} fill="currentColor" className="text-rose-900" />
             </div>
          </section>

          {/* Event Details */}
          <section className="py-32 px-6 bg-[#FCF8F5] relative">
             <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20 space-y-4">
                   <h2 className="text-6xl font-cormorant font-bold text-rose-950 italic">The Wedding Event</h2>
                   <div className="flex items-center justify-center gap-4">
                      <div className="w-12 h-px bg-rose-200" />
                      <Heart size={16} className="text-rose-300" />
                      <div className="w-12 h-px bg-rose-200" />
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-white p-16 rounded-[4rem] shadow-xl shadow-rose-100/20 border border-white text-center relative overflow-hidden group"
                   >
                      <div className="absolute top-0 left-0 w-full h-2 bg-rose-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                      <Calendar className="mx-auto text-rose-500 mb-8" size={48} strokeWidth={1.5} />
                      <h3 className="text-4xl font-cormorant font-bold text-rose-950 mb-6 italic">Akad Nikah</h3>
                      <div className="space-y-4">
                        <p className="text-xl font-bold text-rose-900">{formatDate(data.ceremonyDate)}</p>
                        <p className="text-zinc-500 font-light tracking-wide uppercase text-sm">Pukul 09.00 - Selesai</p>
                        <p className="font-semibold text-zinc-700">Kediaman Mempelai Wanita</p>
                        <div className="pt-6">
                           <button className="flex items-center gap-2 mx-auto bg-rose-50 text-rose-600 px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-rose-100 transition-all">
                              <MapPin size={14} />
                              Google Maps
                           </button>
                        </div>
                      </div>
                   </motion.div>

                   <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="bg-white p-16 rounded-[4rem] shadow-xl shadow-rose-100/20 border border-white text-center relative overflow-hidden group"
                   >
                      <div className="absolute top-0 left-0 w-full h-2 bg-rose-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                      <Calendar className="mx-auto text-rose-500 mb-8" size={48} strokeWidth={1.5} />
                      <h3 className="text-4xl font-cormorant font-bold text-rose-950 mb-6 italic">Resepsi</h3>
                      <div className="space-y-4">
                        <p className="text-xl font-bold text-rose-900">{formatDate(data.receptionDate)}</p>
                        <p className="text-zinc-500 font-light tracking-wide uppercase text-sm">Pukul 11.00 - 13.00 WIB</p>
                        <p className="font-semibold text-zinc-700">Gedung Serbaguna</p>
                        <div className="pt-6">
                           <button className="flex items-center gap-2 mx-auto bg-rose-50 text-rose-600 px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-rose-100 transition-all">
                              <MapPin size={14} />
                              Google Maps
                           </button>
                        </div>
                      </div>
                   </motion.div>
                </div>
             </div>
          </section>

          {/* Timeline Section */}
          {data.timeline && data.timeline.length > 0 && (
            <section className="py-32 px-6 bg-white relative">
               <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-24 space-y-4">
                    <h2 className="text-6xl font-cormorant font-bold text-rose-950 italic">Our Love Story</h2>
                    <div className="w-24 h-px bg-rose-200 mx-auto" />
                  </div>
                  
                  <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-rose-50 via-rose-200 to-rose-50 md:-translate-x-1/2" />
                    
                    <div className="space-y-24">
                       {data.timeline.map((event, index) => (
                         <motion.div 
                           key={event.id}
                           initial={{ opacity: 0, y: 30 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true, margin: "-100px" }}
                           className={`relative flex items-center gap-12 md:gap-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                         >
                            {/* Dot */}
                            <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-rose-500 border-4 border-white shadow-lg z-10 md:-translate-x-1/2" />
                            
                            {/* Content */}
                            <div className="w-full md:w-5/12 ml-16 md:ml-0 text-left md:even:text-right">
                               <div className={`p-8 rounded-[2.5rem] bg-[#FCF8F5] border border-rose-50 relative group hover:bg-white hover:shadow-2xl hover:shadow-rose-100 transition-all duration-500 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                  <p className="text-rose-500 font-black text-[10px] uppercase tracking-[0.3em] mb-2">{event.date}</p>
                                  <h3 className="text-2xl font-cormorant font-bold text-rose-950 mb-3 italic">{event.title}</h3>
                                  <p className="text-sm text-zinc-500 leading-relaxed font-light">{event.description}</p>
                               </div>
                            </div>
                         </motion.div>
                       ))}
                    </div>
                  </div>
               </div>
            </section>
          )}

          {/* Gallery Section */}
          {data.hasPhoto === "yes" && (
            <section className="py-32 px-6 bg-white">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20 space-y-4">
                  <h2 className="text-6xl font-cormorant font-bold text-rose-950 italic">The Gallery</h2>
                  <div className="w-24 h-px bg-rose-200 mx-auto" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="aspect-[4/5] bg-zinc-50 rounded-[2rem] overflow-hidden relative cursor-pointer shadow-sm group"
                    >
                      <div className="absolute inset-0 bg-rose-900/0 group-hover:bg-rose-900/10 transition-colors z-10" />
                      <div className="absolute inset-0 flex items-center justify-center bg-rose-50/50 text-rose-200 transition-transform duration-700 group-hover:scale-110">
                        <ImageIcon size={64} strokeWidth={1} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Gift Section */}
          <section className="py-40 px-6 bg-[#FCF8F5] relative overflow-hidden">
             <div className="max-w-2xl mx-auto text-center relative z-10">
                <motion.div
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   className="space-y-8"
                >
                   <h2 className="text-6xl font-cormorant font-bold text-rose-950 italic">Sharing Love</h2>
                   <p className="text-zinc-600 font-light leading-relaxed text-lg">
                      Doa restu Anda merupakan karunia yang sangat berarti bagi kami. 
                      Namun jika Anda ingin memberikan tanda kasih, dapat melalui nomor rekening di bawah ini.
                   </p>
                   <motion.div 
                      whileHover={{ y: -10 }}
                      className="bg-white p-16 rounded-[4rem] shadow-2xl shadow-rose-200/40 border border-white relative overflow-hidden group"
                   >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-bl-[10rem] group-hover:scale-150 transition-transform duration-1000" />
                      <div className="relative z-10 space-y-6">
                         <div className="mx-auto w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-4">
                            <CreditCard size={32} strokeWidth={1.5} />
                         </div>
                         <p className="text-rose-900 text-3xl font-black font-sans tracking-tight">{data.bankAccount}</p>
                         <button 
                           onClick={() => copyToClipboard(data.bankAccount)}
                           className="flex items-center gap-2 mx-auto bg-rose-600 text-white px-10 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-lg"
                         >
                           <Copy size={16} />
                           Salin Rekening
                         </button>
                      </div>
                   </motion.div>
                </motion.div>
             </div>
             <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-rose-200/10 rounded-full blur-3xl" />
             <div className="absolute -top-20 -right-20 w-80 h-80 bg-rose-200/10 rounded-full blur-3xl" />
          </section>

          {/* Wishes Section */}
          {data.hasWishes === "yes" && (
            <section className="py-32 px-6 bg-white">
               <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-20 space-y-4">
                    <h2 className="text-6xl font-cormorant font-bold text-rose-950 italic">Guest Book</h2>
                    <p className="text-zinc-400 text-sm font-light">Berikan ucapan dan doa restu untuk kedua mempelai</p>
                  </div>
                  <div className="bg-[#FCF8F5] p-10 md:p-16 rounded-[4rem] border border-rose-50 shadow-inner">
                     <div className="space-y-6 mb-12 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                        <AnimatePresence>
                          {wishes.map((wish) => (
                             <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={wish.id} 
                                className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-rose-50 group hover:border-rose-200 transition-colors"
                             >
                                <div className="flex items-center justify-between mb-4">
                                   <div className="flex items-center gap-4">
                                      <div className="w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center text-white font-black text-xs">
                                         {wish.name.charAt(0).toUpperCase()}
                                      </div>
                                      <span className="font-bold text-rose-950 text-lg font-cormorant">{wish.name}</span>
                                   </div>
                                   <span className="text-[10px] text-zinc-300 uppercase font-black tracking-widest">{wish.createdAt}</span>
                                </div>
                                <p className="text-zinc-600 italic font-light leading-relaxed">"{wish.message}"</p>
                             </motion.div>
                          ))}
                        </AnimatePresence>
                     </div>
                     <div className="space-y-6 pt-12 border-t border-rose-100 font-montserrat">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-zinc-400 tracking-[0.2em] ml-4">Nama Anda</label>
                           <input className="w-full bg-white px-8 py-5 rounded-3xl border border-rose-100 focus:ring-2 focus:ring-rose-500 outline-none transition-all font-light shadow-sm" placeholder="Contoh: Alice" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-zinc-400 tracking-[0.2em] ml-4">Ucapan & Doa</label>
                           <textarea className="w-full bg-white px-8 py-5 rounded-[2.5rem] border border-rose-100 focus:ring-2 focus:ring-rose-500 outline-none transition-all font-light h-40 resize-none shadow-sm" placeholder="Tuliskan harapan terbaik Anda..." />
                        </div>
                        <button className="w-full bg-rose-600 text-white font-black py-5 rounded-full hover:bg-rose-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-rose-100 uppercase tracking-widest text-xs">
                           <Send size={16} />
                           Kirim Pesan Realtime
                        </button>
                     </div>
                  </div>
               </div>
            </section>
          )}

          {/* Footer */}
          <footer className="py-32 bg-rose-950 text-white text-center relative overflow-hidden">
             <div className="max-w-4xl mx-auto px-6 relative z-10">
                <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="space-y-8"
                >
                   <p className="font-cormorant italic text-2xl text-rose-200/60 leading-relaxed mb-12">
                      "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khoir."
                   </p>
                   <h2 className="text-5xl font-cormorant font-bold mb-6 italic">Alice & Bob</h2>
                   <div className="w-12 h-px bg-white/20 mx-auto" />
                   <p className="text-rose-200/40 font-light text-xs uppercase tracking-[0.4em]">
                      Wedding Invitation Generator
                   </p>
                </motion.div>
             </div>
             <div className="absolute top-0 left-0 w-full h-full bg-[url('/wedding_invitation_bg.png')] bg-cover bg-center opacity-5 mix-blend-overlay" />
          </footer>

          {data.hasMusic === "yes" && (
            <MusicPlayer url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" autoPlay={isOpen} />
          )}
        </motion.div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #FCF8F5;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #FFE4E6;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #fda4af;
        }
        .font-cormorant {
          font-family: var(--font-cormorant), serif;
        }
        .font-montserrat {
          font-family: var(--font-montserrat), sans-serif;
        }
      `}</style>
    </div>
  );
}

function CreditCard(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

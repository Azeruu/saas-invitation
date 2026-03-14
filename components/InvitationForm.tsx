"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { encodeData } from "@/lib/utils";
import { Plus, Trash2, Calendar, User, Heart, CreditCard, Music, Image as ImageIcon, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InvitationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    partner1: "",
    partner2: "",
    receptionDate: "",
    ceremonyDate: "",
    bankAccount: "",
    hasMusic: "yes",
    hasPhoto: "yes",
    hasWishes: "yes",
  });

  const [timeline, setTimeline] = useState([
    { id: 1, title: "Pertama Bertemu", date: "2020-01-01", description: "Kami bertemu di sebuah kafe..." },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimelineChange = (id: number, field: string, value: string) => {
    setTimeline((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const addTimelineItem = () => {
    const newId = timeline.length > 0 ? Math.max(...timeline.map((t) => t.id)) + 1 : 1;
    setTimeline([...timeline, { id: newId, title: "", date: "", description: "" }]);
  };

  const removeTimelineItem = (id: number) => {
    setTimeline(timeline.filter((item) => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData, timeline };
    const slug = encodeData(payload);
    router.push(`/invitation/${slug}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 md:p-12 bg-white rounded-[3rem] shadow-2xl border border-zinc-100 font-montserrat my-12">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-cormorant font-bold text-rose-900 mb-2 italic">Wedding Invitation Generator</h2>
        <p className="text-zinc-500 font-light tracking-wide">Lengkapi detail untuk membuat undangan digital impian Anda</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Basic Info Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 text-rose-800 border-b border-rose-50 pb-2">
            <User size={20} />
            <h3 className="font-bold uppercase tracking-widest text-sm">Informasi Pasangan</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-tighter">Nama Mempelai Wanita</label>
              <input
                required
                type="text"
                name="partner1"
                value={formData.partner1}
                onChange={handleChange}
                placeholder="Contoh: Alice"
                className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border-none focus:ring-2 focus:ring-rose-500 outline-none transition-all placeholder:text-zinc-300"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-tighter">Nama Mempelai Pria</label>
              <input
                required
                type="text"
                name="partner2"
                value={formData.partner2}
                onChange={handleChange}
                placeholder="Contoh: Bob"
                className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border-none focus:ring-2 focus:ring-rose-500 outline-none transition-all placeholder:text-zinc-300"
              />
            </div>
          </div>
        </section>

        {/* Dates Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 text-rose-800 border-b border-rose-50 pb-2">
            <Calendar size={20} />
            <h3 className="font-bold uppercase tracking-widest text-sm">Tanggal & Waktu</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-tighter">Tanggal Akad</label>
              <input
                required
                type="date"
                name="ceremonyDate"
                value={formData.ceremonyDate}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border-none focus:ring-2 focus:ring-rose-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-tighter">Tanggal Resepsi</label>
              <input
                required
                type="date"
                name="receptionDate"
                value={formData.receptionDate}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border-none focus:ring-2 focus:ring-rose-500 outline-none transition-all"
              />
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-rose-50 pb-2">
            <div className="flex items-center gap-3 text-rose-800">
              <Heart size={20} />
              <h3 className="font-bold uppercase tracking-widest text-sm">Our Story (Timeline)</h3>
            </div>
            <button
              type="button"
              onClick={addTimelineItem}
              className="flex items-center gap-2 text-xs font-bold bg-rose-50 text-rose-600 px-4 py-2 rounded-full hover:bg-rose-100 transition-colors"
            >
              <Plus size={14} /> Tambah Momen
            </button>
          </div>
          <div className="space-y-6">
            <AnimatePresence>
              {timeline.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6 bg-zinc-50 rounded-[2rem] border border-zinc-100 relative group"
                >
                  <button
                    type="button"
                    onClick={() => removeTimelineItem(item.id)}
                    className="absolute top-4 right-4 text-zinc-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase">Momen/Judul</label>
                      <input
                        required
                        type="text"
                        placeholder="Contoh: Pertama Bertemu"
                        value={item.title}
                        onChange={(e) => handleTimelineChange(item.id, "title", e.target.value)}
                        className="w-full bg-white px-4 py-2 rounded-xl text-sm border-none focus:ring-2 focus:ring-rose-400 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase">Kapan</label>
                      <input
                        required
                        type="text"
                        placeholder="Contoh: 12 Januari 2020"
                        value={item.date}
                        onChange={(e) => handleTimelineChange(item.id, "date", e.target.value)}
                        className="w-full bg-white px-4 py-2 rounded-xl text-sm border-none focus:ring-2 focus:ring-rose-400 outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase">Cerita Singkat</label>
                    <textarea
                      required
                      placeholder="Tuliskan sedikit kenangan anda..."
                      value={item.description}
                      onChange={(e) => handleTimelineChange(item.id, "description", e.target.value)}
                      className="w-full bg-white px-4 py-2 rounded-xl text-sm border-none focus:ring-2 focus:ring-rose-400 outline-none h-20 resize-none"
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Bank & Configuration Section */}
        <section className="space-y-8">
           <div className="flex items-center gap-3 text-rose-800 border-b border-rose-50 pb-2">
            <CreditCard size={20} />
            <h3 className="font-bold uppercase tracking-widest text-sm">Hadiah Digital & Pengaturan</h3>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-tighter">Nomor Rekening</label>
              <input
                required
                type="text"
                name="bankAccount"
                value={formData.bankAccount}
                onChange={handleChange}
                placeholder="Contoh: BCA 123456789 a/n Nama"
                className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border-none focus:ring-2 focus:ring-rose-500 outline-none transition-all placeholder:text-zinc-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="p-6 bg-zinc-50 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-zinc-600">
                    <Music size={18} />
                    <span className="text-xs font-bold uppercase">Musik</span>
                  </div>
                  <div className="flex gap-2">
                    {["yes", "no"].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, hasMusic: val }))}
                        className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                          formData.hasMusic === val ? "bg-rose-500 text-white" : "bg-white text-zinc-400 shadow-sm"
                        }`}
                      >
                        {val === "yes" ? "On" : "Off"}
                      </button>
                    ))}
                  </div>
               </div>

               <div className="p-6 bg-zinc-50 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-zinc-600">
                    <ImageIcon size={18} />
                    <span className="text-xs font-bold uppercase">Galeri</span>
                  </div>
                  <div className="flex gap-2">
                    {["yes", "no"].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, hasPhoto: val }))}
                        className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                          formData.hasPhoto === val ? "bg-rose-500 text-white" : "bg-white text-zinc-400 shadow-sm"
                        }`}
                      >
                        {val === "yes" ? "On" : "Off"}
                      </button>
                    ))}
                  </div>
               </div>

               <div className="p-6 bg-zinc-50 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-zinc-600">
                    <MessageSquare size={18} />
                    <span className="text-xs font-bold uppercase">Ucapan</span>
                  </div>
                  <div className="flex gap-2">
                    {["yes", "no"].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, hasWishes: val }))}
                        className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                          formData.hasWishes === val ? "bg-rose-500 text-white" : "bg-white text-zinc-400 shadow-sm"
                        }`}
                      >
                        {val === "yes" ? "On" : "Off"}
                      </button>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black py-6 rounded-[2rem] shadow-2xl shadow-rose-200 transition-all transform hover:-translate-y-1 uppercase tracking-[0.2em]"
        >
          Generate Undangan Digital
        </button>
      </form>
      <style jsx global>{`
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

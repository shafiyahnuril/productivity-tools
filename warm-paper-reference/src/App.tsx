/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { 
  Palette, 
  Layers, 
  Type, 
  Square, 
  MousePointer2, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  AlertTriangle,
  Layout,
  StickyNote,
  FormInput,
  MousePointerClick,
  Download,
  Printer,
  Clock,
  Calendar as CalendarIcon,
  ListTodo,
  BarChart3,
  Plus,
  Search,
  Bell,
  MoreHorizontal,
  Play,
  RotateCcw
} from 'lucide-react';
import { motion } from 'motion/react';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

const ColorSwatch = ({ hex, name, label, darkText = true, isDarkTheme = false }: { hex: string, name: string, label: string, darkText?: boolean, isDarkTheme?: boolean }) => (
  <div className="flex flex-col gap-2">
    <div 
      className={`h-24 w-full rounded-xl border shadow-sm flex items-end p-3 ${isDarkTheme ? 'border-dark-bd' : 'border-paper-bd'}`}
      style={{ backgroundColor: hex }}
    >
      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${darkText ? (isDarkTheme ? 'text-dark-bg' : 'text-paper-fg') : 'text-white'}`}>
        {hex}
      </span>
    </div>
    <div className="flex flex-col">
      <span className={`text-xs font-bold ${isDarkTheme ? 'text-dark-fg' : 'text-paper-fg'}`}>{name}</span>
      <span className={`text-[10px] uppercase tracking-tighter ${isDarkTheme ? 'text-dark-fg3' : 'text-paper-fg3'}`}>{label}</span>
    </div>
  </div>
);

const SectionHeader = ({ icon: Icon, title, description, isDarkTheme = false }: { icon: any, title: string, description: string, isDarkTheme?: boolean }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-2">
      <div className={`p-2 rounded-lg ${isDarkTheme ? 'bg-dark-bg2 text-paper-accent' : 'bg-paper-bg2 text-paper-accent'}`}>
        <Icon size={20} />
      </div>
      <h2 className={`text-2xl font-bold tracking-tight ${isDarkTheme ? 'text-dark-fg' : 'text-paper-fg'}`}>{title}</h2>
    </div>
    <p className={`text-sm max-w-2xl ${isDarkTheme ? 'text-dark-fg2' : 'text-paper-fg2'}`}>{description}</p>
  </div>
);

export default function App() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = React.useState(false);

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;
    
    setIsExporting(true);
    try {
      // Use html-to-image instead of html2canvas for better modern CSS support (oklch/oklab)
      const dataUrl = await toPng(contentRef.current, {
        quality: 0.95,
        backgroundColor: '#FAF7F2',
        pixelRatio: 2,
        skipFonts: true, // Speeds up generation and avoids some font issues
      });
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      // Handle multi-page if content is long
      let heightLeft = pdfHeight;
      let position = 0;
      const pageHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('Warm-Paper-Design-Guideline.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Gagal membuat PDF. Silakan coba lagi.');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pb-24 bg-paper-bg">
      {/* Header - Fixed or Static */}
      <header className="bg-white border-b border-paper-bd py-8 px-6 sticky top-0 z-50 shadow-sm print:hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-paper-accent rounded-xl flex items-center justify-center text-white">
              <Palette size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter text-paper-fg">Warm Paper System</h1>
              <p className="text-[10px] font-bold text-paper-fg3 uppercase tracking-widest">Design Guideline v1.0</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-paper-bg2 text-paper-fg2 rounded-xl text-xs font-bold hover:bg-paper-bg3 transition-colors border border-paper-bd"
            >
              <Printer size={16} />
              Print Guideline
            </button>
            <button 
              onClick={handleDownloadPDF}
              disabled={isExporting}
              className={`flex items-center gap-2 px-5 py-2 bg-paper-fg text-white rounded-xl text-xs font-bold shadow-md hover:opacity-90 transition-all ${isExporting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Download size={16} className={isExporting ? 'animate-bounce' : ''} />
              {isExporting ? 'Generating PDF...' : 'Download PDF'}
            </button>
          </div>
        </div>
      </header>

      {/* Exportable Content Area */}
      <div ref={contentRef} className="print:p-0">
        {/* Hero Section for PDF */}
        <div className="bg-white border-b border-paper-bd py-16 px-6 mb-12">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4"
            >
              <span className="text-paper-accent font-bold text-xs uppercase tracking-[0.2em]">Official Documentation</span>
              <h2 className="text-6xl font-black tracking-tighter text-paper-fg">Warm Paper Aesthetic</h2>
              <p className="text-paper-fg2 text-xl max-w-2xl leading-relaxed">
                Panduan komprehensif sistem desain dengan karakter hangat, editorial, dan natural. 
                Dibuat untuk standarisasi visual pada seluruh platform digital.
              </p>
            </motion.div>
          </div>
        </div>

        <main className="max-w-6xl mx-auto px-6 space-y-24">
          
          {/* 1. Background Layer System */}
          <section>
            <SectionHeader 
              icon={Layers} 
              title="1. Background Layer System" 
              description="Struktur layer utama website untuk menciptakan kedalaman dan hirarki visual."
            />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <ColorSwatch hex="#FAF7F2" name="bg" label="Background Utama" />
              <ColorSwatch hex="#F2EDE4" name="bg2" label="Background Section" />
              <ColorSwatch hex="#E8E0D4" name="bg3" label="Subtle Panel" />
              <ColorSwatch hex="#FFFFFF" name="card" label="Card Utama" />
              <ColorSwatch hex="#FAF7F2" name="card2" label="Card Secondary" />
            </div>
          </section>

          {/* 2. Text Color Hierarchy */}
          <section>
            <SectionHeader 
              icon={Type} 
              title="2. Text Color Hierarchy" 
              description="Hirarki warna teks untuk menjaga readability dan fokus pengguna."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-paper-accent uppercase tracking-widest">Headline (fg) - #1C1712</span>
                  <h3 className="text-4xl font-black text-paper-fg">The Quick Brown Fox</h3>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-paper-accent uppercase tracking-widest">Body (fg2) - #4A4238</span>
                  <p className="text-paper-fg2 leading-relaxed">
                    Jumps over the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-paper-accent uppercase tracking-widest">Secondary (fg3) - #78706A</span>
                  <p className="text-paper-fg3 text-sm">
                    Last updated: 15 March 2026 • 2 min read
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <ColorSwatch hex="#1C1712" name="fg" label="Headline / Title" darkText={false} />
                <ColorSwatch hex="#4A4238" name="fg2" label="Body Text" darkText={false} />
                <ColorSwatch hex="#78706A" name="fg3" label="Secondary / Hint" darkText={false} />
              </div>
            </div>
          </section>

          {/* 3. Primary Accent (CTA) */}
          <section>
            <SectionHeader 
              icon={MousePointer2} 
              title="3. Primary Accent (CTA)" 
              description="Warna utama untuk interaksi dan elemen yang membutuhkan perhatian khusus."
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <ColorSwatch hex="#D97706" name="accent" label="Accent Utama" darkText={false} />
              <ColorSwatch hex="#FFFFFF" name="accent-fg" label="Accent Foreground" />
              <ColorSwatch hex="#FDE68A" name="amber-l" label="Soft Highlight" />
              <div className="flex flex-col gap-2">
                <div className="h-24 w-full rounded-xl border border-paper-bd bg-paper-accent flex items-center justify-center">
                  <button className="bg-paper-fg text-paper-bg px-4 py-2 rounded-lg text-xs font-bold">Action</button>
                </div>
                <span className="text-xs font-bold text-paper-fg">Button Example</span>
              </div>
            </div>
          </section>

          {/* 4. Semantic / Status Colors */}
          <section>
            <SectionHeader 
              icon={AlertCircle} 
              title="4. Semantic / Status Colors" 
              description="Warna fungsional untuk memberikan feedback status kepada pengguna."
            />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Success */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-paper-sage">
                  <CheckCircle2 size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">Success</span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <ColorSwatch hex="#5A8A6E" name="sage" label="Success Primary" darkText={false} />
                  <ColorSwatch hex="#D1FAE5" name="sage-l" label="Success Light" />
                </div>
              </div>
              {/* Warning */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-paper-accent">
                  <AlertTriangle size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">Warning</span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <ColorSwatch hex="#D97706" name="amber" label="Warning Primary" darkText={false} />
                  <ColorSwatch hex="#FDE68A" name="amber-l" label="Warning Light" />
                </div>
              </div>
              {/* Error */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-paper-rose">
                  <AlertCircle size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">Error</span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <ColorSwatch hex="#C4574A" name="rose" label="Error Primary" darkText={false} />
                  <ColorSwatch hex="#FFE4E1" name="rose-l" label="Error Light" />
                </div>
              </div>
              {/* Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-paper-sky">
                  <Info size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">Info</span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <ColorSwatch hex="#3B7EC2" name="sky" label="Info Primary" darkText={false} />
                  <ColorSwatch hex="#DBEAFE" name="sky-l" label="Info Light" />
                </div>
              </div>
            </div>
          </section>

          {/* 5. Decorative & UI Systems */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            {/* Decorative */}
            <section>
              <SectionHeader 
                icon={Palette} 
                title="5. Decorative Colors" 
                description="Warna tambahan untuk elemen visual, tag, dan kategori."
              />
              <div className="grid grid-cols-2 gap-6">
                <ColorSwatch hex="#B59030" name="gold" label="Premium / Badge" darkText={false} />
                <ColorSwatch hex="#7C6FA0" name="lavender" label="Tag / Category" darkText={false} />
                <ColorSwatch hex="#EDE9FE" name="lavender-l" label="Tag Background" />
              </div>
            </section>

            {/* Buttons */}
            <section>
              <SectionHeader 
                icon={MousePointerClick} 
                title="6. Button System" 
                description="Sistem tombol untuk berbagai level aksi."
              />
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col gap-2">
                  <button className="bg-paper-fg text-paper-bg px-6 py-3 rounded-xl font-bold text-sm shadow-sm hover:opacity-90 transition-opacity">
                    Primary Button
                  </button>
                  <span className="text-[10px] text-center text-paper-fg3">#1C1712</span>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="bg-paper-accent text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm hover:opacity-90 transition-opacity">
                    Accent Button
                  </button>
                  <span className="text-[10px] text-center text-paper-fg3">#D97706</span>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="bg-transparent text-paper-fg2 border border-paper-bd px-6 py-3 rounded-xl font-bold text-sm hover:bg-paper-bg2 transition-colors">
                    Ghost Button
                  </button>
                  <span className="text-[10px] text-center text-paper-fg3">Transparent / #DDD5C8</span>
                </div>
              </div>
            </section>
          </div>

          {/* 6. Card & Form System */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <section>
              <SectionHeader 
                icon={Layout} 
                title="7. Card System" 
                description="Visualisasi struktur card konten."
              />
              <div className="bg-paper-bg2 p-8 rounded-2xl border border-paper-bd">
                <div className="bg-white border border-paper-bd rounded-2xl p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-bold text-paper-fg">Project Overview</h4>
                    <span className="bg-paper-sage-l text-paper-sage px-2 py-1 rounded text-[10px] font-bold uppercase">Active</span>
                  </div>
                  <p className="text-paper-fg2 text-sm mb-6 leading-relaxed">
                    Implementasi sistem desain baru untuk meningkatkan pengalaman pengguna pada dashboard utama.
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-paper-bd">
                    <span className="text-paper-fg3 text-xs italic">Updated 2h ago</span>
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-paper-bg3 flex items-center justify-center text-[10px] font-bold">
                          U{i}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <SectionHeader 
                icon={FormInput} 
                title="8. Form Components" 
                description="Warna dan gaya untuk input field."
              />
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-paper-fg uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name"
                    className="bg-paper-bg2 border border-paper-bd rounded-xl px-4 py-3 text-paper-fg placeholder:text-paper-fg3 focus:outline-none focus:border-paper-accent transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-paper-fg uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue="shafiyah@mail.ugm.ac.id"
                    className="bg-paper-bg2 border border-paper-accent rounded-xl px-4 py-3 text-paper-fg focus:outline-none"
                  />
                  <span className="text-[10px] text-paper-accent font-medium">Focus state visualization</span>
                </div>
              </div>
            </section>
          </div>

          {/* 7. Sticky Notes */}
          <section>
            <SectionHeader 
              icon={StickyNote} 
              title="9. Sticky Notes (Decorative Feature)" 
              description="Variasi warna untuk fitur catatan tempel dekoratif."
            />
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {[
                { name: 'Yellow', bg: '#FEFCE8', bd: '#FDE047' },
                { name: 'Pink', bg: '#FFF0F0', bd: '#FBBCBA' },
                { name: 'Blue', bg: '#EFF6FF', bd: '#BFDBFE' },
                { name: 'Green', bg: '#F0FDF4', bd: '#BBF7D0' },
                { name: 'Purple', bg: '#FAF5FF', bd: '#DDD6FE' },
                { name: 'Orange', bg: '#FFF7ED', bd: '#FDBA74' },
              ].map((note) => (
                <div 
                  key={note.name}
                  className="aspect-square rounded-lg p-4 flex flex-col justify-between shadow-sm border-l-4"
                  style={{ backgroundColor: note.bg, borderColor: note.bd }}
                >
                  <span className="text-[10px] font-bold text-paper-fg uppercase tracking-widest">{note.name}</span>
                  <div className="w-4 h-4 rounded-full opacity-20" style={{ backgroundColor: note.bd }}></div>
                </div>
              ))}
            </div>
          </section>

          {/* 8. Dashboard Example */}
          <section className="pb-12">
            <SectionHeader 
              icon={Layout} 
              title="10. Full Implementation Example" 
              description="Visualisasi bagaimana seluruh elemen digabungkan dalam satu dashboard."
            />
            <div className="bg-paper-bg2 rounded-3xl p-1 md:p-8 border border-paper-bd overflow-hidden">
              <div className="bg-paper-bg min-h-[400px] rounded-2xl shadow-xl border border-paper-bd flex flex-col">
                {/* Top Nav */}
                <div className="h-16 border-b border-paper-bd px-6 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-paper-accent rounded-lg"></div>
                    <span className="font-black tracking-tighter text-lg">PAPER.OS</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-paper-bg2 border border-paper-bd"></div>
                  </div>
                </div>
                
                <div className="flex flex-1">
                  {/* Sidebar */}
                  <div className="w-48 border-r border-paper-bd p-4 hidden md:block bg-[#F6F2EB]">
                    <div className="space-y-2">
                      {['Dashboard', 'Projects', 'Tasks', 'Notes', 'Settings'].map((item, i) => (
                        <div key={item} className={`px-3 py-2 rounded-lg text-xs font-bold ${i === 0 ? 'bg-paper-accent text-white' : 'text-paper-fg2 hover:bg-paper-bg2'}`}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-6 space-y-6">
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-2xl font-bold text-paper-fg">Welcome back, Shafiyah</h3>
                        <p className="text-paper-fg3 text-sm">You have 4 tasks to complete today.</p>
                      </div>
                      <button className="bg-paper-fg text-white px-4 py-2 rounded-lg text-xs font-bold">+ New Task</button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-xl border border-paper-bd shadow-sm">
                        <span className="text-[10px] font-bold text-paper-sky uppercase mb-1 block">In Progress</span>
                        <h4 className="font-bold text-paper-fg">Design System</h4>
                        <div className="mt-4 h-1.5 bg-paper-bg2 rounded-full overflow-hidden">
                          <div className="h-full bg-paper-sky w-2/3"></div>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-paper-bd shadow-sm">
                        <span className="text-[10px] font-bold text-paper-sage uppercase mb-1 block">Completed</span>
                        <h4 className="font-bold text-paper-fg">User Research</h4>
                        <div className="mt-4 h-1.5 bg-paper-bg2 rounded-full overflow-hidden">
                          <div className="h-full bg-paper-sage w-full"></div>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-paper-bd shadow-sm">
                        <span className="text-[10px] font-bold text-paper-rose uppercase mb-1 block">Delayed</span>
                        <h4 className="font-bold text-paper-fg">API Integration</h4>
                        <div className="mt-4 h-1.5 bg-paper-bg2 rounded-full overflow-hidden">
                          <div className="h-full bg-paper-rose w-1/4"></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border border-paper-bd overflow-hidden shadow-sm">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-paper-bg2 border-b border-paper-bd">
                          <tr>
                            <th className="px-4 py-3 font-bold text-paper-fg3 uppercase tracking-wider">Task</th>
                            <th className="px-4 py-3 font-bold text-paper-fg3 uppercase tracking-wider">Due Date</th>
                            <th className="px-4 py-3 font-bold text-paper-fg3 uppercase tracking-wider">Priority</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-paper-bd">
                          <tr>
                            <td className="px-4 py-3 font-medium">Visual Assets</td>
                            <td className="px-4 py-3 text-paper-fg3">Mar 18, 2026</td>
                            <td className="px-4 py-3"><span className="text-paper-accent font-bold">High</span></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium">Documentation</td>
                            <td className="px-4 py-3 text-paper-fg3">Mar 20, 2026</td>
                            <td className="px-4 py-3"><span className="text-paper-sky font-bold">Medium</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- DARK MODE SECTION --- */}
          <div className="pt-24 border-t-4 border-dark-bg">
            <div className="bg-dark-bg -mx-6 px-6 py-24 rounded-[4rem] border border-dark-bd shadow-2xl">
              <div className="max-w-6xl mx-auto space-y-24">
                
                {/* Dark Mode Intro */}
                <div className="text-center space-y-4">
                  <span className="text-paper-accent font-bold text-sm uppercase tracking-[0.4em]">Theme Expansion</span>
                  <h2 className="text-7xl font-black tracking-tighter text-dark-fg">Dark Mode Guideline</h2>
                  <p className="text-dark-fg3 text-lg max-w-xl mx-auto">
                    Warm dark editorial interface yang nyaman di mata namun tetap mempertahankan identitas brand yang hangat.
                  </p>
                </div>

                {/* 1. Background Layer System (Dark) */}
                <section>
                  <SectionHeader 
                    icon={Layers} 
                    title="1. Background Layer System (Dark)" 
                    description="Struktur layer dark mode untuk menciptakan depth tanpa menggunakan pure black."
                    isDarkTheme
                  />
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    <ColorSwatch hex="#141312" name="bg-dark" label="Background Utama" isDarkTheme darkText={false} />
                    <ColorSwatch hex="#1C1A18" name="bg2-dark" label="Background Section" isDarkTheme darkText={false} />
                    <ColorSwatch hex="#262320" name="bg3-dark" label="Subtle Panel" isDarkTheme darkText={false} />
                    <ColorSwatch hex="#2E2A26" name="card-dark" label="Card Utama" isDarkTheme darkText={false} />
                    <ColorSwatch hex="#36312C" name="card2-dark" label="Card Elevated" isDarkTheme darkText={false} />
                  </div>
                </section>

                {/* 2. Text Color Hierarchy (Dark) */}
                <section>
                  <SectionHeader 
                    icon={Type} 
                    title="2. Text Color Hierarchy (Dark)" 
                    description="Kontras tinggi namun lembut untuk readability maksimal di kondisi cahaya rendah."
                    isDarkTheme
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-paper-accent uppercase tracking-widest">Headline (fg) - #F5F3EF</span>
                        <h3 className="text-4xl font-black text-dark-fg">The Quick Brown Fox</h3>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-paper-accent uppercase tracking-widest">Body (fg2) - #D6D1C9</span>
                        <p className="text-dark-fg2 leading-relaxed">
                          Jumps over the lazy dog. Tetap terbaca dengan jelas di atas latar belakang gelap yang hangat.
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-paper-accent uppercase tracking-widest">Secondary (fg3) - #A8A39B</span>
                        <p className="text-dark-fg3 text-sm">
                          Metadata info • #A8A39B
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <ColorSwatch hex="#F5F3EF" name="fg-dark" label="Headline Utama" isDarkTheme />
                      <ColorSwatch hex="#D6D1C9" name="fg2-dark" label="Body Text" isDarkTheme />
                      <ColorSwatch hex="#A8A39B" name="fg3-dark" label="Secondary Text" isDarkTheme />
                      <ColorSwatch hex="#7B766E" name="fg4-dark" label="Disabled Text" isDarkTheme />
                    </div>
                  </div>
                </section>

                {/* 3. Border & Semantic (Dark) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                  <section>
                    <SectionHeader 
                      icon={Square} 
                      title="3. Border & Divider (Dark)" 
                      description="Pemisah elemen yang lebih halus untuk menjaga kebersihan layout."
                      isDarkTheme
                    />
                    <div className="grid grid-cols-2 gap-6">
                      <ColorSwatch hex="#3F3A34" name="bd-dark" label="Border Utama" isDarkTheme darkText={false} />
                      <ColorSwatch hex="#4A453F" name="bd-soft" label="Subtle Border" isDarkTheme darkText={false} />
                    </div>
                  </section>

                  <section>
                    <SectionHeader 
                      icon={AlertCircle} 
                      title="4. Semantic Highlights (Dark)" 
                      description="Warna status dengan latar belakang yang sangat lembut (muted transparency)."
                      isDarkTheme
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-dark-sage-l/10 p-3 rounded-xl border border-paper-sage/20 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-paper-sage"></div>
                        <span className="text-[10px] font-bold text-paper-sage uppercase">Success BG</span>
                      </div>
                      <div className="bg-dark-rose-soft p-3 rounded-xl border border-paper-rose/20 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-paper-rose"></div>
                        <span className="text-[10px] font-bold text-paper-rose uppercase">Error BG</span>
                      </div>
                      <div className="bg-dark-gold-soft p-3 rounded-xl border border-paper-accent/20 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-paper-accent"></div>
                        <span className="text-[10px] font-bold text-paper-accent uppercase">Warning BG</span>
                      </div>
                      <div className="bg-dark-sky-soft p-3 rounded-xl border border-paper-sky/20 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-paper-sky"></div>
                        <span className="text-[10px] font-bold text-paper-sky uppercase">Info BG</span>
                      </div>
                    </div>
                  </section>
                </div>

                {/* 5. Button System (Dark) */}
                <section>
                  <SectionHeader 
                    icon={MousePointerClick} 
                    title="5. Button System (Dark)" 
                    description="Sistem tombol yang dioptimalkan untuk kontras pada tema gelap."
                    isDarkTheme
                  />
                  <div className="flex flex-wrap gap-6">
                    <div className="flex flex-col gap-2">
                      <button className="bg-dark-fg text-dark-bg px-6 py-3 rounded-xl font-bold text-sm shadow-md">
                        Primary Button
                      </button>
                      <span className="text-[10px] text-center text-dark-fg3">#F5F3EF</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="bg-paper-accent text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md">
                        Accent Button
                      </button>
                      <span className="text-[10px] text-center text-dark-fg3">#D97706</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="bg-transparent text-dark-fg2 border border-dark-bd px-6 py-3 rounded-xl font-bold text-sm hover:bg-dark-bg2">
                        Ghost Button
                      </button>
                      <span className="text-[10px] text-center text-dark-fg3">#3F3A34</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="bg-paper-rose text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md">
                        Danger Button
                      </button>
                      <span className="text-[10px] text-center text-dark-fg3">#C4574A</span>
                    </div>
                  </div>
                </section>

                {/* 6. Muted Decorative Colors (Dark) */}
                <section>
                  <SectionHeader 
                    icon={Palette} 
                    title="6. Muted Decorative Colors" 
                    description="Warna dekoratif dengan transparansi untuk aksen UI yang halus."
                    isDarkTheme
                  />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex flex-col gap-3">
                      <div className="h-24 w-full rounded-xl border border-dark-bd bg-dark-gold-soft flex items-end p-3">
                        <span className="text-[10px] font-mono font-bold text-dark-fg">#B59030 (18%)</span>
                      </div>
                      <span className="text-[10px] font-bold text-dark-fg3 uppercase text-center">Gold Soft</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="h-24 w-full rounded-xl border border-dark-bd bg-dark-lavender-soft flex items-end p-3">
                        <span className="text-[10px] font-mono font-bold text-dark-fg">#7C6FA0 (18%)</span>
                      </div>
                      <span className="text-[10px] font-bold text-dark-fg3 uppercase text-center">Lavender Soft</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="h-24 w-full rounded-xl border border-dark-bd bg-dark-sky-soft flex items-end p-3">
                        <span className="text-[10px] font-mono font-bold text-dark-fg">#3B7EC2 (18%)</span>
                      </div>
                      <span className="text-[10px] font-bold text-dark-fg3 uppercase text-center">Sky Soft</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="h-24 w-full rounded-xl border border-dark-bd bg-dark-rose-soft flex items-end p-3">
                        <span className="text-[10px] font-mono font-bold text-dark-fg">#C4574A (18%)</span>
                      </div>
                      <span className="text-[10px] font-bold text-dark-fg3 uppercase text-center">Rose Soft</span>
                    </div>
                  </div>
                </section>

                {/* 7. Sticky Notes (Dark) */}
                <section>
                  <SectionHeader 
                    icon={StickyNote} 
                    title="7. Sticky Notes (Dark Edition)" 
                    description="Versi gelap dari catatan tempel dengan tone yang lebih deep."
                    isDarkTheme
                  />
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    {[
                      { name: 'Yellow', bg: '#2A2509', bd: '#78640A' },
                      { name: 'Pink', bg: '#2A0D0D', bd: '#7C1D1D' },
                      { name: 'Blue', bg: '#0D1A2A', bd: '#1E40AF' },
                      { name: 'Green', bg: '#0D2012', bd: '#166534' },
                      { name: 'Purple', bg: '#1A0F2A', bd: '#4C1D95' },
                      { name: 'Orange', bg: '#2A1500', bd: '#92400E' },
                    ].map((note) => (
                      <div 
                        key={note.name}
                        className="aspect-square rounded-lg p-4 flex flex-col justify-between shadow-sm border-l-4"
                        style={{ backgroundColor: note.bg, borderColor: note.bd }}
                      >
                        <span className="text-[10px] font-bold text-dark-fg uppercase tracking-widest">{note.name}</span>
                        <div className="w-4 h-4 rounded-full opacity-20" style={{ backgroundColor: note.bd }}></div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 8. Full Implementation (Dark Dashboard) */}
                <section>
                  <SectionHeader 
                    icon={Layout} 
                    title="8. Full Implementation (Dark Dashboard)" 
                    description="Visualisasi dashboard lengkap dalam versi Dark Mode."
                    isDarkTheme
                  />
                  <div className="bg-dark-bg2 rounded-[3rem] p-4 md:p-12 border border-dark-bd overflow-hidden">
                    <div className="bg-dark-bg min-h-[800px] rounded-[2rem] shadow-2xl border border-dark-bd flex flex-col overflow-hidden">
                      {/* Top Bar */}
                      <div className="h-20 border-b border-dark-bd px-8 flex items-center justify-between bg-dark-bg/50 backdrop-blur-md">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-dark-card border border-dark-bd overflow-hidden">
                            <img src="https://picsum.photos/seed/user/100/100" alt="Avatar" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-dark-fg">Hi, Sarah! 👋</h4>
                            <p className="text-[10px] text-dark-fg3">Welcome! Let's make today awesome.</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <button className="bg-paper-accent text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-paper-accent/20">
                            <Plus size={16} /> Add New
                          </button>
                          <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-fg4" size={14} />
                            <input 
                              type="text" 
                              placeholder="Search notes, tasks..." 
                              className="bg-dark-bg3 border border-dark-bd rounded-xl py-2 pl-9 pr-4 text-xs text-dark-fg w-64 focus:outline-none focus:border-paper-accent"
                            />
                          </div>
                          <button className="p-2 text-dark-fg3 hover:text-dark-fg transition-colors">
                            <Bell size={18} />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-1 overflow-hidden">
                        {/* Sidebar */}
                        <div className="w-20 border-r border-dark-bd flex flex-col items-center py-8 gap-8 bg-dark-bg2/30">
                          {[Layout, StickyNote, Clock, CalendarIcon, ListTodo, BarChart3].map((Icon, i) => (
                            <div key={i} className={`p-3 rounded-2xl transition-all cursor-pointer ${i === 0 ? 'bg-paper-accent text-white shadow-lg shadow-paper-accent/20' : 'text-dark-fg4 hover:text-dark-fg hover:bg-dark-bg3'}`}>
                              <Icon size={20} />
                            </div>
                          ))}
                        </div>

                        {/* Main Content Grid */}
                        <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-y-auto max-h-[720px]">
                          
                          {/* Left Column: Timer */}
                          <div className="lg:col-span-3 space-y-8">
                            <div className="bg-dark-card rounded-[2.5rem] p-8 border border-dark-bd relative overflow-hidden">
                              <div className="flex justify-between items-center mb-8">
                                <span className="text-[10px] font-bold text-dark-fg3 uppercase tracking-widest">Focus Timer</span>
                                <MoreHorizontal size={16} className="text-dark-fg4" />
                              </div>
                              <div className="flex flex-col items-center py-4">
                                <div className="relative w-48 h-48 flex items-center justify-center">
                                  {/* Circular Progress Placeholder */}
                                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                                    <circle cx="96" cy="96" r="88" fill="none" stroke="currentColor" strokeWidth="8" className="text-dark-bg3" />
                                    <circle cx="96" cy="96" r="88" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="552" strokeDashoffset="138" className="text-paper-accent" />
                                  </svg>
                                  <div className="text-center z-10">
                                    <span className="text-[10px] font-bold text-dark-fg3 uppercase block mb-1">Pomodoro</span>
                                    <span className="text-4xl font-black text-dark-fg">25:00</span>
                                  </div>
                                </div>
                                <div className="flex gap-4 mt-12">
                                  <button className="w-12 h-12 rounded-full bg-paper-accent text-white flex items-center justify-center shadow-lg shadow-paper-accent/30">
                                    <Play size={20} fill="currentColor" />
                                  </button>
                                  <button className="w-12 h-12 rounded-full bg-dark-bg3 text-dark-fg flex items-center justify-center">
                                    <RotateCcw size={20} />
                                  </button>
                                </div>
                              </div>
                              <div className="mt-12 flex justify-between gap-2">
                                {[25, 10, 5].map(m => (
                                  <button key={m} className={`flex-1 py-2 rounded-xl text-[10px] font-bold ${m === 25 ? 'bg-paper-accent text-white' : 'bg-dark-bg3 text-dark-fg3'}`}>{m}</button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Middle Column: Dashboard & Notes */}
                          <div className="lg:col-span-6 space-y-8">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {[
                                { label: 'Total Focus', value: '22h', color: 'text-paper-accent', bg: 'bg-dark-gold-soft' },
                                { label: 'Notes Created', value: '64', color: 'text-paper-lavender', bg: 'bg-dark-lavender-soft' },
                                { label: 'Completed', value: '46', color: 'text-paper-sage', bg: 'bg-dark-sage-l/10' },
                                { label: 'Deadlines', value: '4', color: 'text-paper-rose', bg: 'bg-dark-rose-soft' },
                              ].map((stat, i) => (
                                <div key={i} className="bg-dark-card p-5 rounded-3xl border border-dark-bd">
                                  <div className={`w-8 h-1 rounded-full mb-4 ${stat.bg.replace('/10', '')} bg-opacity-100`}></div>
                                  <span className="text-[10px] font-bold text-dark-fg3 uppercase block mb-1">{stat.label}</span>
                                  <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
                                </div>
                              ))}
                            </div>

                            {/* Notes Section */}
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <h4 className="font-bold text-dark-fg">Recent Notes</h4>
                                <button className="text-[10px] font-bold text-paper-accent uppercase tracking-widest">View All</button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-dark-card p-6 rounded-[2rem] border-l-4 border-paper-accent border-y-dark-bd border-r-dark-bd">
                                  <h5 className="font-bold text-dark-fg mb-2">History Ch. 5</h5>
                                  <p className="text-xs text-dark-fg3 line-clamp-2 mb-4">The story of reads about conceituous and other n...</p>
                                  <div className="flex gap-2">
                                    <span className="px-2 py-1 rounded-lg bg-dark-lavender-soft text-paper-lavender text-[8px] font-bold uppercase">Assignment</span>
                                    <span className="px-2 py-1 rounded-lg bg-dark-gold-soft text-paper-accent text-[8px] font-bold uppercase">Exam</span>
                                  </div>
                                </div>
                                <div className="bg-dark-card p-6 rounded-[2rem] border-l-4 border-paper-sage border-y-dark-bd border-r-dark-bd">
                                  <h5 className="font-bold text-dark-fg mb-2">Biology Lab Report</h5>
                                  <p className="text-xs text-dark-fg3 line-clamp-2 mb-4">Complete student with biological and sympatric to recovera how...</p>
                                  <div className="flex gap-2">
                                    <span className="px-2 py-1 rounded-lg bg-dark-sage-l/10 text-paper-sage text-[8px] font-bold uppercase">Study</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Calendar Section */}
                            <div className="bg-dark-card rounded-[2.5rem] p-8 border border-dark-bd">
                              <div className="flex justify-between items-center mb-6">
                                <h4 className="font-bold text-dark-fg">Monthly Calendar</h4>
                                <div className="flex gap-2">
                                  <button className="p-1 text-dark-fg3">{'<'}</button>
                                  <span className="text-xs font-bold text-dark-fg">March 2026</span>
                                  <button className="p-1 text-dark-fg3">{'>'}</button>
                                </div>
                              </div>
                              <div className="grid grid-cols-7 gap-2 text-center mb-4">
                                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                                  <span key={d} className="text-[10px] font-bold text-dark-fg4">{d}</span>
                                ))}
                                {Array.from({ length: 31 }).map((_, i) => (
                                  <div key={i} className={`aspect-square flex items-center justify-center text-[10px] rounded-xl cursor-pointer transition-colors ${i + 1 === 15 ? 'bg-paper-accent text-white shadow-lg shadow-paper-accent/20' : 'text-dark-fg2 hover:bg-dark-bg3'}`}>
                                    {i + 1}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Right Column: Tasks & Analytics */}
                          <div className="lg:col-span-3 space-y-8">
                            {/* To-Do List */}
                            <div className="bg-dark-card rounded-[2.5rem] p-8 border border-dark-bd">
                              <h4 className="font-bold text-dark-fg mb-6">To-Do List</h4>
                              <div className="space-y-4">
                                {[
                                  { title: 'Submit Math HW', time: '10:00 AM', tags: ['Assignment', 'Exam'], color: 'accent' },
                                  { title: 'Revise Chemistry', time: '02:00 PM', tags: ['Exam', 'Study'], color: 'lavender' },
                                  { title: 'Read Article', time: '10:00 PM', tags: ['Study'], color: 'sage' },
                                ].map((task, i) => (
                                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-dark-bg2/50 border border-dark-bd/50">
                                    <div className={`w-4 h-4 rounded-md border-2 border-dark-bd mt-1`}></div>
                                    <div className="flex-1">
                                      <div className="flex justify-between items-start mb-2">
                                        <h5 className="text-xs font-bold text-dark-fg">{task.title}</h5>
                                        <span className="text-[8px] text-dark-fg4">{task.time}</span>
                                      </div>
                                      <div className="flex gap-1">
                                        {task.tags.map(tag => (
                                          <span key={tag} className="px-1.5 py-0.5 rounded bg-dark-bg3 text-dark-fg3 text-[7px] font-bold uppercase">{tag}</span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Analytics Preview */}
                            <div className="bg-dark-card rounded-[2.5rem] p-8 border border-dark-bd">
                              <h4 className="font-bold text-dark-fg mb-6">Analytics Preview</h4>
                              <div className="h-32 w-full bg-dark-bg3 rounded-2xl relative overflow-hidden flex items-end px-4 pb-4 gap-2">
                                {/* Mock Chart Bars */}
                                {[40, 70, 50, 90, 60, 80, 45].map((h, i) => (
                                  <div key={i} className="flex-1 bg-paper-accent rounded-t-lg opacity-80" style={{ height: `${h}%` }}></div>
                                ))}
                              </div>
                              <div className="mt-6 flex justify-between items-center">
                                <div>
                                  <span className="text-[10px] font-bold text-dark-fg3 block">Focus Score</span>
                                  <span className="text-lg font-black text-dark-fg">88%</span>
                                </div>
                                <div className="w-12 h-12 rounded-full border-4 border-dark-bg3 border-t-paper-accent rotate-45"></div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* --- LIGHT MODE IMPLEMENTATION EXAMPLE --- */}
          <section className="pt-24">
            <SectionHeader 
              icon={Layout} 
              title="11. Full Implementation (Light Dashboard)" 
              description="Visualisasi dashboard lengkap dalam versi Light Mode menggunakan palette yang sama."
            />
            <div className="bg-paper-bg2 rounded-[3rem] p-4 md:p-12 border border-paper-bd overflow-hidden">
              <div className="bg-paper-bg min-h-[800px] rounded-[2rem] shadow-2xl border border-paper-bd flex flex-col overflow-hidden">
                {/* Top Bar */}
                <div className="h-20 border-b border-paper-bd px-8 flex items-center justify-between bg-white/80 backdrop-blur-md">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-paper-bg2 border border-paper-bd overflow-hidden">
                      <img src="https://picsum.photos/seed/user2/100/100" alt="Avatar" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-paper-fg">Hi, Sarah! 👋</h4>
                      <p className="text-[10px] text-paper-fg3">Welcome! Let's make today awesome.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="bg-paper-accent text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-paper-accent/20">
                      <Plus size={16} /> Add New
                    </button>
                    <div className="relative hidden md:block">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-paper-fg3" size={14} />
                      <input 
                        type="text" 
                        placeholder="Search notes, tasks..." 
                        className="bg-paper-bg2 border border-paper-bd rounded-xl py-2 pl-9 pr-4 text-xs text-paper-fg w-64 focus:outline-none focus:border-paper-accent"
                      />
                    </div>
                    <button className="p-2 text-paper-fg3 hover:text-paper-fg transition-colors">
                      <Bell size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-1 overflow-hidden">
                  {/* Sidebar */}
                  <div className="w-20 border-r border-paper-bd flex flex-col items-center py-8 gap-8 bg-paper-bg2/30">
                    {[Layout, StickyNote, Clock, CalendarIcon, ListTodo, BarChart3].map((Icon, i) => (
                      <div key={i} className={`p-3 rounded-2xl transition-all cursor-pointer ${i === 0 ? 'bg-paper-accent text-white shadow-lg shadow-paper-accent/20' : 'text-paper-fg3 hover:text-paper-fg hover:bg-paper-bg2'}`}>
                        <Icon size={20} />
                      </div>
                    ))}
                  </div>

                  {/* Main Content Grid */}
                  <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-y-auto max-h-[720px]">
                    
                    {/* Left Column: Timer */}
                    <div className="lg:col-span-3 space-y-8">
                      <div className="bg-white rounded-[2.5rem] p-8 border border-paper-bd relative overflow-hidden shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                          <span className="text-[10px] font-bold text-paper-fg3 uppercase tracking-widest">Focus Timer</span>
                          <MoreHorizontal size={16} className="text-paper-fg3" />
                        </div>
                        <div className="flex flex-col items-center py-4">
                          <div className="relative w-48 h-48 flex items-center justify-center">
                            <svg className="absolute inset-0 w-full h-full -rotate-90">
                              <circle cx="96" cy="96" r="88" fill="none" stroke="currentColor" strokeWidth="8" className="text-paper-bg2" />
                              <circle cx="96" cy="96" r="88" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="552" strokeDashoffset="138" className="text-paper-accent" />
                            </svg>
                            <div className="text-center z-10">
                              <span className="text-[10px] font-bold text-paper-fg3 uppercase block mb-1">Pomodoro</span>
                              <span className="text-4xl font-black text-paper-fg">25:00</span>
                            </div>
                          </div>
                          <div className="flex gap-4 mt-12">
                            <button className="w-12 h-12 rounded-full bg-paper-accent text-white flex items-center justify-center shadow-lg shadow-paper-accent/30">
                              <Play size={20} fill="currentColor" />
                            </button>
                            <button className="w-12 h-12 rounded-full bg-paper-bg2 text-paper-fg flex items-center justify-center">
                              <RotateCcw size={20} />
                            </button>
                          </div>
                        </div>
                        <div className="mt-12 flex justify-between gap-2">
                          {[25, 10, 5].map(m => (
                            <button key={m} className={`flex-1 py-2 rounded-xl text-[10px] font-bold ${m === 25 ? 'bg-paper-accent text-white' : 'bg-paper-bg2 text-paper-fg3'}`}>{m}</button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Middle Column: Dashboard & Notes */}
                    <div className="lg:col-span-6 space-y-8">
                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { label: 'Total Focus', value: '22h', color: 'text-paper-accent', bg: 'bg-paper-amber-l' },
                          { label: 'Notes Created', value: '64', color: 'text-paper-lavender', bg: 'bg-paper-lavender-l' },
                          { label: 'Completed', value: '46', color: 'text-paper-sage', bg: 'bg-paper-sage-l' },
                          { label: 'Deadlines', value: '4', color: 'text-paper-rose', bg: 'bg-paper-rose-l' },
                        ].map((stat, i) => (
                          <div key={i} className="bg-white p-5 rounded-3xl border border-paper-bd shadow-sm">
                            <div className={`w-8 h-1 rounded-full mb-4 ${stat.bg}`}></div>
                            <span className="text-[10px] font-bold text-paper-fg3 uppercase block mb-1">{stat.label}</span>
                            <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Notes Section */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-paper-fg">Recent Notes</h4>
                          <button className="text-[10px] font-bold text-paper-accent uppercase tracking-widest">View All</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white p-6 rounded-[2rem] border-l-4 border-paper-accent border-y-paper-bd border-r-paper-bd shadow-sm">
                            <h5 className="font-bold text-paper-fg mb-2">History Ch. 5</h5>
                            <p className="text-xs text-paper-fg3 line-clamp-2 mb-4">The story of reads about conceituous and other n...</p>
                            <div className="flex gap-2">
                              <span className="px-2 py-1 rounded-lg bg-paper-lavender-l text-paper-lavender text-[8px] font-bold uppercase">Assignment</span>
                              <span className="px-2 py-1 rounded-lg bg-paper-amber-l text-paper-accent text-[8px] font-bold uppercase">Exam</span>
                            </div>
                          </div>
                          <div className="bg-white p-6 rounded-[2rem] border-l-4 border-paper-sage border-y-paper-bd border-r-paper-bd shadow-sm">
                            <h5 className="font-bold text-paper-fg mb-2">Biology Lab Report</h5>
                            <p className="text-xs text-paper-fg3 line-clamp-2 mb-4">Complete student with biological and sympatric to recovera how...</p>
                            <div className="flex gap-2">
                              <span className="px-2 py-1 rounded-lg bg-paper-sage-l text-paper-sage text-[8px] font-bold uppercase">Study</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Calendar Section */}
                      <div className="bg-white rounded-[2.5rem] p-8 border border-paper-bd shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                          <h4 className="font-bold text-paper-fg">Monthly Calendar</h4>
                          <div className="flex gap-2">
                            <button className="p-1 text-paper-fg3">{'<'}</button>
                            <span className="text-xs font-bold text-paper-fg">March 2026</span>
                            <button className="p-1 text-paper-fg3">{'>'}</button>
                          </div>
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center mb-4">
                          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                            <span key={d} className="text-[10px] font-bold text-paper-fg3">{d}</span>
                          ))}
                          {Array.from({ length: 31 }).map((_, i) => (
                            <div key={i} className={`aspect-square flex items-center justify-center text-[10px] rounded-xl cursor-pointer transition-colors ${i + 1 === 15 ? 'bg-paper-accent text-white shadow-lg shadow-paper-accent/20' : 'text-paper-fg2 hover:bg-paper-bg2'}`}>
                              {i + 1}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Tasks & Analytics */}
                    <div className="lg:col-span-3 space-y-8">
                      {/* To-Do List */}
                      <div className="bg-white rounded-[2.5rem] p-8 border border-paper-bd shadow-sm">
                        <h4 className="font-bold text-paper-fg mb-6">To-Do List</h4>
                        <div className="space-y-4">
                          {[
                            { title: 'Submit Math HW', time: '10:00 AM', tags: ['Assignment', 'Exam'], color: 'accent' },
                            { title: 'Revise Chemistry', time: '02:00 PM', tags: ['Exam', 'Study'], color: 'lavender' },
                            { title: 'Read Article', time: '10:00 PM', tags: ['Study'], color: 'sage' },
                          ].map((task, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-paper-bg2/50 border border-paper-bd/50">
                              <div className={`w-4 h-4 rounded-md border-2 border-paper-bd mt-1`}></div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                  <h5 className="text-xs font-bold text-paper-fg">{task.title}</h5>
                                  <span className="text-[8px] text-paper-fg3">{task.time}</span>
                                </div>
                                <div className="flex gap-1">
                                  {task.tags.map(tag => (
                                    <span key={tag} className="px-1.5 py-0.5 rounded bg-paper-bg3 text-paper-fg3 text-[7px] font-bold uppercase">{tag}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Analytics Preview */}
                      <div className="bg-white rounded-[2.5rem] p-8 border border-paper-bd shadow-sm">
                        <h4 className="font-bold text-paper-fg mb-6">Analytics Preview</h4>
                        <div className="h-32 w-full bg-paper-bg2 rounded-2xl relative overflow-hidden flex items-end px-4 pb-4 gap-2">
                          {/* Mock Chart Bars */}
                          {[40, 70, 50, 90, 60, 80, 45].map((h, i) => (
                            <div key={i} className="flex-1 bg-paper-accent rounded-t-lg opacity-80" style={{ height: `${h}%` }}></div>
                          ))}
                        </div>
                        <div className="mt-6 flex justify-between items-center">
                          <div>
                            <span className="text-[10px] font-bold text-paper-fg3 block">Focus Score</span>
                            <span className="text-lg font-black text-paper-fg">88%</span>
                          </div>
                          <div className="w-12 h-12 rounded-full border-4 border-paper-bg2 border-t-paper-accent rotate-45"></div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer Info */}
        <footer className="max-w-6xl mx-auto px-6 pt-12 border-t border-paper-bd">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-paper-fg3 text-xs">© 2026 Warm Paper Design System. Built with precision and care.</p>
            <div className="flex gap-6">
              <span className="text-paper-fg3 text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-paper-accent">Guidelines</span>
              <span className="text-paper-fg3 text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-paper-accent">Components</span>
              <span className="text-paper-fg3 text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-paper-accent">Resources</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

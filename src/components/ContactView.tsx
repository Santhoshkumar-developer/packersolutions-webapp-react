import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  ArrowRight,
  Building,
  HelpCircle
} from 'lucide-react';
import { apiService } from '../services/api';

interface ContactViewProps {
  onNavigate: (page: string) => void;
  selectedCity?: string;
}

type InquiryType = 'general' | 'booking' | 'corporate' | 'careers';

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate, selectedCity = 'Bangalore' }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeType, setActiveType] = useState<InquiryType>('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: selectedCity,
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await apiService.submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        message: `${formData.message} [Category: ${activeType.toUpperCase()}]`
      });
    } catch (e) {
      console.error("Error submitting contact inquiry:", e);
    }

    setFormSubmitted(true);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      city: selectedCity,
      message: ''
    });
    setFormSubmitted(false);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20 font-sans transition-colors duration-200">
      
      {/* ==================== HERO HEADER ==================== */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white py-16 sm:py-24 px-4 text-center relative overflow-hidden">
        {/* Abstract Background Accents */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 space-y-5">
          <span className="bg-orange-500/10 text-orange-400 border border-orange-500/25 text-[10px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            24/7 Dedicated Support desk
          </span>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight font-sans leading-tight">
            Get in Touch with <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-teal-400 font-semibold">Our Experts</span>
          </h1>
          
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-normal">
            Have questions about pricing, container safety, or custom interstate routes? Our friendly support team and dedicated route managers are standing by to assist you.
          </p>
        </div>
      </section>

      {/* ==================== CONTACT INFO & FORM SECTION ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Shifting Coordinates & Support Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/60 dark:border-slate-800 shadow-xl space-y-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                Shifting Support Desk
              </h3>
              
              <div className="space-y-4">
                
                {/* Contact Item 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 flex items-center justify-center text-orange-500 shrink-0 border border-orange-100 dark:border-orange-900/50">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Direct Hotline</span>
                    <a href="tel:18003098555" className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-orange-500 transition-colors">
                      1800-309-8555
                    </a>
                    <p className="text-[11px] text-slate-400 font-medium">Toll-free across India • 9:00 AM - 9:00 PM</p>
                  </div>
                </div>

                {/* Contact Item 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0 border border-teal-100 dark:border-teal-900/50">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Email Support</span>
                    <a href="mailto:support@packersolutions.com" className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-teal-600 transition-colors block">
                      support@packersolutions.com
                    </a>
                    <a href="mailto:partners@packersolutions.com" className="text-[11px] text-slate-500 dark:text-slate-400 hover:underline">
                      partners@packersolutions.com (Business)
                    </a>
                  </div>
                </div>

                {/* Contact Item 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-500 shrink-0 border border-blue-100 dark:border-blue-900/50">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Operating Hours</span>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Mon - Sun: 7:00 AM - 11:00 PM
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium">Active route monitoring: 24 hours daily</p>
                  </div>
                </div>

                {/* Contact Item 4 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/40 flex items-center justify-center text-violet-500 shrink-0 border border-violet-100 dark:border-violet-900/50">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Live Chat Support</span>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      WhatsApp Instant Estimate
                    </p>
                    <a href="https://wa.me/918003098555" target="_blank" rel="noreferrer" className="text-[11px] text-teal-600 dark:text-teal-400 hover:underline font-semibold block mt-0.5">
                      Chat Now via WhatsApp (2 Min ETA) →
                    </a>
                  </div>
                </div>

              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-5 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Your privacy is 100% secured. No spam guarantees.</span>
              </div>
            </div>

            {/* Corporate Hubs Card */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-5">
              <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
                <Building className="w-5 h-5 text-orange-400" />
                Our Corporate Headquarters
              </h3>
              
              <div className="space-y-4 text-xs text-slate-300">
                <div className="space-y-1">
                  <h4 className="font-semibold text-slate-100">Bangalore (HQ) Hub</h4>
                  <p className="leading-relaxed font-normal">
                    Packer Solutions Tech Park, Sector 4, HSR Layout, Bengaluru, Karnataka - 560102
                  </p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-800">
                  <h4 className="font-semibold text-slate-100">Mumbai Central Regional Office</h4>
                  <p className="leading-relaxed font-normal">
                    Logistics Plaza, Phase II, Bandra Kurla Complex (BKC), Mumbai, Maharashtra - 400051
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Contact Enquiry Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/70 dark:border-slate-800 shadow-xl relative overflow-hidden">
            {/* Background absolute graphic */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 dark:bg-slate-800/40 rounded-bl-full pointer-events-none -z-10" />

            <div className="space-y-6">
              
              {/* Category tabs */}
              <div className="space-y-2">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">Inquiry Category</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['general', 'booking', 'corporate', 'careers'] as InquiryType[]).map((type) => {
                    const isTypeActive = activeType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setActiveType(type)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold tracking-wide border cursor-pointer transition-all ${
                          isTypeActive 
                            ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-300 dark:border-orange-800 text-orange-600 dark:text-orange-400 shadow-sm' 
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        {type === 'general' && 'General Qs'}
                        {type === 'booking' && 'Booking Help'}
                        {type === 'corporate' && 'B2B Corporate'}
                        {type === 'careers' && 'Join Crew'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {formSubmitted ? (
                /* Success Feedback Block */
                <div className="py-10 text-center space-y-6">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-950/60 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto shadow-inner ring-8 ring-green-50 dark:ring-green-950/20 animate-bounce">
                    <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Message Dispatched!</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold max-w-md mx-auto leading-relaxed">
                      Thank you for contacting Packer Solutions. A dedicated customer support representative will review your ticket and reach out to you within the next <strong>15 minutes</strong>.
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 max-w-sm mx-auto text-left border border-slate-100 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Name:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Inquiry Type:</span>
                      <span className="font-semibold text-orange-600 dark:text-orange-400 uppercase">{activeType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Ref Code:</span>
                      <span className="font-mono font-bold text-slate-700 dark:text-slate-300">TKT-{Math.floor(1000 + Math.random() * 9000)}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      onClick={handleResetForm}
                      className="bg-slate-900 hover:bg-slate-800 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-semibold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer"
                    >
                      Send Another Message
                    </button>
                    <button
                      onClick={() => onNavigate('home')}
                      className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer"
                    >
                      Return to Homepage
                    </button>
                  </div>
                </div>
              ) : (
                /* Contact Input Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-slate-400 dark:placeholder-slate-500 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. rahul@gmail.com"
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-slate-400 dark:placeholder-slate-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">Mobile Contact</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        pattern="[0-9]{10}"
                        title="Please enter a valid 10-digit mobile number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="10-digit mobile number"
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-slate-400 dark:placeholder-slate-500 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">Shifting Hub City</label>
                      <select 
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl px-3.5 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                      >
                        <option value="Bangalore">Bangalore Hub</option>
                        <option value="Mumbai">Mumbai Hub</option>
                        <option value="Pune">Pune Hub</option>
                        <option value="Chennai">Chennai Hub</option>
                        <option value="Mysore">Mysore Hub</option>
                        <option value="Delhi NCR">Delhi NCR Hub</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">How can we help you?</label>
                    <textarea 
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={
                        activeType === 'general' 
                          ? "Write your questions about our logistics service, pricing model, or storage hubs..." 
                          : activeType === 'booking'
                          ? "Please mention your booking ticket number or schedule changes..."
                          : activeType === 'corporate'
                          ? "Detail your company cargo volume, required routes, and GST billing needs..."
                          : "Briefly explain your vehicle model, city of operations, and driving experience..."
                      }
                      className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-slate-400 dark:placeholder-slate-500 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs py-3.5 rounded-xl transition-all shadow-md hover:shadow-orange-500/20 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    Dispatch Secure Message
                  </button>

                  <p className="text-[10px] text-center text-slate-400 font-medium leading-normal">
                    🔒 Protected by secure 256-Bit SSL logistics safety network
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* ==================== SECURE HELPLINE FAQS ==================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-[10px] font-semibold text-orange-400 uppercase tracking-widest block">Customer Support FAQs</span>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">Need Immediate Answers?</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Before dispatching a ticket, check if your inquiry is covered by our immediate resolution guides below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 relative z-10">
            
            <div className="space-y-1.5">
              <h4 className="text-sm font-semibold text-orange-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                How fast does support respond?
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Our active monitoring system routes form queries instantly. A personal shifting supervisor typically calls or messages you within <strong>15 minutes</strong> during standard business hours.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-sm font-semibold text-orange-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                Who do I contact on Shifting Day?
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                As soon as your booking is confirmed, you are assigned a dedicated Shifting Supervisor. Their name, direct phone number, and truck GPS coordinate tracking links are dispatched to you via SMS and Email.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-sm font-semibold text-orange-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                Can I request specialized fragile wrapping?
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Yes! If you have exceptionally premium goods, select "Premium Managed Shifting" on our booking portal or write it directly in your message here. We can dispatch 5-ply carton boxes and bubble sheets.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-sm font-semibold text-orange-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                Are there corporate rates for office moves?
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Absolutely. We support commercial offices with corporate pricing agreements, GST billing invoices, dedicated heavy loader cranes, and off-hour/night transit setups to prevent employee disruption.
              </p>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800 text-center relative z-10 space-y-4">
            <p className="text-xs text-slate-400 font-medium">Have an urgent, complex, or high-volume relocation issue?</p>
            <button 
              onClick={() => onNavigate('home')}
              className="bg-white text-slate-900 font-semibold text-xs px-6 py-3.5 rounded-xl transition-all cursor-pointer hover:bg-slate-100 shadow-lg inline-flex items-center gap-1.5"
            >
              Start Online Shifting Estimate <ArrowRight className="w-4 h-4 text-orange-500" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

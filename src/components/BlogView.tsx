/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { BLOG_POSTS } from '../data/blogData';
import { BlogPost } from '../types';
import { 
  Search, 
  Clock, 
  User, 
  Calendar, 
  ArrowLeft, 
  Share2, 
  ThumbsUp, 
  Bookmark, 
  CheckCircle2, 
  HelpCircle,
  Tag,
  BookOpen,
  Check
} from 'lucide-react';

interface BlogViewProps {
  onNavigate: (page: string, serviceId?: string) => void;
  selectedArticleSlug: string | null;
  onSelectArticle: (slug: string | null) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ 
  onNavigate, 
  selectedArticleSlug, 
  onSelectArticle 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<string[]>([]);
  const [helpfulSlugs, setHelpfulSlugs] = useState<string[]>([]);
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);

  // Load bookmarks and helpful interactions from localStorage
  useEffect(() => {
    try {
      const storedBookmarks = localStorage.getItem('blog_bookmarks');
      if (storedBookmarks) setBookmarkedSlugs(JSON.parse(storedBookmarks));

      const storedHelpful = localStorage.getItem('blog_helpful');
      if (storedHelpful) setHelpfulSlugs(JSON.parse(storedHelpful));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleBookmark = (slug: string) => {
    let updated: string[];
    if (bookmarkedSlugs.includes(slug)) {
      updated = bookmarkedSlugs.filter(s => s !== slug);
    } else {
      updated = [...bookmarkedSlugs, slug];
    }
    setBookmarkedSlugs(updated);
    localStorage.setItem('blog_bookmarks', JSON.stringify(updated));
  };

  const markHelpful = (slug: string) => {
    if (helpfulSlugs.includes(slug)) return;
    const updated = [...helpfulSlugs, slug];
    setHelpfulSlugs(updated);
    localStorage.setItem('blog_helpful', JSON.stringify(updated));
  };

  const handleShare = (slug: string) => {
    const url = `${window.location.origin}/#blog/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setShareSuccess(slug);
      setTimeout(() => setShareSuccess(null), 2500);
    });
  };

  const activeArticle = useMemo(() => {
    if (!selectedArticleSlug) return null;
    return BLOG_POSTS.find(post => post.slug === selectedArticleSlug) || null;
  }, [selectedArticleSlug]);

  // Categories list
  const categories = ['All', 'Household', 'Office', 'Fragile Items'];

  // Filtered blog posts
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handle category pill click
  const selectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  // Convert custom pseudo-markdown inside blog content to beautiful styled React elements
  const renderContentHtml = (markdown: string) => {
    const lines = markdown.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-xl font-bold text-slate-900 mt-8 mb-3 font-sans leading-snug">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      if (trimmed.startsWith('* **')) {
        // Bullet list item with bold prefix
        const clean = trimmed.replace('* **', '');
        const parts = clean.split('**');
        return (
          <li key={idx} className="ml-5 list-disc text-sm text-slate-600 mb-2 leading-relaxed">
            <strong className="text-slate-900 font-bold">{parts[0]}</strong>{parts.slice(1).join('')}
          </li>
        );
      }
      if (trimmed.startsWith('* ')) {
        return (
          <li key={idx} className="ml-5 list-disc text-sm text-slate-600 mb-2 leading-relaxed">
            {trimmed.replace('* ', '')}
          </li>
        );
      }
      if (trimmed.startsWith('1. **')) {
        const clean = trimmed.replace('1. **', '');
        const parts = clean.split('**');
        return (
          <li key={idx} className="ml-5 list-decimal text-sm text-slate-600 mb-2 leading-relaxed">
            <strong className="text-slate-900 font-bold">{parts[0]}</strong>{parts.slice(1).join('')}
          </li>
        );
      }
      if (trimmed.startsWith('1. ')) {
        return (
          <li key={idx} className="ml-5 list-decimal text-sm text-slate-600 mb-2 leading-relaxed">
            {trimmed.replace('1. ', '')}
          </li>
        );
      }
      if (trimmed === '') {
        return <div key={idx} className="h-4" />;
      }
      // Standard paragraph
      // Check for bold matches e.g. **bold text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      const italicRegex = /\*(.*?)\*/g;
      
      let renderedText: React.ReactNode = trimmed;
      if (trimmed.includes('**')) {
        const parts = trimmed.split('**');
        renderedText = parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-bold text-slate-900">{part}</strong> : part);
      }
      
      return (
        <p key={idx} className="text-sm text-slate-600 leading-relaxed mb-4">
          {renderedText}
        </p>
      );
    });
  };

  return (
    <div id="blog-section-container" className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Reader View */}
        {activeArticle ? (
          <article id={`blog-post-${activeArticle.slug}`} className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden text-left">
            {/* Header image and cover banner */}
            <div className="h-64 sm:h-96 relative">
              <img 
                src={activeArticle.image} 
                alt={activeArticle.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
              
              {/* Back Button floating on image */}
              <button 
                onClick={() => onSelectArticle(null)}
                className="absolute top-6 left-6 bg-white/95 text-slate-800 hover:bg-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-2 cursor-pointer transition-all hover:-translate-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Tips
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-orange-500 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                  {activeArticle.category}
                </span>
                <h1 className="text-2xl sm:text-4xl font-bold text-white mt-3 leading-snug drop-shadow-md">
                  {activeArticle.title}
                </h1>
              </div>
            </div>

            {/* Reading details & metadata */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-500">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-orange-500" />
                  {activeArticle.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  {activeArticle.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-orange-500" />
                  {activeArticle.readTime}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleShare(activeArticle.slug)}
                  className="p-2 hover:bg-slate-200 rounded-lg text-slate-600 hover:text-slate-900 transition-colors relative cursor-pointer"
                  title="Copy link to clipboard"
                >
                  <Share2 className="w-4 h-4" />
                  {shareSuccess === activeArticle.slug && (
                    <span className="absolute -top-10 right-0 bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap animate-fade-in font-bold">
                      Link Copied!
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => toggleBookmark(activeArticle.slug)}
                  className="p-2 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  title={bookmarkedSlugs.includes(activeArticle.slug) ? 'Remove bookmark' : 'Bookmark this guide'}
                >
                  <Bookmark 
                    className={`w-4 h-4 ${bookmarkedSlugs.includes(activeArticle.slug) ? 'fill-orange-500 text-orange-500' : 'text-slate-600'}`} 
                  />
                </button>
              </div>
            </div>

            {/* Article Content Area */}
            <div className="p-6 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Main Content */}
                <div className="lg:col-span-8 space-y-2">
                  <div className="italic text-base text-slate-500 border-l-4 border-orange-500 pl-4 py-1.5 font-medium leading-relaxed bg-orange-50/20 rounded-r-xl mb-6">
                    "{activeArticle.excerpt}"
                  </div>

                  {renderContentHtml(activeArticle.content)}

                  {/* Feedback Interactive Widget */}
                  <div className="mt-12 bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center">
                    <h4 className="font-bold text-slate-800 text-sm">Was this Relocation Guide helpful to you?</h4>
                    <p className="text-xs text-slate-500 mt-1">We optimize our content to offer actual, verified logistic support to families and managers.</p>
                    <div className="mt-4 flex items-center justify-center gap-3">
                      <button 
                        onClick={() => markHelpful(activeArticle.slug)}
                        disabled={helpfulSlugs.includes(activeArticle.slug)}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer ${
                          helpfulSlugs.includes(activeArticle.slug) 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-default' 
                            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 hover:scale-[1.02]'
                        }`}
                      >
                        {helpfulSlugs.includes(activeArticle.slug) ? (
                          <>
                            <Check className="w-4 h-4" />
                            Yes, Helpful!
                          </>
                        ) : (
                          <>
                            <ThumbsUp className="w-4 h-4 text-emerald-600" />
                            Yes, it helped!
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Sidebar Sticky Tools */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Moving Assistance CTA */}
                  <div className="bg-gradient-to-br from-[#1e3a8a] to-blue-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 text-9xl opacity-10 font-bold">🚚</div>
                    <span className="text-[10px] font-bold tracking-widest uppercase bg-blue-800 text-blue-200 px-3 py-1 rounded-full">
                      Instant estimate
                    </span>
                    <h4 className="text-lg font-bold mt-3 leading-snug">Ready for your move?</h4>
                    <p className="text-xs text-slate-200 mt-2 leading-relaxed">
                      Apply the packing wisdom you just read with Coimbatore & Bangalore's #1 trusted shipping network.
                    </p>
                    <button 
                      onClick={() => onNavigate('service', 'packers-and-movers')}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-3 rounded-xl shadow-md mt-5 transition-transform hover:scale-[1.02] cursor-pointer"
                    >
                      Calculate Moving Price →
                    </button>
                  </div>

                  {/* Safety Checklist Box */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-left">
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-orange-500" />
                      Our Safety Guarantees
                    </h4>
                    <div className="space-y-3">
                      {[
                        '100% On-Time Carrier Delivery',
                        'Fully Verified Background-Checked Crew',
                        'Comprehensive Transit Damage Insurance',
                        'Real-Time Dispatch WhatsApp Alerts',
                      ].map((item, i) => (
                        <div key={i} className="flex gap-2 items-start text-xs text-slate-600">
                          <span className="text-teal-600 font-bold">✓</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Other guides list */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-left">
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-orange-500" />
                      More Shifting Guides
                    </h4>
                    <div className="space-y-4">
                      {BLOG_POSTS.filter(post => post.slug !== activeArticle.slug).map(post => (
                        <button 
                          key={post.slug}
                          onClick={() => onSelectArticle(post.slug)}
                          className="group block text-left w-full cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-all"
                        >
                          <span className="text-[10px] uppercase font-bold text-orange-500 block">
                            {post.category}
                          </span>
                          <span className="text-xs font-bold text-slate-800 group-hover:text-blue-900 line-clamp-2 mt-1 leading-snug">
                            {post.title}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </article>
        ) : (
          /* List View */
          <div id="blog-list-view">
            
            {/* Header Title */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-orange-500 font-bold text-xs uppercase tracking-widest bg-orange-100/50 px-4 py-1.5 rounded-full">
                Relocation Playbook
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-sans mt-3">
                Packer Solutions Moving Tips & Blogs
              </h2>
              <p className="text-sm text-slate-500 mt-3 font-medium leading-relaxed">
                Expert tips, packing instructions, and corporate coordinator frameworks to make your home shifting, car transport, or office move completely seamless.
              </p>
            </div>

            {/* Filter controls panel */}
            <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-md mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Category pills */}
              <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start w-full md:w-auto">
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#1e3a8a] text-white shadow-md shadow-blue-900/10'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {cat === 'All' ? '📂 All Advice' : cat === 'Household' ? '🏠 House Moving' : cat === 'Office' ? '🏢 Office Shifting' : '💎 Fragile Assets'}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Search articles & tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 text-slate-800 text-xs rounded-xl pl-10 pr-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:bg-white font-semibold"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Bookmarked quick view */}
            {bookmarkedSlugs.length > 0 && (
              <div className="mb-6 bg-orange-50/50 border border-orange-100 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-orange-500 fill-orange-500" />
                  <span className="text-xs font-bold text-slate-700">
                    You have <span className="text-orange-600 font-bold">{bookmarkedSlugs.length}</span> saved articles for offline reading.
                  </span>
                </div>
                <button 
                  onClick={() => {
                    setBookmarkedSlugs([]);
                    localStorage.removeItem('blog_bookmarks');
                  }}
                  className="text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider"
                >
                  Clear Saved
                </button>
              </div>
            )}

            {/* Articles Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => {
                  const isBookmarked = bookmarkedSlugs.includes(post.slug);
                  return (
                    <article 
                      key={post.slug}
                      className="bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
                    >
                      {/* Cover Photo */}
                      <div className="h-48 relative overflow-hidden bg-slate-100">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>
                        
                        {/* Category Badge & Bookmark Button */}
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                          <span className="bg-[#1e3a8a] text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(post.slug);
                            }}
                            className="w-8 h-8 rounded-full bg-white/90 text-slate-800 hover:bg-white flex items-center justify-center shadow-md cursor-pointer transition-colors"
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-orange-500 text-orange-500' : 'text-slate-600'}`} />
                          </button>
                        </div>
                      </div>

                      {/* Content Card Body */}
                      <div className="p-6 flex-grow text-left flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 mb-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-orange-500" />
                              {post.date}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-orange-500" />
                              {post.readTime}
                            </span>
                          </div>

                          <h3 
                            onClick={() => onSelectArticle(post.slug)}
                            className="text-base font-bold text-slate-900 group-hover:text-[#1e3a8a] transition-colors leading-snug cursor-pointer line-clamp-2"
                          >
                            {post.title}
                          </h3>
                          
                          <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                          <button 
                            onClick={() => onSelectArticle(post.slug)}
                            className="text-xs font-bold text-[#1e3a8a] hover:text-blue-900 flex items-center gap-1 cursor-pointer"
                          >
                            Read Full Guide 
                            <span className="group-hover:translate-x-1 transition-transform">➔</span>
                          </button>
                          
                          <div className="flex items-center gap-1">
                            {post.tags.slice(0, 2).map((tag, i) => (
                              <span key={i} className="text-[9px] bg-slate-50 text-slate-500 font-bold px-2 py-0.5 rounded border border-slate-100">
                                #{tag.replace(' ', '')}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm max-w-md mx-auto mt-8">
                <span className="text-4xl">🔍</span>
                <h4 className="font-bold text-slate-800 text-base mt-4">No advice matches your search</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Try adjusting your search terms or select an alternative category advice tab above.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2 rounded-xl mt-4 cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Quick Tips FAQ Accordion Banner */}
            <div className="mt-16 bg-white rounded-3xl border border-slate-100 shadow-sm p-8 text-left">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xl">💡</span>
                <h3 className="text-lg font-bold text-slate-900">
                  Quick Relocation Wisdom Check
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-orange-500">Why book movers 14 days in advance?</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Peak weekend dates fill up fast across Bangalore, Coimbatore, and Chennai. Pre-booking lock in current base prices and guarantees slot allocations on heavy multi-axle freight carriers.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-orange-500">What are transit insurance benefits?</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    While our packers maintain a damage-free success rate of over 99.4%, comprehensive transit insurance ensures full replacement protection against unpredictable highway accidents or weather anomalies.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

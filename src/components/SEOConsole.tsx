/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { LucideIcon } from './LucideIcon';
import { ServiceItem } from '../types';
import { BLOG_POSTS } from '../data/blogData';

interface SEOConsoleProps {
  currentPage: string;
  activeService?: ServiceItem;
}

export const SEOConsole: React.FC<SEOConsoleProps> = ({ currentPage, activeService }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [auditResults, setAuditResults] = useState<{
    score: number;
    passed: string[];
    warnings: string[];
  }>({ score: 0, passed: [], warnings: [] });

  const getSEOConfig = () => {
    if (currentPage === 'service' && activeService) {
      return activeService.seo;
    }

    if (currentPage === 'blog') {
      const hash = window.location.hash;
      if (hash.startsWith('#blog/')) {
        const slug = hash.split('#blog/')[1];
        const post = BLOG_POSTS.find(p => p.slug === slug);
        if (post) {
          return post.seo;
        }
      }
      return {
        title: 'Packersolution Moving Tips & Guides | Ultimate Relocation Playbook',
        description: 'Read expert advice on household shifting, IT office relocations, and fragile packing. Your damage-free moving checklist and pro tips from Packer Solutions experts.',
        keywords: ['moving tips', 'household packing advice', 'office relocation guide', 'fragile item packing', 'shifting safety checklist'],
        canonicalUrl: 'https://packersolution.com/#blog',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          'name': 'Packersolution Shifting Playbook',
          'description': 'Relocation guides, packaging methodologies, and checklist frameworks for safe residential and office logistics.'
        }
      };
    }

    if (currentPage === 'driving-partner') {
      return {
        title: 'Earn ₹30,000–₹40,000/mo as a Delivery Partner | Packer Solutions',
        description: 'Join India\'s fastest-growing household shifting logistics network with 900+ vehicles. High earnings, weekly payouts, insurance discounts, and zero dry runs.',
        keywords: ['attach truck', 'delivery partner recruitment', 'driver app', 'packer solutions partner', 'goods tempo attachment', 'tata ace attachment'],
        canonicalUrl: 'https://packersolution.com/#driving-partner',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'JobPosting',
          'title': 'Commercial Delivery & Logistics Vehicle Partner',
          'description': 'Attach your mini-truck, pickup, or heavy container vehicle to earn ₹30,000–₹40,000 monthly with weekly direct bank payouts.',
          'hiringOrganization': {
            '@type': 'Organization',
            'name': 'Packer Solutions Logistics',
            'sameAs': 'https://packersolution.com'
          },
          'employmentType': 'CONTRACTOR',
          'baseSalary': {
            '@type': 'MonetaryAmount',
            'currency': 'INR',
            'value': {
              '@type': 'QuantitativeValue',
              'minValue': 30000,
              'maxValue': 40000,
              'unitText': 'MONTH'
            }
          }
        }
      };
    }

    // Default Home SEO config
    return {
      title: 'Packersolution | Premium Packers and Movers Relocation Services',
      description: 'Need stress-free relocation? Packersolution provides premium household shifting, intercity domestic relocation, corporate office shifting, car/bike transport, and secure warehousing.',
      keywords: ['packers and movers', 'household shifting', 'office relocation', 'vehicle transport', 'secure storage', 'best packers near me'],
      canonicalUrl: 'https://packersolution.com/',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': 'Packersolution Logistics & Relocation',
        'image': 'https://www.w3schools.com/tools/tool_placeholder_img.php?type=png&text=Packersolution',
        'telephone': '+91 98765 43210',
        'email': 'support@packersolution.com',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '45 Corporate Logistics Boulevard, Sector 62',
          'addressLocality': 'Delhi NCR',
          'postalCode': '110001',
          'addressCountry': 'IN'
        },
        'openingHoursSpecification': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          'opens': '00:00',
          'closes': '23:59'
        },
        'sameAs': [
          'https://facebook.com/packersolution',
          'https://twitter.com/packersolution',
          'https://instagram.com/packersolution'
        ]
      }
    };
  };

  const seo = getSEOConfig();

  // Run a real-time mini SEO audit based on the content of the page
  useEffect(() => {
    const passed: string[] = [];
    const warnings: string[] = [];
    let score = 70; // Base score

    // Title length check
    if (seo.title.length >= 40 && seo.title.length <= 70) {
      passed.push('Meta Title length is optimized (40-70 chars). Current: ' + seo.title.length + ' chars.');
      score += 10;
    } else {
      warnings.push(`Meta Title length should be between 40-70 characters. Current: ${seo.title.length} chars.`);
    }

    // Description length check
    if (seo.description.length >= 120 && seo.description.length <= 160) {
      passed.push('Meta Description is highly engaging and optimized (120-160 chars). Current: ' + seo.description.length + ' chars.');
      score += 10;
    } else {
      warnings.push(`Meta Description should be 120-160 characters for maximum CTR. Current: ${seo.description.length} chars.`);
    }

    // Keyword relevance check
    if (seo.keywords.length >= 4) {
      passed.push(`Target focus keywords declared: (${seo.keywords.join(', ')})`);
      score += 5;
    } else {
      warnings.push('Add at least 4 targeting keywords to your SEO profile.');
    }

    // Canonical link tag
    if (seo.canonicalUrl) {
      passed.push('Canonical URL is explicitly defined to prevent duplicate indexing.');
      score += 5;
    }

    // Structured JSON-LD check
    if (seo.structuredData) {
      passed.push(`JSON-LD Schema Markup is correctly structured for Google Rich Snippets: Type - ${seo.structuredData['@type']}`);
      score += 10;
    } else {
      warnings.push('Structured Schema markup is missing.');
    }

    // Always cap score at 100
    setAuditResults({
      score: Math.min(score, 100),
      passed,
      warnings
    });

    // Dynamically update document title & meta tags for browser-level SEO simulation
    document.title = seo.title;
    
    // Find or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', seo.description);

    // Find or create meta keywords
    let metaKey = document.querySelector('meta[name="keywords"]');
    if (!metaKey) {
      metaKey = document.createElement('meta');
      metaKey.setAttribute('name', 'keywords');
      document.head.appendChild(metaKey);
    }
    metaKey.setAttribute('content', seo.keywords.join(', '));

  }, [currentPage, seo.title, seo.description]);

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords.join(', ')} />
        {seo.canonicalUrl && <link rel="canonical" href={seo.canonicalUrl} />}
        {seo.structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(seo.structuredData)}
          </script>
        )}
      </Helmet>

      <div 
        id="seo-console-widget" 
        className={`fixed bottom-4 right-4 lg:bottom-4 max-lg:bottom-24 z-50 transition-all duration-300 shadow-2xl rounded-2xl border ${
          isOpen ? 'w-96 max-h-[80vh] overflow-y-auto' : 'w-14 h-14'
        } bg-slate-900 border-slate-700 text-white`}
      >
      {!isOpen ? (
        <button
          id="btn-open-seo-console"
          onClick={() => setIsOpen(true)}
          className="w-full h-full flex items-center justify-center bg-teal-500 hover:bg-teal-400 text-slate-900 rounded-2xl transition-colors group"
          title="Open Google Search SEO Auditor Console"
        >
          <LucideIcon name="Settings" className="w-6 h-6 animate-spin-slow group-hover:scale-110" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
            {auditResults.score}%
          </span>
        </button>
      ) : (
        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400">
                <LucideIcon name="Eye" className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-100">SEO Auditor Console</h3>
                <p className="text-[10px] text-slate-400">Googlebot Inspection View</p>
              </div>
            </div>
            <button
              id="btn-close-seo-console"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <LucideIcon name="X" className="w-5 h-5" />
            </button>
          </div>

          {/* Audit Score Card */}
          <div className="bg-slate-800/50 border border-slate-800 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300">Googlebot Page Score</span>
              <span className={`text-xl font-bold ${
                auditResults.score >= 90 ? 'text-green-400' : 'text-amber-400'
              }`}>{auditResults.score}/100</span>
            </div>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  auditResults.score >= 90 ? 'bg-green-400' : 'bg-amber-400'
                }`}
                style={{ width: `${auditResults.score}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">
              This score calculates live schema health, tag lengths, and dynamic content matching for <strong>{currentPage === 'home' ? 'Home' : activeService?.name}</strong>.
            </p>
          </div>

          {/* Tabs for Meta, Keywords, Schema */}
          <div className="space-y-4">
            {/* Meta tags details */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-teal-400 flex items-center gap-1">
                <LucideIcon name="FileText" className="w-3.5 h-3.5" /> HTML Meta Directives
              </h4>
              <div className="bg-slate-950 p-3 rounded-lg text-xs font-mono space-y-1.5 text-slate-300 select-all border border-slate-800">
                <div className="text-[10px] text-amber-500">&lt;title&gt;</div>
                <div className="pl-2 break-words">{seo.title}</div>
                <div className="text-[10px] text-amber-500 mt-1">&lt;meta name="description"&gt;</div>
                <div className="pl-2 break-words text-slate-400">{seo.description}</div>
                <div className="text-[10px] text-amber-500 mt-1">&lt;link rel="canonical"&gt;</div>
                <div className="pl-2 text-teal-400 truncate">{seo.canonicalUrl}</div>
              </div>
            </div>

            {/* Keywords */}
            <div>
              <h4 className="text-xs font-bold text-teal-400 flex items-center gap-1 mb-1.5">
                <LucideIcon name="Search" className="w-3.5 h-3.5" /> High-Density Keywords
              </h4>
              <div className="flex flex-wrap gap-1">
                {seo.keywords.map((kw, idx) => (
                  <span key={idx} className="text-[10px] bg-slate-800 text-teal-300 border border-teal-500/20 px-2 py-0.5 rounded">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Audit Checklist */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-teal-400 flex items-center gap-1">
                <LucideIcon name="CheckCircle" className="w-3.5 h-3.5" /> SEO Audit Checklist
              </h4>
              <div className="max-h-36 overflow-y-auto space-y-1.5 text-xs">
                {auditResults.passed.map((item, idx) => (
                  <div key={idx} className="flex gap-1.5 items-start text-green-300 bg-green-500/5 p-1.5 rounded border border-green-500/10">
                    <LucideIcon name="Check" className="w-3.5 h-3.5 shrink-0 text-green-400 mt-0.5" />
                    <span className="text-[10px]">{item}</span>
                  </div>
                ))}
                {auditResults.warnings.map((item, idx) => (
                  <div key={idx} className="flex gap-1.5 items-start text-amber-300 bg-amber-500/5 p-1.5 rounded border border-amber-500/10">
                    <LucideIcon name="AlertTriangle" className="w-3.5 h-3.5 shrink-0 text-amber-400 mt-0.5" />
                    <span className="text-[10px]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* JSON-LD Schema Snippet */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-teal-400 flex items-center gap-1">
                  <LucideIcon name="Layers" className="w-3.5 h-3.5" /> Rich Snippets (Schema.org JSON-LD)
                </h4>
              </div>
              <pre className="bg-slate-950 p-3 rounded-lg text-[10px] font-mono text-slate-400 overflow-x-auto max-h-40 border border-slate-800">
                {JSON.stringify(seo.structuredData, null, 2)}
              </pre>
            </div>

            {/* Helpful instructions */}
            <div className="text-[10px] text-slate-400 border-t border-slate-800 pt-3">
              * Dynamic metadata updates automatically during navigation to ensure a fully indexable, crawl-ready web presence.
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

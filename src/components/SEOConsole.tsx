import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ServiceItem } from '../types';
import { BLOG_POSTS } from '../data/blogData';

interface SEOConsoleProps {
  currentPage: string;
  activeService?: ServiceItem;
}

export const SEOConsole: React.FC<SEOConsoleProps> = ({ currentPage, activeService }) => {
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

    if (currentPage === 'faq') {
      return {
        title: 'Packers and Movers FAQs | Shifting, Pricing & Transport Questions',
        description: 'Find answers to frequently asked questions about Packers and Movers services, household shifting, vehicle transportation, warehouse storage, insurance, and pricing.',
        keywords: ['packers and movers FAQ', 'shifting questions', 'office relocation answers', 'moving cost FAQ', 'vehicle transport FAQ', 'warehouse storage questions'],
        canonicalUrl: 'https://packersolution.com/#faq',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'name': 'Packersolution Frequently Asked Questions',
          'description': 'Comprehensive answers to common questions about house shifting, office relocation, vehicle transportation, packing, pricing, insurance, and warehouse storage in India.'
        }
      };
    }

    // Default Home SEO config
    return {
      title: 'Packersolutions | India\'s #1 Trusted Packers, Movers & Transport Network',
      description: 'Book verified house shifting, car transport, parcel delivery, truck rental & secure storage in 100+ cities with zero hidden charges & GPS tracking.',
      keywords: ['packers and movers', 'household shifting', 'office relocation', 'vehicle transport', 'secure storage', 'best packers near me'],
      canonicalUrl: 'https://packersolution.com/',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': 'Packersolution Logistics & Relocation',
        'telephone': '+91 95009-55237',
        'email': 'support@packersolution.com',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'S.F. No. 508/2, TTS Gardens, THadagam Road, Pannimadai Village, Kanuvai',
          'addressLocality': 'Coimbatore',
          'postalCode': '641108',
          'addressCountry': 'IN'
        },
        'openingHoursSpecification': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          'opens': '00:00',
          'closes': '23:59'
        }
      }
    };
  };

  const seo = getSEOConfig();

  useEffect(() => {
    // Dynamically update document title & meta tags for browser-level SEO
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

  }, [currentPage, seo.title, seo.description, seo.keywords]);

  return (
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
  );
};

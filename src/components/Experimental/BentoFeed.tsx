"use client";
import React from 'react';
import Link from 'next/link';
import { Article } from '@/data/editorial';
import { VibeBento, BentoItem } from '../Antigravity/VibeBento';
import Image from 'next/image';

interface BentoFeedProps {
  articles: Article[];
}

export default function BentoFeed({ articles }: BentoFeedProps) {
  
  const getGridClasses = (area?: string) => {
    switch (area) {
      case 'large': return 'md:col-span-2 md:row-span-2';
      case 'tall':  return 'md:col-span-1 md:row-span-2';
      case 'wide':  return 'md:col-span-2 md:row-span-1';
      default:      return 'md:col-span-1 md:row-span-1';
    }
  };

  const getSpan = (area?: string) => {
      if (area === 'large' || area === 'wide') return 2;
      return 1;
  };

  return (
    <VibeBento>
      {articles.map((article) => (
        <Link 
          key={article.id} 
          href={`/blog/${article.slug}`}
          className={`block group h-full ${getGridClasses(article.gridArea)}`}
          aria-label={`Read article: ${article.title}`}
        >
          <BentoItem 
            title={article.tag} 
            span={getSpan(article.gridArea)} 
            className="h-full hover:border-orange-500 transition-colors duration-300 overflow-hidden flex flex-col"
          >
           {/* Image Section */}
           <div className={`relative w-full overflow-hidden ${
             article.gridArea === 'large' ? 'h-64' : 'h-32'
           }`}>
             {article.image && (
                <div className="relative w-full h-full"> 
                   <div className="absolute inset-0 bg-zinc-900" />
                   <Image 
                     src={article.image} 
                     alt={article.title}
                     fill
                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                     className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                     loading="lazy"
                     quality={70}
                   />
                </div>
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-80" />
           </div>

            <div className="flex flex-col flex-grow justify-between relative z-10 p-4 -mt-8">
              <div className="flex justify-between items-start mb-2">
                 <span className="text-[10px] font-mono text-zinc-400 uppercase">
                    //{article.readTime}
                 </span>
                 {article.featured && (
                    <span className="w-2 h-2 bg-orange-500 animate-pulse rounded-full" />
                 )}
              </div>

              <div>
                <h3 className={`font-bold text-white group-hover:text-orange-500 transition-colors mb-2 ${
                   article.gridArea === 'large' ? 'text-3xl' : 'text-xl'
                }`}>
                  {article.title}
                </h3>
                <p className={`font-mono text-zinc-400 line-clamp-3 ${
                   article.gridArea === 'large' ? 'text-sm' : 'text-xs'
                }`}>
                  {article.subtitle}
                </p>
              </div>
            </div>
          </BentoItem>
        </Link>
      ))}
    </VibeBento>
  );
}

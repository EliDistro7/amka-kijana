'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Download, FileArchive as FilePresentation, ExternalLink, Calendar, Clock, User, Building2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function PresentationsTab() {
  const { language } = useLanguage();

  // Bilingual content
  const presentationsContent = {
    title: {
      en: "Presentations",
      sw: "Maonyesho"
    },
    items: {
      en: "items",
      sw: "vipengele"
    },
    item: {
      en: "item",
      sw: "kipengele"
    },
    download: {
      en: "Download",
      sw: "Pakua"
    },
    preview: {
      en: "Preview",
      sw: "Hakikisha"
    },
    noPresentation: {
      en: "No presentations available",
      sw: "Hakuna maonyesho yaliyopatikana"
    },
    checkBack: {
      en: "Check back later for updated resources.",
      sw: "Angalia baadaye kwa rasilimali zilizosasishwa."
    },
    presenter: {
      en: "Presented by:",
      sw: "Imewasilishwa na:"
    },
    organizer: {
      en: "Organized by:",
      sw: "Imeandaliwa na:"
    }
  };

  // Sample presentations data with bilingual support and contextualized headers
  const presentations = [
    {
      id: 1,
      title: {
        en: "16 Days of Activism Against Gender-Based Violence",
        sw: "Siku 16 za Uanaharakati Dhidi ya Ukatili wa Kijinsia"
      },
      description: {
        en: "Breaking the silence: How communities can take action against gender-based violence",
        sw: "Kuvunja ukimya: Jinsi jamii zinavyoweza kuchukua hatua dhidi ya ukatili wa kijinsia"
      },
      thumbnail: "/violence.jpeg",
      dateCreated: "2025-04-15",
      fileSize: "4.2 MB",
      downloadUrl: "/ukatili.pptx",
      previewUrl: "/resources/previews/strategy-overview",
      category: "Activism",
      color: "bg-red-500"
    },
    {
      id: 2,
      title: {
        en: "The Role of Men in Mental Health, Sexual, and Reproductive Health",
        sw: "Jukumu la Wanaume katika Afya ya Akili, Afya ya Ngono, na Afya ya Uzazi"
      },
      description: {
        en: "Mental health and reproductive health are interconnected. Men's mental health affects relationships, decision-making, and overall well-being.",
        sw: "Afya ya akili na afya ya uzazi zinahusiana. Afya ya akili ya wanaume huathiri mahusiano, ufanyaji maamuzi, na ustawi wa jumla."
      },
      presenter: {
        name: {
          en: "Malick B. Shekimweri",
          sw: "Malick B. Shekimweri"
        },
        title: {
          en: "Psychologist, Siha Angavu Mental Health Care & Rehabilitation",
          sw: "Mwanasaikolojia, Siha Angavu Mental Health Care & Rehabilitation"
        }
      },
      organizer: {
        en: "Akili Huru & Amka Kijana Initiative",
        sw: "Akili Huru & Mpango wa Amka Kijana"
      },
      eventDate: {
        en: "5TH–7TH March, 2025",
        sw: "Tarehe 5-7 Machi, 2025"
      },
      details: {
        en: [
          "Men are less likely to seek mental health support due to:",
          "Social stigma ('Real men don't cry')",
          "Fear of appearing weak or vulnerable",
          "Limited awareness of mental health issues",
          "Suppressing emotions can lead to:",
          "Stress and burnout",
          "Aggression and violence",
          "Substance abuse as a coping mechanism"
        ],
        sw: [
          "Wanaume mara nyingi hawatafuti msaada wa afya ya akili kwa sababu ya:",
          "Unyanyapaa wa kijamii ('Wanaume halisi hawalii')",
          "Hofu ya kuonekana dhaifu au dhaifu",
          "Uelewa mdogo wa masuala ya afya ya akili",
          "Kukandamiza hisia kunaweza kusababisha:",
          "Msongo wa mawazo na kuchoka",
          "Uchokozi na ukatili",
          "Matumizi mabaya ya dawa kama njia ya kukabiliana"
        ]
      },
      thumbnail: "/mental_health.JPG",
      dateCreated: "2025-03-10",
      fileSize: "3.8 MB",
      downloadUrl: "/men.pdf",
      previewUrl: "/resources/previews/mental-health",
      category: "Mental Health",
      color: "bg-blue-500"
    },
    {
      id: 3,
      title: {
        en: "Role of Men in Reproductive Health",
        sw: "Jukumu la Wanaume katika Afya ya Uzazi"
      },
      description: {
        en: "Empowering partners: Understanding how men can contribute to positive reproductive health outcomes",
        sw: "Kuwapa nguvu washirika: Kuelewa jinsi wanaume wanavyoweza kuchangia matokeo mazuri ya afya ya uzazi"
      },
      thumbnail: "/zoom_man.jpeg",
      dateCreated: "2025-02-08",
      fileSize: "5.6 MB",
      downloadUrl: "/man.pptx",
      previewUrl: "/resources/previews/success-stories",
      category: "Reproductive Health",
      color: "bg-green-500"
    },
  ];

  // Function to format date in a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(language === 'en' ? 'en-US' : 'sw-TZ', options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1200/400')] bg-cover bg-center opacity-10"></div>
        <div className="relative px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              {presentationsContent.title[language]}
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              {language === 'en' ? 'Explore our comprehensive collection of educational presentations' : 'Chunguza mkusanyiko wetu wa kina wa maonyesho ya kielimu'}
            </p>
            <div className="flex items-center gap-4 text-blue-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <FilePresentation size={16} />
                </div>
                <span className="text-sm font-medium">
                  {presentations.length} {presentations.length === 1 ? 
                    presentationsContent.item[language] : 
                    presentationsContent.items[language]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {presentations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {presentations.map((presentation) => (
              <div key={presentation.id} className="group relative bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 hover:-translate-y-1">
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className={`${presentation.color} text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg`}>
                    {presentation.category}
                  </div>
                </div>

                {/* Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden">
                  {presentation.thumbnail ? (
                    <Image 
                      src={presentation.thumbnail}
                      alt={presentation.title[language]}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
                      <FilePresentation size={48} className="text-primary-300" />
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Action buttons */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Link 
                      href={presentation.previewUrl} 
                      className="bg-white/90 backdrop-blur-sm text-primary-700 p-3 rounded-full hover:bg-white hover:shadow-lg transition-all duration-200 transform hover:scale-110"
                      title={presentationsContent.preview[language]}
                    >
                      <ExternalLink size={20} />
                    </Link>
                    <Link 
                      href={presentation.downloadUrl} 
                      className="bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 hover:shadow-lg transition-all duration-200 transform hover:scale-110"
                      title={presentationsContent.download[language]}
                    >
                      <Download size={20} />
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-xl text-neutral-900 mb-3 line-clamp-2 group-hover:text-primary-700 transition-colors">
                    {presentation.title[language]}
                  </h3>
                  
                  <p className="text-sm text-neutral-600 mb-4 line-clamp-3 leading-relaxed">
                    {presentation.description[language]}
                  </p>

                  {/* Event Date */}
                  {presentation.eventDate && (
                    <div className="mb-4 p-3 bg-primary-50 rounded-lg border-l-4 border-primary-400">
                      <div className="flex items-center gap-2 text-primary-700 font-medium text-sm">
                        <Calendar size={16} />
                        <span>{presentation.eventDate[language]}</span>
                      </div>
                    </div>
                  )}

                  {/* Presenter Info */}
                  {presentation.presenter && (
                    <div className="mb-4 p-3 bg-neutral-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User size={16} className="text-primary-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-900">
                            {presentation.presenter.name[language]}
                          </p>
                          <p className="text-xs text-neutral-600 mt-1">
                            {presentation.presenter.title[language]}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Organizer */}
                  {presentation.organizer && (
                    <div className="mb-4 p-3 bg-neutral-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Building2 size={16} className="text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-900">
                            {presentation.organizer[language]}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Key Points */}
                  {presentation.details && (
                    <div className="mb-4">
                      <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-400">
                        <h4 className="text-sm font-medium text-blue-900 mb-2">
                          {language === 'en' ? 'Key Points:' : 'Mambo Muhimu:'}
                        </h4>
                        <ul className="space-y-1">
                          {presentation.details[language].slice(0, 3).map((item, index) => (
                            <li key={index} className="text-xs text-blue-800 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        {presentation.details[language].length > 3 && (
                          <p className="text-xs text-blue-600 mt-2 font-medium cursor-pointer hover:underline">
                            {language === 'en' ? '+ See more details' : '+ Angalia maelezo zaidi'}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Meta Information */}
                  <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <Calendar size={14} />
                      <span>{formatDate(presentation.dateCreated)}</span>
                    </div>
                    <div className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded-full">
                      {presentation.fileSize}
                    </div>
                  </div>
                </div>

                {/* Download Footer */}
                <div className="px-6 pb-6">
                  <Link 
                    href={presentation.downloadUrl} 
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-4 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl"
                  >
                    <Download size={16} />
                    <span>{presentationsContent.download[language]}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FilePresentation size={32} className="text-neutral-400" />
              </div>
              <h3 className="text-xl font-bold text-neutral-700 mb-3">
                {presentationsContent.noPresentation[language]}
              </h3>
              <p className="text-neutral-500 leading-relaxed">
                {presentationsContent.checkBack[language]}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
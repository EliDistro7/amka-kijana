'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Download, FileArchive as FilePresentation, ExternalLink, Calendar, Clock } from 'lucide-react';
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
      downloadUrl: "/mental_health.pptx",
      previewUrl: "/resources/previews/mental-health",
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
    },
  ];

  // Function to format date in a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(language === 'en' ? 'en-US' : 'sw-TZ', options);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-heading-2 font-heading text-primary-800">{presentationsContent.title[language]}</h2>
        <div className="text-sm text-neutral-500">
          {presentations.length} {presentations.length === 1 ? 
            presentationsContent.item[language] : 
            presentationsContent.items[language]}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {presentations.map((presentation) => (
          <div key={presentation.id} className="bg-white rounded-lg border border-neutral-200 overflow-hidden transition-all hover:shadow-soft group">
            <div className="relative aspect-video bg-neutral-100">
              {/* Display the actual thumbnail image */}
              {presentation.thumbnail ? (
                <Image 
                  src={presentation.thumbnail}
                  alt={presentation.title[language]}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary-50">
                  <FilePresentation size={48} className="text-primary-300" />
                </div>
              )}

              {/* Hover actions overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <Link href={presentation.previewUrl} className="bg-white text-primary-700 p-2 rounded-full hover:bg-primary-50">
                  <ExternalLink size={18} />
                </Link>
                <Link href={presentation.downloadUrl} className="bg-white text-primary-700 p-2 rounded-full hover:bg-primary-50">
                  <Download size={18} />
                </Link>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-medium text-lg text-primary-900 mb-2">{presentation.title[language]}</h3>
              
              {/* Using description as a header/subtitle about reproductive health and mental wellness */}
              <p className="text-sm text-neutral-600 mb-4 font-semibold italic">
                {presentation.description[language]}
              </p>
              
              {/* Additional presenter and organizer information if available */}
              {presentation.presenter && (
                <div className="mb-3 text-sm">
                  <p className="text-neutral-700 font-medium">
                    {presentationsContent.presenter[language]} {presentation.presenter.name[language]}
                  </p>
                  <p className="text-neutral-600">
                    {presentation.presenter.title[language]}
                  </p>
                </div>
              )}
              
              {presentation.organizer && (
                <div className="mb-3 text-sm">
                  <p className="text-neutral-700">
                    <span className="font-medium">{presentationsContent.organizer[language]}</span> {presentation.organizer[language]}
                  </p>
                </div>
              )}
              
              {presentation.eventDate && (
                <div className="mb-3 text-sm font-medium text-primary-600">
                  {presentation.eventDate[language]}
                </div>
              )}
              
              {/* Additional details if available */}
              {presentation.details && (
                <div className="mb-4 mt-2 text-sm text-neutral-700 border-t border-neutral-200 pt-3">
                  <ul className="list-disc list-inside space-y-1">
                    {presentation.details[language].slice(0, 3).map((item, index) => (
                      <li key={index} className="text-xs">{item}</li>
                    ))}
                  </ul>
                  {presentation.details[language].length > 3 && (
                    <p className="text-xs text-primary-600 mt-1 cursor-pointer hover:underline">
                      {language === 'en' ? 'See more...' : 'Angalia zaidi...'}
                    </p>
                  )}
                </div>
              )}
              
              <div className="flex justify-between items-center text-xs text-neutral-500 mt-2">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{formatDate(presentation.dateCreated)}</span>
                </div>
                <div>{presentation.fileSize}</div>
              </div>
            </div>

            <div className="p-4 pt-0 flex justify-between">
              <Link 
                href={presentation.downloadUrl} 
                className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                <span>{presentationsContent.download[language]}</span>
                <Download size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {presentations.length === 0 && (
        <div className="text-center py-12 px-4">
          <FilePresentation size={48} className="mx-auto text-neutral-300 mb-4" />
          <h3 className="text-lg font-medium text-neutral-700 mb-2">
            {presentationsContent.noPresentation[language]}
          </h3>
          <p className="text-neutral-500">{presentationsContent.checkBack[language]}</p>
        </div>
      )}
    </div>
  );
}
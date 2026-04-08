export interface Persona {
  meta: {
    theme: string;
    title: string;
    description: string;
    whatsapp: string;
    instagram?: string;
    email?: string;
  };
  doctor: {
    displayName: string;
    crm: string;
    specialty: string;
    city: string;
    address: string;
    about: {
      formation: string;
      trajectory: string;
      experience: string;
      patientsServed: string;
    };
    differentials: string[];
    photo: string;
  };
  sections: {
    order: string[];
    hero: {
      badge: string;
      headline: string;
      highlightWord: string;
      subheadline: string;
      ctaText: string;
      secondaryCta?: { text: string; href: string };
      stats?: { value: string; label: string }[];
    };
    sinais: {
      sectionTitle: string;
      sectionSubtitle: string;
      items: { icon: string; title: string; description: string; image?: string }[];
    };
    especialidades: {
      sectionTitle: string;
      items: { icon: string; name: string; description: string }[];
    };
    diferenciais: {
      sectionTitle: string;
      items: { icon: string; title: string; description: string }[];
    };
    comoFunciona: {
      sectionTitle: string;
      steps: { number: string; title: string; description: string }[];
    };
    depoimentos: {
      sectionTitle: string;
      items: { name: string; text: string; rating: number }[];
    };
    localizacao: {
      sectionTitle: string;
      address: string;
      mapQuery: string;
      details?: string[];
    };
    faq: {
      sectionTitle: string;
      items: { question: string; answer: string }[];
    };
    videos?: {
      sectionTitle: string;
      sectionSubtitle?: string;
      items: { thumbnail: string; title: string; url: string; platform: "instagram" | "youtube" | "tiktok" }[];
    };
    estrutura?: {
      sectionTitle: string;
      sectionSubtitle: string;
      items: { image: string; title: string; description: string }[];
    };
    equipe?: {
      sectionTitle: string;
      sectionSubtitle: string;
      members: {
        name: string;
        crm: string;
        specialty: string;
        photo: string;
        tags: string[];
        description: string;
      }[];
    };
    ctaFinal: {
      headline: string;
      subheadline: string;
      ctaText: string;
    };
    footer: {
      copyright: string;
      links?: { text: string; href: string }[];
    };
  };
}

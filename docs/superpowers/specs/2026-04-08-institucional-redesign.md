# Spec: Template Institucional — Redesign

## Objetivo
Transformar o template Institucional (clínica multidisciplinar) no template mais diferenciado dos 5. Narrativa: infraestrutura → pessoas → serviços. Único template com hero escuro e seções exclusivas (Estrutura, Equipe).

## Decisões de design

- **Hierarquia:** Estrutura/equipamentos como protagonista (não o médico)
- **Hero:** Cinematic escuro com fotos flutuantes — único template dark
- **Cards de médicos:** Overlay com gradient + tags de competência, em carrossel horizontal
- **Estrutura:** Bento grid (desktop) / carrossel (mobile)
- **Paleta:** Navy + Azul vivo (paleta atual `institucional.css`, sem mudança de cores)
- **Seções removidas:** Sinais (redundante com Especialidades), Sobre (absorvido nos Diferenciais)

## Paleta (sem alteração)

```css
--color-primary: #1E3A5F;
--color-accent: #2563EB;
--color-bg: #FFFFFF;
--color-bg-alt: #F8FAFC;
--color-surface: #F1F5F9;
--color-text: #334155;
--color-text-heading: #0F172A;
--color-muted: #64748B;
--color-border: #CBD5E1;
```

Hero background (hardcoded no variant): `#0F1D2F`

## Seções em ordem

### 1. Hero — variant `cinematic` (NOVO)
- Fundo escuro `#0F1D2F`, fullscreen height (`min-h-screen` ou `min-h-[80vh]`)
- Texto centralizado: badge, headline, subheadline, 2 CTAs
- 2-3 minifotos absolutas nos cantos (equipamento, corredor, recepção) com `border-radius`, leve rotação, sombra
- Stats bar embaixo (15+ especialidades, 50k+ pacientes, 18 anos)
- Scroll indicator animado (seta ↓ com pulse)
- Sem foto de médico

### 2. Estrutura — componente `Estrutura.astro` (NOVO)
- Seção nova, não existe nos outros templates
- **Desktop:** Bento grid — 1 foto grande à esquerda (span 2 rows), 2 fotos menores à direita
- **Mobile:** Carrossel horizontal com `overflow-x: scroll` + `scroll-snap-type: x mandatory`
- Cada foto tem legenda overlay (gradient bottom → texto branco)
- Fotos: recepção, centro diagnóstico, consultório, equipamentos (geradas via Gemini)
- Título + subtítulo acima do grid
- bgColor prop pra alternância

### 3. Equipe — componente `Equipe.astro` (NOVO)
- Seção nova com carrossel horizontal
- CSS puro: `overflow-x: scroll` + `scroll-snap-type: x mandatory` + `scroll-snap-align: start`
- Peek effect: padding-right no container pra mostrar fatia do próximo card
- **Card style (overlay + tags):**
  - Foto profissional (gerada Gemini) com aspect-ratio fixo
  - Gradient overlay na parte inferior da foto
  - Nome + especialidade + CRM sobre a foto (branco)
  - Abaixo da foto: tags pill (anos de experiência, subespecialidade)
  - Breve descrição de 1 linha
- Sem autoplay — drag no desktop, swipe no mobile
- bgColor prop pra alternância

### 4. Especialidades — variant existente
- Manter variant `icon-left` ou trocar pra `grid` pra diferenciar
- Dados já existem no JSON (4 items, expandir pra 6-8 se necessário)
- bgColor prop

### 5. Diferenciais — variant `centered` + bloco institucional
- 4 diferenciais (já existem no JSON)
- Adicionar parágrafo institucional absorvendo o conteúdo do "Sobre" (formação, trajetória, experiência)
- bgColor prop

### 6-11. Seções existentes
- **ComoFunciona:** variant `cards`, sem mudança
- **Depoimentos:** variant `grid`, sem mudança
- **Localização:** padrão, bgColor pra alternância
- **FAQ:** variant `two-column` (heading esquerda + perguntas direita)
- **CTA Final:** variant `split-cta`, sem mudança
- **Footer:** variant `columns`, sem mudança

## Página `institucional/index.astro`

```astro
<Layout persona={data}>
  <Header variant="minimal" doctorName={data.doctor.displayName} whatsapp={data.meta.whatsapp} />
  <main id="main-content">
    <Hero variant="cinematic" hero={s.hero} whatsapp={data.meta.whatsapp} />
    <Estrutura estrutura={s.estrutura} />
    <Equipe equipe={s.equipe} bgColor="alt" />
    <Especialidades variant="grid" especialidades={s.especialidades} bgColor="default" />
    <Diferenciais variant="centered" diferenciais={s.diferenciais} bgColor="alt" />
    <ComoFunciona variant="cards" comoFunciona={s.comoFunciona} bgColor="default" />
    <Depoimentos variant="grid" depoimentos={s.depoimentos} bgColor="alt" />
    <Localizacao localizacao={s.localizacao} bgColor="default" />
    <FAQ variant="two-column" faq={s.faq} bgColor="alt" />
    <CTAFinal variant="split-cta" ctaFinal={s.ctaFinal} whatsapp={data.meta.whatsapp} />
  </main>
  <Footer variant="columns" footer={s.footer} doctor={data.doctor} instagram={data.meta.instagram} email={data.meta.email} />
  <WhatsAppButton whatsapp={data.meta.whatsapp} />
</Layout>
```

## Dados novos no `institucional.json`

### `sections.estrutura` (novo)
```json
{
  "sectionTitle": "Nossa Estrutura",
  "sectionSubtitle": "Tecnologia e conforto a serviço da sua saúde",
  "items": [
    { "image": "/images/institucional-recepcao.jpg", "title": "Recepção", "description": "Ambiente moderno e acolhedor" },
    { "image": "/images/institucional-laboratorio.jpg", "title": "Centro Diagnóstico", "description": "Resultados em até 24 horas" },
    { "image": "/images/institucional-consultorio.jpg", "title": "Consultórios", "description": "12 salas equipadas" },
    { "image": "/images/institucional-equipamentos.jpg", "title": "Equipamentos", "description": "Tecnologia de última geração" }
  ]
}
```

### `sections.equipe` (novo)
```json
{
  "sectionTitle": "Nossa Equipe",
  "sectionSubtitle": "Profissionais com formação nas melhores instituições do país",
  "members": [
    {
      "name": "Dr. Marcos Oliveira",
      "crm": "CRM/MG 62.341",
      "specialty": "Cardiologia",
      "photo": "/images/institucional-dr-marcos.jpg",
      "tags": ["20 anos exp.", "Ecocardiografia"],
      "description": "Especialista em diagnóstico cardiovascular e prevenção."
    },
    {
      "name": "Dra. Fernanda Lima",
      "crm": "CRM/MG 54.210",
      "specialty": "Neurologia",
      "photo": "/images/institucional-dra-fernanda.jpg",
      "tags": ["15 anos exp.", "Cefaleia"],
      "description": "Referência em tratamento de enxaqueca e doenças neurodegenerativas."
    },
    {
      "name": "Dr. Rafael Costa",
      "crm": "CRM/MG 48.879",
      "specialty": "Ortopedia",
      "photo": "/images/institucional-dr-rafael.jpg",
      "tags": ["12 anos exp.", "Coluna"],
      "description": "Cirurgião de coluna com abordagem minimamente invasiva."
    },
    {
      "name": "Dra. Juliana Mendes",
      "crm": "CRM/MG 59.102",
      "specialty": "Endocrinologia",
      "photo": "/images/institucional-dra-juliana.jpg",
      "tags": ["10 anos exp.", "Tireoide"],
      "description": "Especialista em diabetes, tireoide e distúrbios hormonais."
    },
    {
      "name": "Dr. André Bastos",
      "crm": "CRM/MG 61.445",
      "specialty": "Pediatria",
      "photo": "/images/institucional-dr-andre.jpg",
      "tags": ["18 anos exp.", "Neonatologia"],
      "description": "Pediatra com foco em desenvolvimento infantil e vacinação."
    }
  ]
}
```

## Imagens necessárias (Gemini)

### Estrutura (4 fotos)
- `institucional-recepcao.jpg` — Recepção moderna de clínica médica, clean, iluminação natural
- `institucional-laboratorio.jpg` — Laboratório com equipamentos de análise, profissional de jaleco
- `institucional-consultorio.jpg` — Consultório médico equipado, mesa, computador, maca
- `institucional-equipamentos.jpg` — Equipamento de diagnóstico por imagem (ultrassom, raio-x)

### Equipe (5 fotos)
- 5 retratos profissionais de médicos (diversidade racial/gênero), jaleco branco, fundo neutro/bokeh
- Resolução: 800x1000 (retrato 4:5)

### Hero (2-3 fotos flutuantes)
- Reutilizar fotos da Estrutura em tamanho menor ou crops específicos

## Implementação técnica

### Novo em `types.ts`
- Tipo `Estrutura` com `sectionTitle`, `sectionSubtitle`, `items[]`
- Tipo `Equipe` com `sectionTitle`, `sectionSubtitle`, `members[]`
- Adicionar ambos a `Persona["sections"]`

### CSS do carrossel (Equipe + Estrutura mobile)
```css
.carousel {
  display: flex;
  gap: 1rem;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
}
.carousel::-webkit-scrollbar { display: none; }
.carousel > * { scroll-snap-align: start; }
```

### Bento grid (Estrutura desktop)
```css
.bento-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0.5rem;
}
.bento-grid > :first-child { grid-row: 1 / -1; }
```

## Fora de escopo
- Autoplay no carrossel
- Formulário de agendamento
- Blog/artigos
- Animações complexas além de scroll indicator

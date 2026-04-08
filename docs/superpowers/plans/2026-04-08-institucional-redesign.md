# Institucional Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Institucional template into a visually distinct clinic template with dark cinematic hero, bento grid structure section, and horizontal doctor carousel.

**Architecture:** Add two new section components (Estrutura.astro, Equipe.astro) and a new Hero variant (cinematic). Update types, JSON data, and page file. Remove Sinais and Sobre sections from the page. All styling uses existing CSS custom properties from the institucional theme.

**Tech Stack:** Astro, Tailwind CSS, CSS scroll-snap (no JS libraries for carousel)

**Project root:** `C:\Dev\laender-software-ops\lp-medicos-templates`

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| Modify | `src/data/types.ts` | Add `estrutura` and `equipe` types to Persona |
| Modify | `src/data/personas/institucional.json` | Add `estrutura` and `equipe` data, expand `especialidades` to 6 items |
| Create | `src/components/sections/Estrutura.astro` | Bento grid (desktop) / carousel (mobile) for clinic infrastructure photos |
| Create | `src/components/sections/Equipe.astro` | Horizontal carousel of doctor cards with overlay + tags |
| Modify | `src/components/sections/Hero.astro` | Add `cinematic` variant |
| Modify | `src/components/sections/Especialidades.astro` | Add `bgColor` prop (missing, other components already have it) |
| Modify | `src/pages/institucional/index.astro` | Rewire page with new section order, remove Sobre/Sinais |

---

### Task 1: Update types.ts with new section types

**Files:**
- Modify: `src/data/types.ts`

- [ ] **Step 1: Add `estrutura` and `equipe` types to the Persona interface**

Open `src/data/types.ts` and add the two new optional section types inside the `sections` block. Add them after `videos` and before `ctaFinal` (around line 71). They must be optional (`?`) because other personas don't have them.

```typescript
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
```

- [ ] **Step 2: Verify the dev server still compiles**

Run: `cd "C:\Dev\laender-software-ops\lp-medicos-templates" && npx astro check 2>&1 | tail -5`
Expected: No errors related to types.ts

- [ ] **Step 3: Commit**

```bash
cd "C:\Dev\laender-software-ops\lp-medicos-templates"
git add src/data/types.ts
git commit -m "feat(institucional): add estrutura and equipe types to Persona interface"
```

---

### Task 2: Update institucional.json with new data

**Files:**
- Modify: `src/data/personas/institucional.json`

- [ ] **Step 1: Add `estrutura` section data**

Add this new key inside `sections`, after the `hero` block (after line 47 approximately). Place it before `sinais`:

```json
    "estrutura": {
      "sectionTitle": "Nossa Estrutura",
      "sectionSubtitle": "Tecnologia e conforto a serviço da sua saúde",
      "items": [
        { "image": "/images/institucional-recepcao.jpg", "title": "Recepção", "description": "Ambiente moderno e acolhedor para pacientes e acompanhantes" },
        { "image": "/images/institucional-laboratorio.jpg", "title": "Centro Diagnóstico", "description": "Exames laboratoriais e de imagem com resultados em 24h" },
        { "image": "/images/institucional-consultorio.jpg", "title": "Consultórios", "description": "12 salas equipadas com tecnologia de ponta" }
      ]
    },
```

- [ ] **Step 2: Add `equipe` section data**

Add this new key inside `sections`, after `estrutura`:

```json
    "equipe": {
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
    },
```

- [ ] **Step 3: Expand `especialidades` to 6 items**

The current `especialidades.items` has 4 items. Add 2 more to better represent a multidisciplinary clinic. Add after the existing 4 items (the `"Neurologia"` entry):

```json
        { "icon": "endocrinology", "name": "Endocrinologia", "description": "Tratamento de diabetes, tireoide e distúrbios hormonais." },
        { "icon": "pediatrics", "name": "Pediatria", "description": "Acompanhamento do desenvolvimento infantil e vacinação." }
```

- [ ] **Step 4: Update `sections.order` to reflect new layout**

Replace the current `order` array with:

```json
    "order": [
      "header", "hero", "estrutura", "equipe", "especialidades",
      "diferenciais", "comoFunciona", "depoimentos", "localizacao",
      "faq", "ctaFinal", "footer"
    ],
```

Note: `sinais` and `sobre` are removed from the order.

- [ ] **Step 5: Commit**

```bash
cd "C:\Dev\laender-software-ops\lp-medicos-templates"
git add src/data/personas/institucional.json
git commit -m "feat(institucional): add estrutura, equipe data and expand especialidades"
```

---

### Task 3: Create Estrutura.astro component

**Files:**
- Create: `src/components/sections/Estrutura.astro`

- [ ] **Step 1: Create the component**

Create `src/components/sections/Estrutura.astro` with this content:

```astro
---
import type { Persona } from "../../data/types";

interface Props {
  estrutura: NonNullable<Persona["sections"]["estrutura"]>;
  bgColor?: "default" | "alt";
}

const { estrutura, bgColor = "default" } = Astro.props;
const sectionBg = bgColor === "alt" ? "bg-[var(--color-bg-alt)]" : "bg-[var(--color-bg)]";
---

<section class:list={["py-20 md:py-28", sectionBg]} id="estrutura">
  <div class="mx-auto px-6 max-w-6xl">
    <div class="text-center mb-12">
      <p class="text-[var(--color-accent)] text-sm font-semibold uppercase tracking-widest mb-4">Estrutura</p>
      <h2 class="font-[var(--font-heading)] text-3xl md:text-4xl font-semibold text-[var(--color-text-heading)]">{estrutura.sectionTitle}</h2>
      {estrutura.sectionSubtitle && (
        <p class="text-[var(--color-muted)] mt-4 max-w-2xl mx-auto">{estrutura.sectionSubtitle}</p>
      )}
    </div>

    {/* Desktop: Bento grid (1 large left + 2 smaller right) */}
    <div class="hidden md:grid grid-cols-3 grid-rows-2 gap-3 stagger" style="height: 480px;">
      {estrutura.items.map((item, i) => (
        <div
          class:list={[
            "relative overflow-hidden group",
            i === 0 ? "col-span-2 row-span-2" : ""
          ]}
          style="border-radius: var(--radius-lg)"
        >
          <img
            src={item.image}
            alt={item.title}
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-5">
            <p class="text-white font-semibold text-lg">{item.title}</p>
            <p class="text-white/70 text-sm mt-1">{item.description}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Mobile: Horizontal carousel */}
    <div class="flex md:hidden gap-4 overflow-x-auto scroll-snap-x pb-4 -mx-6 px-6" style="-webkit-overflow-scrolling: touch; scrollbar-width: none;">
      {estrutura.items.map((item) => (
        <div
          class="relative overflow-hidden shrink-0 snap-start"
          style="width: 80vw; height: 280px; border-radius: var(--radius-lg);"
        >
          <img
            src={item.image}
            alt={item.title}
            class="w-full h-full object-cover"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-5">
            <p class="text-white font-semibold text-lg">{item.title}</p>
            <p class="text-white/70 text-sm mt-1">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .scroll-snap-x {
    scroll-snap-type: x mandatory;
  }
  .scroll-snap-x::-webkit-scrollbar {
    display: none;
  }
  .snap-start {
    scroll-snap-align: start;
  }
</style>
```

- [ ] **Step 2: Verify it compiles**

Run: `cd "C:\Dev\laender-software-ops\lp-medicos-templates" && npx astro check 2>&1 | tail -5`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
cd "C:\Dev\laender-software-ops\lp-medicos-templates"
git add src/components/sections/Estrutura.astro
git commit -m "feat(institucional): create Estrutura section with bento grid and mobile carousel"
```

---

### Task 4: Create Equipe.astro component

**Files:**
- Create: `src/components/sections/Equipe.astro`

- [ ] **Step 1: Create the component**

Create `src/components/sections/Equipe.astro` with this content:

```astro
---
import type { Persona } from "../../data/types";

interface Props {
  equipe: NonNullable<Persona["sections"]["equipe"]>;
  bgColor?: "default" | "alt";
}

const { equipe, bgColor = "default" } = Astro.props;
const sectionBg = bgColor === "alt" ? "bg-[var(--color-bg-alt)]" : "bg-[var(--color-bg)]";
---

<section class:list={["py-20 md:py-28", sectionBg]} id="equipe">
  <div class="mx-auto px-6 max-w-6xl">
    <div class="text-center mb-12">
      <p class="text-[var(--color-accent)] text-sm font-semibold uppercase tracking-widest mb-4">Equipe</p>
      <h2 class="font-[var(--font-heading)] text-3xl md:text-4xl font-semibold text-[var(--color-text-heading)]">{equipe.sectionTitle}</h2>
      {equipe.sectionSubtitle && (
        <p class="text-[var(--color-muted)] mt-4 max-w-2xl mx-auto">{equipe.sectionSubtitle}</p>
      )}
    </div>

    {/* Horizontal carousel — CSS-only scroll-snap */}
    <div class="equipe-carousel flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 md:-mx-0 md:px-0" style="-webkit-overflow-scrolling: touch; scrollbar-width: none;">
      {equipe.members.map((member) => (
        <div
          class="shrink-0 snap-start overflow-hidden group"
          style="width: 300px; border-radius: var(--radius-lg);"
        >
          {/* Photo with overlay */}
          <div class="relative h-[360px] overflow-hidden">
            <img
              src={member.photo}
              alt={member.name}
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            {/* Specialty badge */}
            <div class="absolute top-4 left-4 bg-white/15 backdrop-blur-sm px-3 py-1.5 text-white text-xs font-semibold uppercase tracking-wider" style="border-radius: var(--radius-full);">
              {member.specialty}
            </div>
            {/* Name + CRM over photo */}
            <div class="absolute bottom-4 left-4 right-4">
              <p class="text-white font-semibold text-lg leading-tight">{member.name}</p>
              <p class="text-white/70 text-xs uppercase tracking-wider mt-1">{member.specialty} · {member.crm}</p>
            </div>
          </div>

          {/* Info below photo */}
          <div class="p-5 bg-[var(--color-surface)]">
            {/* Tags */}
            <div class="flex flex-wrap gap-2 mb-3">
              {member.tags.map((tag) => (
                <span class="bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-medium px-3 py-1" style="border-radius: var(--radius-full);">
                  {tag}
                </span>
              ))}
            </div>
            <p class="text-sm text-[var(--color-muted)] leading-relaxed">{member.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .equipe-carousel {
    scroll-snap-type: x mandatory;
  }
  .equipe-carousel::-webkit-scrollbar {
    display: none;
  }
  .equipe-carousel > * {
    scroll-snap-align: start;
  }
</style>
```

- [ ] **Step 2: Verify it compiles**

Run: `cd "C:\Dev\laender-software-ops\lp-medicos-templates" && npx astro check 2>&1 | tail -5`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
cd "C:\Dev\laender-software-ops\lp-medicos-templates"
git add src/components/sections/Equipe.astro
git commit -m "feat(institucional): create Equipe carousel section with overlay cards and tags"
```

---

### Task 5: Add cinematic variant to Hero.astro

**Files:**
- Modify: `src/components/sections/Hero.astro`

- [ ] **Step 1: Add `cinematic` to the variant union type**

In `src/components/sections/Hero.astro`, change the `variant` prop type (line 8) from:

```typescript
  variant?: "split" | "centered" | "fullimage" | "split-reverse";
```

to:

```typescript
  variant?: "split" | "centered" | "fullimage" | "split-reverse" | "cinematic";
```

- [ ] **Step 2: Make `photo` optional (cinematic doesn't use a main photo)**

Change the Props interface (line 6) from:

```typescript
  photo: string;
```

to:

```typescript
  photo?: string;
```

- [ ] **Step 3: Add the cinematic variant HTML block**

Add this block at the end of the file, just before the closing of the component (before the final line). Place it after the closing `)}` of the `fullimage` variant (after line 212):

```astro
{/* ===== CINEMATIC (Institucional — dark immersive hero with floating photos) ===== */}
{variant === "cinematic" && (
  <section class="relative min-h-[85svh] flex items-center overflow-hidden" id="hero" style="background: #0F1D2F;">
    {/* Subtle grid lines */}
    <div class="pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden="true">
      <div class="absolute top-0 left-1/4 w-px h-full bg-white"></div>
      <div class="absolute top-0 left-1/2 w-px h-full bg-white"></div>
      <div class="absolute top-0 left-3/4 w-px h-full bg-white"></div>
      <div class="absolute top-1/3 left-0 w-full h-px bg-white"></div>
      <div class="absolute top-2/3 left-0 w-full h-px bg-white"></div>
    </div>

    {/* Floating photos — decorative clinic images */}
    <div class="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
      <div class="absolute bottom-24 left-8 w-28 h-20 bg-white/5 border border-white/10 overflow-hidden" style="border-radius: var(--radius-lg); transform: rotate(-3deg);">
        <img src="/images/institucional-recepcao.jpg" alt="" class="w-full h-full object-cover opacity-60" loading="eager" />
      </div>
      <div class="absolute top-24 right-12 w-32 h-24 bg-white/5 border border-white/10 overflow-hidden" style="border-radius: var(--radius-lg); transform: rotate(2deg);">
        <img src="/images/institucional-laboratorio.jpg" alt="" class="w-full h-full object-cover opacity-60" loading="eager" />
      </div>
      <div class="absolute bottom-32 right-24 w-24 h-20 bg-white/5 border border-white/10 overflow-hidden" style="border-radius: var(--radius-lg); transform: rotate(-1deg);">
        <img src="/images/institucional-consultorio.jpg" alt="" class="w-full h-full object-cover opacity-60" loading="eager" />
      </div>
    </div>

    {/* Content */}
    <div class="relative z-10 mx-auto px-6 max-w-3xl w-full text-center pt-28 pb-16 reveal">
      <p class="text-[var(--color-accent)] font-[var(--font-body)] text-sm font-semibold uppercase tracking-[0.2em] mb-6">
        {hero.badge}
      </p>
      <h1 class="font-[var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
        {hero.headline}{" "}<em class="text-[var(--color-accent)] not-italic">{hero.highlightWord}</em>
      </h1>
      <p class="text-slate-400 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
        {hero.subheadline}
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          class="btn-glow bg-[var(--color-accent)] text-white px-8 py-3.5 font-semibold text-sm text-center hover:opacity-90 transition-opacity"
          style="border-radius: var(--radius-full)"
        >
          {hero.ctaText}
        </a>
        {hero.secondaryCta && (
          <a
            href={hero.secondaryCta.href}
            class="border border-white/20 text-white px-8 py-3.5 font-semibold text-sm text-center hover:border-white/40 transition-colors"
            style="border-radius: var(--radius-full)"
          >
            {hero.secondaryCta.text}
          </a>
        )}
      </div>
    </div>

    {/* Stats bar at bottom */}
    {hero.stats && hero.stats.length > 0 && (
      <div class="absolute bottom-0 left-0 right-0 border-t border-white/10">
        <div class="mx-auto max-w-4xl grid gap-0 divide-x divide-white/10" style={`grid-template-columns: repeat(${hero.stats.length}, minmax(0, 1fr))`}>
          {hero.stats.map((stat) => (
            <div class="text-center py-6 reveal">
              <span class="font-[var(--font-heading)] text-2xl md:text-3xl font-semibold text-white"
                data-counter={parseStat(stat.value).number}
                data-prefix={parseStat(stat.value).prefix}
                data-suffix={parseStat(stat.value).suffix}
              >
                {stat.value}
              </span>
              <p class="text-slate-500 text-xs mt-1 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Scroll indicator */}
    <div class="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse">
      <span class="text-slate-500 text-[0.65rem] uppercase tracking-[0.2em]">Explorar</span>
      <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
    </div>
  </section>
)}
```

- [ ] **Step 4: Verify it compiles**

Run: `cd "C:\Dev\laender-software-ops\lp-medicos-templates" && npx astro check 2>&1 | tail -5`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
cd "C:\Dev\laender-software-ops\lp-medicos-templates"
git add src/components/sections/Hero.astro
git commit -m "feat(institucional): add cinematic hero variant with dark bg and floating photos"
```

---

### Task 6: Add bgColor prop to Especialidades.astro

**Files:**
- Modify: `src/components/sections/Especialidades.astro`

- [ ] **Step 1: Add bgColor prop**

In `src/components/sections/Especialidades.astro`, update the Props interface (lines 5-8) from:

```typescript
interface Props {
  especialidades: Persona["sections"]["especialidades"];
  variant?: "bordered" | "minimal" | "image-top" | "icon-left" | "gradient";
}
```

to:

```typescript
interface Props {
  especialidades: Persona["sections"]["especialidades"];
  variant?: "bordered" | "minimal" | "image-top" | "icon-left" | "gradient";
  bgColor?: "default" | "alt";
}
```

- [ ] **Step 2: Destructure and compute bgColor class**

Change the destructuring line (line 10) from:

```typescript
const { especialidades, variant = "bordered" } = Astro.props;
```

to:

```typescript
const { especialidades, variant = "bordered", bgColor = "default" } = Astro.props;
const sectionBg = bgColor === "alt" ? "bg-[var(--color-bg-alt)]" : "bg-[var(--color-bg)]";
```

- [ ] **Step 3: Use sectionBg in the section tag**

Change the section opening (lines 13-16) from:

```astro
<section class:list={[
  "py-20 md:py-28",
  variant === "minimal" ? "bg-[var(--color-bg)]" : "bg-[var(--color-bg)]"
]} id="especialidades">
```

to:

```astro
<section class:list={["py-20 md:py-28", sectionBg]} id="especialidades">
```

- [ ] **Step 4: Commit**

```bash
cd "C:\Dev\laender-software-ops\lp-medicos-templates"
git add src/components/sections/Especialidades.astro
git commit -m "feat(especialidades): add bgColor prop for section background alternation"
```

---

### Task 7: Rewire institucional/index.astro page

**Files:**
- Modify: `src/pages/institucional/index.astro`

- [ ] **Step 1: Replace the entire page file**

Replace all contents of `src/pages/institucional/index.astro` with:

```astro
---
import Layout from "../../layouts/Layout.astro";
import Header from "../../components/sections/Header.astro";
import Hero from "../../components/sections/Hero.astro";
import Estrutura from "../../components/sections/Estrutura.astro";
import Equipe from "../../components/sections/Equipe.astro";
import Especialidades from "../../components/sections/Especialidades.astro";
import Diferenciais from "../../components/sections/Diferenciais.astro";
import ComoFunciona from "../../components/sections/ComoFunciona.astro";
import Depoimentos from "../../components/sections/Depoimentos.astro";
import Localizacao from "../../components/sections/Localizacao.astro";
import FAQ from "../../components/sections/FAQ.astro";
import CTAFinal from "../../components/sections/CTAFinal.astro";
import Footer from "../../components/sections/Footer.astro";
import WhatsAppButton from "../../components/sections/WhatsAppButton.astro";

import persona from "../../data/personas/institucional.json";
import type { Persona } from "../../data/types";

const data = persona as Persona;
const s = data.sections;
---

<Layout persona={data}>
  <Header
    variant="minimal"
    doctorName={data.doctor.displayName}
    whatsapp={data.meta.whatsapp}
  />

  <main id="main-content">
    <Hero variant="cinematic" hero={s.hero} whatsapp={data.meta.whatsapp} />
    <Estrutura estrutura={s.estrutura!} bgColor="default" />
    <Equipe equipe={s.equipe!} bgColor="alt" />
    <Especialidades variant="icon-left" especialidades={s.especialidades} bgColor="default" />
    <Diferenciais variant="numbered" diferenciais={s.diferenciais} bgColor="alt" />
    <ComoFunciona variant="cards" comoFunciona={s.comoFunciona} bgColor="default" />
    <Depoimentos variant="grid" depoimentos={s.depoimentos} bgColor="alt" />
    <Localizacao localizacao={s.localizacao} bgColor="default" />
    <FAQ variant="two-column" faq={s.faq} bgColor="alt" />
    <CTAFinal variant="split-cta" ctaFinal={s.ctaFinal} whatsapp={data.meta.whatsapp} />
  </main>

  <Footer
    variant="columns"
    footer={s.footer}
    doctor={data.doctor}
    instagram={data.meta.instagram}
    email={data.meta.email}
  />

  <WhatsAppButton whatsapp={data.meta.whatsapp} />
</Layout>
```

Key changes from current:
- Removed: `Sobre`, `Sinais` imports and usage
- Added: `Estrutura`, `Equipe` imports and usage
- Hero: `variant="cinematic"`, no `photo` prop
- Header: `variant="minimal"` (dark hero needs non-transparent header)
- Diferenciais: changed to `variant="numbered"` (different from other templates)
- All sections have explicit `bgColor` for proper alternation
- Non-null assertions (`!`) on `estrutura` and `equipe` since they're optional in the type but guaranteed in this persona's JSON

- [ ] **Step 2: Verify the page renders without errors**

Run: `cd "C:\Dev\laender-software-ops\lp-medicos-templates" && npx astro check 2>&1 | tail -10`
Expected: No errors

Then open `http://localhost:4321/institucional` in the browser to visually verify the page loads (images will be missing placeholders for now, which is expected).

- [ ] **Step 3: Commit**

```bash
cd "C:\Dev\laender-software-ops\lp-medicos-templates"
git add src/pages/institucional/index.astro
git commit -m "feat(institucional): rewire page with cinematic hero, estrutura, equipe sections"
```

---

### Task 8: Generate placeholder images

**Files:**
- Create: Multiple files in `public/images/`

- [ ] **Step 1: Create placeholder images for structure section**

Generate 3 images via Gemini (or use placeholder solid-color images temporarily). The images needed are:

- `public/images/institucional-recepcao.jpg` — Modern clinic reception, clean white/wood design, natural light, comfortable chairs
- `public/images/institucional-laboratorio.jpg` — Clinical laboratory with analysis equipment, professional in lab coat
- `public/images/institucional-consultorio.jpg` — Equipped medical office, desk, computer, examination table

Prompt guidance for Gemini: "Professional medical clinic interior photograph, modern minimalist design, soft natural lighting, no people or only healthcare professionals from behind/side, 16:9 aspect ratio, 1200x800 resolution"

If Gemini is not available, create temporary 1200x800 solid placeholder images so the layout can be tested:

```bash
cd "C:\Dev\laender-software-ops\lp-medicos-templates"
# Use ImageMagick if available, or skip this step and use the existing doctor-institucional images as temp placeholders
```

- [ ] **Step 2: Create placeholder images for doctor carousel**

Generate 5 doctor portrait images via Gemini:

- `public/images/institucional-dr-marcos.jpg` — Male cardiologist, ~50 years old, white lab coat, professional headshot, neutral bokeh background
- `public/images/institucional-dra-fernanda.jpg` — Female neurologist, ~40 years old, Black woman, white lab coat
- `public/images/institucional-dr-rafael.jpg` — Male orthopedist, ~38 years old, white lab coat
- `public/images/institucional-dra-juliana.jpg` — Female endocrinologist, ~35 years old, white lab coat
- `public/images/institucional-dr-andre.jpg` — Male pediatrician, ~45 years old, Black man, white lab coat

Prompt guidance for Gemini: "Professional medical doctor portrait photograph, white lab coat, friendly confident expression, soft bokeh background, 4:5 aspect ratio (800x1000), studio lighting"

Diversity: mix of white and Black doctors, male and female, different ages.

- [ ] **Step 3: Commit images**

```bash
cd "C:\Dev\laender-software-ops\lp-medicos-templates"
git add public/images/institucional-*.jpg
git commit -m "feat(institucional): add placeholder images for estrutura and equipe sections"
```

---

### Task 9: Visual review and adjustments

- [ ] **Step 1: Open the page and review**

Open `http://localhost:4321/institucional` in the browser. Check each section top to bottom:

1. **Hero cinematic** — dark background, text centered, floating photos visible on desktop, stats at bottom, scroll indicator
2. **Estrutura** — bento grid on desktop (1 large + 2 small), carousel on mobile
3. **Equipe** — horizontal scroll carousel with 5 doctor cards, overlay gradient, tags
4. **Especialidades** — 6 items in grid
5. **Diferenciais** — numbered variant
6. **ComoFunciona** — cards variant
7. **Depoimentos** — grid variant
8. **Localização** — default with bgColor
9. **FAQ** — two-column variant with bgColor="alt"
10. **CTA Final** — split-cta
11. **Footer** — columns with white/70 text

- [ ] **Step 2: Fix any bgColor alternation issues**

Verify that adjacent sections alternate between `default` and `alt` backgrounds. The expected pattern:
- Hero: dark (own bg)
- Estrutura: default
- Equipe: alt
- Especialidades: default
- Diferenciais: alt
- ComoFunciona: default
- Depoimentos: alt
- Localização: default
- FAQ: alt
- CTA: own bg
- Footer: own bg (primary)

- [ ] **Step 3: Commit any adjustments**

```bash
cd "C:\Dev\laender-software-ops\lp-medicos-templates"
git add -A
git commit -m "fix(institucional): visual adjustments after review"
```

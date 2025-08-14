# Cauã Maia — Portfólio (React + TypeScript)

Interfaces que unem **precisão estética** com **clareza funcional**.

> Projeto do portfólio pessoal com animações sutis, carrossel de trabalhos, wireframe animado e suporte a **EN/PT**.

---

## ✨ Features

* **Hero** com headline, brush underline e CTAs.
* **My Work** com **Carousel** (setas, dots, snap) e **WorkCard** com efeito **tilt 3D**.
* **About** com **WireframeMedia**: wireframe de baixa fidelidade montando via animação.
* **Differentials** com cards interativos (**DiffCard**) e tilt 3D.
* **Footer** com CTA e navegação (componente **FooterLink**).
* **Particles** (canvas) em todo o site, interativas (repulsão/burst) — exceto sob o footer.
* **i18n** simples (**EN/PT**) nas seções Hero, MyWork, About, Differentials e Footer.
* **Tipografia**: Playfair Display & Inter.
* **Paleta**: `#121212` (bg), `#EBEBEB` (text), `#8A38F5` (accent), `#B9B9B9` (muted).

## 🔒 Privacidade & Acesso

* **Repositório privado**: o código e os arquivos deste projeto são **confidenciais**. Não compartilhe telas, snippets ou artefatos fora do time sem autorização.
* **Conceder acesso**: *Settings → Collaborators and teams → Add people* (defina o papel: *Read*, *Triage*, *Write* ou *Maintain*). Para organizações, prefira adicionar via **Teams**.
* **Forks/Downloads**: em repositórios privados, forks públicos não são permitidos. Evite exportar arquivos fora do Git sem necessidade.
* **Issues/PRs**: use títulos claros e marque com labels internas (ex.: `design`, `frontend`, `bug`, `enhancement`).

---

## 🧱 Stack

* **React** + **TypeScript** (CRA ou Vite, conforme setup).
* CSS modular por componente (**`styles.css`** dentro da pasta do componente/ seção).
* Ícones **inline SVG** e `react-icons` onde necessário.

---

## 📁 Estrutura

```
src/
  components/
    Button/
      index.tsx
      styles.css
    SocialLinks/
      index.tsx
      styles.css
    Tag/
      index.tsx
      styles.css
    WorkCard/
      index.tsx
      styles.css
    DiffCard/
      index.tsx
      styles.css
    Carousel/
      index.tsx
      styles.css
    WireframeMedia/
      index.tsx
      styles.css
    FooterLink/
      index.tsx
      styles.css
    Particles/
      index.tsx
      styles.css
  sections/
    Hero/
      index.tsx
      styles.css
    MyWork/
      index.tsx
      styles.css
    About/
      index.tsx
      styles.css
    Differentials/
      index.tsx
      styles.css
    Footer/
      index.tsx
      styles.css
  App.tsx
  App.css
```

> **Convenção:** use sempre **`styles.css`** (e não `style.css`).

---

## 🚀 Scripts

```
# desenvolvimento
npm start

# build de produção
npm run build

# análise de dependências (opcional)
npm audit
```

---

## 🎨 Design System

* **Fonts**: importadas no `public/index.html` via Google Fonts.
* **Cores (CSS vars)**:

  ```css
  :root{
    --bg:#121212; --text:#EBEBEB; --muted:#B9B9B9;
    --accent:#8A38F5; --accent-08: rgba(138,56,245,.08); --accent-18: rgba(138,56,245,.18);
  }
  ```
* **Botões**: `primary` (accent) e `secondary` (outline claro) já prontos.

---

## 🧩 Componentes principais

* **Button** — CTA com variantes `primary|secondary`.
* **SocialLinks** — ícones de X/LinkedIn/Instagram/GitHub.
* **Tag** — etiqueta usada nos cards de trabalho.
* **WorkCard** — imagem + título + tags com **tilt 3D**.
* **Carousel** — navegação horizontal com setas e dots.
* **DiffCard** — card com tilt e glow que segue o mouse.
* **WireframeMedia** — wireframe animado (desktop/mobile), timeline coreografada.
* **FooterLink** — link individual do footer.
* **Particles** — fundo com partículas interativas (repulsão e burst).

---

## 🌐 Internacionalização (EN/PT)

Passe a prop `locale` nas seções:

```tsx
<Hero locale={locale} />
<MyWork locale={locale} />
<About locale={locale} />
<Differentials locale={locale} />
<Footer locale={locale} />
```

Para alternar em runtime, um toggle simples no `App.tsx` atualiza o estado `locale`.

---

## ➕ Adicionando um novo trabalho

No arquivo `src/sections/MyWork/index.tsx`, adicione um item ao array `works`:

```ts
{
  title: "Nova Case",
  subtitle: "Aplicativo XYZ",
  href: "https://seulink.com",
  tags: [{ label: "Design", variant: "yellow" }, { label: "Code", variant: "yellow" }],
  // imageSrc: "/img/preview.png" (opcional)
}
```

---

## 🛠️ Dicas de Dev

* Mantenha imports relativos ou absolutos (se `baseUrl` = `src` estiver configurado).
* Evite imagens pesadas; use `object-fit: cover` nos previews.
* Efeitos 3D/tilt podem ser suavizados ajustando **MAX\_TILT** (WorkCard/DiffCard).

---

## ♿ Acessibilidade

* Contraste alto (texto claro em fundo escuro).
* Botões e links com `:focus-visible`.
* Ícones com `aria-label` nos botões sociais.
* Respeito a `prefers-reduced-motion` nas animações/partículas.

---
## 📄 Licença & Uso

Este projeto é **proprietário (All Rights Reserved)** e destinado apenas a colaboradores com permissão explícita. É proibida a redistribuição, publicação pública ou uso comercial sem autorização do autor.

> Quer abrir o código no futuro? Troque esta seção por uma licença OSS (ex.: MIT) e remova/ajuste os avisos de confidencialidade.

---

### Autor

**Cauã Maia** — UI Designer

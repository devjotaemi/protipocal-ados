# Landing pages — Catálogo + WhatsApp

Duas landing pages **mobile-first**, estáticas (HTML + CSS + JavaScript puro, **sem build e sem back-end**), pensadas para tirar os produtos do Instagram e transformá-los em um catálogo com busca/filtro e contato direto pelo WhatsApp.

| Projeto | Segmento | Local | Pasta |
|---|---|---|---|
| **JNV Imobiliária** | Imobiliária | Monte Aprazível/SP | [`jnv-imobiliaria/`](jnv-imobiliaria/) |
| **Estação Calçados** | Loja de calçados | Centro de Mirassol/SP | [`estacao-calcados/`](estacao-calcados/) |

A página [`index.html`](index.html) na raiz é um portal que leva às duas demonstrações.

---

## Como abrir

**Opção 1 — abrir direto:** dê dois cliques em `index.html` (ou no `index.html` de cada pasta). Funciona em qualquer navegador.

**Opção 2 — servidor local** (recomendado):

```bash
python -m http.server 5510
# depois acesse http://localhost:5510/
```

> As **fotos** vêm de banco de imagens (Unsplash) e as **fontes** do Google Fonts — por isso é preciso estar **online** para ver o visual completo. Todo o resto funciona offline.

---

## O que já está pronto

- Header fixo com botão **“Fale/Comprar no WhatsApp”** + botão flutuante de WhatsApp.
- Hero com chamada e (na imobiliária) busca por **operação** e **tipo**.
- Catálogo em grade com **filtros ao vivo** e contador de resultados.
- Botão por item (**“Tenho interesse” / “Comprar”**) que abre o WhatsApp com a **mensagem já preenchida**.
- Seção institucional, endereço/horário (calçados), rodapé com contato e redes.
- Responsivo (375 / 768 / 1024 / 1440px), animações suaves e acessibilidade (foco visível, `prefers-reduced-motion`, alt text).

---

## O que personalizar (dados reais)

### JNV Imobiliária — `jnv-imobiliaria/app.js`
- `WHATSAPP` → já configurado com **5517991082525** — (17) 99108‑2525.
- `LISTINGS` → lista de imóveis (título, bairro, preço, status, fotos, etc.).
- Instagram no rodapé: `jnv-imobiliaria/index.html`.

### Estação Calçados — `estacao-calcados/app.js`
- ⚠️ **`WHATSAPP` está com um número ILUSTRATIVO** (`5517999990000`). **Troque pelo número real da loja** (formato `55` + DDD + número, só dígitos).
- `PRODUCTS` → lista de calçados (nome, categoria, preço, numeração, foto).
- Confirme o **horário de funcionamento** e os links de **Instagram/Facebook** em `estacao-calcados/index.html`.

### Trocar as fotos
As imagens são URLs do Unsplash dentro dos arquivos `app.js` (campo `img`) e `index.html`. Basta substituir pelas fotos reais (URL ou arquivo local).

---

## Publicar (grátis)

Por serem sites estáticos, dá para hospedar em **GitHub Pages**, **Netlify** ou **Vercel** arrastando a pasta. Sugestão: um subdomínio/deploy por loja.

---

_Páginas demonstrativas — imagens ilustrativas de banco de imagens._

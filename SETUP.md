# 🚀 Guia de Setup — VCT Simulator no Supabase

## 1. Criar conta e projeto no Supabase

1. Acesse https://supabase.com e clique em **Start your project**
2. Crie uma conta (pode usar GitHub)
3. Clique em **New project**
4. Escolha um nome (ex: `vct-simulator`) e uma senha forte para o banco
5. Selecione a região **South America (São Paulo)**
6. Aguarde ~2 minutos enquanto o projeto é criado

---

## 2. Criar a tabela no banco

1. No menu lateral clique em **SQL Editor**
2. Cole e execute o seguinte SQL:

```sql
-- Tabela principal de dados do simulador
create table simulator_data (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz default now()
);

-- Permite leitura e escrita sem autenticação (uso pessoal)
alter table simulator_data enable row level security;

create policy "allow_all" on simulator_data
  for all using (true) with check (true);
```

---

## 3. Pegar as credenciais

1. No menu lateral clique em **Project Settings** > **API**
2. Copie:
   - **Project URL** → ex: `https://xyzxyz.supabase.co`
   - **anon public** key (em "Project API keys")

---

## 4. Colar as credenciais no db.js

Abra o arquivo `db.js` e substitua:

```javascript
const SUPABASE_URL = 'https://SEU_PROJETO.supabase.co';
const SUPABASE_KEY = 'SUA_ANON_KEY';
```

Pelos valores reais que você copiou.

---

## 5. Hospedar os arquivos

### Opção A — Vercel (recomendado, gratuito)
1. Acesse https://vercel.com e crie uma conta
2. Faça upload da pasta pelo botão **Add New > Project > drag & drop**
3. Clique em **Deploy** — pronto!

### Opção B — Netlify (alternativa)
1. Acesse https://netlify.com
2. Arraste a pasta para a área de deploy
3. Receberá uma URL em segundos

### Opção C — Localmente
Abra os arquivos num servidor local (ex: extensão **Live Server** no VS Code)
> ⚠️ Não abre direto no browser via `file://` — precisa de servidor por causa dos módulos ES

---

## 6. Estrutura dos arquivos

```
📁 vct-simulator/
├── db.js                            ← Adapter Supabase + fallback offline
├── navbar.js                        ← Navbar injetada em todas as páginas
├── tl_trofeus.html                  ← 🏠 Página inicial (sala de troféus)
├── calibracao.html                  ← ⚙️ Calibração de ELO
├── kickoff.html                     ← 🎯 Kickoff regional
├── masters.html                     ← ⚔️ Masters internacional
└── Champion_MSI_CAREER_EDITION.html ← 🏆 Torneio principal
```

---

## Como funciona o modo offline

| Situação | Comportamento |
|---|---|
| 🟢 **Online** | Dados salvos no Supabase em tempo real |
| 🔴 **Sem internet** | Funciona com localStorage, fila as escritas |
| 🔄 **Volta online** | Sincroniza automaticamente tudo que ficou na fila |

O indicador aparece no canto direito da navbar em todas as páginas.

---

## Dica: Ver seus dados no Supabase

Acesse **Table Editor > simulator_data** no painel do Supabase para ver todos os dados salvos em tempo real.

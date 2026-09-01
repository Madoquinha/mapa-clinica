# 📌 Sistema de Gestão, Mapeamento e Manutenção de Ativos de TI

<p align="center">
  <img src="https://img.shields.io/badge/Status-Concluído-success?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Frontend-HTML5%20%7C%20CSS3%20%7C%20JS-blue?style=for-the-badge" alt="Frontend" />
  <img src="https://img.shields.io/badge/Backend-PHP-777bb4?style=for-the-badge" alt="Backend" />
  <img src="https://img.shields.io/badge/Maps-Leaflet.js-green?style=for-the-badge" alt="Leaflet" />
</p>

Aplicação web completa para **gestão patrimonial visual, rastreamento físico de equipamentos e controle de manutenções de TI**, projetada para clínicas, hospitais e escritórios com múltiplos pavimentos e salas.

---

## 🚀 Funcionalidades Principais

### 🗺️ 1. Mapeamento Visual Interativo (Leaflet.js)
* **Plantas por Pavimento:** Suporte a múltiplos pisos (*Subsolo, Térreo, Piso 1 e Piso 2*) usando sistema de coordenadas planas (`CRS.Simple`).
* **Delimitação de Salas:** Cada sala possui formato poligonal com identificação em tempo real.
* **Arrastar e Soltar (*Drag-and-Drop*):** Mova qualquer equipamento de sala ou piso arrastando o ícone diretamente no mapa. O sistema detecta automaticamente a nova sala com base no polígono.
* **Tamanho Adaptativo por Zoom:** Os ícones encolhem e crescem proporcionalmente ao zoom para não poluir o mapa.
* **✨ Organização Automática em Grade:** Botão para espalhar uniformemente os equipamentos de uma sala em linhas e colunas, evitando ícones amontoados.

### 🏷️ 2. Ícones e Categorias Distintas
* 💻 **Computadores / Notebooks:** Ícone de unidade/gabinete em Azul (`#2980b9`).
* 🖥️ **Monitores:** Ícone de tela em Roxo (`#8e44ad`).
* 🖨️ **Impressoras:** Ícone de impressora em Laranja (`#e67e22`).
* ⚡ **Nobreaks / Energia:** Ícone de energia em Âmbar (`#d35400`).

### 🔧 3. Controle de Manutenção e Reparos
* **Aba Dedicada de Manutenção:** Registro de envio de equipamentos para conserto (Nobreaks com bateria viciada, impressoras, etc.).
* **Registro Completo:** Armazena data de envio, assistência técnica de destino, suposto problema declarado e status.
* **Retorno e Solução:** Modal para registrar a data de volta, o serviço realizado e a nova sala de destino.
* **Destaque Visual:** Equipamentos em reparo recebem a tag `🔧 Em Manutenção` no sistema.

### 📜 4. Auditoria e Histórico Geral de Modificações
* Registro automático de **todas as ações** com data/hora e usuário responsável:
  * Movimentações entre salas/pisos.
  * Novos cadastros e edições cadastrais.
  * Envios e retornos de manutenção.
  * Exclusões.
* Campo de busca e filtro no histórico.

### 🌙 5. Modo Escuro (Navy Dark Mode)
* Interface com alternador entre **Modo Claro** e **Modo Escuro (Azul Noturno Profundo)**.
* Persistência de preferência salva automaticamente no navegador.

### 🔄 6. Sincronização Centralizada em Rede (PHP + JSON)
* **API REST em PHP (`api.php`):** Todos os usuários que acessam o link compartilham a mesma base de dados em tempo real.
* **Indicador de Conexão:** Badge no topo informando o status de sincronização com o servidor.

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:**
  * HTML5 Semântico
  * CSS3 Moderno (Variáveis CSS, Flexbox, CSS Grid)
  * JavaScript Vanilla (ES6+, Fetch API, Async/Await)
  * [Leaflet.js v1.9.4](https://leafletjs.com/) (Mapeamento Cartesiano)
  * [Font Awesome 6.4.0](https://fontawesome.com/) (Ícones)
* **Backend:**
  * PHP 7.x / 8.x
  * Armazenamento estruturado em JSON (`dados_inventario.json`) com lock de concorrência

---

## 📦 Como Executar o Projeto Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Madoquinha/mapa-clinica.git
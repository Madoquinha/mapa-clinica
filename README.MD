🗺️ Sistema de Mapeamento Interativo da Clínica (Leaflet.js)
Sistema de gerenciamento e visualização de mapa vetorizado interativo para localização de salas, consultórios, exames e setores da clínica, divididos por pavimentos (Térreo, Piso 1, etc.).

📋 Sumário
Tecnologias Utilizadas

Estrutura do Projeto

Pré-requisitos

Execução Local no VS Code

Publicação e Versionamento (Git/GitHub)

Guia de Deploy no Servidor Local (TI)

Opção A: Windows Server (IIS / PowerShell)

Opção B: Linux Server (Nginx)

Opção C: Docker Container

Manutenção: Adicionar ou Editar Salas

Configuração de DNS Interno (Rede Local)

🛠️ Tecnologias Utilizadas
HTML5 — Estrutura da aplicação.

CSS3 — Customização de layout, marcações e responsividade.

JavaScript (ES6+) — Lógica de controle de camadas e array dinâmico de salas.

Leaflet.js v1.9.4 — Framework open-source para manipulação de mapas 2D.

📁 Estrutura do Projeto
Plaintext
mapa-clinica/
│
├── index.html       # Interface principal e chamadas de scripts
├── script.js        # Lógica do Leaflet, coordenadas e array 'salas'
├── style.css        # Estilização visual da página
├── Dockerfile       # Instruções para conteinerização da aplicação
└── README.md        # Documentação completa do sistema
🔑 Pré-requisitos
Editor VS Code instalado.

Git instalado na máquina (https://git-scm.com/).

Navegador web moderno (Chrome, Edge, Firefox).

🚀 Execução Local no VS Code
Para visualizar e testar o projeto localmente no VS Code:

Opção 1: Via Extensão Live Server (Recomendado)
No VS Code, vá na aba de Extensões (Ctrl + Shift + X).

Procure por Live Server (por Ritwick Dey) e clique em Instalar.

Abra o arquivo index.html.

Clique com o botão direito no código e escolha Open with Live Server (ou clique em Go Live no canto inferior direito).

Opção 2: Via Terminal Integrado (Python)
Abra o terminal integrado do VS Code (Ctrl + ') e rode:

Bash
python -m http.server 8000
Acesse no navegador: http://localhost:8000

Opção 3: Via Terminal Integrado (Node.js)
Bash
npx http-server -p 8080
Acesse no navegador: http://localhost:8080

🐙 Publicação e Versionamento (Git/GitHub)
Comandos para enviar o projeto ao repositório do GitHub:

Bash
# 1. Inicializar o repositório local
git init

# 2. Adicionar os arquivos alterados
git add .

# 3. Criar a mensagem de commit
git commit -m "Commit inicial: Mapa interativo completo"

# 4. Definir a branch principal
git branch -M main

# 5. Vincular ao repositório no GitHub (caso não esteja vinculado)
git remote add origin https://github.com/Madoquinha/mapa-clinica.git

# 6. Enviar os arquivos para o GitHub
git push -u origin main
🖥️ Guia de Deploy no Servidor Local (TI)
Instruções para a equipe de TI hospedar a aplicação na rede interna da clínica para acesso 24/7.

Opção A: Windows Server (IIS / PowerShell)
Abra o PowerShell como Administrador no servidor Windows:

PowerShell
# 1. Instalar a funcionalidade do IIS (caso não esteja ativa)
Install-WindowsFeature -name Web-Server -IncludeManagementTools

# 2. Criar a pasta da aplicação no diretório do IIS
New-Item -Path "C:\inetpub\wwwroot\mapa" -ItemType Directory -Force

# 3. Copiar os arquivos do projeto para a pasta do IIS
Copy-Item -Path "C:\caminho-do-projeto\*" -Destination "C:\inetpub\wwwroot\mapa" -Recurse -Force

# 4. Liberar a Porta 80 no Firewall do Windows
New-NetFirewallRule -DisplayName "HTTP - Mapa Clinica (Porta 80)" -Direction Inbound -LocalPort 80 -Protocol TCP -Action Allow

# 5. Reiniciar o serviço do IIS
iisreset
📍 Acesso na Rede Local: http://<IP_DO_SERVIDOR_WINDOWS>/mapa

Opção B: Linux Server (Ubuntu/Debian com Nginx)
No terminal do servidor Linux:

Bash
# 1. Atualizar o sistema e instalar o Nginx/Git
sudo apt update && sudo apt install nginx git -y

# 2. Clonar o projeto na pasta web
sudo git clone https://github.com/Madoquinha/mapa-clinica.git /var/www/html/mapa

# 3. Ajustar permissões de leitura
sudo chown -R www-data:www-data /var/www/html/mapa
sudo chmod -R 755 /var/www/html/mapa

# 4. Liberar porta no Firewall e reiniciar Nginx
sudo ufw allow 'Nginx HTTP'
sudo systemctl restart nginx
📍 Acesso na Rede Local: http://<IP_DO_SERVIDOR_LINUX>/mapa

Opção C: Docker Container
1. Arquivo Dockerfile na raiz do projeto:
Dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
2. Comandos no Terminal:
Bash
# Construir a imagem Docker
docker build -t mapa-clinica:latest .

# Executar o container em segundo plano
docker run -d \
  --name container-mapa-clinica \
  --restart always \
  -p 8080:80 \
  mapa-clinica:latest
📍 Acesso na Rede Local: http://<IP_DO_SERVIDOR>:8080

✏️ Manutenção: Adicionar ou Editar Salas
Todas as posições e polígonos das salas ficam cadastrados no arquivo script.js.

Padrão para cadastrar uma nova sala:
JavaScript
salas.push({
    nome: "Nome do Consultório / Setor",
    piso: "Térreo", // Opções: "Térreo", "Piso 1"
    poligono: L.polygon([
        [Y1, X1], // Canto Superior Esquerdo
        [Y2, X2], // Canto Superior Direito
        [Y3, X3], // Canto Inferior Direito
        [Y4, X4]  // Canto Inferior Esquerdo
    ], {
        color: '#2c3e50',      // Cor da linha de borda (Hexadecimal)
        fillColor: '#34495e',  // Cor do preenchimento interior (Hexadecimal)
        fillOpacity: 0.3       // Opacidade (0.0 a 1.0)
    }).addTo(camadaTerreo)     // Ou camadaPiso1
});
🌐 Configuração de DNS Interno (Rede Local)
Para facilitar o acesso dos funcionários sem precisar memorizar IPs, a equipe de TI pode adicionar um registro no servidor DNS local:

Tipo de Registro: A ou CNAME

Nome Host: mapa.clinica.local (ou http://mapa/)

Destino: <IP_DO_SERVIDOR_ONDE_FOI_HOSPEDADO>

📄 Licença
Projeto de uso interno e exclusivo da clínica. Todos os direitos reservados.
# 🌌 CosmoBirth - NASA APOD Journey

Uma experiência imersiva para descobrir qual segredo o universo revelou no dia do seu nascimento, utilizando a API **Astronomy Picture of the Day (APOD)** da NASA.

## 🚀 Como Iniciar

Siga os passos abaixo para rodar o projeto localmente.

### 1. Preparar o Backend (Python)

Abra o seu terminal na pasta `BACKEND` e execute os seguintes comandos:

**Ativar o Ambiente Virtual:**
```powershell
# No Windows PowerShell
.\venv\Scripts\activate
```
*Caso receba um erro de permissão, execute: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`*

**Instalar Dependências:**
```powershell
# Certifique-se de que o venv está ativado antes de rodar:
pip install -r requirements.txt
```


**Configurar a API Key:**
1. No arquivo `.env` dentro da pasta `BACKEND`, insira sua chave da NASA:
   ```env
   NASA_API_KEY=SUA_CHAVE_AQUI
   ```
   *Se não tiver uma, o site funcionará com uma `DEMO_KEY` limitada.*

**Iniciar o Servidor:**
```powershell
python app.py
```
O servidor estará rodando em `http://localhost:5000`.

---

### 2. Iniciar o Frontend

Com o backend rodando:

1. Navegue até a pasta `FRONTEND`.
2. Abra o arquivo `index.html` em qualquer navegador moderno.

---

## 🎨 Design System: Deep Nebula
- **Paleta**: Obsidian, Deep Violet e Cyber Lime (`#d4ff3f`).
- **Fontes**: *Space Grotesk* (Títulos) e *Inter* (Corpo).
- **Tecnologias**: HTML5, CSS3 (Advanced Mesh Gradients), JavaScript (Async/Await).

---

## 🛠️ Solução de Problemas
- **Tela de Carregamento Infinita**: Certifique-se de que o backend (`app.py`) está rodando antes de buscar uma data.
- **Erro de CORS**: O backend já está configurado para aceitar requisições locais, mas certifique-se de que a porta `5000` está livre.
- **Acesso Direto ao Backend no Navegador (Erro 404)**: A porta `5000` exibe apenas as respostas da API de dados (ex: `/api/apod`). Se referências como `http://localhost:5000/nasadata` retornarem `404 Not Found`, lembre-se de que a página visual não mora lá. 
- **Ver a Interface do Frontend (Recomendado)**: Caso não consiga abrir o `index.html` diretamente por restrição a arquivos locais (`file:///`), inicie um servidor dentro da pasta `FRONTEND`:
  ```powershell
  cd FRONTEND
  python -m http.server 8080
  ```
  Agora acesse `http://localhost:8080` para desfrutar da experiência do CosmoBirth!

# Carimbo Rede Externa - TX/RX Física

Sistema web para configuração de rede externa de telecomunicações, especializado em carimbos TX/RX físicos.

## 📋 Funcionalidades

- **Interface Moderna**: Design responsivo com Bootstrap 5
- **Gestão de Técnicos**: Cadastro e seleção de técnicos
- **Gestão de Sites**: Cadastro de Ponta A e Ponta B
- **Configuração TX/RX**: Fibras, DGO, Indoor FILA e Indoor BT
- **Geração de Carimbos**: Formato padronizado para telecomunicações
- **Persistência Local**: Auto-salvamento no navegador
- **Afetação**: Controle de backbone e causas

## 🚀 Tecnologias

- **Backend**: Python 3.11 + Flask
- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **UI Framework**: Bootstrap 5.3.0
- **Banco de Dados**: PostgreSQL + SQLAlchemy
- **Servidor**: Gunicorn

## 📦 Instalação

### Pré-requisitos
- Python 3.11+
- PostgreSQL

### Instalação Local

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/carimbo-rede-externa.git
cd carimbo-rede-externa
```

2. Instale as dependências:
```bash
pip install -r requirements.txt
```

3. Configure o banco de dados:
```bash
export DATABASE_URL="postgresql://usuario:senha@localhost/carimbo_db"
export SESSION_SECRET="sua-chave-secreta-aqui"
```

4. Execute a aplicação:
```bash
python main.py
```

5. Acesse: `http://localhost:5000`

## 🐳 Deploy com Docker

```bash
# Build da imagem
docker build -t carimbo-rede-externa .

# Executar container
docker run -p 5000:5000 \
  -e DATABASE_URL="sua-url-do-banco" \
  -e SESSION_SECRET="sua-chave-secreta" \
  carimbo-rede-externa
```

## 📁 Estrutura do Projeto

```
carimbo-rede-externa/
├── app.py              # Configuração Flask
├── main.py             # Ponto de entrada
├── templates/
│   └── index.html      # Interface principal
├── static/
│   ├── style.css       # Estilos modernos
│   └── script.js       # Lógica JavaScript
├── pyproject.toml      # Dependências Python
└── README.md          # Documentação
```

## 🎯 Como Usar

1. **Configurar TA**: Insira o número do TA
2. **Selecionar Rede**: Escolha VIVO1 ou VIVO2
3. **Configurar Pontas**: 
   - Ponta B: Site, TX/RX física e potência
   - Ponta A: Site, TX/RX física e potência
4. **Afetação**: Configure backbone e causa
5. **Gerar Carimbo**: Clique em "Gerar Carimbo" para criar o formato padronizado

## 🔧 Configuração

### Variáveis de Ambiente

- `DATABASE_URL`: URL de conexão PostgreSQL
- `SESSION_SECRET`: Chave secreta para sessões Flask
- `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`: Configurações do banco

### Formato do Carimbo

```
CARIMBO REDE EXTERNA                                                 =================================
    
    
TA: 64345

REDE: ( ) VIVO1 ( X ) VIVO2

Ponta B: SC_EF3
POSIÇÕES SALA DE TRANSMISSÃO/DGO:
TX: ARMARIO/DGO01/F01     TX: 66
RX: FL01/BT01/MOD06/F01     RX: Iiy

Ponta A: SC_Z55
POSIÇÕES SALA DE TRANSMISSÃO/DGO:
TX: FL01/BT01/MOD07/F01     TX: 55
RX: FLA/MOD06/F01     RX: 876

Afetação:
Backbone: (X) Regional ( ) Nacional
Causa: (X) Rompimento ( ) Atenuação
Nome do equipamento: Metro Ethernet
Técnico: Alexandre
Contato: 45677
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte técnico ou dúvidas sobre o sistema, abra uma issue no GitHub.
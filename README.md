# 🚀 ApiGerenciadorDeTarefas

Uma API RESTful para gerenciamento de tarefas, equipes e usuários, desenvolvida com Node.js, Express, Prisma ORM e autenticação JWT.

<br>

## ✨ Funcionalidades

- **Autenticação JWT**: Login seguro com geração de token.
- **Gestão de Usuários**: Cadastro, listagem paginada, papéis (`admin` e `member`).
- **Gestão de Equipes**: Criação, atualização, remoção e associação de membros.
- **Gestão de Tarefas**: CRUD completo, atribuição a usuários e equipes, prioridade e status.
- **Histórico de Tarefas**: Registro de mudanças de status.
- **Paginação**: Listagens paginadas para usuários e equipes.
- **Validações**: Uso do Zod para validação de dados.
- **Controle de Acesso**: Middlewares para autenticação e autorização por papel.
- **Testes Automatizados**: Testes com Jest e Supertest.

<br>

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [Zod](https://zod.dev/)
- [Jest](https://jestjs.io/) + [Supertest](https://github.com/ladjs/supertest)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)

<br>

## 📦 Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Fel1324/ApiGerenciadorDeTarefas.git
   cd ApiGerenciadorDeTarefas
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o ambiente:**
   Crie um arquivo `.env` na raiz com as variáveis:
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gerenciadortarefas?schema=public"
   JWT_SECRET="sua_chave_secreta"
   PORT=3333
   ```

4. **Suba o banco de dados com Docker**

   ```bash
   docker-compose up -d ou docker compose up -d
   ```

5. **Execute as migrations do Prisma**

   ```bash
   npx prisma migrate deploy
   ```

6. **Rode o servidor em modo desenvolvimento**

   ```bash
   npm run dev
   ```

O servidor estará disponível em [http://localhost:3333](http://localhost:3333).

<br>

## 🧪 Rodando os testes

```bash
npm run test:dev
```

<br>

## 🧩 Estrutura de Pastas

```
prisma/
  migrations/
  schema.prisma
src/
  configs/
  controllers/
  database/
  middlewares/
  routes/
  tests
  types/
  utils/
```

<br>

## 🔒 Autenticação & Autorização

- **Login:** `POST /sessions`  
  Retorna token JWT.
- **Rotas protegidas:** Use o token no header `Authorization: Bearer <token>`.
- **Papéis:**  
  - `admin`: acesso total.
  - `member`: acesso restrito.

<br>

## 📚 Principais Endpoints

### Usuários

- `POST /users` — Cria usuário
- `GET /users` — Lista todos os usuários (apenas admin, paginado)

### Sessões

- `POST /sessions` — Login

### Equipes

(Rotas restritas, somente admin)

- `POST /teams` — Cria equipe
- `GET /teams` — Lista todas as equipes (paginado)
- `PUT /teams/:id` — Atualiza equipe
- `DELETE /teams/:id` — Remove equipe (se não houver membros/tarefas)

### Membros de Equipe

(Rotas restritas, somente admin)

- `POST /team-members` — Adiciona usuário à equipe
- `DELETE /team-members/:user_id/:team_id` — Remove usuário da equipe

### Tarefas

(Rotas restritas, somente admin)

- `POST /tasks` — Cria tarefa
- `GET /tasks` — Lista todas as tarefas (filtros por status/prioridade)
- `PUT /tasks/:id` — Atualiza tarefa
- `DELETE /tasks/:id` — Remove tarefa

### Tarefas por Equipe

- `GET /team-tasks` — Lista tarefas das equipes do usuário

### Histórico de Tarefas

- `POST /task-history` — Cria histórico de alteração de status das próprias tarefas

<br>


## ⚠️ Tratamento de Erros

- Erros de validação retornam status 400 e detalhes.
- Erros de autenticação/autorização retornam status 401.
- Erros de negócio (ex: usuário já existe) retornam status 400 ou 404.

<br>

## 📝 Exemplos de Requisições

### Criar Usuário

```http
POST /users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "role": "member"
}
```

### Login

```http
POST /sessions
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "senha123"
}
```

<br>

## 👨‍💻 Desenvolvedor do Projeto

- Rafael Roberto de Oliveira

<br>

## 💡 Contribuidor

- [Gabriel José de Oliveira](https://github.com/gaoliveira21)

<br>

## 📄 Licença

Este projeto está sob a licença MIT.

<br>

> Feito com ♥ by Rocketseat :wave: [Participe da nossa comunidade!](https://discord.gg/rocketseat)
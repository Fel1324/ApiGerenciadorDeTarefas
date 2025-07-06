### Funcionalidades da aplicação

**Autenticação e Autorização:**

- Deve ser possível criar uma conta (Cadastro de usuário) e iniciar uma sessão (Login de usuário). [X]
- JWT para autenticação. (retornar token de autenticação) [X]
- Níveis de acesso: (autorização)
    - **Administrador**: gerencia usuários e equipes. (admin)
    - **Membro**: gerencia tarefas atribuídas. (member)

- Duas roles: admin e member [X]

**Gerenciamento de Times:**

- Apenas o usuário admin pode criar e editar times. (Rota teams)
- Apenas o usuário admin pode adicionar ou remover membros do time. (Rota team_members)
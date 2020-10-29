# NODE-API
> Simples API RESTful desenvolvida com NodeJS.

## Overview
Uma simples API com arquitetura REST desenvolvida utilizando NodeJS e Express.

### Endpoints
- POST `/auth/register` - Registar novo usuário 
- POST `/auth/authenticate` - Autenticação de usuário
- POST `/auth/forgot_password` - Recuperação de senha
- POST `/auth/reset_password` - Alteração de senha
- POST `/projects/` - Criar novo projeto
- GET `/projects/` - Listar todos os projeto
- GET `/projects/:projectId` - Mostrar projeto
- PUT `/projects/:projectId` - Editar projeto
- DELETE `/projects/:projectId` - Deletar projeto


## Next Level
- [X] Banco de dados MongoDB com Mongoose.
- [X] Autenticação com JWT.
- [X] Recuperação de e-mail com NodeMail.
- [ ] Upload de arquivos com Multer.
- [ ] Refator código para TypeScript.

## License
[MIT](./LICENSE) &copy; [Lucas Becker](https://lucasbecker.github.io)
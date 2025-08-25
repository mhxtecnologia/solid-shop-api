<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
# node v22.18.0
# npm v10.9.3
$ npm install
```

```bash
# TESTES pasta "_backup"

# BANCO DE DADOS: stefanini-shop.backup
# POSTMAN: STEFANINI-SHOP.postman_collection.json

# ou

# criar banco de dados postgresql com nome: 'stefanini-shop'
# criar banco de dados postgresql para TDD com nome: 'stefanini-shop-test'

# run:
$ npx prisma db create
$ npx prisma migrate deploy
$ npx prisma generate

```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

---

Aplicação:

SOLID como princípios de design de software orientado a objetos

• SRP: Cada arquivo/módulo tem uma responsabilidade única.

• OCP: Para adicionar um novo use-case, você só cria um novo arquivo.

• LSP: Se você implementar uma nova versão do repositório, pode ser usada no lugar da antiga.

• ISP: Repositórios definidos com interfaces específicas para o que cada camada precisa.

• DIP: Casos de uso dependem de interfaces (não implementações).

---

Clean Architecture, Design Desacoplado por Robert C. Martin:

         [ENTIDADES]
              ↓
        [CASOS DE USO]
              ↓

[INTERFACES / GATEWAYS / ADAPTERS]
↓
[FRAMEWORKS & DRIVERS]

• Tornar o negócio independente de frameworks, bancos de dados ou UIs

• Dependem de abstrações

• "Abstrações não devem depender de detalhes, mas detalhes devem depender de abstrações.

• Facilitar testes, manutenções e evoluções

• Forçar o código a obedecer ao DIP (Inversão de Dependência)

• Centralizar as regras de negócio na aplicação

---

FUNÇÕES E REGRAS A SEREM SEGUIDAS NO PROJETO:

• app: Application Layer

Função: Contém os casos de uso do sistema, que representam ações ou operações que o sistema pode realizar.

Regra: Deve conter apenas lógica de orquestração da aplicação, sem detalhes de infraestrutura ou framework.

Exemplo: Criar usuário, buscar usuário, atualizar dados.

    • use-cases/:
        Define as classes/funções que implementam essas operações, por exemplo:
        create-user.use-case.ts → lógica para criar um usuário.
        find-user.use-case.ts → lógica para buscar usuário.

    • dtos/ (Data Transfer Objects):
        Objetos que definem a estrutura dos dados que serão recebidos ou enviados nas operações (validação, tipagem).
        Exemplo: create-user.dto.ts define os campos esperados para criar um usuário.

---

• domain/ — Domain Layer

Função: Representa o coração do sistema, a lógica de negócio pura e independente de tecnologia.

Regra: Não deve conhecer nada sobre banco, web, frameworks. É totalmente agnóstico.

    • entities/:
        Define as entidades do domínio, que têm identidade própria e regras específicas.
        Exemplo: user.entity.ts define a estrutura e comportamento do usuário.

    • repositories/:
        Contém as interfaces (contratos) que descrevem as operações que os repositórios devem implementar.
        Exemplo: user.repository.ts define métodos como findById(), save(), mas sem implementação.

    • value-objects/:
        Representa objetos que não têm identidade própria, mas têm regras específicas, como email, CPF, telefone.
        Exemplo: email.vo.ts pode conter validações para o formato de email.

---

• infra/ — Infrastructure Layer

Função: Implementa os detalhes técnicos que suportam o domínio e a aplicação.

Regra: Pode ter dependências externas (ORM, banco, framework HTTP).

    • repositories/:
        Implementações concretas das interfaces de repositórios.
        Exemplo: user-prisma.repository.ts implementa user.repository.ts usando Prisma para acesso ao banco.

    • controllers/:
        Controladores responsáveis por receber requisições HTTP e chamar os casos de uso.
        Exemplo: user.controller.ts expõe endpoints REST.

    • services/:
        Serviços específicos da infraestrutura, por exemplo, integração com APIs externas, envio de emails, lógica técnica que não pertence ao domínio.

---

• shared/ — Código compartilhado e utilitários

Função: Contém funcionalidades genéricas usadas em várias partes do sistema.

Regra: Deve ser independente do domínio específico.

    • base/:
        Classes base ou abstrações reutilizáveis (ex: BaseEntity, BaseRepository).

    • decorators/:
        Decorators customizados para NestJS, como para autorização, logging, validação.

    • filters/:
        Filtros para tratamento global ou específico de exceções.

    • interceptors/:
        Interceptadores para modificar comportamento das requisições/respostas (ex: logs, transformações, cache).

---

Princípio da Inversão de Dependência NestJs "7 > 6 > 5 => 4 (serem usados no Services e UseCase REGRAS DE NEGÓCIO CENTRALIZADA)":

1. MÓDULO (Apenas arquivos especificos da tabela)

2. CONTROLLER (rotas)

3. DTO (permissões de chaves e tipos)

4. SERVICES e/ou USECASE (Regras de negócio e aplicação)

5. ENTIDADE (Chaves e tipos, Funções que setam valores)

6. REPOSITORY (Separa funções abstratas que vão ser ligadas ao Prisma) "o que fazer"

7. REPOSITORY PRISMA (Herda Repository usando funções e parametros abstratos do Repository) "como fazer"

---

Abstração separa "o que fazer" do "como fazer"

Permitindo flexibilidade e extensibilidade

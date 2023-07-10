# Aluguel de Carros
Esse repositório contém o projeto realizado no curso de backend da Rocketseat, referente a aluguel de carros. 

## Rodar o projeto
Para executar o projeto será necessário ter instalado na máquina:

`Git`

`NodeJS`

`Yarn`

`Docker`

Para instalar as dependências do projeto em sua máquina, execute o comando `yarn`.

Execute o comando `docker-compose up -d` para criar as imagens da aplicação e do banco de dados no docker.

Em seguida, execute o comando `yarn typeorm migration:run` para criar as tabelas no banco.

Como a aplicação requer um usuário administrador para realizar algumas operações, é necessário executar o seed para criar o primeiro registro quando o banco de dados está vazio. 
Para isso, execute `yarn seed:admin`
 

Abaixo, a descrição dos requisitos funcionais e regras de negócios:
### Cadastro de carro

**RF**

    Deve ser possível cadastrar um novo carro.


**RN**

    Não deve ser possível cadastrar um carro com uma placa já existente.

    O carro deve ser cadastrado, por padrão, com disponibilidade.

    O usuário responsável pelo cadastro deve ser um usuário administrador.


### Listagem de carros

**RF**

    Deve ser possível listar todos os carros disponíveis.

    Deve ser possível listar todos os carros disponíveis pelo nome da categoria.

    Deve ser possível listar todos os carros disponíveis pelo nome da marca.

    Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**

    O usuário não precisa estar logado no sistema.


### Cadastro de especificação no carro

**RF**

    Deve ser possível cadastrar uma especificação para um carro.

**RN**

    Não deve ser possível cadastrar uma especificação para um carro não cadastrado.

    Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.

    O usuário responsável pelo cadastro deve ser um usuário administrador.


### Cadastro de imagens do carro

**RF**

    Deve ser possível cadastrar a imagem do carro.

**RNF**

    Utilizar o multer para upload dos arquivos

**RN**

    O usuário deve poder cadastrar mais de uma imagem para o mesmo carro

    O usuário responsável pelo cadastro deve ser um usuário administrador.


### Aluguel de carro

**RF**
    Deve ser possível cadastrar um aluguel

**RN**

    O aluguel deve ter duração mínima de 24 horas.

    Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.

    Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.

    Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.


### Devolução de carro

**RF**

    Deve ser possível realizar a devolução de um carro

**RN**

    O usuário deve estar logado na aplicação

    Se o carro for devolvivo com menos de 24 horas, deverá ser cobrado diária completa.

    Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.

    Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.

    Ao realizar a devolução, deverá ser calculado o total do aluguel.

    Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.

    Caso haja multa, deverá ser somada ao total do aluguel.


### Listagem de Alugueis para usuário

**RF**

    Deve ser possível realizar a busca de todos os alugueis para o usuário

**RN**

    O usuário deve estar logado na aplicação


### Recuperar senha

**RF**

    Deve ser possível o usuário recuperar a senha informando o e-mail

    O usuário deve receber um e-mail com o passo a passo para a recuperação de senha

    O usuário deve conseguir inserir uma nova senha

**RN**

    O usuário precisa informar uma nova senha
    
    O link enviado para a recuperação deve expirar em 3 horas
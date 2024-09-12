<!-- ###### Trabalho apresentado no dia 21/11/2023 -->
<!-- ###### Trabalho de docker apresentado no dia 13/9/2023 -->
## Website de compras baseado nas figuras Funko.
A visualização do website foi construída utilizando HTML, CSS e JavaScript utilizando os ensinamentos das aulas da matéria "Desenvolvimento webdinâmico". As requisições de API são recebidas pelo servidor back-end utilizando o framework Express. O banco de dados utilizado é o PostgreSQL 12, armazenando todas as informações dos produtos. O projeto completo pode ser visualizado utilizando containers, sem necessidade da instalação de dependências por parte do host.
<!-- ##### Todo o projeto foi desenvolvido em conjunto por [@felipeflamarini](https://github.com/felipeflamarini) e [@kauandeveloper345](https://github.com/kauan345developer). -->

<!-- 
obs: desatualizado
## Demonstração em vídeo
[![Demo](https://img.youtube.com/vi/cKqeB-qWF3s/maxresdefault.jpg)](https://www.youtube.com/watch?v=cKqeB-qWF3s) 
-->

## Para iniciar os containers dos servidores
```
$ git clone https://github.com/felipeflamarini/trabalho-webdinamico.git
$ cd trabalho-webdinamico
$ docker-compose up --build -d
```
Acesse `http://localhost:3000`

* * *

### Para parar os containers
`$ docker-compose down`

### Portas
A porta 8080 será exposta para o cliente, acessando o servidor nginx. As requisições para a rota "/api" serão redirecionadas para o container back-end, enquanto as outras requisições retornarão uma página HTML.

### Rotas do back-end
As rotas disponíveis podem ser visualizadas no arquivo "/back/src/app/router.js".

### Informações do banco de dados
O script "resetdb" presente no container back-end é responsável por povoar o banco de dados com informações.

### Estrutura dos containers
#### Container "proxy"
Baseado na imagem do servidor de *proxy* "*nginx*", é responsável por receber todas as requisições do cliente através da porta 8080. Requisições com a URL "/api" serão redirecionadas para o container "*back*", enquanto as outras receberão um arquivo HTML.
#### Container "back"
Construído com base na imagem do runtime "*node*", interage com o banco de dados para enviar informações de produtos aos clientes. Utiliza o framework Express para lidar com as requisições.
#### Container "db"
Baseado na imagem do banco de dados "postgres:12", é responsável por armazenar as informações de produtos.
#### Network "funko-data"
Conecta os containers "proxy" e "back", permitindo sua comunicação.
#### Network "funko-db"
Conecta os containers "back" e "db", de modo que o container "proxy" não possa se comunicar com o container "db".

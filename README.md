<!-- ###### Trabalho apresentado no dia 21/11/2023 -->
#### Website de compras baseado nas figuras Funko.
<strong>Client front-end:</strong> criado com HTML, SASS e JavaScript.
<strong>Servidor back-end:</strong> construído com Node.js com Express para lidar com as requisições do front-end. Interage com um banco de dados PostgreSQL para obter as informações dos produtos.
<strong>Dockerfile: </strong>baseado no Alpine Linux 3.19.1, garante uma forma fácil de visualizar nosso trabalho sem depender de compatibilidades.

##### Todo o projeto foi desenvolvido em conjunto por [@felipeflamarini](https://github.com/felipeflamarini) e [@kauandeveloper345](https://github.com/kauan345developer).

## Demonstração em vídeo
[![Demo](https://img.youtube.com/vi/cKqeB-qWF3s/maxresdefault.jpg)](https://www.youtube.com/watch?v=cKqeB-qWF3s)

## Para iniciar o servidor como um container

### Utilizando a URL
```
$ docker build -t funko https://github.com/FelipeFlamarini/trabalho-webdinamico.git#main
$ curl https://raw.githubusercontent.com/FelipeFlamarini/trabalho-webdinamico/main/run.sh | bash
```
Acesse `http://localhost:3000`

### Clonando o repositório

```
$ git clone https://github.com/felipeflamarini/trabalho-webdinamico.git
$ cd trabalho-webdinamico
$ docker build -t funko .
$ source run.sh
```
Acesse `http://localhost:3000`

* * *

### Para iniciar e parar o container
`$ docker start funko`\
`$ docker stop funko`

### Portas
Ao iniciar o servidor, a visualização das páginas HTML estarão na porta `3000`, e o back-end na porta `3001`.
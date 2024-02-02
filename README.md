#### Trabalho apresentado no dia 21/11/2023
###### Branch docker em teste
## Para preparar o servidor e iniciá-lo:

### Utilizando a URL
```
$ docker build -t funko https://github.com/FelipeFlamarini/trabalho-webdinamico.git#Docker:/
$ docker run -d --name funko -p 3000:3000 -p 3001:3001 funko
```
Acesse `https://localhost:3000`

### Clonando o repositório

```
$ git clone https://github.com/felipeflamarini/trabalho-webdinamico.git
$ cd trabalho-webdinamico
$ docker build -t funko .
$ source run.sh
```
Acesse `https://localhost:3000`
* * *

### Para iniciar e parar o container
`$ docker start funko`\
`$ docker stop funko`

### Portas
Ao iniciar o servidor, a visualização das páginas HTML estarão na porta `3000`, e o back-end na porta `3001`.
Trabalho apresentado no dia 21/11/2023

Para preparar o servidor e iniciá-lo, faça o seguinte:

1. $ git clone https://github.com/FelipeFlamarini/trabalho-webdinamico.git
2. $ cd ./trabalho-webdinamico
3. $ npm install
4. Use a seguinte query no PostgreSQL como administrador:
    CREATE USER funko WITH PASSWORD='1234';
    CREATE DATABASE funko WITH OWNER='funko';
5. $ npm run resetdb
6. $ npm run main
7. Visualize os arquivos HTML na pasta client!
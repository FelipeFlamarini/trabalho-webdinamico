import {Sequelize, client} from './client.js';
import {produtos, usuarios, enderecos, compras} from './structure.js';

function randomNumber(x, y) {
    return Math.floor(Math.random() * (y - x + 1)) + x;
}

const funkoProdutos = {
    "produtos": [
        {
            "nome": "Funko Pop! Homem-Aranha",
            "universo": "Marvel",
            "preco": 49.99,
            "descricao": "O Homem-Aranha é um super-herói da Marvel conhecido por sua agilidade e habilidades aracnídeas. Este Funko Pop! retrata o personagem em sua icônica roupa vermelha e azul.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Darth Vader",
            "universo": "Star Wars",
            "preco": 39.99,
            "descricao": "Darth Vader é um dos vilões mais icônicos de Star Wars. Este Funko Pop! captura sua presença ameaçadora com sua máscara e capa negra.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
            
        },
        {
            "nome": "Funko Pop! Pikachu",
            "universo": "Pokémon",
            "preco": 19.99,
            "descricao": "Pikachu é o adorável mascote da franquia Pokémon. Este Funko Pop! mostra o Pikachu sorridente com suas bochechas vermelhas.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Capitã Marvel",
            "universo": "Marvel",
            "preco": 34.99,
            "descricao": "A Capitã Marvel é uma poderosa heroína do Universo Marvel. Este Funko Pop! a retrata em seu traje de super-heroína.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {

            "nome": "Funko Pop! Jon Snow",
            "universo": "Game of Thrones",
            "preco": 29.99,
            "descricao": "Jon Snow é um dos personagens mais conhecidos de Game of Thrones. Este Funko Pop! o mostra com sua capa negra e espada.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {

            "nome": "Funko Pop! Hermione Granger",
            "universo": "Harry Potter",
            "preco": 27.99,
            "descricao": "Hermione Granger é uma brilhante bruxa da série Harry Potter. Este Funko Pop! a retrata com seu uniforme da Escola de Magia de Hogwarts.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {

            "nome": "Funko Pop! Iron Man",
            "universo": "Marvel",
            "preco": 44.99,
            "descricao": "O Homem de Ferro, também conhecido como Tony Stark, é um dos heróis mais ricos e inteligentes da Marvel. Este Funko Pop! destaca sua armadura icônica.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Elsa",
            "universo": "Frozen",
            "preco": 21.99,
            "descricao": "Elsa é a Rainha de Arendelle e uma das protagonistas de Frozen. Este Funko Pop! a retrata com seu vestido azul deslumbrante.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Batman",
            "universo": "DC Comics",
            "preco": 36.99,
            "descricao": "Batman, também conhecido como Bruce Wayne, é o Cavaleiro das Trevas de Gotham City. Este Funko Pop! destaca seu traje e capa.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Rick Sanchez",
            "universo": "Rick and Morty",
            "preco": 23.99,
            "descricao": "Rick Sanchez é um cientista maluco e protagonista da série animada Rick and Morty. Este Funko Pop! captura seu visual característico.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Wonder Woman",
            "universo": "DC Comics",
            "preco": 31.99,
            "descricao": "Wonder Woman, também conhecida como Diana Prince, é uma das heroínas mais icônicas da DC Comics. Este Funko Pop! a mostra com sua tiara e laço da verdade.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Spider-Man Noir",
            "universo": "Marvel",
            "preco": 29.99,
            "descricao": "Spider-Man Noir é uma versão alternativa do Homem-Aranha com um visual noir e estilo de detetive. Este Funko Pop! o destaca com seu traje escuro.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Eleven",
            "universo": "Stranger Things",
            "preco": 25.99,
            "descricao": "Eleven é uma das personagens principais de Stranger Things. Este Funko Pop! a retrata com seu visual da primeira temporada e os famosos waffles.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! The Mandalorian",
            "universo": "Star Wars",
            "preco": 37.99,
            "descricao": "O Mandaloriano é o protagonista da série de mesmo nome em Star Wars. Este Funko Pop! o mostra com seu capacete e armadura característica.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Gollum",
            "universo": "Senhor dos Anéis",
            "preco": 24.99,
            "descricao": "Gollum, também conhecido como Sméagol, é um personagem icônico de O Senhor dos Anéis. Este Funko Pop! o retrata com seu visual característico e o Precioso.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Hermione Granger com Livro",
            "universo": "Harry Potter",
            "preco": 28.99,
            "descricao": "Hermione Granger, da série Harry Potter, segurando seu livro mágico. Este Funko Pop! a retrata como a dedicada estudante de magia.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Captain America",
            "universo": "Marvel",
            "preco": 35.99,
            "descricao": "Capitão América, também conhecido como Steve Rogers, é um dos principais super-heróis da Marvel. Este Funko Pop! destaca seu escudo indestrutível.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Princess Leia",
            "universo": "Star Wars",
            "preco": 30.99,
            "descricao": "Princesa Leia Organa é uma líder rebelde em Star Wars. Este Funko Pop! a retrata com seu icônico penteado e traje branco.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Wolverine",
            "universo": "Marvel",
            "preco": 34.99,
            "descricao": "Wolverine, também conhecido como Logan, é um mutante com garras retráteis da Marvel. Este Funko Pop! destaca suas garras e traje amarelo e azul.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! The Flash",
            "universo": "DC Comics",
            "preco": 29.99,
            "descricao": "The Flash, também conhecido como Barry Allen, é um super-herói da DC Comics com velocidade sobre-humana. Este Funko Pop! destaca seu traje vermelho e amarelo.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Geralt of Rivia",
            "universo": "The Witcher",
            "preco": 31.99,
            "descricao": "Geralt de Rivia é um caçador de monstros e protagonista da série The Witcher. Este Funko Pop! o retrata com sua espada e traje de bruxo.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Hermione Granger Herbology",
            "universo": "Harry Potter",
            "preco": 28.99,
            "descricao": "Hermione Granger, da série Harry Potter, em sua aula de Herbologia em Hogwarts. Este Funko Pop! a mostra com um vaso de planta e um livro.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Buzz Lightyear",
            "universo": "Toy Story",
            "preco": 24.99,
            "descricao": "Buzz Lightyear é um patrulheiro espacial intergaláctico de Toy Story. Este Funko Pop! destaca seu traje espacial e asas retráteis.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Voldemort",
            "universo": "Harry Potter",
            "preco": 30.99,
            "descricao": "Voldemort, o temível bruxo das trevas da série Harry Potter. Este Funko Pop! o mostra com sua aparência sinistra e a varinha das varinhas.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Princess Jasmine",
            "universo": "Aladdin",
            "preco": 22.99,
            "descricao": "Princesa Jasmine é a protagonista de Aladdin. Este Funko Pop! a retrata com seu traje azul e o tigre Rajah.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Thanos",
            "universo": "Marvel",
            "preco": 37.99,
            "descricao": "Thanos é um dos vilões mais poderosos da Marvel, conhecido por sua busca pelas Joias do Infinito. Este Funko Pop! o retrata com a Manopla do Infinito.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Darth Maul",
            "universo": "Star Wars",
            "preco": 32.99,
            "descricao": "Darth Maul é um Sith com um visual distinto e um sabre de luz duplo. Este Funko Pop! destaca seu visual intimidante.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Minnie Mouse",
            "universo": "Disney",
            "preco": 21.99,
            "descricao": "Minnie Mouse é um dos personagens mais queridos da Disney. Este Funko Pop! a retrata com seu vestido de bolinhas e laço.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Aquaman",
            "universo": "DC Comics",
            "preco": 33.99,
            "descricao": "Aquaman, também conhecido como Arthur Curry, é o rei dos mares da DC Comics. Este Funko Pop! destaca sua ligação com o oceano e seu tridente.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Hagrid",
            "universo": "Harry Potter",
            "preco": 27.99,
            "descricao": "Rúbeo Hagrid é o guarda-caça de Hogwarts em Harry Potter. Este Funko Pop! o mostra com seu guarda-chuva rosa e chave para a motocicleta voadora.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! T\'Challa (Black Panther)",
            "universo": "Marvel",
            "preco": 35.99,
            "descricao": "T\'Challa, também conhecido como Pantera Negra, é o rei de Wakanda da Marvel. Este Funko Pop! destaca seu traje de herói.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Maleficent",
            "universo": "Disney",
            "preco": 30.99,
            "descricao": "Maleficent é a icônica vilã da Bela Adormecida da Disney. Este Funko Pop! a retrata com suas asas escuras e bastão mágico.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! The Joker",
            "universo": "DC Comics",
            "preco": 29.99,
            "descricao": "O Coringa é um dos vilões mais famosos da DC Comics. Este Funko Pop! o destaca com seu sorriso sinistro e traje roxo.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Luz Noceda",
            "universo": "The Owl House",
            "preco": 24.99,
            "descricao": "Luz Noceda é a protagonista de The Owl House, uma jovem humana que entra no Mundo dos Demônios. Este Funko Pop! a retrata com seu bastão mágico.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Eda Clawthorne",
            "universo": "The Owl House",
            "preco": 27.99,
            "descricao": "Eda Clawthorne, também conhecida como Eda a Coruja, é uma bruxa rebelde e mentora de Luz. Este Funko Pop! a mostra com sua capa e bengala.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! King",
            "universo": "The Owl House",
            "preco": 22.99,
            "descricao": "King é um pequeno demônio com grandes ambições e ego em The Owl House. Este Funko Pop! captura seu visual carismático e coroa.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
        {
            "nome": "Funko Pop! Amity Blight",
            "universo": "The Owl House",
            "preco": 25.99,
            "descricao": "Amity Blight é uma estudante brilhante e feiticeira em The Owl House. Este Funko Pop! a retrata com seu uniforme da Escola Hexside.",
            "views": randomNumber(0, 1000),
            "vendas": randomNumber(0, 100),
            "estoque": randomNumber(0, 20)
        },
    ]
};

const funkoUsuarios = {
    "usuarios": [
        {
            "nome": "user1",
            "email": "user1@gmail.com",
            "senha": "user1",
            "endereco": 1,
            "telefone": "18999999999",
            "admin": false,
            "compras": [1]
        },
    ]
};

const funkoEnderecos = {
    "enderecos": [
        {
            "usuario": 1,
            "destinatario": "user1",
            "nome": "Casa",
            "cep": 19000000,
            "complemento": "Casa amarela com teto vermelho",
        },
    ]
};

const funkoCompras = {
    "compras": [
        {
            "usuario": 1,
            "produtos": [1, 2, 3],
            "endereco": 1,
            "data": "2021-05-01",
            "status": "Entregue",
            "valor": 109.97
        }
    ]
};

try {
    await produtos.sync({force: true});
    await usuarios.sync({force: true});
    await enderecos.sync({force: true});
    await compras.sync({force: true});
    console.log(`Table criada`);
} catch (error) {
    console.log(`Erro: ${error}`);
};

const promises1 = funkoProdutos.produtos.map(async (produto) => {
    try {
        await produtos.create({
            nome: produto.nome,
            universo: produto.universo,
            preco: produto.preco,
            descricao: produto.descricao,
            views: produto.views,
            vendas: produto.vendas,
            estoque: produto.estoque,
        }, {
            fields: ['nome', 'universo', 'preco', 'descricao', 'views', 'vendas', 'estoque']
        });
        console.log(`Produto ${produto.nome} criado`)
    } catch (error) {
        console.log(`Erro: ${error}`)
    };
});

const promises2 = funkoUsuarios.usuarios.map(async (usuario) => {
    try {
        await usuarios.create({
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha,
            endereco: usuario.endereco,
            telefone: usuario.telefone,
            admin: usuario.admin,
            compras: usuario.compras
        }, {
            fields: ['nome', 'email', 'senha', 'endereco', 'telefone', 'admin', 'compras']

        });
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
});

const promises3 = funkoEnderecos.enderecos.map(async (endereco) => {
    try {
        await enderecos.create({
            usuario: endereco.usuario,
            destinatario: endereco.destinatario,
            nome: endereco.nome,
            cep: endereco.cep,
            complemento: endereco.complemento
        }, {
            fields: ['usuario', 'destinatario', 'nome', 'cep', 'complemento']
        });
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
});

const promises4 = funkoCompras.compras.map(async (compra) => {
    try {
        await compras.create({
            usuario: compra.usuario,
            produtos: compra.produtos,
            data: compra.data,
            valor: compra.valor
        }, {
            fields: ['usuario', 'produtos', 'data', 'valor']
        });
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
});

await Promise.all(promises1);
await Promise.all(promises2);
await Promise.all(promises3);
await Promise.all(promises4);

await client.close();

export {produtos, usuarios};
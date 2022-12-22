//produtos cadastrados
const produtos = [{
        id: 1,
        nome: "Base Matte Boca Rosa",
        descricao: "Base: maquiagem com pele incrível usando um único item, super importante para quem deseja conquistar um aspecto uniforme.",
        preco: 79.99,
        quantidade: 10,
        imagem: "bases.png"
    },
    {
        id: 2,
        nome: "Pó Solto Boca Rosa",
        descricao: "Pó é essencial para fazer uma linda maquiagem no momento da preparação da pele. Por isso, é importante ter atenção com cada produto escolhido, a fim de garantir o efeito desejado, ou seja, aquela pele dos sonhos!",
        preco: 59.99,
        quantidade: 10,
        imagem: "po_compacto.png"
    },
    {
        id: 3,
        nome: "Paleta de Sombras",
        descricao: "Paleta de Sombras Boca Rosa compacta e versátil, apresenta 6 cores neutras, sendo 3 cintilantes e 3 opacas, com toque levemente aveludado.",
        preco: 139.99,
        quantidade: 10,
        imagem: "paleta_sombras.png"
    },
    {
        id: 4,
        nome: "Batom Matte Líquido Boca Rosa",
        descricao: "Um Batom Boca Rosa é indispensável para uma make perfeita! Suas linhas existem nas mais infinitas cores e em MUITOS acabamentos.",
        preco: 69.99,
        quantidade: 10,
        imagem: "batom.png"
    },
    {
        id: 5,
        nome: "Iluminador",
        descricao: "Iluminador compacto, possui partículas iluminadoras ultrafinas que realçam o glow natural da pele.",
        preco: 59.99,
        quantidade: 10,
        imagem: "iluminador.png"
    }
];

let carrinhoContent = document.querySelector("#lista")


//Cadastro do cliente
const usuario = {
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    endereco: {
        logradouro: "",
        numero: "",
        bairro: "",
        cidade: "",
        cep: ""
    }
};

//Carrinho
const carrinho = {
    produtos: [{
        id: 1,
        nome: "Base Matte Boca Rosa",
        preco: 79.99,
        quantidade: 2,
        total: 159.99,
    }],
    total: 455,
    usuario: "uva"
};

//Dados
function criarLocalStorage() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
    // localStorage.setItem("usuario", JSON.stringify(usuario));
    //localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function verificaLocalStorage() {
    const produtos = localStorage.getItem("produtos");
    const usuario = localStorage.getItem("usuario");
    const carrinho = localStorage.getItem("carrinho");
    if (!produtos) {
        criarLocalStorage();
    }
}

function adicionarItemCarrinho(idProduto, renderizar) {
    let carrinho = pegarDados("carrinho");
    let produtos = pegarDados("produtos")


    if (!carrinho) {

        carrinho = []
    }

    let posicaoCarrinho = carrinho.findIndex(e => e.id == idProduto)
    let posicaoProduto = produtos.findIndex(e => e.id == idProduto)

    if (produtos[posicaoProduto].quantidade > 0) {
        if (posicaoCarrinho != -1) {
            carrinho[posicaoCarrinho].quantidade += 1

        } else {

            let posicaoLista = produtos.findIndex(e => e.id == idProduto)

            carrinho.push({
                id: idProduto,
                nome: produtos[posicaoLista].nome,
                descricao: produtos[posicaoLista].descricao,
                preco: produtos[posicaoLista].preco,
                quantidade: 1,
            })
        }

        produtos[posicaoProduto].quantidade--

    } else {
        alert(`Sem itens no estoque para ${produtos[posicaoProduto].nome}`)
    }





    salvarDados("carrinho", carrinho)
    salvarDados("produtos", produtos)

    if (renderizar) {
        renderizarCarrinho()

    }
}

function removerItemCarrinho(idProduto) {

    let carrinho = pegarDados("carrinho");
    let produtos = pegarDados("produtos")

    let posicaoCarrinho = carrinho.findIndex(e => e.id == idProduto)
    let posicaoProduto = produtos.findIndex(e => e.id == idProduto)

    if (posicaoCarrinho != -1) {
        carrinho[posicaoCarrinho].quantidade--
    }

    if (carrinho[posicaoCarrinho].quantidade == 0) {
        carrinho.splice(posicaoCarrinho, 1)
    }


    if (posicaoProduto == -1) {
        produtos.push({
            id: produtos[posicaoProduto].id,
            nome: produtos[posicaoProduto].nome,
            descricao: produtos[posicaoProduto].descricao,
            preco: produtos[posicaoProduto].preco,
            quantidade: 1,
            imagem: produtos[posicaoProduto].id
        })
    } else {
        produtos[posicaoProduto].quantidade++
    }

    salvarDados("carrinho", carrinho)
    salvarDados("produtos", produtos)

    renderizarCarrinho()
}

function salvarDados(chave, valor) {
    localStorage.setItem(chave, JSON.stringify(valor))
}

function pegarDados(chave) {
    return JSON.parse(localStorage.getItem(chave));

}

function recuperaProdutos() {
    return JSON.parse(localStorage.getItem("produtos"));
}

function recuperaCarrinho() {
    return JSON.parse(localStorage.getItem("carrinho"));
}

function recuperaUsuario() {
    return JSON.parse(localStorage.getItem("usuario"));
}

function iniciar() {
    verificaLocalStorage();
}

document.addEventListener("DOMContentLoaded", iniciar);







function renderizarCarrinho() {

    carrinhoContent.innerHTML = ""

    let carrinho = pegarDados("carrinho")

    carrinho.forEach(e => {

        carrinhoContent.innerHTML += `
                <ul>
                    <li>Nome: ${e.nome}</li>
                    <li>Quantiade: ${e.quantidade}</li>
                    <li>Preço: R$ ${e.preco}</li>
                    <li>Total itens: R$ ${e.quantidade * e.preco}</li>
                    <button onClick='adicionarItemCarrinho(${e.id},true)'>+</button>
                    <button onClick='removerItemCarrinho(${e.id})'>-</button>
                </ul>

                <br> <br> <br>
            `

    })


}

let buttonSalvarCompra = document.querySelector("#salvar")
let nome = document.getElementById("nome");
let email = document.getElementById("email");
let cpf = document.getElementById("cpf");
let tel = document.getElementById("tel");
let cep = document.getElementById("cep");
let endereco = document.getElementById("endereco");
let numero = document.getElementById("numero");
let bairro = document.getElementById("bairro");
let cidade = document.getElementById("cidade");
let estado = document.getElementById("estado");

let campos = [nome, email, cpf, tel, cep, endereco, numero, bairro, cidade, estado]

if (buttonSalvarCompra) {
    buttonSalvarCompra.addEventListener('click', () => {

        let camposPrenchidos = true

        campos.forEach((e) => {
            e.value == "" ? camposPrenchidos = false : ""
        })

        let carrinho = pegarDados("carrinho")

        if (carrinho.length > 0 && carrinho) {
            if (camposPrenchidos) {

                let compras = pegarDados("compras")

                if (!compras) {
                    compras = []
                }

                let data = new Date()

                let clientes = pegarDados("clientes")

                if (!clientes) {
                    clientes = []
                }

                clientes.push({
                    nome: nome.value,
                    email: email.value,
                    cpf: cpf.value,
                    tel: tel.value,
                    cep: cep.value,
                    endereco: endereco.value,
                    numero: numero.value,
                    bairro: bairro.value,
                    cidade: cidade.value,
                    estado: estado.value

                })

                compras.push({
                    cpf: cpf.value,
                    produtos: pegarDados("carrinho"),
                    date: data
                })

                salvarDados("clientes", clientes)
                salvarDados("compras", compras)
                salvarDados("carrinho", [])

            } else {
                alert("Prencha todos os campos!")
            }
        } else {
            alert("Carrinho Vazio!")
        }




    })
}

let contentListaCompras = document.querySelector("#listaProdutos")

function renderizarCompras() {

    let compras = pegarDados("compras")
    let clientes = pegarDados("clientes")

    if (compras) {

        contentListaCompras.innerHTML = ""

        compras.forEach((e, i) => {

            let posicaoCliente = clientes.findIndex(element => element.cpf == e.cpf)
            let cliente = clientes[posicaoCliente]

            contentListaCompras.innerHTML += `
                <ul>
                    <li>Nome: ${cliente.nome}</li>
                    <li>Email: ${cliente.email}</li>
                    <li>CPF: ${cliente.cpf}</li>
                    <li>Telefone: ${cliente.tel}</li>
                    <li>CEP: ${cliente.cep}</li>
                    <li>Endereço: ${cliente.endereco}</li>
                    <li>Numero: ${cliente.numero}</li>
                    <li>Bairro: ${cliente.bairro}</li>
                    <li>Cidade: ${cliente.cidade}</li>
                    <li>Estado: ${cliente.estado}</li>
                    <li>Horas: ${e.date}</li>
                </ul>
            
                <br>
            `
            console.log(compras)
            e.produtos.forEach(o => {
                contentListaCompras.innerHTML += `
                    <ul>
                        <li>Produto: ${o.nome}</li>
                        <li>Quantidade: ${o.quantidade}<li/>
                        <li>Valor: ${o.preco}</li>
                    </ul>

                    <br> <br> <br>
                `
            })

        })


    }




}


//Api ViaCEP 
const limparFormulario = (endereco) => {
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length = 8 && eNumero(cep);
const pesquisarCep = async() => {
        limparFormulario();

        const cep = document.getElementById('cep').value;
        const url = `http://viacep.com.br/ws/${cep}/json/`;
        if (cepValido(cep)) {

            const dados = await fetch(url);
            const endereco = await dados.json();
            if (endereco.hasOwnProperty('erro')) {
                document.getElementById('endereco').value = 'CEP Não Encontrado!'
            } else {
                preencherFormulario(endereco);
            }
        } else {
            document.getElementById('endereco').value = 'CEP inválido!'
        }

    }
   document.getElementById('cep')
   .addEventListener('focusout', pesquisarCep)

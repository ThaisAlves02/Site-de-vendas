if(document.readyState== "loading"){
    document.addEventListener("DOMContentLoaded", ready)
} else{
    ready()
}

var precoTotal = "0,00"

function ready() {
    const removerProduto = document.getElementsByClassName("remover-compra")
    console.log(removerProduto)

    for(var i = 0; i < removerProduto.length; i++){
        removerProduto[i].addEventListener("click", remover)
    }

    const quantidadeInput = document.getElementsByClassName("Quantidade")
    for(var i = 0; i < quantidadeInput.length; i++){
        quantidadeInput[i].addEventListener("change", atualizarTotal)
    }

    const addCarrinhoBotao = document.getElementsByClassName("botao-comprar")
    for (var i = 0; i < addCarrinhoBotao.length; i++){
        addCarrinhoBotao[i].addEventListener("click", adicionarCarrinho)
    }


    const botaoFinalizarCompra = document.getElementsByClassName("finalizar-compra")[0]
    botaoFinalizarCompra.addEventListener("click", compraFinalizada)
}

function compraFinalizada(event) {
    if(precoTotal == "0,00"){
        alert("Seu carrinho está vazio!")
    } else {
        alert(
        `
            Obrigado pela sua compra!
            Valor da compra: R$${precoTotal}
            Volte sempre :)

        `
        )
    }
}

function adicionarCarrinho(event){
    const botao = event.target
    const infoProd = botao.parentElement
    const imgProd = infoProd.getElementsByClassName("flex-container-div-img")[0].src
    const nomeProd = infoProd.getElementsByClassName("title")[0].innerText
    const precoProd = infoProd.getElementsByClassName("price")[0].innerText
    console.log(precoProd)
    
    // Verificar se o produto já está no carrinho
    const carrinho = document.getElementsByClassName("Produto");
    for (let i = 0; i < carrinho.length; i++) {
        const produtoNome = carrinho[i].getElementsByClassName("title")[0].innerText;
        if (produtoNome === nomeProd) {
            const quantidadeInput = carrinho[i].getElementsByClassName("Quantidade")[0];
            quantidadeInput.value = +quantidadeInput.value + 1; // Não é necessário parseInt
            atualizarTotal();
            return; // Sair da função, pois o produto já está no carrinho
        }
    }


    let novoProdCarrinho = document.createElement("tr")
    novoProdCarrinho.classList.add("Produto")

    novoProdCarrinho.innerHTML = 
    `

        <td><img src="${imgProd}" alt="${nomeProd}" class="flex-container-div-img"></td>
        <td><h3 class="title">${nomeProd}</h3></td>
        <td><input type="number" value="1" class="Quantidade"></td>
        <td><span class="price">${precoProd}</span></td>
        <td><button class="remover-compra">Remover</button></td>

    `

    const corpoTabela = document.querySelector(".teste tbody")
    corpoTabela.append(novoProdCarrinho)

    novoProdCarrinho.querySelector(".remover-compra").addEventListener("click", remover);
    novoProdCarrinho.querySelector(".Quantidade").addEventListener("change", atualizarTotal);


    atualizarTotal()
}

function remover(event) {
    event.target.parentElement.parentElement.remove()
    atualizarTotal()
}


function atualizarTotal() {
    precoTotal = 0;
    const carrinhoProduto = document.getElementsByClassName("Produto")
    for(var i = 0; i < carrinhoProduto.length; i++){
            //console.log(carrinhoProduto[i])
            const produtoPreco = carrinhoProduto[i].getElementsByClassName("price")[0].innerText.replace("R$", "").replace(",", ".")
             //console.log(produtoPreco)
            const produtoQuantidade = carrinhoProduto[i].getElementsByClassName("Quantidade")[0].value

            precoTotal += produtoPreco * produtoQuantidade

    }

    precoTotal = precoTotal.toFixed(2)
    precoTotal = precoTotal.replace(".", ",")
    document.querySelector(".total span").innerText = "R$" + precoTotal

}


atualizarTotal();
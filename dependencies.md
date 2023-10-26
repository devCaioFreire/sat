## Features

------------------------------------------------------------------------------------------------------------------------
[X] -> Trocar campos com o nome vendedor para usuário;
------------------------------------------------------------------------------------------------------------------------
[X] -> Fazer mapeamento no cupom fiscal;
------------------------------------------------------------------------------------------------------------------------
[X] -> Desenvolver nova busca por descrição (barcode);
   [X] -> Criar modal de produtos;
   [X] -> Ao digitar, apertar "enter" e abrir modal com os produtos que contem no input;
------------------------------------------------------------------------------------------------------------------------
[X] -> Criar tela de Produtos;
   [X] -> Rolagem infinita;
------------------------------------------------------------------------------------------------------------------------
[X] -> Criar cadastro de produtos;
   [X] -> Rotina para adicionar produto;
   [X] -> Rotina para editar produto;
   [X] -> Rotina para remover produto;

[X] -> Criar filtro de Produtos;
   [X] ->  Descrição;
   [X] ->  ID;
   [X] ->  EAN;
   [X] ->  Tem saldo;
   [X] ->  Não tem saldo;
   [X] ->  Ulitmos Lançamentos;
   [X] ->  Limpar Filtro;

[X] -> Criar relatório completo de produtos;
[X] -> Exportar todos os dados do produto;
------------------------------------------------------------------------------------------------------------------------
[X] -> Criar relatório completo de vendas;
   [X] -> Criar tela Relatório de vendas;
   [X] -> Exportar todos os dados da venda;
   [X] -> Desenvolver filtros;
      [X] ->  ID;
      [X] ->  Forma de Pagamento;
      [X] ->  Ulitmos Lançamentos;
      [X] ->  Limpar Filtro;
      [X] ->  Tempo determinado;
------------------------------------------------------------------------------------------------------------------------
[X] -> Desenvolver rotina de adição e subtração de saldo; 
   [X] -> Tela de adição de saldo; 
   [X] -> Tela de remoção de saldo; 
   [X] -> Adicionar o saldo; 
   [X] -> Ajustar o saldo; 
------------------------------------------------------------------------------------------------------------------------
(backend SQL)
[X] -> Movimentação de estoque; 
   [X] -> Retirar saldo quando fizer a venda;
   [X] -> Devolver quando cancelar o cupom;
------------------------------------------------------------------------------------------------------------------------

## ISSUES

------------------------------------------------------------------------------------------------------------------------
[X] -> Melhorar UX;
   [X] -> Adicionar "Loading Component" ao carregar as listas;
   [X] -> Dialog de confirmação para deletar;
   [X] -> Arrumar busca por EAN em produtos;
   [X] -> Atualizar Home;
   [X] -> Colocar Toast para melhorar UX;
------------------------------------------------------------------------------------------------------------------------
[] -> Correções;
   [X] -> *Vendas* Mostrar a primeira descrição do index em nova venda;
   [X] -> *Vendas* Dar foco ao botão de imprimir quando finalizar a venda;
   [X] -> *Vendas* Atalho de pesquisa conflitando com o navegador (ctrl + K);
   [] -> *Vendas* Não pode vender produtos inativos (backend);
   [] -> *Vendas* Trocar o TAB por Enter para entrar nos componentes;

   [X] -> *Pedidos de venda* Impressão pedidos de venda;
   [X] -> *Pedidos de venda* não chama mais pedidos quando termina de scrollar;
   [X] -> *Pedidos de venda* Trocar text field por select;
   [X] -> *Pedidos de venda* Impressão de vendas não mostra de primeira, tem que clicar duas vezes para imprimir;
   [X] -> *Pedidos de venda* Filtro não mostra o dia, tem que colocar um dia a mais (backend);
   [] -> *Pedidos de venda* Impressão deve seguir o filtro;
   [X] -> *Pedidos de venda* Informando o status da venda;

   [X] -> *Produtos* Lista não carrega de primeira;
   [X] -> *Produtos* está dando erro quando rola muito a lista e depois limpa o filtro;
   [X] -> *Produtos* tem que limpar o filtro varias vezes para realmente limpar;
   [X] -> *Produtos* não começa do inicio da lista quando faz filtro;

   [X] -> *Cupom* Depois que cancela o cupom não está removendo da lista;
   [X] -> *Cupom* Arrumar a API para deletar cupom fiscal (backend);
   [] -> *Cupom* CancelCupom Não devolve os itens ao estoque (backend);

   [] -> *Filtros* Últimos lançamentos não está mandando o último do banco apenas o último que está carregado na lista (backend);
------------------------------------------------------------------------------------------------------------------------

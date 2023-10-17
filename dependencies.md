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
------------------------------------------------------------------------------------------------------------------------
[] -> Correções;
   [X] -> *Venda* Impressão pedidos de venda;
   [X] -> *produtos* Lista não carrega de primeira;
   [X] -> *Pedidos de venda* não chama mais pedidos quando termina de scrollar;
   [X] -> *Venda* Mostrar a primeira descrição do index em nova venda;
   [X] -> *Venda* Dar foco ao botão de imprimir quando finalizar a venda;
   [X] -> *Produtos* está dando erro quando rola muito a lista e depois limpa o filtro;
   [] -> *Produtos* tem que limpar o filtro varias vezes para realmente limpar;
   [] -> *Produtos* não começa do inicio da lista quando faz filtro;
   [X] -> *Cupom* Depois que cancela o cupom não está removendo da lista;
   [] -> *Filtros* Últimos lançamentos não está mandando o último do banco apenas o último que está carregado na lista (backend);
   [X] -> *Cupom* Arrumar a API para deletar cupom fiscal (backend);
------------------------------------------------------------------------------------------------------------------------

## Features

[X] -> Trocar campos com o nome vendedor para usuário;
------------------------------------------------------------------------------------------------------------------------
[] -> Fazer mapeamento no cupom fiscal;
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

[] -> Criar filtro de Produtos;
   [X] ->  Descrição;
   [X] ->  ID;
   [X] ->  EAN;
   [X] ->  Tem saldo;
   [X] ->  Não tem saldo;
   [] ->  Ulitmos Lançamentos;
   [X] ->  Limpar Filtro;
------------------------------------------------------------------------------------------------------------------------
[] -> Movimentação de estoque; (backend SQL)
   [X] -> Retirar saldo quando fizer a venda;
   [] -> Devolver quando cancelar o cupom;
------------------------------------------------------------------------------------------------------------------------
[X] -> Criar relatório completo de produtos;
   [X] -> Exportar todos os dados do produto;
------------------------------------------------------------------------------------------------------------------------
[] -> Criar relatório completo de vendas;
   [] -> Criar tela Relatório de vendas;
   [] -> Exportar todos os dados da venda permitindo filtrar por periodo e agrupado por forma de pagamento;
------------------------------------------------------------------------------------------------------------------------
[] -> Desenvolver rotina de adição e subtração de saldo; 
------------------------------------------------------------------------------------------------------------------------

CREATE OR REPLACE VIEW relatorio_pedidos_venda AS
SELECT 
pv.id, pv.valor_liquido, pv.forma_pagamento, pv.data_realizacao, pvi.descricao, pvi.valor_unitario,
 p.unCom, pvi.quantidade
 FROM pedidos_venda_itens pvi 
 LEFT JOIN pedidos_venda pv ON pv.id = pvi.pedido_id
 LEFT JOIN produtos p ON pvi.produto_id = p.id
 
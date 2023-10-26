import { ProductProps, SalesOrderProps, useOrderContext } from '@/context/orderContext';
import { formatCurrency, formatDate } from '@/utils/formatter';
import { Document, PDFViewer, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React, { useEffect } from 'react';

interface PrintProps {
  name?: string;
  itens?: any[];
}

export interface ProductsReportRef {
  handlePrintCupom: () => void;
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
  },
  container: {
    maxWidth: 200,
    maxHeight: '100%',
    padding: 0,
    margin: 0,
    fontSize: 8,
    wordBreak: 'break-word',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    top: 0,
    padding: 16,
    width: '100vw',
    // backgroundColor: '#7c7c7c',
    borderTop: '1px solid #000',
    borderBottom: '1px solid #000',
    fontWeight: 'bold',
    color: '#000',
  },
  headerItems: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    // marginBottom: 10,
    padding: 16,
    width: '100vw',
    // backgroundColor: '#696969',
    borderTop: '1px solid #000',
    borderBottom: '1px solid #000',
    fontWeight: 'bold',
    color: '#000',
  },
  table: {
    display: 'flex',
    width: '100vw',
    flexDirection: 'row',
    textAlign: 'left',
    alignItems: 'center',
    borderBottom: 1,
    minHeight: 32
  },
  borderBottom: {
    borderBottomWidth: 0,
    borderBottomColor: '#000', // ou qualquer cor que você deseja
  },
});

const OrdersReport: React.ForwardRefRenderFunction<ProductsReportRef, PrintProps> = (props, ref) => {

  const { itens } = props;

  const { combined, setCombined, getSalesOrders, combineOrdersWithItems, fetchAllProductsForPrint, filterArray } = useOrderContext();

  React.useImperativeHandle(ref, () => ({
    handlePrintCupom: () => {
      window.print();
    }
  }));

  useEffect(() => {
    const fetchAndCombineOrders = async () => {
      const orders = await fetchAllProductsForPrint(filterArray);
      console.log('teste 1', orders)
      const items = await combineOrdersWithItems();
      setCombined(filterArray && items);
      console.log('ORDERS', orders);
    };

    fetchAndCombineOrders();
  }, [filterArray]);

  const renderOrderWithItems = (order: SalesOrderProps) => (
    <View key={order.id} style={{ marginBottom: 24 }}>
      {/* Renderizando o cabeçalho e os detalhes do pedido */}
      <View style={styles.header}>
        <Text style={{ width: '25%' }}>ID</Text>
        <Text style={{ width: '25%' }}>Valor</Text>
        <Text style={{ width: '25%' }}>Pagamento</Text>
        <Text style={{ width: '25%' }}>Data</Text>
      </View>
      <View style={styles.table}>
        <Text style={{ width: '25%', paddingHorizontal: 16, fontSize: 12 }}>{order.id}</Text>
        <Text style={{ width: '25%', paddingHorizontal: 8, fontSize: 12 }}>{formatCurrency(parseFloat(order.valor_liquido))}</Text>
        <Text style={{ width: '25%', paddingHorizontal: 2, fontSize: 12 }}>{order.forma_pagamento}</Text>
        <Text style={{ width: '25%', paddingHorizontal: -6, fontSize: 12 }}>{formatDate(order.data_realizacao)}</Text>
      </View>

      {/* Renderizando o cabeçalho dos itens */}
      <View style={styles.headerItems}>
        <Text style={{ width: '10%' }}>ID</Text>
        <Text style={{ width: '30%' }}>Descrição</Text>
        <Text style={{ width: '15%' }}>Valor</Text>
        <Text style={{ width: '15%' }}>Unidade</Text>
        <Text style={{ width: '15%' }}>Quantidade</Text>
        <Text style={{ width: '15%' }}>Valor Total</Text>
      </View>

      {/* Renderizando os itens associados ao pedido */}
      {order.itens && order.itens.map((item: ProductProps, itemIndex: any) => (
        <View key={itemIndex} style={[
          styles.table,
          (itemIndex !== order.itens!.length - 1) ? {} : styles.borderBottom]}>
          <Text style={{ width: '10%', paddingHorizontal: 16, fontSize: 12 }}>{item.id}</Text>
          <Text style={{ width: '30%', paddingHorizontal: 14, fontSize: 12 }}>{item.descricao}</Text>
          <Text style={{ width: '15%', paddingHorizontal: 6, fontSize: 12 }}>{formatCurrency(item.valor_unitario)}</Text>
          <Text style={{ width: '15%', paddingHorizontal: 0, fontSize: 12 }}>{item.unCom}</Text>
          <Text style={{ width: '15%', paddingHorizontal: 0, fontSize: 12 }}>{item.quantidade}</Text>
          <Text style={{ width: '15%', paddingHorizontal: 0, fontSize: 12 }}>{formatCurrency(parseFloat(item.valor_total))}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <PDFViewer style={styles.main}>
      <Document>
        {[...Array(renderOrderWithItems)].map((_, index) => (
          <Page size="A4" key={index}>
            <View style={styles.container}>
              {combined.map((order: any) => renderOrderWithItems(order))}
            </View>
          </Page>
        ))}
      </Document>
    </PDFViewer>
  );
};

export default React.forwardRef(OrdersReport);
import { useProductContext } from '@/context/productContext';
import { formatCurrency } from '@/utils/formatter';
import { Document, PDFViewer, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

interface PrintProps {
  name?: string;
  itens?: any[];
}

const defaultProps: Required<PrintProps> = {
  name: '',
  itens: [],
};

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
    backgroundColor: '#4338ca',
    fontWeight: 'bold',
    color: '#fff',
  },
  table: {
    display: 'flex',
    width: '100vw',
    flexDirection: 'row',
    textAlign: 'left',
    alignItems: 'center',
    borderBottom: 1,
    minHeight: 32
  }
});

const ProductsReport: React.ForwardRefRenderFunction<ProductsReportRef, PrintProps> = (props, ref) => {

  const { filter, filterType, loadedProducts } = useProductContext();
  const { itens } = props;

  React.useImperativeHandle(ref, () => ({
    handlePrintCupom: () => {
      window.print();
    }
  }));

  const itemsPerPage = 25;
  const numberOfPages = Math.ceil((itens?.length || 0) / itemsPerPage);

  const renderItemsForPage = (pageIndex: number) => {
    const startIndex = pageIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return itens?.slice(startIndex, endIndex).map((item, index) => (
      <View key={index} style={styles.table}>
        <Text style={{ width: '5%', paddingHorizontal: 16, overflow: 'hidden' }}>{item.id}</Text>
        <Text style={{ width: '10%', paddingHorizontal: 16, overflow: 'hidden' }}>{item.codProduto}</Text>
        <Text style={{ width: '50%', paddingHorizontal: 10, overflow: 'hidden' }}>{item.descricao}</Text>
        <Text style={{ width: '10%', paddingHorizontal: 0, marginLeft: -6, overflow: 'hidden' }}>
          R$ {formatCurrency(item.vlrUnCom)}
        </Text>
        <Text style={{ width: '10%', paddingHorizontal: 0, overflow: 'hidden' }}>{item.unCom}</Text>
        <Text style={{ width: '3%', paddingHorizontal: 0, overflow: 'hidden', textAlign: 'right' }}>{item.saldo}</Text>
        <Text style={{ width: '3%', paddingHorizontal: 0, marginLeft: 40, overflow: 'hidden' }}>{item.status}</Text>
      </View>
    ));
  };


  return (
    <PDFViewer style={styles.main}>
      <Document>
        {[...Array(numberOfPages)].map((_, pageIndex) => (
          <Page size="A4" wrap={false} key={pageIndex}>
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={{ width: '5%' }}>ID</Text>
                <Text style={{ width: '10%' }}>Cód. Interno</Text>
                <Text style={{ width: '50%' }}>Descrição</Text>
                <Text style={{ width: '10%' }}>Valor</Text>
                <Text style={{ width: '10%' }}>Unidade</Text>
                <Text style={{ width: '10%' }}>Saldo</Text>
                <Text style={{ width: '5%' }}>Status</Text>
              </View>
              {renderItemsForPage(pageIndex)}
            </View>
          </Page>
        ))}
      </Document>
    </PDFViewer>
  );
};

export default React.forwardRef(ProductsReport);
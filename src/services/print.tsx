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

export interface CupomFiscalRef {
  handlePrintCupom: () => void;
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '91.1%',
  },
  container: {
    maxWidth: 200,
    maxHeight: '100%',
    padding: 0,
    paddingHorizontal: 5,
    margin: 0,
    fontFamily: 'Helvetica',
    fontSize: 8,
    wordBreak: 'break-word',
  },
  header: {
    marginBottom: 10,
    display: 'flex',
    textAlign: 'center',
    gap: 4
  },
  title: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 6,
    wordBreak: 'break-word',
  },
  textFooter: {
    fontSize: 10,
    wordBreak: 'break-word',
  },
  section: {
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'column',
    gap: 4
  },
  detail: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  headerSection: {
    display: 'flex',
    flexDirection: 'row'
  },
  separator: {
    marginBottom: 5,
    marginTop: 5,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  footer: {
    marginTop: 10,
  },
  boldText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  products: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  listProducts: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

const CupomFiscal: React.ForwardRefRenderFunction<CupomFiscalRef, PrintProps> = ({ name, itens }, ref) => {

  return (
    <PDFViewer style={styles.main}>
      <Document>
        <Page size="A6">
          <View style={styles.container}>
            <View style={styles.header}>
              {/* Dados da empresa que comprou o software */}
              <Text>BNB IMPORT E EXPORT DE MAT P TAPECARIA L</Text>
              <Text>RUA DOUTOR EDMUNDO DOBRAWA, 1320</Text>
              <Text>ZONA INDUSTRIAL NORTE</Text>
              <Text>JOINVILLE, SC</Text>
              <Text>89219502</Text>
              <Text>(47) 3467-7010</Text>
            </View>

            <Text style={styles.boldText}>P E D I D O - SEM VALOR FISCAL</Text>

            <View style={styles.detail}>
              <Text>Data: 14/08/2023-10:38:19</Text>
              <Text>Pedido: 21882</Text>
            </View>

            <View style={styles.separator}></View>

            <View style={styles.section}>
              <Text style={styles.title}>
                CLIENTE.: CONSUMIDOR FINAL</Text>
              <Text>CPF.....: CPF</Text>
            </View>

            <View style={styles.separator}></View>

            {/* LISTA PRODUTOS */}
            <View style={styles.products}>
              <Text style={styles.title}>DESC PRODUTO</Text>
              <View style={styles.listProducts}>
                <Text>ID</Text>
                <Text>UN COMERCIAL</Text>
                <Text>QNT</Text>
                <Text>VLR UNITARIO</Text>
                <Text>VLR TOTAL</Text>
              </View>

              <View style={styles.separator}></View>

              <View>
                <Text>TOTAL LIQUIDO:</Text>
                <Text>VALOR TOTAL LIQUIDO</Text>
              </View>
            </View>

            <View>
              <Text>USUARIO............: NOME USUARIO</Text>
            </View>

            <View style={styles.separator}></View>
            <Text style={styles.textFooter}>
              Dirija-se ao caixa para concluir a compra, retirar a mercadoria e o cupom <br />
              fiscal válido para Nota Fiscal Paulista
            </Text>
            <View style={styles.separator}></View>

          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default React.forwardRef(CupomFiscal);
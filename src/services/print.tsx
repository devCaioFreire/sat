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
              <Text style={styles.title}>CLIENTE.: 2M INDUSTRIA DE MOVEIS LTDA ME</Text>
              <Text>CNPJ....: 14.946.947/0001-02</Text>
              <Text>LOGRAD..: JOSINO CANDIAN</Text>
              <Text>NUMERO..: 09</Text>
              <Text>CEP.....: 36500-000 - PONTE PRETA UBA - MG</Text>
              <Text>TELEFONE: (32) 3532-4621</Text>
              <Text>DOCUM...: 0019056360060</Text>
            </View>

            <View style={styles.separator}></View>

            {/* LISTA PRODUTOS */}
            <View style={styles.products}>
              <Text style={styles.title}>AMETISTA COR 180</Text>
              <View style={styles.listProducts}>
                <Text>718</Text>
                <Text>MT</Text>
                <Text>1,00x</Text>
                <Text>10,00</Text>
                <Text>10,00</Text>
              </View>

              <View style={styles.separator}></View>

              <View>
                <Text>TOTAL LIQUIDO:</Text>
                <Text>10,00</Text>
              </View>
            </View>

            <View>
              <Text>VENDEDOR............: VALTER SERGIO</Text>
              <Text>BALCONISTA..........: SUPERVISOR</Text>
              <Text>SALDO DO CLIENTE....: 0,00</Text>
              <Text>PRÉ-VENDA P/........: </Text>
              <Text>VECTOS..............: </Text>
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
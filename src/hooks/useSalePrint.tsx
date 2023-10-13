import { useAuthContext } from '@/context/authContext';
import { ProductContext } from '@/context/salesList';
import { formatCurrency } from '@/utils/formatter';
import { Document, PDFViewer, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React, { useContext } from 'react';

export interface DataCompany {
  cep: number;
  cidadeEstado: string;
  endereco: string;
  nomeEmpresa: string;
  telefone: number;
}

export interface CupomFiscalRef {
  handlePrintCupom: () => void;
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '91.1%',
  },
  container: {
    maxWidth: 215,
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
    flexDirection: 'column',
    margin: '5px 0px'
  }
});

const useSalePrint: React.ForwardRefRenderFunction<CupomFiscalRef> = (ref) => {

  const { responseData } = useContext(ProductContext);
  const { user } = useAuthContext();

  if (!responseData || !responseData.dadosPedido || !responseData.dadosEmpresa) {
    return null;
  }

  const empresa = responseData.dadosEmpresa;
  const dadosPedido = responseData.dadosPedido;

  return (
    <PDFViewer style={styles.main}>
      <Document>
        <Page size="A6">

          <View style={styles.container}>
            <View style={styles.header}>
              <Text>{empresa.nomeEmpresa}</Text>
              <Text>{empresa.endereco}</Text>
              <Text>{empresa.cidadeEstado}</Text>
              <Text>{empresa.cep}</Text>
              <Text>{empresa.telefone}</Text>
            </View>

            <Text style={styles.boldText}>P E D I D O - SEM VALOR FISCAL</Text>

            <View style={styles.detail}>
              <Text>Data: {new Date(dadosPedido.data).toLocaleDateString()}</Text>
              <Text>Pedido: {dadosPedido.id}</Text>
            </View>

            <View style={styles.separator}></View>

            <View style={styles.section}>
              <Text style={styles.title}>
                CLIENTE{''}: CONSUMIDOR FINAL</Text>
              <Text>CPF{'        '}: CPF</Text>
            </View>

            <View style={styles.separator}></View>

            {/* LISTA PRODUTOS */}
            <View>
              {dadosPedido.produtos.map((produto, index) => (
                <View style={styles.listProducts} key={index}>
                  <View>
                    <Text>{produto.descricao}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '4px 0' }}>
                      <Text>{produto.produto_id}</Text>
                      <Text>{formatCurrency(produto.valor_unitario)}</Text>
                      <Text>{produto.quantidade}</Text>
                      <Text>{formatCurrency(produto.valor_total)}</Text>
                    </View>
                  </View>
                </View>
              ))}

              <View style={styles.separator}></View>

              <View>
                <Text>TOTAL LIQUIDO{'  '}: {formatCurrency(dadosPedido.valorTotal)}</Text>
              </View>
            </View>

            <View>
              <Text>USUARIO{'             '}: {user?.name} {user?.lastName}</Text>
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
    </PDFViewer >
  );
};

export default React.forwardRef(useSalePrint);
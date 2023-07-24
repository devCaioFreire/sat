import axios from 'axios';


export const Axios = axios.create({
  baseURL: 'http://localhost:8081/datasnap/rest/TSMProdutos',
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    token: '8309eaec-d311-11ed-a238-8c89a5fa70e8'
  }
});

// http://localhost:8081/datasnap/rest/TSMProdutos/ProdutoById/${ID}?token=8309eaec-d311-11ed-a238-8c89a5fa70e8
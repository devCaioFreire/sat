'use client'
import { BsPrinterFill } from 'react-icons/bs';
import { FaRegTrashCan } from 'react-icons/fa6';
import { FiEdit2 } from 'react-icons/fi';
import { IoAdd } from 'react-icons/io5';

import { useProductContext } from '@/context/productContext';
import { AxiosNode } from '@/services/axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PrintModal } from './components/PrintModal';
import { Filter } from './components/filter/filter';
import { IconButton } from './components/inputButton';
import { ProductList } from './components/productsList';
import { Routines } from './components/routines/routines';

export default function Product() {
  const router = useRouter();
  const { selectedProduct, sendDeleteProduct, loadedProducts, setLoadedProducts, setFilteredProducts } = useProductContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrint = async () => {
    setIsModalOpen(true);
  }

  const handleAdd = () => {
    router.push('/dashboard/product/add');
  }

  const handleEdit = async () => {
    if (selectedProduct) {
      if (!loadedProducts.some((product) => product.id === selectedProduct.id)) {
        // O produto não está em loadedProducts, faça uma chamada à API para buscá-lo
        try {
          const response = await AxiosNode.get(`/getIDProductFilter/${selectedProduct.id}`);
          const productData = response.data;

          setLoadedProducts((prevLoadedProducts) => [...prevLoadedProducts, productData]);
          setFilteredProducts((prevFilteredProducts) => [...prevFilteredProducts, productData]);

          router.push(`/dashboard/product/edit/${selectedProduct.id}`);
        } catch (error) {
          console.error('Error fetching product for editing:', error);
        }
      } else {
        router.push(`/dashboard/product/edit/${selectedProduct.id}`);
      }
    }
  }

  const handleRemove = async () => {
    if (selectedProduct && selectedProduct.id) {
      const productId = parseInt(selectedProduct.id);
      console.log(productId)
      try {
        await sendDeleteProduct(productId);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  }

  return (
    <main className="flex flex-col border border-border rounded-lg h-full">
      <header
        className="flex items-center justify-between w-full shadow-lg px-4 rounded-t-xl bg-backgroundSecundary default:h-10 lg:h-10">
        <h1 className="font-medium">Produtos</h1>

        <div className='flex gap-4'>
          <IconButton onClick={handlePrint} title="Imprimir Produtos">
            <BsPrinterFill className="w-6 h-6 text-zinc-100" />
          </IconButton>

          <IconButton title="Filtrar Produto">
            <Filter />
          </IconButton>

          <IconButton title="Rotinas">
            <Routines />
          </IconButton>

          <IconButton onClick={handleAdd} title="Adicionar Produto">
            <IoAdd className="w-8 h-8  text-green-500" />
          </IconButton>

          <IconButton onClick={handleEdit} title="Editar Produto">
            <FiEdit2 className="w-5 h-5 text-indigo-500" />
          </IconButton>

          <IconButton onClick={handleRemove} title="Remover Produto">
            <FaRegTrashCan className="w-5 h-5 text-red-700" />
          </IconButton>
        </div>
      </header>
      <PrintModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <ProductList />
    </main>
  )
}
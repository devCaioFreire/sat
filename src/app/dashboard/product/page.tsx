'use client'
import { FiEdit2 } from 'react-icons/fi';
import { IoMdRemove } from 'react-icons/io';
import { IoAdd } from 'react-icons/io5';

import { Filter } from '@/components/ui/filter';
import { useProductContext } from '@/context/productContext';
import { AxiosNode } from '@/services/axios';
import { useRouter } from 'next/navigation';
import { IconButton } from './components/inputButton';
import { ProductList } from './components/productsList';

export const Product = () => {
  const router = useRouter();
  const { selectedProduct, sendDeleteProduct, loadedProducts, setLoadedProducts, setFilteredProducts } = useProductContext();

  const handleFilter = () => {

  }

  const handleAdd = () => {
    router.push('/dashboard/product/register');
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
          <IconButton onClick={handleFilter} title="Adicionar Produto">
            <Filter />
          </IconButton>
          <IconButton onClick={handleAdd} title="Adicionar Produto">
            <IoAdd className="w-8 h-8  text-green-500" />
          </IconButton>
          <IconButton onClick={handleEdit} title="Editar Produto">
            <FiEdit2 className="w-5 h-5 text-indigo-500" />
          </IconButton>
          <IconButton onClick={handleRemove} title="Remover Produto">
            <IoMdRemove className="w-8 h-8 text-red-700" />
          </IconButton>
        </div>
      </header>

      <ProductList />
    </main>
  )
}

export default Product;
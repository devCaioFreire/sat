'use client'
import { FiEdit2 } from 'react-icons/fi';
import { IoMdRemove } from 'react-icons/io';
import { IoAdd } from 'react-icons/io5';

import { useRouter } from 'next/navigation';
import { IconButton } from './components/inputButton';
import { ProductList } from './components/productsList';

export const Product = () => {
  const router = useRouter();

  const handleAdd = () => {
    router.push('/dashboard/product/register');
  }

  const handleEdit = () => {
    router.push('/dashboard/product/edit');
  }

  const handleRemove = () => {
  }
  return (
    <main className="flex flex-col border border-border rounded-lg h-full">
      <header
        className="flex items-center justify-between w-full shadow-lg px-4 rounded-t-xl bg-backgroundSecundary default:h-10 lg:h-10">
        <h1 className="font-medium">Produtos</h1>

        <div className='flex gap-4'>
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
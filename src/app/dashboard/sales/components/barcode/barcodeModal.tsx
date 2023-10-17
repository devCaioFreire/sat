import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ProductContext } from "@/context/salesList";
import { AxiosNode } from "@/services/axios";
import { Label, Separator } from "@radix-ui/react-dropdown-menu";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { QuantityBarcodeModal } from "./quantityBarcodeModal";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export const BarcodeModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const { addProduct } = useContext(ProductContext);
  const [description, setDescription] = useState("");
  const [searchedProducts, setSearchedProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  async function handleSearchDescription(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    setCurrentPage(0);

    try {
      const response = await AxiosNode.get(`/getDescriptionProductFilter?descricao=${description}&page=${currentPage}`);
      const products = response.data;
      console.log(products);

      if (products && products.length > 0) {
        setSearchedProducts(products);
      } else {
        console.warn("Nenhum produto encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }

  const handleFocusSearch = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "m") {
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setSelectedItemIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchedProducts.length > 0) {
      setSelectedItemIndex(0);
    }
  }, [searchedProducts]);

  useEffect(() => {
    const table = document.getElementById('table') as HTMLDivElement;

    const fetchMoreProducts = async () => {
      setIsLoading(true);

      try {
        const response = await AxiosNode.get(`/getDescriptionProductFilter?descricao=${description}&page=${currentPage}`);
        const products = response.data;

        if (products && products.length > 0) {
          setSearchedProducts(prevProducts => [...prevProducts, ...products]);
        } else {
          console.warn("Nenhum produto encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }

      setIsLoading(false);
    };

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = table;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if (isAtBottom && !isLoading) {
        setCurrentPage(prevPage => {
          fetchMoreProducts();
          return prevPage + 1;
        });
      }
    };

    if (table) {
      table.removeEventListener('scroll', handleScroll);
      table.addEventListener('scroll', handleScroll);

      return () => {
        table.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isLoading, currentPage, description]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    let newIndex = null;

    if (e.key === "ArrowDown" && selectedItemIndex !== null && selectedItemIndex < searchedProducts.length - 1) {
      newIndex = selectedItemIndex + 1;
      e.preventDefault();
    }

    if (e.key === "ArrowUp" && selectedItemIndex !== null && selectedItemIndex > 0) {
      newIndex = selectedItemIndex - 1;
      e.preventDefault();
    }

    if (newIndex !== null) {
      setSelectedItemIndex(newIndex);
      const itemToFocus = document.querySelector(`#table > li:nth-child(${newIndex + 1})`) as HTMLElement;
      itemToFocus.focus();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleFocusSearch);
    return () => {
      document.removeEventListener("keydown", handleFocusSearch);
    };
  }, []);

  const handleProductSelect = (product: any) => {
    setSelectedProduct(product);
    setIsQuantityModalOpen(true);
  };

  const handleProductQuantityConfirm = (product: any, quantity: number) => {
    // Primeiro, adicione o produto à sua lista
    addProduct(product, quantity);

    // Depois, feche os modais
    setIsQuantityModalOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="flex flex-col min-w-[720px] h-[90%]">
          <DialogHeader>
            <DialogTitle>Produtos</DialogTitle>
          </DialogHeader>
          <Separator className="border border-stone-700" />
          <form onSubmit={handleSearchDescription} className="h-[90%]" >
            <div className="flex flex-col gap-4 my-4">
              <Label>Descrição</Label>
              <Input ref={inputRef} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição do produto..." />
            </div>
            <ul
              id="table"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              className="overflow-auto flex flex-col max-h-[90%] scrollbar scrollbar-thumb-[#232324] scrollbar-track-transparent"
            >
              {searchedProducts.map((item, index) => (
                <li
                  key={index}
                  tabIndex={0}
                  onClick={() => handleProductSelect(item)}
                  onKeyPress={(e) => e.key === 'Enter' && handleProductSelect(item)}
                  className={`flex items-center justify-between p-3 w-full outline-none transition-all rounded-lg ${index === selectedItemIndex ? 'bg-stone-800' : ''}`}>
                  <h1>{item.descricao}</h1>
                  <h1>{item.saldo}</h1>
                </li>
              ))}
            </ul>
          </form>
        </DialogContent>
      </Dialog>
      <QuantityBarcodeModal
        product={selectedProduct}
        isOpen={isQuantityModalOpen}
        onClose={() => {
          setIsQuantityModalOpen(false);
          onClose?.();
        }}
        onConfirm={handleProductQuantityConfirm}
      />
    </>
  );
};

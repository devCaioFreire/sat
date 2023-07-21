import { Barcode } from "./components/barcode";
import { DescriptionProduct } from "./components/descriptionProduct";
import { List } from "./components/list";
import { TotalValueSale } from "./components/totalValueSale";
import { ValueProduct } from "./components/valueProduct";

export default function Sales() {
  return (
    <main className="flex w-full gap-[2%] justify-between">
      <div className="w-[58%]">
        <List />
      </div>

      {/* Insert Product Fields */}
      <div className="grid w-[40%]">
        <div className="flex flex-col justify-between">
          <Barcode />
          {/* <app-product-barcode className="h-[18%]" /> */}

          {/* Grid Quantity and Value */}
          <div className="grid grid-cols-2 h-[18%] gap-6 default:gap-4 lg:gap-10">

            {/* Value */}
            <ValueProduct title="Valor Unitário" />
            <ValueProduct title="Valor Total" />
          </div>

          {/* Total Value */}
          <TotalValueSale />
          {/* <app-product-total-value className="h-[18%]" /> */}

          {/* Product Name */}
          <DescriptionProduct />
        </div>
      </div>
    </main>

  )
}
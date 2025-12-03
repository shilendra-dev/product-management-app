import { Box } from 'lucide-react'
import { CreateProductDialog } from './CreateProductDialog'
import type { Product } from '@/types/product'

function Header(props: {onCreateProduct: (newProduct: Product) => void}) {
  return (
    <div className="flex items-center justify-between w-5xl">
          {/* logo */}
          <div className="flex items-center gap-2">
            <div className="p-1 bg-primary rounded-lg">
              <Box className="w-6 h-6 m-1 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-extralight tracking-tighter text-foreground -mb-1">
                Product Manager
              </h1>
              <p className="text-xs font-light text-muted-foreground">
                Manage your inventory
              </p>
            </div>
          </div>

          {/* Add product button */}
          <div>
            <CreateProductDialog onCreateProduct={props.onCreateProduct} />
          </div>
        </div>
  )
}

export default Header
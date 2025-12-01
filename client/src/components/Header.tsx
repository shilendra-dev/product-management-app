import { Button } from './ui/button'
import { Box, Plus } from 'lucide-react'

function Header() {
  return (
    <div className="flex items-center justify-between w-5xl">
          {/* logo */}
          <div className="flex items-center gap-2">
            <div className="p-1 bg-accent rounded-lg">
              <Box className="w-6 h-6 m-1 text-foreground" />
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
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
  )
}

export default Header
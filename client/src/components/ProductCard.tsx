import { Button } from './ui/button'
import { Edit, Trash2 } from 'lucide-react'

function ProductCard() {
  return (
    <div className="border hover:border-accent rounded-lg p-4 w-80 bg-card">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">Wireless Headphones</h3>
                <p className="text-sm text-muted-foreground">Electronics</p>
              </div>
            </div>

            <p className="text-sm text-card-foreground mb-4 ">
              Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.
            </p>

            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-xl font-bold text-card-foreground">$299.99</span>
              </div>
              <div className="text-right">
                <span className="text-sm text-muted-foreground">Stock: </span>
                <span className="text-sm font-medium text-card-foreground">15</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Edit className="w-3 h-3 mr-1" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" className="flex-1">
                <Trash2 className="w-3 h-3 mr-1" />
                Delete
              </Button>
            </div>
          </div>
  )
}

export default ProductCard
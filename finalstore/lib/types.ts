export interface Product {
  id: number
  name: string
  description: string | null
  price: number
  image_url: string | null
  stock: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface Order {
  id?: number
  user_id: string
  product_id: number
  quantity: number
  total: number
  status: string
  stripe_session_id?: string
}

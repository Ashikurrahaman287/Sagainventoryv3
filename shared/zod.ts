import { z } from "zod"

export const runtimeInsertSupplierSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string(),
})

export const runtimeInsertCustomerSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string(),
})

export const runtimeInsertSellerSchema = z.object({
  name: z.string(),
  email: z.string(),
})

export const runtimeInsertProductSchema = z
  .object({
    stockCode: z.string(),
    name: z.string(),
    category: z.string(),
    buyingPrice: z.string(),
    sellingPrice: z.string(),
    quantity: z.number().int().min(0),
    supplierId: z.string().nullable().optional(),
  })

export const runtimeInsertSaleItemSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  stockCode: z.string(),
  quantity: z.number().int(),
  unitPrice: z.string(),
  buyingPrice: z.string(),
  subtotal: z.string(),
})

export const runtimeInsertSaleSchema = z.object({
  receiptNumber: z.string().optional(),
  customerId: z.string(),
  sellerId: z.string(),
  subtotal: z.string(),
  discount: z.string(),
  discountType: z.string(),
  total: z.string(),
  paymentMethod: z.string(),
  items: z.array(runtimeInsertSaleItemSchema),
})

export type InsertSupplier = z.infer<typeof runtimeInsertSupplierSchema>
export type InsertCustomer = z.infer<typeof runtimeInsertCustomerSchema>
export type InsertSeller = z.infer<typeof runtimeInsertSellerSchema>
export type InsertProduct = z.infer<typeof runtimeInsertProductSchema>
export type InsertSaleItem = z.infer<typeof runtimeInsertSaleItemSchema>
export type InsertSale = z.infer<typeof runtimeInsertSaleSchema>

export {
  runtimeInsertSupplierSchema as insertSupplierSchema,
  runtimeInsertCustomerSchema as insertCustomerSchema,
  runtimeInsertSellerSchema as insertSellerSchema,
  runtimeInsertProductSchema as insertProductSchema,
  runtimeInsertSaleItemSchema as insertSaleItemSchema,
  runtimeInsertSaleSchema as insertSaleSchema,
}

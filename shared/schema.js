"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertSaleSchema = exports.insertSaleItemSchema = exports.insertProductSchema = exports.insertSellerSchema = exports.insertCustomerSchema = exports.insertSupplierSchema = exports.saleItems = exports.sales = exports.products = exports.sellers = exports.customers = exports.suppliers = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
const zod_1 = require("zod");
exports.suppliers = (0, pg_core_1.pgTable)("suppliers", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    name: (0, pg_core_1.text)("name").notNull(),
    phone: (0, pg_core_1.text)("phone").notNull(),
    email: (0, pg_core_1.text)("email").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
exports.customers = (0, pg_core_1.pgTable)("customers", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    name: (0, pg_core_1.text)("name").notNull(),
    phone: (0, pg_core_1.text)("phone").notNull(),
    email: (0, pg_core_1.text)("email").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
exports.sellers = (0, pg_core_1.pgTable)("sellers", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.text)("email").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
exports.products = (0, pg_core_1.pgTable)("products", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    stockCode: (0, pg_core_1.text)("stock_code").notNull().unique(),
    name: (0, pg_core_1.text)("name").notNull(),
    category: (0, pg_core_1.text)("category").notNull(),
    buyingPrice: (0, pg_core_1.decimal)("buying_price", { precision: 10, scale: 2 }).notNull(),
    sellingPrice: (0, pg_core_1.decimal)("selling_price", { precision: 10, scale: 2 }).notNull(),
    quantity: (0, pg_core_1.integer)("quantity").notNull().default(0),
    supplierId: (0, pg_core_1.varchar)("supplier_id").references(() => exports.suppliers.id),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
exports.sales = (0, pg_core_1.pgTable)("sales", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    receiptNumber: (0, pg_core_1.text)("receipt_number").notNull().unique(),
    customerId: (0, pg_core_1.varchar)("customer_id").references(() => exports.customers.id).notNull(),
    sellerId: (0, pg_core_1.varchar)("seller_id").references(() => exports.sellers.id).notNull(),
    subtotal: (0, pg_core_1.decimal)("subtotal", { precision: 10, scale: 2 }).notNull(),
    discount: (0, pg_core_1.decimal)("discount", { precision: 10, scale: 2 }).notNull().default("0"),
    discountType: (0, pg_core_1.text)("discount_type").notNull().default("percentage"),
    total: (0, pg_core_1.decimal)("total", { precision: 10, scale: 2 }).notNull(),
    paymentMethod: (0, pg_core_1.text)("payment_method").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
exports.saleItems = (0, pg_core_1.pgTable)("sale_items", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    saleId: (0, pg_core_1.varchar)("sale_id").references(() => exports.sales.id).notNull(),
    productId: (0, pg_core_1.varchar)("product_id").references(() => exports.products.id).notNull(),
    productName: (0, pg_core_1.text)("product_name").notNull(),
    stockCode: (0, pg_core_1.text)("stock_code").notNull(),
    quantity: (0, pg_core_1.integer)("quantity").notNull(),
    unitPrice: (0, pg_core_1.decimal)("unit_price", { precision: 10, scale: 2 }).notNull(),
    buyingPrice: (0, pg_core_1.decimal)("buying_price", { precision: 10, scale: 2 }).notNull(),
    subtotal: (0, pg_core_1.decimal)("subtotal", { precision: 10, scale: 2 }).notNull(),
});
// Insert schemas
exports.insertSupplierSchema = (0, drizzle_zod_1.createInsertSchema)(exports.suppliers).omit({
    id: true,
    createdAt: true,
});
exports.insertCustomerSchema = (0, drizzle_zod_1.createInsertSchema)(exports.customers).omit({
    id: true,
    createdAt: true,
});
exports.insertSellerSchema = (0, drizzle_zod_1.createInsertSchema)(exports.sellers).omit({
    id: true,
    createdAt: true,
});
exports.insertProductSchema = (0, drizzle_zod_1.createInsertSchema)(exports.products).omit({
    id: true,
    createdAt: true,
}).extend({
    buyingPrice: zod_1.z.string(),
    sellingPrice: zod_1.z.string(),
    quantity: zod_1.z.number().int().min(0),
    supplierId: zod_1.z.string().nullable().optional(),
});
exports.insertSaleItemSchema = (0, drizzle_zod_1.createInsertSchema)(exports.saleItems).omit({
    id: true,
    saleId: true,
}).extend({
    unitPrice: zod_1.z.string(),
    buyingPrice: zod_1.z.string(),
    subtotal: zod_1.z.string(),
});
exports.insertSaleSchema = (0, drizzle_zod_1.createInsertSchema)(exports.sales).omit({
    id: true,
    createdAt: true,
    receiptNumber: true,
}).extend({
    subtotal: zod_1.z.string(),
    discount: zod_1.z.string(),
    total: zod_1.z.string(),
    items: zod_1.z.array(exports.insertSaleItemSchema),
});

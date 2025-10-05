import { eq, desc, sql, like, or } from "drizzle-orm";
import { db } from "./db";
import {
  suppliers,
  customers,
  sellers,
  products,
  sales,
  saleItems,
  type Supplier,
  type Customer,
  type Seller,
  type Product,
  type Sale,
  type SaleItem,
  type InsertSupplier,
  type InsertCustomer,
  type InsertSeller,
  type InsertProduct,
  type InsertSale,
} from "@shared/schema";

export interface IStorage {
  // Suppliers
  getSuppliers(): Promise<Supplier[]>;
  getSupplier(id: string): Promise<Supplier | undefined>;
  createSupplier(supplier: InsertSupplier): Promise<Supplier>;
  updateSupplier(id: string, supplier: Partial<InsertSupplier>): Promise<Supplier | undefined>;
  deleteSupplier(id: string): Promise<boolean>;

  // Customers
  getCustomers(): Promise<Customer[]>;
  getCustomer(id: string): Promise<Customer | undefined>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  updateCustomer(id: string, customer: Partial<InsertCustomer>): Promise<Customer | undefined>;
  deleteCustomer(id: string): Promise<boolean>;

  // Sellers
  getSellers(): Promise<Seller[]>;
  getSeller(id: string): Promise<Seller | undefined>;
  createSeller(seller: InsertSeller): Promise<Seller>;
  updateSeller(id: string, seller: Partial<InsertSeller>): Promise<Seller | undefined>;
  deleteSeller(id: string): Promise<boolean>;

  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductByStockCode(stockCode: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
  searchProducts(query: string): Promise<Product[]>;

  // Sales
  getSales(): Promise<Sale[]>;
  getSale(id: string): Promise<Sale | undefined>;
  getSaleWithItems(id: string): Promise<{ sale: Sale; items: SaleItem[] } | undefined>;
  createSale(sale: InsertSale): Promise<{ sale: Sale; items: SaleItem[] }>;
  
  // Analytics
  getDashboardStats(): Promise<{
    totalProducts: number;
    todaysSales: number;
    lowStockCount: number;
    todaysProfit: number;
  }>;
  getLowStockProducts(threshold: number): Promise<Product[]>;
  getRecentSales(limit: number): Promise<Array<Sale & { customerName: string; sellerName: string }>>;
  getCustomerStats(customerId: string): Promise<{ totalPurchases: number; totalSpent: number }>;
  getSellerStats(sellerId: string): Promise<{ totalSales: number; totalRevenue: number }>;
}

export class DbStorage implements IStorage {
  // Suppliers
  async getSuppliers(): Promise<Supplier[]> {
    return db.select().from(suppliers).orderBy(desc(suppliers.createdAt));
  }

  async getSupplier(id: string): Promise<Supplier | undefined> {
    const result = await db.select().from(suppliers).where(eq(suppliers.id, id)).limit(1);
    return result[0];
  }

  async createSupplier(supplier: InsertSupplier): Promise<Supplier> {
    const result = await db.insert(suppliers).values(supplier).returning();
    return result[0];
  }

  async updateSupplier(id: string, supplier: Partial<InsertSupplier>): Promise<Supplier | undefined> {
    const result = await db.update(suppliers).set(supplier).where(eq(suppliers.id, id)).returning();
    return result[0];
  }

  async deleteSupplier(id: string): Promise<boolean> {
    const result = await db.delete(suppliers).where(eq(suppliers.id, id)).returning();
    return result.length > 0;
  }

  // Customers
  async getCustomers(): Promise<Customer[]> {
    return db.select().from(customers).orderBy(desc(customers.createdAt));
  }

  async getCustomer(id: string): Promise<Customer | undefined> {
    const result = await db.select().from(customers).where(eq(customers.id, id)).limit(1);
    return result[0];
  }

  async createCustomer(customer: InsertCustomer): Promise<Customer> {
    const result = await db.insert(customers).values(customer).returning();
    return result[0];
  }

  async updateCustomer(id: string, customer: Partial<InsertCustomer>): Promise<Customer | undefined> {
    const result = await db.update(customers).set(customer).where(eq(customers.id, id)).returning();
    return result[0];
  }

  async deleteCustomer(id: string): Promise<boolean> {
    const result = await db.delete(customers).where(eq(customers.id, id)).returning();
    return result.length > 0;
  }

  // Sellers
  async getSellers(): Promise<Seller[]> {
    return db.select().from(sellers).orderBy(desc(sellers.createdAt));
  }

  async getSeller(id: string): Promise<Seller | undefined> {
    const result = await db.select().from(sellers).where(eq(sellers.id, id)).limit(1);
    return result[0];
  }

  async createSeller(seller: InsertSeller): Promise<Seller> {
    const result = await db.insert(sellers).values(seller).returning();
    return result[0];
  }

  async updateSeller(id: string, seller: Partial<InsertSeller>): Promise<Seller | undefined> {
    const result = await db.update(sellers).set(seller).where(eq(sellers.id, id)).returning();
    return result[0];
  }

  async deleteSeller(id: string): Promise<boolean> {
    const result = await db.delete(sellers).where(eq(sellers.id, id)).returning();
    return result.length > 0;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return db.select().from(products).orderBy(desc(products.createdAt));
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return result[0];
  }

  async getProductByStockCode(stockCode: string): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.stockCode, stockCode)).limit(1);
    return result[0];
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values(product).returning();
    return result[0];
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const result = await db.update(products).set(product).where(eq(products.id, id)).returning();
    return result[0];
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id)).returning();
    return result.length > 0;
  }

  async searchProducts(query: string): Promise<Product[]> {
    const searchPattern = `%${query}%`;
    return db.select().from(products).where(
      or(
        like(products.name, searchPattern),
        like(products.stockCode, searchPattern),
        like(products.category, searchPattern)
      )
    ).limit(20);
  }

  // Sales
  async getSales(): Promise<Sale[]> {
    return db.select().from(sales).orderBy(desc(sales.createdAt));
  }

  async getSale(id: string): Promise<Sale | undefined> {
    const result = await db.select().from(sales).where(eq(sales.id, id)).limit(1);
    return result[0];
  }

  async getSaleWithItems(id: string): Promise<{ sale: Sale; items: SaleItem[] } | undefined> {
    const sale = await this.getSale(id);
    if (!sale) return undefined;

    const items = await db.select().from(saleItems).where(eq(saleItems.saleId, id));
    return { sale, items };
  }

  async createSale(saleData: InsertSale): Promise<{ sale: Sale; items: SaleItem[] }> {
    const { items: saleItemsData, ...saleInfo } = saleData;

    // Generate receipt number
    const count = await db.select({ count: sql<number>`count(*)` }).from(sales);
    const receiptNumber = `RCP-${new Date().getFullYear()}-${String(count[0].count + 1).padStart(6, '0')}`;

    // Create sale
    const saleResult = await db.insert(sales).values({
      ...saleInfo,
      receiptNumber,
    }).returning();
    const sale = saleResult[0];

    // Create sale items and update product quantities
    const items: SaleItem[] = [];
    for (const item of saleItemsData) {
      const itemResult = await db.insert(saleItems).values({
        ...item,
        saleId: sale.id,
      }).returning();
      items.push(itemResult[0]);

      // Decrease product quantity
      await db.update(products)
        .set({ quantity: sql`${products.quantity} - ${item.quantity}` })
        .where(eq(products.id, item.productId));
    }

    return { sale, items };
  }

  // Analytics
  async getDashboardStats() {
    const totalProductsResult = await db.select({ count: sql<number>`count(*)` }).from(products);
    const totalProducts = totalProductsResult[0].count;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todaysSalesResult = await db.select({
      total: sql<number>`COALESCE(SUM(CAST(${sales.total} AS NUMERIC)), 0)`,
      count: sql<number>`count(*)`
    })
    .from(sales)
    .where(sql`${sales.createdAt} >= ${today}`);

    const todaysSales = Number(todaysSalesResult[0]?.total || 0);

    const lowStockResult = await db.select({ count: sql<number>`count(*)` })
      .from(products)
      .where(sql`${products.quantity} < 20`);
    const lowStockCount = lowStockResult[0].count;

    // Calculate today's profit
    const todaysProfitResult = await db.select({
      profit: sql<number>`
        COALESCE(SUM(
          (CAST(${saleItems.unitPrice} AS NUMERIC) - CAST(${saleItems.buyingPrice} AS NUMERIC)) 
          * ${saleItems.quantity}
        ), 0)
      `
    })
    .from(saleItems)
    .innerJoin(sales, eq(saleItems.saleId, sales.id))
    .where(sql`${sales.createdAt} >= ${today}`);

    const todaysProfit = Number(todaysProfitResult[0]?.profit || 0);

    return {
      totalProducts,
      todaysSales,
      lowStockCount,
      todaysProfit,
    };
  }

  async getLowStockProducts(threshold: number = 20): Promise<Product[]> {
    return db.select().from(products).where(sql`${products.quantity} < ${threshold}`).orderBy(products.quantity);
  }

  async getRecentSales(limit: number = 10) {
    const result = await db.select({
      id: sales.id,
      receiptNumber: sales.receiptNumber,
      customerId: sales.customerId,
      sellerId: sales.sellerId,
      subtotal: sales.subtotal,
      discount: sales.discount,
      discountType: sales.discountType,
      total: sales.total,
      paymentMethod: sales.paymentMethod,
      createdAt: sales.createdAt,
      customerName: customers.name,
      sellerName: sellers.name,
    })
    .from(sales)
    .innerJoin(customers, eq(sales.customerId, customers.id))
    .innerJoin(sellers, eq(sales.sellerId, sellers.id))
    .orderBy(desc(sales.createdAt))
    .limit(limit);

    return result;
  }

  async getCustomerStats(customerId: string) {
    const result = await db.select({
      totalPurchases: sql<number>`count(*)`,
      totalSpent: sql<number>`COALESCE(SUM(CAST(${sales.total} AS NUMERIC)), 0)`,
    })
    .from(sales)
    .where(eq(sales.customerId, customerId));

    return {
      totalPurchases: result[0]?.totalPurchases || 0,
      totalSpent: Number(result[0]?.totalSpent || 0),
    };
  }

  async getSellerStats(sellerId: string) {
    const result = await db.select({
      totalSales: sql<number>`count(*)`,
      totalRevenue: sql<number>`COALESCE(SUM(CAST(${sales.total} AS NUMERIC)), 0)`,
    })
    .from(sales)
    .where(eq(sales.sellerId, sellerId));

    return {
      totalSales: result[0]?.totalSales || 0,
      totalRevenue: Number(result[0]?.totalRevenue || 0),
    };
  }

  async getStockReportByCategory() {
    const result = await db.select({
      category: products.category,
      productCount: sql<number>`count(*)`,
      totalValue: sql<number>`COALESCE(SUM(CAST(${products.quantity} AS NUMERIC) * CAST(${products.sellingPrice} AS NUMERIC)), 0)`,
      lowStockCount: sql<number>`COUNT(CASE WHEN CAST(${products.quantity} AS INTEGER) < 20 THEN 1 END)`,
    })
    .from(products)
    .groupBy(products.category)
    .orderBy(sql`${products.category}`);

    return result.map(row => ({
      category: row.category,
      products: Number(row.productCount),
      value: Number(row.totalValue),
      status: Number(row.lowStockCount) > 0 ? 'low' : 'healthy',
    }));
  }

  async getSalesReportByPeriod(period: string) {
    const now = new Date();
    let dateFilter;

    switch (period) {
      case 'today':
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        dateFilter = sql`${sales.createdAt} >= ${todayStart}`;
        break;
      case 'week':
        const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        dateFilter = sql`${sales.createdAt} >= ${weekStart}`;
        break;
      case 'month':
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        dateFilter = sql`${sales.createdAt} >= ${monthStart}`;
        break;
      case 'year':
        const yearStart = new Date(now.getFullYear(), 0, 1);
        dateFilter = sql`${sales.createdAt} >= ${yearStart}`;
        break;
      default:
        dateFilter = sql`1=1`;
    }

    const result = await db.select({
      transactions: sql<number>`count(*)`,
      revenue: sql<number>`COALESCE(SUM(CAST(${sales.total} AS NUMERIC)), 0)`,
      profit: sql<number>`COALESCE(SUM(CAST(${sales.total} AS NUMERIC) - CAST(${sales.subtotal} AS NUMERIC) * 0.6), 0)`,
    })
    .from(sales)
    .where(dateFilter);

    return {
      transactions: Number(result[0]?.transactions || 0),
      revenue: Number(result[0]?.revenue || 0),
      profit: Number(result[0]?.profit || 0),
    };
  }

  async getTopCustomers(limit: number = 10) {
    const result = await db.select({
      customerId: sales.customerId,
      customerName: customers.name,
      purchases: sql<number>`count(*)`,
      spent: sql<number>`COALESCE(SUM(CAST(${sales.total} AS NUMERIC)), 0)`,
    })
    .from(sales)
    .innerJoin(customers, eq(sales.customerId, customers.id))
    .groupBy(sales.customerId, customers.name)
    .orderBy(desc(sql<number>`COALESCE(SUM(CAST(${sales.total} AS NUMERIC)), 0)`))
    .limit(limit);

    return result.map(row => ({
      name: row.customerName,
      purchases: Number(row.purchases),
      spent: Number(row.spent),
    }));
  }
}

export const storage = new DbStorage();

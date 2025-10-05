import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertSupplierSchema,
  insertCustomerSchema,
  insertSellerSchema,
  insertProductSchema,
  insertSaleSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Suppliers
  app.get("/api/suppliers", async (_req, res) => {
    const suppliers = await storage.getSuppliers();
    res.json(suppliers);
  });

  app.get("/api/suppliers/:id", async (req, res) => {
    const supplier = await storage.getSupplier(req.params.id);
    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res.json(supplier);
  });

  app.post("/api/suppliers", async (req, res) => {
    try {
      const data = insertSupplierSchema.parse(req.body);
      const supplier = await storage.createSupplier(data);
      res.status(201).json(supplier);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/suppliers/:id", async (req, res) => {
    try {
      const data = insertSupplierSchema.partial().parse(req.body);
      const supplier = await storage.updateSupplier(req.params.id, data);
      if (!supplier) {
        return res.status(404).json({ error: "Supplier not found" });
      }
      res.json(supplier);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/suppliers/:id", async (req, res) => {
    const success = await storage.deleteSupplier(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res.status(204).send();
  });

  // Customers
  app.get("/api/customers", async (_req, res) => {
    const customers = await storage.getCustomers();
    
    // Enrich with stats
    const enriched = await Promise.all(
      customers.map(async (customer) => {
        const stats = await storage.getCustomerStats(customer.id);
        return { ...customer, ...stats };
      })
    );
    
    res.json(enriched);
  });

  app.get("/api/customers/:id", async (req, res) => {
    const customer = await storage.getCustomer(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    const stats = await storage.getCustomerStats(customer.id);
    res.json({ ...customer, ...stats });
  });

  app.post("/api/customers", async (req, res) => {
    try {
      const data = insertCustomerSchema.parse(req.body);
      const customer = await storage.createCustomer(data);
      res.status(201).json(customer);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/customers/:id", async (req, res) => {
    try {
      const data = insertCustomerSchema.partial().parse(req.body);
      const customer = await storage.updateCustomer(req.params.id, data);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      res.json(customer);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/customers/:id", async (req, res) => {
    const success = await storage.deleteCustomer(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(204).send();
  });

  // Sellers
  app.get("/api/sellers", async (_req, res) => {
    const sellers = await storage.getSellers();
    
    // Enrich with stats
    const enriched = await Promise.all(
      sellers.map(async (seller) => {
        const stats = await storage.getSellerStats(seller.id);
        return { ...seller, ...stats };
      })
    );
    
    res.json(enriched);
  });

  app.get("/api/sellers/:id", async (req, res) => {
    const seller = await storage.getSeller(req.params.id);
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }
    const stats = await storage.getSellerStats(seller.id);
    res.json({ ...seller, ...stats });
  });

  app.post("/api/sellers", async (req, res) => {
    try {
      const data = insertSellerSchema.parse(req.body);
      const seller = await storage.createSeller(data);
      res.status(201).json(seller);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/sellers/:id", async (req, res) => {
    try {
      const data = insertSellerSchema.partial().parse(req.body);
      const seller = await storage.updateSeller(req.params.id, data);
      if (!seller) {
        return res.status(404).json({ error: "Seller not found" });
      }
      res.json(seller);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/sellers/:id", async (req, res) => {
    const success = await storage.deleteSeller(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Seller not found" });
    }
    res.status(204).send();
  });

  // Products
  app.get("/api/products", async (req, res) => {
    const { search } = req.query;
    
    let products;
    if (search && typeof search === "string") {
      products = await storage.searchProducts(search);
    } else {
      products = await storage.getProducts();
    }
    
    res.json(products);
  });

  app.get("/api/products/:id", async (req, res) => {
    const product = await storage.getProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  });

  app.post("/api/products", async (req, res) => {
    try {
      const data = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(data);
      res.status(201).json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/products/:id", async (req, res) => {
    try {
      const data = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(req.params.id, data);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    const success = await storage.deleteProduct(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(204).send();
  });

  // Sales
  app.get("/api/sales", async (_req, res) => {
    const sales = await storage.getSales();
    res.json(sales);
  });

  app.get("/api/sales/recent", async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const sales = await storage.getRecentSales(limit);
    res.json(sales);
  });

  app.get("/api/sales/:id", async (req, res) => {
    const saleWithItems = await storage.getSaleWithItems(req.params.id);
    if (!saleWithItems) {
      return res.status(404).json({ error: "Sale not found" });
    }
    res.json(saleWithItems);
  });

  app.post("/api/sales", async (req, res) => {
    try {
      const data = insertSaleSchema.parse(req.body);
      const result = await storage.createSale(data);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Dashboard
  app.get("/api/dashboard/stats", async (_req, res) => {
    const stats = await storage.getDashboardStats();
    res.json(stats);
  });

  app.get("/api/dashboard/low-stock", async (req, res) => {
    const threshold = req.query.threshold ? parseInt(req.query.threshold as string) : 20;
    const products = await storage.getLowStockProducts(threshold);
    res.json(products);
  });

  const httpServer = createServer(app);

  return httpServer;
}

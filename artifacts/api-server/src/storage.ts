import { sql } from 'drizzle-orm';
import { db } from '@workspace/db';

interface StripeProductRow {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
}

interface StripePriceRow {
  id: string;
  product: string;
  unit_amount: number | null;
  currency: string;
  active: boolean;
}

interface ProductWithPricesRow {
  product_id: string;
  product_name: string;
  product_description: string | null;
  product_active: boolean;
  price_id: string | null;
  unit_amount: number | null;
  currency: string | null;
  price_active: boolean | null;
}

interface PriceIdRow {
  id: string;
}

export class Storage {
  async getProduct(productId: string): Promise<StripeProductRow | null> {
    const result = await db.execute(
      sql`SELECT id, name, description, active FROM stripe.products WHERE id = ${productId}`
    );
    return ((result.rows[0] as unknown) as StripeProductRow | undefined) ?? null;
  }

  async getPrice(priceId: string): Promise<StripePriceRow | null> {
    const result = await db.execute(
      sql`SELECT id, product, unit_amount, currency, active FROM stripe.prices WHERE id = ${priceId}`
    );
    return ((result.rows[0] as unknown) as StripePriceRow | undefined) ?? null;
  }

  async getPriceByProductName(productName: string): Promise<PriceIdRow | null> {
    const result = await db.execute(
      sql`
        SELECT pr.id
        FROM stripe.products p
        JOIN stripe.prices pr ON pr.product = p.id AND pr.active = true
        WHERE p.name = ${productName} AND p.active = true
        ORDER BY pr.unit_amount ASC
        LIMIT 1
      `
    );
    return ((result.rows[0] as unknown) as PriceIdRow | undefined) ?? null;
  }

  async listProductsWithPrices(): Promise<ProductWithPricesRow[]> {
    const result = await db.execute(
      sql`
        SELECT
          p.id as product_id,
          p.name as product_name,
          p.description as product_description,
          p.active as product_active,
          pr.id as price_id,
          pr.unit_amount,
          pr.currency,
          pr.active as price_active
        FROM stripe.products p
        LEFT JOIN stripe.prices pr ON pr.product = p.id AND pr.active = true
        WHERE p.active = true
        ORDER BY p.name, pr.unit_amount
      `
    );
    return (result.rows as unknown) as ProductWithPricesRow[];
  }
}

export const storage = new Storage();

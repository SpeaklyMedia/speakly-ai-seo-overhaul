import { getUncachableStripeClient } from './stripeClient';

async function createProducts() {
  try {
    const stripe = await getUncachableStripeClient();
    console.log('Checking for existing products in Stripe...');

    const competitorScanName = 'Competitor Scan & AI-SEO Visibility Readiness Kit';
    const visibilityOverhaulName = 'Visibility Overhaul';

    const existingCompetitorScan = await stripe.products.search({
      query: `name:'${competitorScanName}' AND active:'true'`,
    });

    let competitorScanPriceId: string | null = null;

    if (existingCompetitorScan.data.length > 0) {
      console.log(`"${competitorScanName}" already exists — skipping creation.`);
      const prices = await stripe.prices.list({ product: existingCompetitorScan.data[0].id, active: true });
      competitorScanPriceId = prices.data[0]?.id ?? null;
      console.log(`  Price ID: ${competitorScanPriceId}`);
    } else {
      const product = await stripe.products.create({
        name: competitorScanName,
        description: 'A deep competitive intelligence report showing how your rivals are surfaced by AI — and how to close the gap.',
      });
      console.log(`Created product: ${product.name} (${product.id})`);

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: 35000,
        currency: 'usd',
      });
      competitorScanPriceId = price.id;
      console.log(`Created price: $350.00 one-time (${price.id})`);
    }

    const existingVisibilityOverhaul = await stripe.products.search({
      query: `name:'${visibilityOverhaulName}' AND active:'true'`,
    });

    let visibilityOverhaulPriceId: string | null = null;

    if (existingVisibilityOverhaul.data.length > 0) {
      console.log(`"${visibilityOverhaulName}" already exists — skipping creation.`);
      const prices = await stripe.prices.list({ product: existingVisibilityOverhaul.data[0].id, active: true });
      visibilityOverhaulPriceId = prices.data[0]?.id ?? null;
      console.log(`  Price ID: ${visibilityOverhaulPriceId}`);
    } else {
      const product = await stripe.products.create({
        name: visibilityOverhaulName,
        description: 'The complete Phase 0–2 system: source-of-truth content, schema, structured data, and a content engine built to fuel AI recommendations.',
      });
      console.log(`Created product: ${product.name} (${product.id})`);

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: 95000,
        currency: 'usd',
      });
      visibilityOverhaulPriceId = price.id;
      console.log(`Created price: $950.00 one-time (${price.id})`);
    }

    console.log('\nProducts and prices ready!');
    console.log(`Competitor Scan price ID: ${competitorScanPriceId}`);
    console.log(`Visibility Overhaul price ID: ${visibilityOverhaulPriceId}`);
    console.log('\nWebhooks will sync this data to the database automatically.');
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error creating products:', message);
    process.exit(1);
  }
}

createProducts();

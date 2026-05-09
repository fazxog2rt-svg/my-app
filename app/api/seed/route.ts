import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { DEMO_PRODUCTS } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check if products already exist
    const count = await prisma.product.count();
    if (count > 0) {
      return NextResponse.json({ message: 'Database is already seeded!', count });
    }

    // Seed products
    for (const product of DEMO_PRODUCTS) {
      await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          image: product.image,
          stock: product.stock,
          rating: product.rating,
        }
      });
    }

    return NextResponse.json({ message: 'Database seeded successfully!', count: DEMO_PRODUCTS.length });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}

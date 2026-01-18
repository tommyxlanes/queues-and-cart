import "dotenv/config";
import { prisma } from "../lib/prisma";

async function main() {
  console.log("🌱 Seeding products...");

  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      { title: "Mystery Trading Card Pack", price: 999, inventory: 50 },
      { title: "Vintage Baseball Card", price: 2499, inventory: 12 },
      { title: "Limited Basketball Card", price: 4999, inventory: 5 },
      { title: "Rare Football Card", price: 1999, inventory: 20 },
      { title: "Collector Pokémon Card", price: 2999, inventory: 8 },
      { title: "Yu-Gi-Oh! First Edition Card", price: 3499, inventory: 6 },
      { title: "MTG Promo Card", price: 1599, inventory: 30 },
      { title: "One Piece Card", price: 1299, inventory: 18 },
      { title: "Dragon Ball Super Card", price: 1799, inventory: 15 },
      { title: "Ultra Rare Collector Card", price: 9999, inventory: 2 },
    ],
  });

  console.log("✅ Seed completed");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

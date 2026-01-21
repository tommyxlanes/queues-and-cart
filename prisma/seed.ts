import "dotenv/config";
import { prisma } from "../lib/prisma";

const products = [
  { title: "Starter Pack", price: 499, inventory: 100 },
  { title: "Premium Pack", price: 999, inventory: 75 },
  { title: "Ultra Pack", price: 1999, inventory: 50 },
  { title: "Legendary Pack", price: 4999, inventory: 25 },
  { title: "Mystery Box", price: 2499, inventory: 40 },
  { title: "Collector Bundle", price: 7999, inventory: 15 },
  { title: "Booster Pack", price: 299, inventory: 200 },
  { title: "Elite Pack", price: 1499, inventory: 60 },
  { title: "Holographic Special", price: 3499, inventory: 30 },
  { title: "Limited Edition Pack", price: 9999, inventory: 10 },
];

async function main() {
  console.log("Seeding products...");

  for (const product of products) {
    await prisma.product.create({
      data: {
        ...product,
        imageUrl:
          "https://res.cloudinary.com/dehmmknu8/image/upload/v1751819461/wednesdayHalfOff-v2-Post_uckpsi.jpg",
      },
    });
  }

  console.log(`Seeded ${products.length} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

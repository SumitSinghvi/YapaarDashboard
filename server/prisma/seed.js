import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
  const orders = []
  
  const priorities = ['High', 'Medium', 'Low']
  const statuses = ['Pending', 'In Transit', 'Completed', 'Cancelled', 'Returned']
  const productNames = ['Wooden Chair Dark Brown', 'Dining Table Set', 'Sofa Set Beige', 'Office Chair', 'Coffee Table', 'Bookshelf Walnut', 'Nightstand Set', 'Wardrobe Set Oak Finish']

  // Generate 50 orders
  for (let i = 0; i < 50; i++) {
    orders.push({
      name: productNames[i % productNames.length], // Rotate product names
      date: new Date(new Date().getTime() - 1000 * 60 * 60 * 60 * i), // Unique timestamp decreasing by 1 hour per order
      priority: priorities[i % priorities.length], // Rotate priorities
      quantity: `${Math.floor(Math.random() * 10) + 1} Sets`, // Random quantity between 1-10
      status: statuses[i % statuses.length], // Rotate statuses
      total: Math.floor(Math.random() * 20000) + 1000, // Random total between ₹1000 - ₹21000
    })
  }

  // Insert the generated orders
  await prisma.order.createMany({
    data: orders,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

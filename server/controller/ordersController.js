import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Controller function to get all orders or filter by status
export const getOrders = async (req, res) => {
  const { status } = req.params;
  try {
    const orders = status
      ? await prisma.order.findMany({
          where: {
            status: status,
          },
        })
      : await prisma.order.findMany();

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: `Unable to retrieve orders${status ? ` with status ${status}` : ''}` });
  }
};

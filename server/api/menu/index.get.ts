import { prisma} from '../../../prisma/db'


export default defineEventHandler(async(event) => {
    const menu = await prisma.menuItem.findMany({
      // include: { items: true },
    })
    return menu
  })

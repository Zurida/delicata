import { prisma } from "~/prisma/db"


export default defineEventHandler(async (event) => {
  const measures = await prisma.measure.findMany({})
  return measures
})

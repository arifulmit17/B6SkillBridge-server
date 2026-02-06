import { AvailabilitySlot } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const createAvailabilitySlot = async (
  data: Omit<AvailabilitySlot, "id" | "createdAt">
) => {
  const result = await prisma.availabilitySlot.create({
    data,
  })
  return result
}
const getAllAvailabilitySlots = async () => {
  const result = await prisma.availabilitySlot.findMany({
    include: {
      tutor: true,
    },
  })
  return result
}
const getAvailabilitySlotsByTutorId = async (tutorId: string) => {
  const result = await prisma.availabilitySlot.findMany({
    where: {
      tutorId,
    },
    orderBy: {
      dayOfWeek: "asc",
    },
  })
  return result
}
const updateAvailabilitySlotById = async (
  slotId: string,
  data: Partial<AvailabilitySlot>
) => {
  const result = await prisma.availabilitySlot.update({
    where: {
      id: slotId,
    },
    data,
  })
  return result
}
const deleteAvailabilitySlotById = async (slotId: string) => {
  const result = await prisma.availabilitySlot.delete({
    where: {
      id: slotId,
    },
  })
  return result
}
export const availabilitySlotService = {
  createAvailabilitySlot,
  getAllAvailabilitySlots,
  getAvailabilitySlotsByTutorId,
  updateAvailabilitySlotById,
  deleteAvailabilitySlotById,
}

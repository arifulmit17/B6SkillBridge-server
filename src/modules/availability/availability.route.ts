import { Router } from "express"
import { createAvailabilitySlot, deleteAvailabilitySlotById, getAllAvailabilitySlots, getAvailabilitySlotsByTutorId, updateAvailabilitySlotById } from "./availability.controller"


const router = Router()

router.post("/", createAvailabilitySlot)
router.get("/", getAllAvailabilitySlots)
router.get("/tutor/:tutorId", getAvailabilitySlotsByTutorId)
router.patch("/:slotId", updateAvailabilitySlotById)
router.delete("/:slotId", deleteAvailabilitySlotById)

export const availabilitySlot =router

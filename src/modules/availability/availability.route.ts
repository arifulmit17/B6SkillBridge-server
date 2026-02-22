import { Router } from "express"
import { createAvailabilitySlot, deleteAvailabilitySlotById, getAllAvailabilitySlots, getAvailabilitySlotsByTutorId, updateAvailabilitySlotById } from "./availability.controller"
import auth, { UserRole } from "../../middleware/auth"


const router = Router()

router.post("/",auth(UserRole.TUTOR), createAvailabilitySlot)
router.get("/", getAllAvailabilitySlots)
router.get("/tutor/:tutorId",auth(UserRole.TUTOR), getAvailabilitySlotsByTutorId)
router.patch("/:slotId",auth(UserRole.TUTOR), updateAvailabilitySlotById)
router.delete("/:slotId",auth(UserRole.TUTOR), deleteAvailabilitySlotById)

export const availabilitySlot =router

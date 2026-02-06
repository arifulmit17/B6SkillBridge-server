import { Request, Response } from "express"
import { availabilitySlotService } from "./availability.service"


export const createAvailabilitySlot = async (req: Request, res: Response) => {
  try {
    const slot = await availabilitySlotService.createAvailabilitySlot(req.body)

    res.status(201).json({
      success: true,
      data: slot,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create availability slot",
    })
  }
}

export const getAllAvailabilitySlots = async (_req: Request, res: Response) => {
  try {
    const slots = await availabilitySlotService.getAllAvailabilitySlots()

    res.status(200).json({
      success: true,
      data: slots,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch availability slots",
    })
  }
}
export const getAvailabilitySlotsByTutorId = async (
  req: Request,
  res: Response
) => {
  try {
    const { tutorId } = req.params

    const slots =
      await availabilitySlotService.getAvailabilitySlotsByTutorId(tutorId)

    res.status(200).json({
      success: true,
      data: slots,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch availability slots",
    })
  }
}

export const updateAvailabilitySlotById = async (
  req: Request,
  res: Response
) => {
  try {
    const { slotId } = req.params

    const updatedSlot =
      await availabilitySlotService.updateAvailabilitySlotById(
        slotId,
        req.body
      )

    res.status(200).json({
      success: true,
      data: updatedSlot,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update availability slot",
    })
  }
}


export const deleteAvailabilitySlotById = async (
  req: Request,
  res: Response
) => {
  try {
    const { slotId } = req.params

    await availabilitySlotService.deleteAvailabilitySlotById(slotId)

    res.status(200).json({
      success: true,
      message: "Availability slot deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete availability slot",
    })
  }
}


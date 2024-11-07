import { Router } from "express";
export const router = Router()

router.post("/create-specialization")
router.get("/all-specializations")
router.get("/specialization:Id")
router.put('/edit-specialization')
router.delete('/delete-specialization')
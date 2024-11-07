import { Router } from "express";
export const router = Router()

router.post("/create-faculty")
router.get("/all-faculties")
router.get("/:facultyId")
router.put('/edit-faculty')
router.delete('/delete-faculty')
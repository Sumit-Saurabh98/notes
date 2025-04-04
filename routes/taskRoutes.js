
import {Router} from "express";
const router = Router();
import { createTask, getTasks, getTaskById, updateTask, deleteTask} from "../controllers/taskControllers.js";
router.get('/get', getTasks)
router.get('/get/:id', getTaskById)
router.post('/create', createTask)
router.put('/update/:id', updateTask)
router.delete('/delete/:id', deleteTask)

export default router
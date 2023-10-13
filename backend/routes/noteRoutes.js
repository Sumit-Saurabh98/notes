const {Router} = require("express");
const router = Router();
const {getNotes, createNote, updateNote, deleteNote} = require("../controllers/notesControllers")

router.get('/get', getNotes)
router.post('/create', createNote)
router.put('/update/:id', updateNote)
router.delete('/delete/:id', deleteNote)

module.exports = router;
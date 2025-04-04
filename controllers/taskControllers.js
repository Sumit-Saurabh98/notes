import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
    try {
        const id = req.user._id
        const tasks = await Task.find({userId:id}).sort({ _id: -1 });
        if(!tasks){
            return res.status(400).json({ success: false, message: "Tasks not found" });
        }
        res.status(200).json({ success: true, message: "Tasks found", tasks });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const getTaskById = async (req, res) => {
    try {
        const id = req.params.id; 
        const task = await Task.findById(id);
        if(!task){
            return res.status(400).json({ success: false, message: "Task not found" });
        }
        res.status(200).json({ success: true, message: "Task found", task });
    } catch (error) {
        res.status(500).json({ success:false, message: "Internal server error", error });
    }
}

export const createTask = async (req, res) => {
    try {
        const { title, description, category } = req.body; 

        if(!title || !description || !category){
            res.status(400).json({success: false, message: "Please fill all the fields"});
        }

        const newTask = new Task({
            userId: req.user._id,
            title,
            description,
            category
        });

        await newTask.save();

        if (!newTask) {
            return res.status(400).json({ success: false, message: "Task not created" });
        }

        res.status(200).json({ success: true, message: "Task created", task: newTask });
    } catch (error) {
        console.error("Error in createTask:", error);
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
};


export const updateTask = async (req, res) => {
    try {
        const id = req.params.id; 
        const { title, description, category, status} = req.body;
        if(!title || !description || !category || !status){
            res.status(400).json({success: false, message: "Please fill all the fields"});
        }
        const updatedTask = await Task.findByIdAndUpdate(id, { title, description, category, status }, { new: true });

        if(!updatedTask){
            res.status(400).json({ success:false, message: "Task does not exist" })
        }
        res.status(200).json({ success:true, message: "Task updated", task:updatedTask });
    } catch (error) {
        res.status(500).json({ success:false, message: "Internal server error", error });
    }
}

export const deleteTask = async (req, res) => {
    const id = req.params.id; 
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if(!deletedTask){
            return res.status(400).json({success: false, message: "Task not found" }); 
        } 
        res.status(200).json({success: true, message: "Task deleted", task: deletedTask});
    } catch (error) {
        res.status(500).send({success: false, message: "Internal server error", error });
    }
}

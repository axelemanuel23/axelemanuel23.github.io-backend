const boom = require("@hapi/boom");
const { todos } = require("./models");
class ToDoService {
    //Create One
    async create(req, res, next){
        try{
            const exist = await todos.find({text: req.body.text});
            const newTodo = new todos(req.body);
            const match = exist.filter((todo) => todo.text.toLowerCase() == newTodo.text.toLowerCase());
            if(!match.length>=1){
               newTodo.save();
                res.status(201)
                    .json({
                        message: "Created",
                        data: newTodo,
                    }); 
            }else{
                throw boom.conflict("Already Exist", match);
            }
        }catch(err){
            err.serviceError = true;
            next(err)
        }
    }
    //Get All
    async find(req, res, next){
        try{
            const list = await todos.find();
            res.status(200)
                .json({
                    message: "Succeed",
                    data: list,
                });
        }catch(err){
            err.serviceError = true,
            next(err)
        }
    }

    //Get One by Id
    // async findOne(req, res, next){
    //     try{
    //         const todo = await todos.findById(req.params.id);
    //         if(todo == []){
    //             throw boom.notFound("Not found");
    //         }
    //         res.status(200)
    //             .json({
    //                 message: "Succeed",
    //                 data: todo,
    //             });
    //     }catch(err){
    //         err.serviceError = true;
    //         next(err);
    //     }
    // }


    //Update One
    async update(req, res, next){
        try{
            const todo = await todos.findByIdAndUpdate(req.params.id, req.body);
            if(todo.length==0){
                throw boom.notFound("Not found");
            }
            res.status(200)
                .json({
                    message: "Updated",
                    data: {
                        old: todo,
                        new: req.body
                    }
                });     
        }catch(err){
            err.serviceError = true;
            next(err)
        }
    }

    //Complete

    //Uncomplete
    
    //Delete One

    async delete(req, res, next){
        try{
            const todo = await todos.findOneAndDelete({_id: req.params.id});
            if(todo == null){
                throw boom.notFound("Not found");
            }
            res.status(200)
                .json({
                    message: "Deleted",
                    data: todo
                });
        }catch(err){
            err.serviceError = true;
            next(err)
        }
    }
    
    //Filter

    // async filter(req, res, next){
    //     try{
    //         const list = await todos.find(req.query);
    //         if(list == null){
    //             throw boom.notFound("Not found");
    //         }
    //         res.status(200)
    //             .json({
    //                 message: "Succeed",
    //                 data: list,
    //             })
    //     }catch(err){
    //         err.serviceError = true;
    //         next(err)
    //     }
    // }
}

module.exports = { ToDoService };
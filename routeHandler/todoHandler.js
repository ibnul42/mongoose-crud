const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');

const Todo = new mongoose.model("Todo", todoSchema);

// get all todos
router.get('/', async(req, res) => {
    await Todo.find({status: 'active'})
      .select({
        //   filds wants to show, hide
        _id: 0,
        __v: 0,
        date: 0,
      })
      .limit(1)
      .exec((err, data) => {
        if(err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                result: data,
                message: "Data's poped successfully!",
            });
        }
    })
})

// get a todos
router.get('/:id', async(req, res) => {
    await Todo.find({_id: req.params.id}, (err, data) => {
        if(err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                result: data,
                message: "Data's poped successfully!",
            });
        }
    })
})

// post a todo
router.post('/', async(req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save((err) => {
        if(err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Data inserted successfully!",
            });
        }
    });
});

// post multiple todos
router.post('/all', async(req, res) => {
    await Todo.insertMany(req.body, (err) => {
        if(err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Data's inserted successfully!",
            });
        }
    });
})

// put todos
router.put('/:id', async(req, res) => {
    const result = Todo.findByIdAndUpdate(
        {_id: req.params.id}, 
        {
            $set: {
                status: 'active',
            }
        },
        {
            new: true,
            useFindAndModify: false,
        },
        (err) => {
            if(err) {
                res.status(500).json({
                    error: "There was a server side error!",
                });
            } else {
                res.status(200).json({
                    message: "Data updated successfully!",
                });
                }
            }
            );
})

// delete todos
router.delete('/:id', async(req, res) => {
    await Todo.findOneAndRemove({_id: req.params.id}, (err) => {
        if(err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Data deleted successfully!",
            });
        }
    })
})

module.exports = router;
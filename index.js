import bodyParser from 'body-parser'
import express from 'express'

const app=express()
app.use(bodyParser.json())

const PORT=5111
const todos=[
    {id:1,title:'task1', completed: true},
    {id:2,title:'task2', completed: true},
    {id:3,title:'task3', completed: true}
]
app.all('/',(req,res)=>{
    res.send('I am running')
})

app.get('/todos',(req,res)=>{
    res.json(todos)
})

app.post('/todos',(req,res)=>{
    const newTodo = req.body;
    todos.push(newTodo)
    res.json({
        message: 'TODO added'
    })
})

app.put('/todos/:id',(req,res)=>{
    const newTodo = req.body
    const todoIndex = todos.findIndex((todo)=>{
        return todo.id == req.params.id
    })
    if(todoIndex !=-1){
        todos[todoIndex]={
            id: req.params.id,
            ...newTodo
        }
    }
    console.log(todoIndex,todos, newTodo)
    return res.json({
        message:'TODO updated'
    })
})

app.delete('/todos/:id',(req,res)=>{
    const todoIndex = todos.findIndex((todo)=>{
        return todo.id == req.params.id
    })

    if(todoIndex !=-1){
        todos.splice(todoIndex,1)
    }
    res.json({
        messages:'TODO deleted'
    })
})

app.listen(PORT,()=>{
    console.log(`server running on ${PORT} `)
})
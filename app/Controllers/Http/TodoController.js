'use strict'

const Todo = use('App/Models/Todo');

const { validateAll } = use('Validator');

class TodoController {
    async index({ view, auth }) {


        const todos = await auth.user.todos().fetch();

        console.log(todos)

    
        return view.render('home', {
            todos: todos.toJSON()
        })
    }

    async destroy( { response, session, params }) {
        const { id } = params

        const todo = await Todo.find(id);

        if (todo) {
            await todo.delete();
            session.flash( {
                notification: 'Todo deleted successfully'
            })
            return response.redirect('/')
        }
    }

    async edit({ request, session, params, view }) {

        const todo = await Todo.find(params.id);

        if(todo) {
            return view.render('edit-todo', { todo })
        }


        session.flash({ notification: "Todo was not found" })
        return response.redirect('/')

    }

    async store({ request, response, session, auth }) {
        const body = request.all();

        // validate the data
        const rules = {
            text: 'required|min:8'
        } 

        const messages = {
            'text.required': 'Please provide a text',
            'text.min': 'Less characters aint allowed!'
        }

        const validator = await validateAll(body, rules, messages);

        if(validator.fails()) {
            session.withErrors(validator.messages()).flashAll();
            return response.redirect('/')
        }

        const todo = await auth.user.todos().create({
            text: body.text
        });

        session.flash({
            notification: 'Todo created successfully'
        })

        return response.redirect('/dashboard')
    }
}

module.exports = TodoController

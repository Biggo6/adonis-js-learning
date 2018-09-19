'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Todo = use('App/Models/Todo')
const User = use('App/Models/User')
const SpreadSheet = use('SpreadSheet')
const Route = use('Route')

Route.on('/').render('index');
Route.get('/dashboard', 'TodoController.index').middleware('auth')
Route.get('/todos/delete/:id', 'TodoController.destroy');
Route.get('/todos/edit/:id', 'TodoController.edit');
Route.post('/', 'TodoController.store').middleware('auth')





Route.group(() => {
    Route.get('/signup', 'UserController.signup')
    Route.post('/signup', 'UserController.store').validator('SignUpUser')
    Route.get('/signin', 'UserController.signin')
    Route.post('/signin', 'UserController.login')
}).middleware('redAuth')


Route.get('/logout', async ({ auth, response }) => {
    await auth.logout()
    return response.redirect('/')
})


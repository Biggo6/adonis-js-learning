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

const Route = use('Route')

Route.get('/', 'TodoController.index');
Route.get('/todos/delete/:id', 'TodoController.destroy');
Route.get('/todos/edit/:id', 'TodoController.edit');
Route.post('/', 'TodoController.store');



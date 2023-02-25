/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// Route.get('/', async (response): HttpContact => {
//   //to docs
//   response.redirect().toPath('/some/url')
// })

Route.group(() => {
  //authorization (admin & user)
  Route.get('/hello', 'TestsController.hello')
  Route.post('/register', 'AuthController.register')
  Route.post('/login', 'AuthController.login')
  Route.post('/otp-confirmation', 'AuthController.confirmOtp')
  Route.post('/profile', 'AuthController.profile').middleware('auth')

  //kategori (admin)
  Route.resource('/kategori', 'KategorisController')
    .apiOnly()
    .middleware({ '*': ['auth', 'admin'] })

  //buku (admin)
  Route.resource('/buku', 'BukusController')
    .apiOnly()
    .middleware({ '*': ['auth', 'admin'] })

  Route.group(() => {
    //peminjaman buku (user)
    Route.post('/buku/:id/peminjaman', 'PeminjamanController.store')

    //peminjaman (user)
    Route.get('/peminjaman', 'PeminjamanController.index')
    Route.get('/peminjaman/:id', 'PeminjamanController.show')
  }).middleware(['auth'])
}).prefix('api/v1')

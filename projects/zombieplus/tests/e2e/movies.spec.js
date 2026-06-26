const { test, expect } = require('@playwright/test')

const { LoginPage } = require('../pages/LoginPage')
const { Toast } = require('../pages/Components')
const { MoviesPage } = require('../pages/MoviesPage')

let loginPage
let moviesPage
let toast

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  toast = new Toast(page)
  moviesPage = new MoviesPage(page)
})


test('deve poder cadastrar um novo filme', async ({ page }) => {

  //é importante estar logado
  await loginPage.visit()
  await loginPage.submit('admin@zombieplus.com', 'pwd123')
  await moviesPage.isLoggedIn()

  await moviesPage.create('Nome do filme', 'Sinopse do filme', 'Netflix', '1980')
})
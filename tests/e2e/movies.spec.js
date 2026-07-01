const { test, expect } = require('../support')
const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database')

test('deve poder cadastrar um novo filme', async ({ page }) => {
  const movie = data.create
  console.log(movie.title)
  await executeSQL(`DELETE FROM public.movies WHERE title = '${movie.title}';`)

  //é importante estar logado
  await page.login.visit()
  await page.login.submit('admin@zombieplus.com', 'pwd123')
  await page.movies.isLoggedIn()

  await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)

  await page.toast.containText('Cadastro realizado com sucesso!')
})
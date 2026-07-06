const { expect } = require('@playwright/test')

export class Movies {

     constructor(page) {
        this.page = page
    }

    async goForm() {
        await this.page.locator('a[href$="register"]').click()
    }

    async submit(){
        await this.page.getByRole('button', {name: "Cadastrar"}).click()
    }

    async create(movie){
        await this.page.movies.goForm()

        await this.page.getByLabel('Titulo do filme').fill(movie.title)
        await this.page.getByLabel('Sinopse').fill(movie.overview)

        await this.page.locator('#select_company_id .react-select__dropdown-indicator')
            .click()

        await this.page.locator('.react-select__option')
            .filter({hasText: movie.company})
            .click()

        await this.page.locator('#select_year .react-select__indicator')
            .click()

        await this.page.locator('.react-select__option')
            .filter({hasText: movie.release_year})
            .click()

        await this.page
            .locator('input[name=cover]')
            .setInputFiles('tests/support/fixtures' + movie.cover)
// se o featured for true acontece , se não, passa 
        if (movie.featured) {
            await this.page.locator('.featured .react-switch').click()
        }


        await this.page.movies.submit()
    } 

    async alertHaveText(target) {
          await expect(this.page.locator('.alert')).toHaveText(target)
    }

    async remove(title){
        await this.page.getByRole('row', {name: title}).getByRole('button').click()

        await this.page.click('.confirm-removal')
    }

}
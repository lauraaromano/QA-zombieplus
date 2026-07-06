import { expect } from '@playwright/test';
export class Leads {

    constructor(page) {
        this.page = page
    }

    async visit(){
        await this.page.goto('http://localhost:3000')
    }

    async openLeadModal(){
        await this.page.getByRole('button', { name: 'Aperte o play... se tiver coragem' }).click()

        await expect(
            this.page.getByTestId('modal').getByRole('heading')
        ).toHaveText('Fila de espera')
    }

    async submitLeadForm(name, email){
        //ELEMENTO[PROP=VALUE]
        await this.page.locator('input[name=name]').fill(name)
          // com id
        await this.page.locator('#email').fill(email)
          //await page.locator('input[email=email]').fill(email)
        await this.page.getByTestId('modal').getByText('Quero entrar na fila!').click()
    }


//target = alvo de validação
    async alertHaveText(target) {
          await expect(this.page.locator('.alert')).toHaveText(target)
    }

    async haveText(target) {
          await expect(this.page.locator('.alert')).toHaveText(target)
    }

}
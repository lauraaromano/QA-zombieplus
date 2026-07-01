const { test, expect } = require('@playwright/test')
const { LandingPage } = require('../pages/LandingPage')
const {Toast} = require('../pages/Components')
const { faker } = require('@faker-js/faker')


let landingPage
let toast

// para não repetir o código (  const landingPage = new LandingPage(page)) em todos os testes
test.beforeEach(async({page}) => {
  landingPage = new LandingPage(page)
  toast = new Toast(page)
})


test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()
  
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await toast.haveText(message)

});


test('não deve cadastrar quando um email que já existe', async ({ page, request }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  const newLead = await request.post('http://localhost:3333/leads',{
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  expect(newLead.ok()).toBeTruthy()

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, leadEmail)

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await toast.haveText(message)

});

test('não deve cadastrar com email incorreto', async ({ page }) => {
  
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Laura Teste', 'laura.com.br')


  await landingPage.alertHaveText('Email incorreto')

});


test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', 'laura@gmail.com')


 await landingPage.alertHaveText('Campo obrigatório')

});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {
  
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Laura Teste', '')


  await landingPage.alertHaveText('Campo obrigatório')

});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('','')

  // fazer array para cada validação que o sistema dá
  await landingPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])

});
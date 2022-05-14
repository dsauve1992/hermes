import express from 'express'
import { ListCompanyUseCase } from '../usecases/listCompanies/ListCompanyUseCase'
import MySqlCompanyRepository from '../infrastructure/repository/mysql/MySqlCompanyRepository'
import { ListCompanyUseCaseResponse } from '../usecases/listCompanies/ListCompanyUseCaseResponse'

const companyRouter = express.Router()

companyRouter.get('/', async function (req, res) {
  const useCase = new ListCompanyUseCase(new MySqlCompanyRepository())

  const response: ListCompanyUseCaseResponse = await useCase.execute()

  res.render('company-list', response)
})

export default companyRouter

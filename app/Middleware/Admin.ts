import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Admin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const users = auth.user?.role === 'admin'

    if (!users) {
      return response.unauthorized({
        message: 'anda tidak bisa mengakses',
      })
    }

    await next()
  }
}

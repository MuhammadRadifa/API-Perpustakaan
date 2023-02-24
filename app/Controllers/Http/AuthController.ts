import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'
import RegisterValidator from 'App/Validators/RegisterValidator'
import OtpValidator from 'App/Validators/OtpValidator'
import ProfileValidator from 'App/Validators/ProfileValidator'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    try {
      const dataValidation = await request.validate(RegisterValidator)
      const otpcode = Math.floor(100000 + Math.random() * 900000)

      const users = await User.create(dataValidation)

      await users.related('otp').updateOrCreate({}, { otpcode })

      await Mail.send((message) => {
        message
          .from('info@example.com')
          .to(dataValidation.email)
          .subject('Welcome Onboard!')
          .htmlView('otp', { otpcode })
      })

      return response.created({
        message: 'berhasil registrasi silahkan cek email untuk verifikasi otp',
      })
    } catch (error) {
      return response.unprocessableEntity({
        messsage: error,
      })
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    try {
      const { email, password } = await request.validate(LoginValidator)

      const users = await User.findByOrFail('email', email)

      if (!users.verifikasi) {
        return response.badRequest({
          message: 'akun belum terverifikasi',
        })
      }

      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '1 days',
      })

      return response.ok({
        message: 'berhasil Login',
        token,
      })
    } catch (error) {
      return response.badRequest({
        message: 'gagal untuk login',
        error,
      })
    }
  }
  public async confirmOtp({ request, response }: HttpContextContract) {
    try {
      const dataValidation = await request.validate(OtpValidator)

      const checkRegist = await User.query().where('email', dataValidation.email).preload('otp')

      if (checkRegist.length < 1) {
        return response.badRequest({
          message: 'akun belum registrasi',
        })
      }

      const otpVerif = checkRegist.find((user) => {
        return user.otp.otpcode === dataValidation.otpcode
      })

      if (!otpVerif) {
        return response.badRequest({
          message: 'kode otp salah',
        })
      }

      await User.query().where('email', dataValidation.email).update({ verifikasi: true })

      return response.ok({
        message: 'Selamat berhasil Verifikasi Code',
      })
    } catch (error) {
      return response.badRequest({
        message: error,
      })
    }
  }

  public async profile({ request, response, auth }: HttpContextContract) {
    try {
      const user = auth.user

      const dataValidation = await request.validate(ProfileValidator)

      await user?.related('profile').updateOrCreate({}, dataValidation)

      return response.created({
        message: 'Berhasil Mengupdate Data',
      })
    } catch (error) {
      return response.badRequest({
        message: error,
      })
    }
  }
}

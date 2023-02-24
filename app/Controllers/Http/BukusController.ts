import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Buku from 'App/Models/Buku'
import BukuValidator from 'App/Validators/BukuValidator'

export default class BukusController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await Buku.query().preload('kategori')
      if (data.length > 0) {
        return response.ok({
          message: 'Berhasil Mendapatkan data',
          data,
        })
      }
    } catch (error) {
      return response.badRequest({
        message: 'gagal Mendapatkan Data',
        error,
      })
    }
  }
  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(BukuValidator)
      const insertData = await Buku.create({
        ...payload,
        tahun_terbit: payload.tahun_terbit?.toSQLDate(),
      })
      if (insertData) {
        return response.ok({
          message: 'Berhasil Menginput data',
        })
      }
    } catch (error) {
      return response.badRequest({
        message: 'gagal Menginput data',
        error,
      })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    const data = await Buku.query().where('id', params.id).preload('kategori')

    if (data) {
      return response.ok({
        message: 'Berhasil Mendapatkan data',
        data,
      })
    }
    return response.notFound({
      message: 'data tidak ditemukan',
    })
  }
  public async update({ request, response, params }: HttpContextContract) {
    const payload = await request.validate(BukuValidator)
    const data = await Buku.findOrFail(params.id)
    const updateData = await data
      .merge({ ...payload, tahun_terbit: payload.tahun_terbit?.toSQLDate() })
      .save()
    if (updateData) {
      return response.ok({
        message: 'Berhasil Mengupdate',
      })
    }
    return response.notFound({
      message: 'data tidak ditemukan',
    })
  }
  public async destroy({ response, params }: HttpContextContract) {
    const data = await Buku.findOrFail(params.id)
    await data.delete()

    if (data) {
      return response.ok({
        message: 'Berhasil Menghapus data',
      })
    }
    return response.notFound({
      message: 'data tidak ditemukan',
    })
  }
}

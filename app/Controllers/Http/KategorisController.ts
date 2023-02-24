import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Kategori from 'App/Models/Kategori'
import KategoriValidator from 'App/Validators/KategoriValidator'

export default class KategorisController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await Kategori.all()
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
      const payload = await request.validate(KategoriValidator)
      const insertData = await Kategori.create(payload)
      if (insertData) {
        return response.ok({
          message: 'Berhasil Menginput Nama',
        })
      }
    } catch (error) {
      return response.badRequest({
        message: 'gagal Menginput Nama',
        error,
      })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    const data = await Kategori.findOrFail(params.id)

    console.log(data)
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
    const payload = await request.validate(KategoriValidator)
    const data = await Kategori.findOrFail(params.id)
    const updateData = await data.merge(payload).save()
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
    const data = await Kategori.findOrFail(params.id)
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

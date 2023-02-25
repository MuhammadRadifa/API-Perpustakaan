import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Peminjaman from 'App/Models/Peminjaman'
import PeminjamanValidator from 'App/Validators/PeminjamanValidator'

export default class PeminjamenController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await Peminjaman.query()
        .preload('user')
        .preload('buku', (buku) => {
          buku.preload('kategori')
        })
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
  public async store({ request, response, auth, params }: HttpContextContract) {
    try {
      const users = auth.user
      const payload = await request.validate(PeminjamanValidator)
      const data = {
        peminjaman: payload.peminjaman.toSQLDate(),
        pengembalian: payload.peminjaman.toSQLDate(),
        buku_id: params.id,
      }

      await users?.related('peminjaman').create(data)

      return response.ok({
        message: 'berhasil meminjam',
      })
    } catch (error) {
      return response.badRequest({
        message: 'gagal Menginput Nama',
        error,
      })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    const data = await Peminjaman.query()
      .where('id', params.id)
      .preload('user')
      .preload('buku', (buku) => {
        buku.preload('kategori')
      })

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
}

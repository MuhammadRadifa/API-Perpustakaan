import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Peminjaman from 'App/Models/Peminjaman'
import PeminjamanValidator from 'App/Validators/PeminjamanValidator'

export default class PeminjamenController {
  /**
   * @swagger
   * path:
   * /api/v1/peminjaman:
   *    get:
   *     security:
   *      - bearerAuth: []
   *     tags:
   *       - Peminjaman
   *     responses:
   *       200:
   *         description: Success
   *
   */
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
  /**
   * @swagger
   * path:
   * /api/v1/buku/{id}/peminjaman:
   *    post:
   *     security:
   *      - bearerAuth: []
   *     tags:
   *       - Peminjaman
   *     parameters:
   *      - in: path
   *        name: id
   *        schema:
   *         type: integer
   *        required: true
   *        description: id dari buku
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           description: User payload
   *           schema:
   *             type: object
   *             properties:
   *               peminjaman:
   *                 type: date
   *                 example: '20-07-2022'
   *                 required: true
   *               pengembalian:
   *                 type: date
   *                 example: '01-01-2023'
   *                 required: true
   *     responses:
   *       201:
   *         description: created
   *
   */
  public async store({ request, response, auth, params }: HttpContextContract) {
    try {
      const users = auth.user
      const payload = await request.validate(PeminjamanValidator)
      const data = {
        peminjaman: payload.peminjaman.toSQLDate(),
        pengembalian: payload.pengembalian.toSQLDate(),
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
  /**
   * @swagger
   * path:
   * /api/v1/peminjaman/{id}:
   *    get:
   *     security:
   *      - bearerAuth: []
   *     tags:
   *       - Peminjaman
   *     parameters:
   *      - in: path
   *        name: id
   *        schema:
   *         type: integer
   *        required: true
   *        description: id dari peminjaman
   *     responses:
   *       201:
   *         description: created
   *
   */
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

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Buku from 'App/Models/Buku'
import BukuValidator from 'App/Validators/BukuValidator'

export default class BukusController {
  /**
   * @swagger
   * path:
   * /api/v1/buku:
   *    get:
   *     security:
   *      - bearerAuth: []
   *     tags:
   *       - Buku
   *     responses:
   *       200:
   *         description: Success
   *
   */
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
  /**
   * @swagger
   * path:
   * /api/v1/buku:
   *    post:
   *     security:
   *      - bearerAuth: []
   *     tags:
   *       - Buku
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           description: User payload
   *           schema:
   *             type: object
   *             properties:
   *               judul:
   *                 type: string
   *                 example: 'RPG mobile'
   *                 required: true
   *               ringkasan:
   *                 type: string
   *                 example: 'RPG adalah permainan'
   *                 required: true
   *               tahun_terbit:
   *                 type: date
   *                 example: '09-09-2009'
   *                 required: true
   *               halaman:
   *                 type: number
   *                 example: 200
   *                 required: true
   *               kategori_id:
   *                 type: number
   *                 example: 2
   *                 required: true
   *     responses:
   *       200:
   *         description: success
   *
   */
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

  /**
   * @swagger
   * path:
   * /api/v1/buku/{id}:
   *    get:
   *     security:
   *      - bearerAuth: []
   *     tags:
   *       - Buku
   *     parameters:
   *      - in: path
   *        name: id
   *        schema:
   *         type: integer
   *        required: true
   *        description: id dari buku
   *
   *     responses:
   *       200:
   *         description: success
   *
   */

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
  /**
   * @swagger
   * path:
   * /api/v1/buku/{id}:
   *    put:
   *     security:
   *      - bearerAuth: []
   *     tags:
   *       - Buku
   *     parameters:
   *      - in: path
   *        name: id
   *        schema:
   *         type: integer
   *        required: true
   *        description: id dari kategori
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           description: User payload
   *           schema:
   *             type: object
   *             properties:
   *               judul:
   *                 type: string
   *                 example: 'RPG mobile'
   *                 required: false
   *               ringkasan:
   *                 type: string
   *                 example: 'RPG adalah permainan'
   *                 required: false
   *               tahun_terbit:
   *                 type: date
   *                 example: '09-09-2009'
   *                 required: false
   *               halaman:
   *                 type: number
   *                 example: 200
   *                 required: false
   *               kategori_id:
   *                 type: number
   *                 example: 2
   *                 required: false
   *     responses:
   *       200:
   *         description: success
   *
   */
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

  /**
   * @swagger
   * path:
   * /api/v1/buku/{id}:
   *    delete:
   *     security:
   *      - bearerAuth: []
   *     tags:
   *       - Buku
   *     parameters:
   *      - in: path
   *        name: id
   *        schema:
   *         type: integer
   *        required: true
   *        description: id dari buku
   *
   *     responses:
   *       200:
   *         description: success
   *
   */
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

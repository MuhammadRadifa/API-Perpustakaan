import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Kategori from 'App/Models/Kategori'
import KategoriValidator from 'App/Validators/KategoriValidator'

export default class KategorisController {
  /**
   * @swagger
   * path:
   * /api/v1/kategori:
   *    get:
   *     security:
   *      - bearerAuth: []
   *     tags:
   *       - Kategori
   *     responses:
   *       200:
   *         description: Success
   *
   */
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
  /**
   * @swagger
   * path:
   * /api/v1/kategori:
   *    post:
   *     security:
   *      - bearerAuth: []
   *     tags:
   *       - Kategori
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           description: User payload
   *           schema:
   *             type: object
   *             properties:
   *               nama:
   *                 type: string
   *                 example: 'RPG'
   *                 required: true
   *     responses:
   *       201:
   *         description: created
   *
   */
  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(KategoriValidator)
      const insertData = await Kategori.create(payload)
      if (insertData) {
        return response.ok({
          message: 'Berhasil Menginput kategori',
        })
      }
    } catch (error) {
      return response.badRequest({
        message: 'gagal Menginput kategori',
        error,
      })
    }
  }
  /**
   * @swagger
   * path:
   * /api/v1/kategori/{id}:
   *    get:
   *     security:
   *      - bearerAuth: []
   *     tags:
   *       - Kategori
   *     parameters:
   *      - in: path
   *        name: id
   *        schema:
   *         type: integer
   *        required: true
   *        description: id dari kategori
   *
   *     responses:
   *       200:
   *         description: success
   *
   */

  public async show({ response, params }: HttpContextContract) {
    const data = await Kategori.findOrFail(params.id)

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
   * /api/v1/kategori/{id}:
   *    put:
   *     security:
   *      - bearerAuth: []
   *     tags:
   *       - Kategori
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
   *               nama:
   *                 type: string
   *                 example: 'RPG'
   *                 required: true
   *     responses:
   *       200:
   *         description: success
   *
   */
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
  /**
   * @swagger
   * path:
   * /api/v1/kategori/{id}:
   *    delete:
   *     security:
   *      - bearerAuth: []
   *     tags:
   *       - Kategori
   *     parameters:
   *      - in: path
   *        name: id
   *        schema:
   *         type: integer
   *        required: true
   *        description: id dari kategori
   *
   *     responses:
   *       200:
   *         description: success
   *
   */
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

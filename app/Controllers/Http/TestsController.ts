import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TestsController {
  /**
   * @swagger
   * path:
   * api/v1/hello:
   *    get:
   *     tags:
   *       - Users
   *     requestBody:
   *       required: false
   *       content:
   *         application/json:
   *           description: User payload
   *           schema:
   *             type: object
   *             properties:
   *               phone:
   *                 type: string
   *                 example: 'James Bond'
   *                 required: true
   *               email:
   *                 type: string
   *                 example: 'Bond007@example.com'
   *                 required: true
   *     responses:
   *       200:
   *         description: Success
   *
   */
  public async hello({ response }: HttpContextContract) {
    response.json({
      message: 'hello world',
    })
  }
}

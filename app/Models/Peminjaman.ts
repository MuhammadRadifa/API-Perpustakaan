import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Buku from './Buku'

export default class Peminjaman extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public peminjaman: string

  @column()
  public pengembalian: string

  @column()
  public user_id: number

  @column()
  public buku_id: number

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Buku, {
    foreignKey: 'buku_id',
  })
  public buku: BelongsTo<typeof Buku>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

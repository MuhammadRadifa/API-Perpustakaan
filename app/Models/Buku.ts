import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Kategori from './Kategori'

export default class Buku extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public judul: string

  @column()
  public ringkasan: string

  @column()
  public tahun_terbit: string

  @column()
  public halaman: number

  @column()
  public kategori_id: number

  @belongsTo(() => Kategori, {
    foreignKey: 'kategori_id',
  })
  public kategori: BelongsTo<typeof Kategori>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

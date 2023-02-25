import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Kategori from './Kategori'
import Peminjaman from './Peminjaman'

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

  @hasMany(() => Peminjaman, {
    foreignKey: 'buku_id',
  })
  public peminjaman: HasMany<typeof Peminjaman>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

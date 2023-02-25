import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasOne,
  HasOne,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Otp from './Otp'
import Profile from './Profile'
import Peminjaman from './Peminjaman'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nama: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public role: string

  @column()
  public verifikasi: boolean

  @column()
  public rememberMeToken: string | null

  @hasOne(() => Otp, {
    foreignKey: 'user_id', // defaults to userId
  })
  public otp: HasOne<typeof Otp>

  @hasOne(() => Profile, {
    foreignKey: 'user_id', // defaults to userId
  })
  public profile: HasOne<typeof Profile>

  @hasMany(() => Peminjaman, {
    foreignKey: 'user_id',
  })
  public peminjaman: HasMany<typeof Peminjaman>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}

import { DataTypes, Model } from '../deps.ts'

class User extends Model {
  static table = 'users'
  static timestamps = true
  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: { type: DataTypes.STRING, length: 256, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  }
}

export default User

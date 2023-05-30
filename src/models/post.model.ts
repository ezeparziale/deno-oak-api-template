import { DataTypes, Model } from '../deps.ts'
import User from './user.model.ts'

class Post extends Model {
  static table = 'posts'
  static timestamps = true
  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: { type: DataTypes.STRING, length: 256, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
    published: { type: DataTypes.BOOLEAN, allowNull: false },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      relationship: {
        kind: 'single' as const,
        model: User,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    },
  }
  static author() {
    return this.hasOne(User)
  }
}

export default Post

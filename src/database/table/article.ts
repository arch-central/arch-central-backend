import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database";

interface ArticleType {
    id: number
    title: string
    description: string
    date: Date
    author: string
    tags: string[]
}

interface ArticleCreationType extends Optional<ArticleType, 'id'> {}

export interface ArticleInstance extends Model<ArticleType, ArticleCreationType>, ArticleType { }

const Article = sequelize.define<ArticleInstance>(
    'article',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATEONLY
        },
        author: {
            type: DataTypes.STRING
        },
        tags: {
            type: DataTypes.VIRTUAL
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)

export default Article
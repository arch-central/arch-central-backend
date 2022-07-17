import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

interface TagType {
    name: string
    articleId: number
}
export interface TagInstance extends Model<TagType>, TagType { }

const Tag = sequelize.define<TagInstance>(
    'tag',
    {
        name: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        articleId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)

export default Tag
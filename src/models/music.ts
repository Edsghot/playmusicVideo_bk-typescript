import sequelize from '../db/connection'
import { DataTypes } from 'sequelize'

const Music = sequelize.define('Music',{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    url: {
        type: DataTypes.STRING,
    },
    download:{
        type: DataTypes.BOOLEAN
    },
    state:{
        type: DataTypes.BOOLEAN
    }
})

export default Music;
import sequelize from '../db/connection'
import { DataTypes } from 'sequelize'


const Video = sequelize.define("Videos",{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    url:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    download: {
        type:DataTypes.BOOLEAN
    },
    state:{
        type: DataTypes.BOOLEAN
    }

})

export default Video
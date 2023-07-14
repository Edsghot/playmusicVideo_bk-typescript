import sequelize from '../db/connection'
import { DataTypes } from 'sequelize'

const User = sequelize.define('Users',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
    },
    email:{
        type: DataTypes.STRING,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
    },
    state: {
        type:DataTypes.BOOLEAN,
        defaultValue: true
    },
});

export default User;
import {Sequelize} from 'sequelize'


const sequelize = new Sequelize('edsghotprueba','edsghot1','edsghot123.',{
    dialect:'mysql',
    host: 'db4free.net',
    port: 3306,
});


export default sequelize;
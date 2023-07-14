import {Sequelize} from 'sequelize'


const sequelize = new Sequelize('playmusicvideo','edsghot','Repro12345.',{
    dialect:'mysql',
    host: 'db4free.net',
    port: 3306,
});


export default sequelize;
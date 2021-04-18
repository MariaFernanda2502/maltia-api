require('dotenv').config();
const { Sequelize } = require('sequelize');

// IMPORTANDO ESQUEMAS
const UserModel = require('./Models/user.js');
const AdviserModel = require('./Models/adviser.js');
const AnalystModel = require('./Models/analyst.js');
const StoreModel = require('./Models/store.js');
const ClientApplicationModel = require('./Models/client-application.js');
const ProspectModel = require('./Models/prospect.js');
const BorrowerModel = require('./Models/borrower.js');

// INSTANCIA PARA PODER HACER EL INICIO DE SESIÓN

const DB = new Sequelize(
    process.env.DB,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        dialect: 'mssql',
        host: process.env.DB_HOST,
        port: 1433,
        protocol: 'tcp',
        dialectOptions: {
            encrypt: true,
        }
    }
)

DB.authenticate()
    .then(() => {
        console.log('Connection has been established successfully');
    })
    .catch((err) => {
        console.error('Unable to connect to the database', err);
    })


// CREANDO MODELOS
const User = UserModel(DB, Sequelize);
const Adviser = AdviserModel(DB, Sequelize);
const Analyst = AnalystModel(DB, Sequelize);
const Store = StoreModel(DB, Sequelize);
const ClientApplication = ClientApplicationModel(DB, Sequelize);
const Prospect = ProspectModel(DB, Sequelize);
const Borrower = BorrowerModel(DB, Sequelize);


// RELACIONES
// adviser(1), user(1) HERENCIA
/*
Adviser.belongsTo(User, { foreignKey:'userId', as:'user' });
User.hasOne(Adviser, {as: 'adviser'});

// analyst(1), user(1) HERENCIA
Analyst.belongsTo(User, { foreignKey:'userId', as:'user' });
User.hasOne(Analyst, {as: 'analyst'});

// prospect(*), adviser(1)
Prospect.belongsTo(Adviser, { foreignKey:'userAdviserId', as:'adviser' });
Adviser.hasMany(Prospect, {as: 'prospects'})

// prospect(*), store(1)
Prospect.belongsTo(Store, {foreignKey:'storeId', as:'store' });
Store.hasMany(Prospect, { as:'prospects'});

// store(*), adviser(1)
Store.belognsTo(Adviser, { foreignKey:'userAdviserId', as:'adviser' });
Adviser.hasMany(Store, { as:'stores'});

// clientApplication(*), adviser(1)
clientApplication.belongsTo(Adviser, { foreignKey:'userAdviserId', as:'adviser' });
Adviser.hasMany(ClientApplication, { as: 'clientApplications' });

// clientApplication(*), analyst(1)
ClientApplication.belongsTo(Analyst, { foreignKey:'userAnalystId', as:'analyst' });
Analyst.hasMany(clientApplication, { as: 'clientApplications' });

// borrower(1), ClientApplication(1)
Borrower.belongsTo(ClientApplication, { foreignKey:'clientApplicationId', as:'clientApplication' });
ClientApplication.hasOne(Borrower, { as:'Borrower' });

// borrower(1), prospect(1)
borrower.belongsTo(prospect, { foreignKey:'prospectId', as:'prospect'});
prospect.hasOne(Borrower, { as:'Borrower' });
*/
// DB.sync({ force: true }) para hacer drop de las tablas antes del sync
DB.sync().
    then(() => {console.log(`Database & tables created!`)
    })
    .catch(err => console.error(err))


module.export = {
    User,
    Adviser,
    Analyst,
    Store,
    ClientApplication,
    Prospect,
    Borrower,
} 
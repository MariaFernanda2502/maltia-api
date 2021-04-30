require('dotenv').config();
const { Sequelize } = require('sequelize');

// IMPORTANDO ESQUEMAS
const EmployeeModel = require('./Models/employee');
const AdviserModel = require('./Models/adviser');
const AnalystModel = require('./Models/analyst');
const StoreModel = require('./Models/store');
const ClientApplicationModel = require('./Models/client-application');
const ProspectModel = require('./Models/prospect');
const BorrowerModel = require('./Models/borrower');
const ReportModel = require('./Models/report');

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
const Employee = EmployeeModel(DB, Sequelize);
const Adviser = AdviserModel(DB, Sequelize);
const Analyst = AnalystModel(DB, Sequelize);
const Store = StoreModel(DB, Sequelize);
const ClientApplication = ClientApplicationModel(DB, Sequelize);
const Prospect = ProspectModel(DB, Sequelize);
const Borrower = BorrowerModel(DB, Sequelize);
const Report = ReportModel(DB, Sequelize);

// RELACIONES
// adviser(1), user(1) HERENCIA
Adviser.belongsTo(Employee, { foreignKey:'userId' });
//Employee.Adviser = Employee.hasOne(Adviser);

// analyst(1), user(1) HERENCIA
Analyst.belongsTo(Employee, { foreignKey:'userId' });
//Employee.Analyst = Employee.hasOne(Analyst);

// prospect(*), adviser(1)
Prospect.belongsTo(Adviser, { foreignKey:'userAdviserId' });
//Adviser.Prospects = Adviser.hasMany(Prospect);

// prospect(*), store(1)
Prospect.belongsTo(Store, { foreignKey:'storeId' });
//Store.Prospects = Store.hasMany(Prospect);

// store(*), adviser(1)
Store.belongsTo(Adviser, { foreignKey:'userAdviserId' });
//Adviser.Stores = Adviser.hasMany(Store); 

// clientApplication(*), adviser(1)
ClientApplication.belongsTo(Adviser, { foreignKey:'userAdviserId' });
//Adviser.ClientApplications = Adviser.hasMany(ClientApplication);

// clientApplication(*), analyst(1)
ClientApplication.belongsTo(Analyst, { foreignKey:'userAnalystId' });
//Analyst.ClientApplications = Analyst.hasMany(ClientApplication);

// borrower(1), ClientApplication(1)
ClientApplication.belongsTo(Borrower, { foreignKey:'prospectId' });
//Borrower.ClientApplication = Borrower.hasOne(ClientApplication);

// borrower(1), prospect(1)
Borrower.belongsTo(Prospect, { foreignKey:'prospectId' });
//Prospect.Borrower = Prospect.hasOne(Borrower, { foreignKey:'prospectId' });

// analista(1), reportes(*)
Report.belongsTo(Analyst, { foreignKey:'userAnalystId'});
//Analyst.Reports = Analyst.hasMany(Report);

//para hacer drop de las tablas antes del sync
//DB.sync({ force: true })
DB.sync() 
    .then(() => {console.log(`Database & tables created!`)
    })
    .catch(err => console.error(err))

module.exports = {
    Employee,
    Adviser,
    Analyst,
    Store,
    ClientApplication,
    Prospect,
    Borrower,
    DB,
} 
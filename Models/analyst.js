module.exports = (DB, type) => {
    return DB.define('analyst',
    {
    userId: {
        foreignKey: true,
        primaryKey: true,
        type: type.INTEGER,
        references: {
            model: 'employees',
            key: 'userId'
    }
    },
    departamento: {
        type: type.STRING,
        noEmpty: true,
        defaultValue: 'OFICINA CENTRAL',
    }
}, {
    // Opción para permitir soft delete
    paranoid: true
})}
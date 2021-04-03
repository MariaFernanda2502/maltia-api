module.exports = (DB, type) => {
    return DB.define('analista',
    {
    idUsuario: {
        type: type.STRING,
        primaryKey: true,
        // Falta la foreign key referencia a USUARIO
    },
    departamento: {
        type: type.STRING,
        noEmpty: true,
        // No estoy segura de que se ponga así el default
        defaultValue: 'OFICINA CENTRAL',
    }
}, {
    // Opción para permitir soft delete
    paranoid: true
})
}
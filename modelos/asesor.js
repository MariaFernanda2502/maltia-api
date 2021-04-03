module.exports = (DB, type) => {
    return DB.define('asesor',
    {
    idUsuario: {
        type: type.STRING,
        primaryKey: true,
        // Falta la foreign key referencia a USUARIO
    },
}, {
    // Opción para permitir soft delete
    paranoid: true
})
}
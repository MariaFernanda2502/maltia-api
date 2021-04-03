module.exports = (DB, type) => {
    return DB.define('usuario',
    {
    idUsuario: {
        type: type.STRING,
        primaryKey: true,
    },
    contrasena: {
        type: type.STRING,
        noEmpty: true,
    },
    nombre:{
        type: type.STRING,
        noEmpty: true,
    },
    apellidoPaterno: {
        type: type.STRING,
        noEmpty: true,
    },
    apellidoMaterno: {
        type: type.STRING,
        noEmpty: true,
    },
    activo: {
        type: type.BOOLEAN,
        noEmpty: true,
    },
    correo: {
        type: type.STRING,
        noEmpty: true,
        validate: {
            isEmail: true,
        }
    },
    telefono: {
        type: type.INTERGER,
        noEmpty: true,
        validate: {
            isNumeric: true,
        }
    },
    puesto: {
        type: type.ENUM,
        values: ['Asesor', 'Administrador', 'Analista'],
        noEmpty: true,
    }
}, {
    // Opción para permitir soft delete
    paranoid: true
})
}
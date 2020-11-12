const { Sequelize, DataTypes } = require('sequelize');
const dbUrl = 'mysql://root:my-secret-pw@localhost:3306/mysql'
const sequelize = new Sequelize(dbUrl)
const User = sequelize.define(
    'User',
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING
        }
    }
);

async function connectAndInit() {
    await sequelize.authenticate()
    console.log(`Connected succesfully to ${dbUrl}`)
    await User.sync({force: false})
}

async function createUser() {
    const user = User.build({ firstName: 'Mark', lastName: 'Twain' });
    await user.save()
    console.log(`User ${user} saved`)
}

async function getUsers() {
    return await User.findAll()
}

async function main() {
    await connectAndInit()
    await createUser()
    const users = await getUsers();
    users.forEach( user => 
        console.log(`${user.firstName} - ${user.lastName}`)
    )
}

main()

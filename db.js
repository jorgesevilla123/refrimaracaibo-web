const {connect} = require('mongoose')








function startConnection(){
    connect(process.env.REFRI_DB_ONLINE).then(db => {console.log('DB is connected succesfully')})
    .catch( err => {console.log('error in db', err)})
}



module.exports = { startConnection }



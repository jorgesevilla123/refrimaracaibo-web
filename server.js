let express = require('express')
let path = require('path')
let app = express()
const { startConnection } = require('./db')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const productsRoutes = require('./routes/products-routes');
const sessionRoutes = require('./routes/session-routes');
const orderRoutes = require('./routes/orders-routes');

const RedisStore = require('connect-redis').default
const { createClient } = require('redis')
const { WebSocketServer, WebSocket } = require('ws')


const redisClient = createClient()

redisClient.on('error', err => console.log('Redis Client Error', err));




redisClient.connect().then( () => {
    console.log('connected to server')
}).catch( err => {console.log(err)})






let redisStore = new RedisStore({
    client: redisClient,
    prefix: "myapp:",
  })
  

let session = require('express-session')




app.use(session({
    store: redisStore,
    name: 'test-session',
    secret: 'some-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 18000
    }
}))

/////// express server logic ///////////
dotenv.config()
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));



app.use(express.static(__dirname + '/dist/refri-web'))



app.use('/api/products', productsRoutes);

app.use('/api/sessions', sessionRoutes);


app.use('/api/orders', orderRoutes);




// session handling code 





app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+
    '/dist/refri-web/index.html'));});



////////////////////////////////////////////////



    
const sockserver = new WebSocketServer({ port: 400 })


sockserver.on('connection', (ws, request) => {
    console.log('Nuevo cliente conectado!')
    const user = 'user' + sockserver.clients.size
    console.log(request)

    let client = new Map()

    client.set(user, ws)
   

  
    ws.on('close', () => {console.log('El cliente se ha desconectado')})
    ws.on('message', data => {


        console.log(`se ha recibido un mensaje del usuario: ${user}`)
     

        let message;



        try {
            message = JSON.parse(data)
        } catch(error){
            console.log('error parsing the message')
            return
        }

        

        if (message.type === 'NEW_MESSAGE'){
          
          sockserver.clients.forEach( client => {
            console.log(client.readyState)
            let msg = JSON.stringify(message)    
            client.send(msg)
          })
        }
       
    

    ws.on('error', err => {
        console.log('Error ocurred: ', err)
    })
   

})
})






function runServer(){

    
//////// websocket server logic /////////////////////





    startConnection();

    let port = process.env.PORT || 4300

    
    app.listen(port, () => {
        console.log('Node server running good on port: ', port)
    })

    
}



runServer()


module.exports = redisClient



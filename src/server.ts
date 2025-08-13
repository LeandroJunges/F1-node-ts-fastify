import fastify from "fastify";
import cors from '@fastify/cors';


const server = fastify({logger:true})
server.register(cors, {
    origin: '*'
})

const teams = [
  { "id": 1, "team": "Red Bull Racing", "base": "Milton Keynes, Reino Unido" },
  { "id": 2, "team": "Mercedes", "base": "Brackley, Reino Unido" },
  { "id": 3, "team": "Ferrari", "base": "Maranello, Itália" },
  { "id": 4, "team": "McLaren", "base": "Woking, Reino Unido" },
  { "id": 5, "team": "Aston Martin", "base": "Silverstone, Reino Unido" },
  { "id": 6, "team": "Alpine", "base": "Enstone, Reino Unido" },
  { "id": 7, "team": "Williams", "base": "Grove, Reino Unido" },
  { "id": 8, "team": "RB (Visa Cash App RB)", "base": "Faenza, Itália" },
  { "id": 9, "team": "Kick Sauber", "base": "Hinwil, Suíça" },
  { "id": 10, "team": "Haas F1 Team", "base": "Kannapolis, Estados Unidos" }
]

const drivers = [
  { "id": 1, "name": "Max Verstappen", "team": "Red Bull Racing" },
  { "id": 2, "name": "Sergio Pérez", "team": "Red Bull Racing" },
  { "id": 3, "name": "Lewis Hamilton", "team": "Mercedes" },
  { "id": 4, "name": "George Russell", "team": "Mercedes" },
  { "id": 5, "name": "Charles Leclerc", "team": "Ferrari" },
  { "id": 6, "name": "Carlos Sainz Jr.", "team": "Ferrari" },
  { "id": 7, "name": "Lando Norris", "team": "McLaren" },
  { "id": 8, "name": "Oscar Piastri", "team": "McLaren" },
  { "id": 9, "name": "Fernando Alonso", "team": "Aston Martin" },
  { "id": 10, "name": "Lance Stroll", "team": "Aston Martin" }
]

server.get("/teams", async (req, res)=>{
    res.type("application/json").code(200)

    return {teams}
})

server.get('/drivers', async (req, res) => {
    res.type("application/json").code(200)
    return {drivers}
})

interface DriverParams{
    id:string
}

server.get<{Params: DriverParams}>('/driver/:id', async(req, res)=>{
    const id = parseInt(req.params.id)
    const driver = drivers.find(d => d.id === id)
    if(!driver){
        res.type("application/json").code(404)
        return {message: 'Driver not found!'}
    }else{
        res.type("application/json").code(200)

        return {driver}
    }
})

server.listen({port:3333}, ()=>{
    console.log("Server Running!")
})


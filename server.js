const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Base de dados simulada de eventos atualizada e exclusiva
let eventos = [
  { id: 0, n: "Aurora Festival 2026", c: "Shows", city: "Belo Horizonte", l: "Esplanada do Mineirão", d: "18 Out", p: 189, img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80" },
  { id: 1, n: "Noite de Jazz", c: "Shows", city: "Juiz de Fora", l: "Cine-Theatro Central", d: "20 Out", p: 90, img: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80" },
  { id: 2, n: "Hamlet — Temporada", c: "Teatro", city: "Belo Horizonte", l: "Palácio das Artes", d: "24 Out", p: 70, img: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80" },
  { id: 3, n: "Cine ao Ar Livre", c: "Cinema", city: "Juiz de Fora", l: "Parque Halfeld", d: "26 Out", p: 35, img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80" },
  { id: 4, n: "Eletro Sunset", c: "Festas", city: "Rio de Janeiro", l: "Pier Mauá", d: "02 Nov", p: 70, img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80" },
  { id: 5, n: "Rock na Praça", c: "Shows", city: "Belo Horizonte", l: "Praça da Estação", d: "09 Nov", p: 60, img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80" },
  { id: 6, n: "Stand-Up Comedy Night", c: "Teatro", city: "Juiz de Fora", l: "Teatro Pró-Música", d: "15 Nov", p: 50, img: "https://images.unsplash.com/photo-1585699324551-f6c309ef6750?auto=format&fit=crop&w=1200&q=80" },
  { id: 7, n: "Baile Funk do Rio", c: "Festas", city: "Rio de Janeiro", l: "Fundição Progresso", d: "22 Nov", p: 90, img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80" },
  { id: 8, n: "Sertanejo Universitário", c: "Shows", city: "Juiz de Fora", l: "Cultural Bar", d: "28 Nov", p: 80, img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80" },
  { id: 9, n: "Mostra de Cinema Independente", c: "Cinema", city: "Belo Horizonte", l: "Cine Belas Artes", d: "05 Dez", p: 30, img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80" },
  { id: 10, n: "Symphonic Metal Night", c: "Shows", city: "São Paulo", l: "Espaço Unimed", d: "10 Dez", p: 150, img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80" },
  { id: 11, n: "Acústico MPB", c: "Shows", city: "Juiz de Fora", l: "Teatro Solar", d: "12 Dez", p: 65, img: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1200&q=80" },
  { id: 12, n: "O Fantasma da Ópera", c: "Teatro", city: "Rio de Janeiro", l: "Theatro Municipal", d: "15 Dez", p: 120, img: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1200&q=80" },
  { id: 13, n: "Auto da Compadecida", c: "Teatro", city: "Juiz de Fora", l: "Cine-Theatro Central", d: "18 Dez", p: 55, img: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=80" },
  { id: 14, n: "Réveillon Paradise", c: "Festas", city: "Buzios", l: "Beach Club Geribá", d: "31 Dez", p: 250, img: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80" },
  { id: 15, n: "Neon Rave", c: "Festas", city: "Juiz de Fora", l: "Privilège", d: "03 Jan", p: 85, img: "https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=1200&q=80" },
  { id: 16, n: "Festival de Curtas", c: "Cinema", city: "Juiz de Fora", l: "Mamm", d: "08 Jan", p: 25, img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80" },
  { id: 17, n: "Clássicos Sci-Fi", c: "Cinema", city: "Belo Horizonte", l: "Cine Art", d: "12 Jan", p: 40, img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80" },
  { id: 18, n: "Indie Rock Fest", c: "Shows", city: "Rio de Janeiro", l: "Circo Voador", d: "16 Jan", p: 110, img: "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=1200&q=80" },
  { id: 19, n: "Comédia Stand-Up Total", c: "Teatro", city: "São Paulo", l: "Teatro Bradesco", d: "20 Jan", p: 90, img: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?auto=format&fit=crop&w=1200&q=80" },
  { id: 20, n: "Sunset Electronic", c: "Festas", city: "Juiz de Fora", l: "Espaço Hall", d: "25 Jan", p: 95, img: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?auto=format&fit=crop&w=1200&q=80" },
  { id: 21, n: "Noite do Terror", c: "Cinema", city: "Juiz de Fora", l: "Cine Ritz", d: "30 Jan", p: 30, img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80" }
];

let pedidos = [];

// Rota para listar eventos
app.get('/api/eventos', (req, res) => {
  res.json(eventos);
});

// Rota para criar novo evento (Painel do Organizador)
app.post('/api/eventos', (req, res) => {
  const novoEvento = { id: eventos.length, ...req.body };
  eventos.unshift(novoEvento);
  res.status(201).json(novoEvento);
});

// Rota para finalizar compra / registrar pedido
app.post('/api/pedidos', (req, res) => {
  const pedido = { id: Math.random().toString(36).substring(2, 7).toUpperCase(), ...req.body, data: new Date() };
  pedidos.unshift(pedido);
  res.status(201).json(pedido);
});

app.listen(PORT, () => {
  console.log(`Servidor Node.js rodando na porta ${PORT}`);
});
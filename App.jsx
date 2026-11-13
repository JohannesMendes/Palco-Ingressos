import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [eventos, setEventos] = useState([]);
  const [filtroCat, setFiltroCat] = useState('Todos');
  const [busca, setBusca] = useState('');
  const [carrinho, setCarrinho] = useState([]);
  const [pagina, setPagina] = useState('home');
  const [eventoSelecionado, setEventoSelecionado] = useState(null);

  // Consumindo o backend Node.js
  useEffect(() => {
    fetch('http://localhost:3001/api/eventos')
      .then(res => res.json())
      .then(data => setEventos(data))
      .catch(err => console.log('Erro ao carregar eventos:', err));
  }, []);

  const eventosFiltrados = eventos.filter(e => {
    const matchCat = filtroCat === 'Todos' || e.c === filtroCat;
    const matchBusca = (e.n + ' ' + e.city + ' ' + e.l).toLowerCase().includes(busca.toLowerCase());
    return matchCat && matchBusca;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-blue-700/90 backdrop-blur-md text-white border-b border-white/10 px-6 h-16 flex items-center justify-between">
        <div className="font-extrabold italic text-2xl tracking-tighter cursor-pointer" onClick={() => setPagina('home')}>
          PALCO
        </div>
        <div className="flex gap-6 items-center font-medium text-sm">
          <button onClick={() => setPagina('home')} className="hover:opacity-80 transition">Início</button>
          <button onClick={() => setPagina('eventos')} className="hover:opacity-80 transition">Eventos</button>
          <button onClick={() => setPagina('carrinho')} className="relative bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition">
            Carrinho ({carrinho.length})
          </button>
        </div>
      </nav>

      {/* Conteúdo Dinâmico com Transição Animada */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {pagina === 'home' && (
            <motion.div key="home" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
              {/* Banner Principal */}
              <div className="relative rounded-3xl overflow-hidden h-[450px] shadow-2xl flex items-end p-10 text-white" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.8), transparent), url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80') center/cover` }}>
                <div>
                  <span className="bg-blue-600 text-xs uppercase px-3 py-1 rounded-full font-bold tracking-wider">Destaque</span>
                  <h1 className="text-5xl font-extrabold mt-3 font-mono">Aurora Festival 2026</h1>
                  <p className="text-gray-300 mt-2 text-lg">Esplanada do Mineirão · Belo Horizonte</p>
                  <button onClick={() => { setEventoSelecionado(eventos[0]); setPagina('detalhe'); }} className="mt-6 bg-white text-blue-900 font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition">
                    Ver Ingressos
                  </button>
                </div>
              </div>

              {/* Grid de Eventos */}
              <section className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Eventos em alta</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {eventos.slice(0, 8).map(e => (
                    <motion.div whileHover={{ y: -6 }} key={e.id} onClick={() => { setEventoSelecionado(e); setPagina('detalhe'); }} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm cursor-pointer transition">
                      <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${e.img}')` }} />
                      <div className="p-4">
                        <span className="text-xs font-semibold text-blue-600">{e.c} · {e.d}</span>
                        <h3 className="font-bold text-lg mt-1 leading-snug">{e.n}</h3>
                        <p className="text-sm text-gray-500 mt-1">{e.city}</p>
                        <p className="mt-3 font-bold text-gray-900">a partir de R$ {e.p.toFixed(2)}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {pagina === 'eventos' && (
            <motion.div key="eventos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h1 className="text-4xl font-extrabold mb-6">Explorar Eventos</h1>
              <div className="flex gap-4 mb-8 flex-wrap items-center">
                <input type="text" placeholder="Buscar artista, evento ou cidade..." value={busca} onChange={e => setBusca(e.target.value)} className="bg-white border border-gray-200 px-4 py-2 rounded-xl flex-1 min-w-[280px] focus:outline-none focus:border-blue-600" />
                {['Todos', 'Shows', 'Teatro', 'Festas', 'Cinema'].map(cat => (
                  <button key={cat} onClick={() => setFiltroCat(cat)} className={`px-5 py-2 rounded-full font-medium text-sm transition ${filtroCat === cat ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-600'}`}>
                    {cat}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {eventosFiltrados.map(e => (
                  <div key={e.id} onClick={() => { setEventoSelecionado(e); setPagina('detalhe'); }} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition">
                    <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${e.img}')` }} />
                    <div className="p-4">
                      <span className="text-xs font-semibold text-blue-600">{e.c} · {e.d}</span>
                      <h3 className="font-bold text-lg mt-1">{e.n}</h3>
                      <p className="text-sm text-gray-500">{e.city}</p>
                      <p className="mt-3 font-bold">R$ {e.p.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {pagina === 'detalhe' && eventoSelecionado && (
            <motion.div key="detalhe" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="md:col-span-2">
                <div className="h-[380px] rounded-3xl bg-cover bg-center shadow-lg" style={{ backgroundImage: `url('${eventoSelecionado.img}')` }} />
                <h1 className="text-4xl font-extrabold mt-6">{eventoSelecionado.n}</h1>
                <p className="text-gray-500 mt-2 text-lg">{eventoSelecionado.l} · {eventoSelecionado.city} ({eventoSelecionado.d})</p>
                <div className="mt-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-bold mb-3">Sobre o evento</h3>
                  <p className="text-gray-600 leading-relaxed">Uma experiência inesquecível com estrutura completa de som, iluminação imersiva e praça de alimentação exclusiva. Garanta seu ingresso antecipado sem filas.</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl h-fit sticky top-24">
                <h3 className="text-2xl font-bold mb-4">Ingressos</h3>
                <div className="border-b pb-4 mb-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold">Pista Geral</h4>
                    <p className="text-xs text-gray-500">Acesso à área comum</p>
                  </div>
                  <span className="font-bold text-lg">R$ {eventoSelecionado.p.toFixed(2)}</span>
                </div>
                <button onClick={() => { setCarrinho([...carrinho, eventoSelecionado]); setPagina('carrinho'); }} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition">
                  Comprar Ingresso
                </button>
              </div>
            </motion.div>
          )}

          {pagina === 'carrinho' && (
            <motion.div key="carrinho" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
              <h1 className="text-3xl font-extrabold mb-6">Seu Carrinho</h1>
              {carrinho.length === 0 ? (
                <p className="text-gray-500 text-center py-10">O carrinho está vazio.</p>
              ) : (
                <div>
                  {carrinho.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b py-4">
                      <div>
                        <h4 className="font-bold">{item.n}</h4>
                        <p className="text-sm text-gray-500">{item.city} · {item.d}</p>
                      </div>
                      <span className="font-bold">R$ {item.p.toFixed(2)}</span>
                    </div>
                  ))}
                  <button onClick={() => alert('Compra finalizada com sucesso! (Simulado)')} className="mt-8 w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition">
                    Finalizar Pagamento
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
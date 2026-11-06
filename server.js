// API simples de piadas aleatórias. Sem dependências: só Node.js.
const http = require("http");

const PORT = process.env.PORT || 3000;

// As piadas ficam em piadas.json: é só adicionar novas strings lá.
const piadas = require("./piadas.json");

const server = http.createServer((req, res) => {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*", // libera chamadas de qualquer app/origem
  };

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      ...headers,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    });
    return res.end();
  }

  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET" && pathname === "/piada") {
    const piada = piadas[Math.floor(Math.random() * piadas.length)];
    res.writeHead(200, headers);
    return res.end(JSON.stringify({ piada }));
  }

  res.writeHead(404, headers);
  res.end(JSON.stringify({ erro: "Rota não encontrada. Use GET /piada" }));
});

server.listen(PORT, () => {
  console.log(`API de piadas rodando em http://localhost:${PORT}/piada`);
});

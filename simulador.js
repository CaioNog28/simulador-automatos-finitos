const fs = require('fs');

function lerAutomato(caminho) {
  const data = fs.readFileSync(caminho, 'utf8');
  return JSON.parse(data);
}

function lerTestes(caminho) {
  const linhas = fs.readFileSync(caminho, 'utf8').trim().split('\n');
  return linhas.map(linha => {
    const partes = linha.trim().split(';');
    return [partes[0].trim(), partes[1]?.trim()];
  });
}


function escreverSaida(caminho, resultados) {
  const conteudo = resultados.map(linha => linha.join(';')).join('\n');
  fs.writeFileSync(caminho, conteudo);
}

function eClosure(estado, transicoes) {
  const pilha = [estado];
  const visitados = new Set(pilha);

  while (pilha.length > 0) {
    const atual = pilha.pop();
    for (const trans of transicoes) {
      if (trans.from === atual && trans.read === null) {
        if (!visitados.has(trans.to)) {
          visitados.add(trans.to);
          pilha.push(trans.to);
        }
      }
    }
  }

  return Array.from(visitados);
}

function mover(estados, simbolo, transicoes) {
  const destinos = new Set();
  for (const estado of estados) {
    for (const trans of transicoes) {
      if (trans.from === estado && trans.read === simbolo) {
        destinos.add(trans.to);
      }
    }
  }
  return Array.from(destinos);
}

function aceita(palavra, automato) {
  let estados = eClosure(automato.initial, automato.transitions);

  for (const simbolo of palavra) {
    const proximos = [];
    for (const estado of estados) {
      const mov = mover([estado], simbolo, automato.transitions);
      for (const m of mov) {
        proximos.push(...eClosure(m, automato.transitions));
      }
    }
    estados = Array.from(new Set(proximos));
  }

  return estados.some(e => automato.final.includes(e));
}

function main() {
  const [,, automatoPath, testesPath, saidaPath] = process.argv;

  if (!automatoPath || !testesPath || !saidaPath) {
    console.log('Uso: node simulador.js automato.aut testes.in saida.out');
    return;
  }

  console.log("🔄 Iniciando simulação...");

  const automato = lerAutomato(automatoPath);
  let testes = lerTestes(testesPath);

  // Ignora cabeçalho se for encontrado
  if (testes[0][0].toLowerCase().includes("palavra")) {
    testes = testes.slice(1);
  }

  const resultados = [];

  for (const [palavra, esperado] of testes) {
    const inicio = process.hrtime();
    const resultado = aceita(palavra, automato) ? 1 : 0;
    const fim = process.hrtime(inicio);
    const tempo = (fim[0] + fim[1] / 1e9).toFixed(3);

    resultados.push([palavra, esperado, resultado, tempo]);

    console.log(`🧪 Testando: "${palavra}" | Esperado: ${esperado} | Obtido: ${resultado} | Tempo: ${tempo}s`);
  }

  escreverSaida(saidaPath, resultados);

  console.log(`✅ Simulação finalizada! Resultados salvos em: ${saidaPath}`);
}

main();

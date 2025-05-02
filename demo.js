const { execSync } = require('child_process');
const fs = require('fs');

const comando = 'node simulador.js automato.aut novos_testes.in saida.out';

console.log('▶️ Executando o simulador com novos testes...\n');

try {
  execSync(comando, { stdio: 'inherit' });

  console.log('\n📄 Conteúdo do arquivo saida.out:\n');

  const resultado = fs.readFileSync('saida.out', 'utf-8');
  console.log(resultado);
} catch (error) {
  console.error('❌ Erro ao executar o simulador:', error.message);
}

# 🧮 Simulador de Autômatos Finitos (AFD / AFND / ε-transições)

Este projeto é um simulador de autômatos finitos determinísticos (AFD) e não determinísticos (AFND), com suporte a transições vazias (ε). Desenvolvido em **JavaScript (Node.js)**, funciona exclusivamente via **linha de comando**.

---

## 🎯 Objetivo

Simular o comportamento de autômatos finitos a partir de:
- Um arquivo `.aut` em formato **JSON** contendo a definição do autômato.
- Um arquivo `.in` em formato **CSV** contendo palavras de teste e os resultados esperados.
- A saída dos testes é salva em um arquivo `.out` também em **CSV**.

---

## 📂 Estrutura dos Arquivos

### 🧠 Arquivo do Autômato (`automato.aut`)

Formato JSON com os seguintes campos:
- `initial`: estado inicial.
- `final`: lista de estados finais.
- `transitions`: transições da máquina. `read: null` representa uma transição ε.

#### Exemplo:
```json
{
  "initial": 0,
  "final": [4, 7],
  "transitions": [
    { "from": 0, "read": "a", "to": 1 },
    { "from": 0, "read": "a", "to": 3 },
    { "from": 2, "read": "a", "to": 3 },
    { "from": 3, "read": "b", "to": 2 },
    { "from": 4, "read": "a", "to": 4 },
    { "from": 7, "read": "c", "to": 1 },
    { "from": 4, "read": null, "to": 0 }
  ]
}

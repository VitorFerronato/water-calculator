<template>
  <div class="min-h-screen bg-blue-50 flex flex-col">
    <!-- Seção Principal -->
    <section
      class="flex flex-col items-center justify-center h-screen w-full p-4 bg-blue-100"
    >
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 class="text-2xl font-bold text-center mb-6">
          Calculadora de Consumo de Água
        </h1>

        <!-- Formulário para Adicionar Atividades -->
        <div class="flex items-center space-x-4 mb-4">
          <div class="flex-1">
            <label for="atividade" class="block text-sm font-medium mb-1"
              >Atividade</label
            >
            <select
              v-model="novaAtividade.nome"
              id="atividade"
              class="w-full p-2 border rounded-md"
            >
              <option disabled value="">Selecione uma atividade</option>
              <option
                v-for="(litros, atividade) in atividades"
                :key="atividade"
                :value="atividade"
              >
                {{ atividade }}
              </option>
            </select>
          </div>

          <div class="flex-1">
            <label for="tempo" class="block text-sm font-medium mb-1"
              >Tempo (minutos)</label
            >
            <input
              v-model.number="novaAtividade.tempo"
              type="number"
              min="1"
              id="tempo"
              class="w-full p-2 border rounded-md"
            />
          </div>

          <button
            @click="adicionarAtividade"
            class="bg-blue-500 text-white py-2 px-4 mt-6 rounded-md flex items-center hover:bg-blue-600"
          >
            <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" /> Adicionar
          </button>
        </div>

        <!-- Tabela de Atividades -->
        <table
          v-if="listaAtividades.length"
          class="w-full bg-gray-100 rounded-lg shadow-md text-left"
        >
          <thead class="bg-blue-500 text-white">
            <tr>
              <th class="p-3">Atividade</th>
              <th class="p-3">Litros por Minuto</th>
              <th class="p-3">Tempo (minutos)</th>
              <th class="p-3">Remover</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in listaAtividades"
              :key="index"
              class="border-b"
            >
              <td class="p-3">{{ item.nome }}</td>
              <td class="p-3">{{ atividades[item.nome] }} L/min</td>
              <td class="p-3">{{ item.tempo }} minutos</td>
              <td class="p-3 text-center">
                <button
                  @click="removerAtividade(index)"
                  class="text-red-500 hover:text-red-700"
                >
                  <font-awesome-icon :icon="['fas', 'trash']" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Botão para Calcular o Consumo Total -->
        <div class="w-full flex items-center">
          <button
            v-if="listaAtividades.length"
            @click="calcularConsumoTotal"
            class="mt-6 w-auto text-center bg-green-500 px-4 text-white py-2 rounded-md flex items-center justify-center hover:bg-green-600"
          >
            <font-awesome-icon :icon="['fas', 'calculator']" class="mr-2" />
            Calcular Consumo Total
          </button>
        </div>
      </div>

      <!-- Card de Resultados -->
      <div
        v-if="resultado !== null"
        class="mt-6 w-full max-w-md bg-yellow-100 p-6 rounded-lg shadow-lg text-center"
      >
        <p class="text-lg font-semibold">
          Consumo total: {{ resultado }} litros
        </p>
        <p :class="resultado > limite ? 'text-red-500' : 'text-green-500'">
          {{
            resultado > limite
              ? "Consumo Alto! Considere economizar."
              : "Consumo Aceitável"
          }}
        </p>
      </div>
    </section>

    <!-- Seção de Dicas -->
    <section class="bg-white py-10 px-4" id="dicas">
      <h2 class="text-2xl font-bold text-center mb-6">
        Dicas para Economizar Água
      </h2>
      <div class="max-w-4xl mx-auto space-y-8">
        <!-- Dica 1 -->
        <div class="flex items-start space-x-4">
          <font-awesome-icon
            :icon="['fas', 'water']"
            class="text-blue-500 w-8 h-8"
          />
          <div>
            <p>
              Reduza o tempo no banho. Banhos mais curtos podem economizar até
              10 litros por minuto. Procure não ultrapassar 5 minutos.
            </p>
            <img
              src="https://img.freepik.com/fotos-gratis/homem-de-vista-lateral-no-banheiro_23-2150323150.jpg?ga=GA1.1.164472310.1729880387&semt=ais_hybrid"
              alt="Banho rápido"
              class="mt-4 rounded-lg"
            />
          </div>
        </div>

        <!-- Dica 2 -->
        <div class="flex items-start space-x-4">
          <font-awesome-icon
            :icon="['fas', 'water']"
            class="text-blue-500 w-8 h-8"
          />
          <div>
            <p>
              Feche a torneira ao escovar os dentes ou fazer a barba. Isso
              economiza até 12 litros por minuto.
            </p>
            <img
              src="https://img.freepik.com/fotos-gratis/mulher-feliz-limpando-os-dentes-com-uma-escova-de-dentes-pela-manha_637285-3686.jpg?ga=GA1.1.164472310.1729880387&semt=ais_hybrid"
              alt="Escovando os dentes com a torneira fechada"
              class="mt-4 rounded-lg"
            />
          </div>
        </div>

        <!-- Dica 3 -->
        <div class="flex items-start space-x-4">
          <font-awesome-icon
            :icon="['fas', 'water']"
            class="text-blue-500 w-8 h-8"
          />
          <div>
            <p>
              Utilize a máquina de lavar roupa e louça apenas quando estiverem
              com carga completa para economizar água e energia.
            </p>
            <img
              src="https://img.freepik.com/fotos-gratis/maquina-de-lavar-em-uma-lavanderia-minimalista_53876-145501.jpg?ga=GA1.1.164472310.1729880387&semt=ais_hybrid"
              alt="Máquina de lavar com carga completa"
              class="mt-4 rounded-lg"
            />
          </div>
        </div>

        <!-- Nova Dica 4 -->
        <div class="flex items-start space-x-4">
          <font-awesome-icon
            :icon="['fas', 'water']"
            class="text-blue-500 w-8 h-8"
          />
          <div>
            <p>
              Instale dispositivos de economia, como arejadores de torneira e
              chuveiros de baixo fluxo. Esses equipamentos ajudam a reduzir o
              consumo sem comprometer o conforto.
            </p>
            <img
              src="https://img.freepik.com/fotos-gratis/chuveiro-com-agua-quente_23-2149088625.jpg?ga=GA1.1.164472310.1729880387&semt=ais_hybrid"
              alt="Arejador de torneira"
              class="mt-4 rounded-lg"
            />
          </div>
        </div>

        <!-- Nova Dica 5 -->
        <div class="flex items-start space-x-4">
          <font-awesome-icon
            :icon="['fas', 'water']"
            class="text-blue-500 w-8 h-8"
          />
          <div>
            <p>
              Reutilize a água sempre que possível. A água usada para lavar
              frutas e vegetais pode ser reutilizada para regar plantas.
            </p>
            <img
              src="https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-do-dia-mundial-da-agua_114360-4809.jpg?ga=GA1.1.164472310.1729880387&semt=ais_hybrid"
              alt="Reutilização de água para plantas"
              class="mt-4 rounded-lg"
            />
          </div>
        </div>

        <!-- Links e Artigos -->
        <div class="mt-8">
          <h3 class="text-xl font-semibold">Artigos e Sites Úteis</h3>
          <ul class="list-disc pl-6 mt-4">
            <li>
              <a
                href="https://www.sabesp.com.br/economizeagua"
                class="text-blue-500 hover:underline"
                >Sabesp: Como economizar água</a
              >
            </li>
            <li>
              <a
                href="https://www.cnnbrasil.com.br/nacional/como-economizar-agua-com-dicas-simples-e-praticas/2024/"
                class="text-blue-500 hover:underline"
                >CNN Brasil: Dicas práticas para economizar água</a
              >
            </li>
            <li>
              <a
                href="https://www.ecodesenvolvimento.org.br/blog/economia-de-agua"
                class="text-blue-500 hover:underline"
                >EcoDesenvolvimento: Soluções sustentáveis para economia de
                água</a
              >
            </li>
          </ul>
        </div>

        <!-- Notícias -->
        <div class="mt-8">
          <h3 class="text-xl font-semibold">Notícias Recentes</h3>
          <ul class="list-disc pl-6 mt-4">
            <li>
              <a
                href="https://www.g1.globo.com/noticias/dicas-economize-agua"
                class="text-blue-500 hover:underline"
                >G1: Como as cidades estão se adaptando à crise hídrica</a
              >
            </li>
            <li>
              <a
                href="https://www.bbc.com/portuguese/brasil-59304729"
                class="text-blue-500 hover:underline"
                >BBC Brasil: A importância de economizar água em tempos de
                seca</a
              >
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      novaAtividade: { nome: "", tempo: 0 },
      listaAtividades: [],
      atividades: {
        Banho: 9,
        "Escovar os Dentes": 0.5,
        "Lavar a Louça": 6,
        "Lavar Roupas": 10,
        "Regar Plantas": 8,
        "Lavar o Carro": 20,
        "Lavar Calçada": 15,
        Cozinhar: 2,
      },
      resultado: null,
      limite: 200,
    };
  },

  methods: {
    adicionarAtividade() {
      if (this.novaAtividade.nome && this.novaAtividade.tempo > 0) {
        this.listaAtividades.push({ ...this.novaAtividade });
        this.novaAtividade = { nome: "", tempo: 0 };
      }
    },

    removerAtividade(index) {
      this.listaAtividades.splice(index, 1);
    },

    calcularConsumoTotal() {
      this.resultado = this.listaAtividades.reduce(
        (total, item) => total + this.atividades[item.nome] * item.tempo,
        0
      );

      setTimeout(() => {
        const dicasSection = document.getElementById("dicas");
        dicasSection.scrollIntoView({ behavior: "smooth" });
      }, 2000);
    },
  },
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}
</style>

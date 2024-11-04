<template>
  <div class="min-h-screen bg-blue-50 flex items-center justify-center p-4">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-4">
        Calculadora de Consumo de Água
      </h1>

      <form @submit.prevent="adicionarAtividade" class="space-y-4">
        <div>
          <label for="atividade" class="block text-sm font-medium"
            >Atividade</label
          >
          <select
            v-model="novaAtividade.nome"
            id="atividade"
            class="w-full p-2 border rounded-md"
          >
            <option disabled value="">Selecione uma atividade</option>
            <option
              v-for="(valor, nome) in atividades"
              :key="nome"
              :value="nome"
            >
              {{ nome }}
            </option>
          </select>
        </div>

        <div>
          <label for="tempo" class="block text-sm font-medium"
            >Tempo (em minutos)</label
          >
          <input
            v-model.number="novaAtividade.tempo"
            type="number"
            id="tempo"
            min="1"
            class="w-full p-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Adicionar Atividade
        </button>
      </form>

      <div v-if="listaAtividades.length" class="mt-6">
        <h2 class="text-lg font-semibold text-center mb-2">Atividades</h2>
        <ul class="space-y-2">
          <li
            v-for="(item, index) in listaAtividades"
            :key="index"
            class="flex justify-between bg-gray-100 p-2 rounded-md"
          >
            <span>{{ item.nome }} - {{ item.tempo }} minutos</span>
            <button
              @click="removerAtividade(index)"
              class="text-red-500 hover:underline"
            >
              Remover
            </button>
          </li>
        </ul>

        <button
          @click="calcularConsumoTotal"
          class="w-full mt-4 bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Calcular Consumo Total
        </button>
      </div>

      <div v-if="resultado !== null" class="mt-6 text-center">
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

        <div v-if="resultado > limite" class="mt-4 text-left">
          <h2 class="text-sm font-semibold">Dicas para economizar água:</h2>
          <ul class="list-disc list-inside">
            <li>Reduza o tempo no chuveiro.</li>
            <li>Desligue a torneira ao escovar os dentes.</li>
            <li>Use a máquina de lavar com carga completa.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      novaAtividade: { nome: "", tempo: 0 },
      listaAtividades: [],
      resultado: null,
      limite: 200, // Limite de consumo aceitável em litros
      atividades: {
        Chuveiro: 9,
        "Lavar Louça": 12,
        "Máquina de Lavar": 15,
        Descarga: 6,
        "Escovar Dentes (torneira ligada)": 2,
        "Lavar Roupas (tanque)": 10,
        Cozinhar: 5,
        "Lavar Carro": 18,
        "Lavar Calçada": 20,
        "Irrigar Jardim": 15,
        "Banho de Banheira": 80,
        "Lavar Mãos (torneira ligada)": 1.5,
        "Limpar Casa": 12,
        "Lavar Vidros": 8,
        "Lavar Legumes": 4,
        "Beber Água": 0.01,
        "Regar Plantas com Mangueira": 14,
        "Trocar Água do Aquário": 10,
        "Piscina Residencial (uso diário)": 25,
        "Encher Piscina Pequena": 200,
        "Lavar Bicicleta": 9,
        "Lavar Animais de Estimação": 7,
      },
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
      this.resultado = this.listaAtividades.reduce((total, item) => {
        const consumoPorMinuto = this.atividades[item.nome];
        return total + consumoPorMinuto * item.tempo;
      }, 0);
    },
  },
};
</script>

<style scoped>
/* Estilos adicionais, se necessário */
</style>

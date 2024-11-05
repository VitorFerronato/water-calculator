<template>
  <div class="min-h-screen bg-blue-50 flex flex-col">
    <!-- Seção Principal -->
    <section class="flex flex-col items-center justify-center h-screen w-full p-4 bg-blue-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-2xl font-bold text-center mb-4">Calculadora de Consumo de Água</h1>

        <form @submit.prevent="adicionarAtividade" class="space-y-4">
          <div>
            <label for="atividade" class="block text-sm font-medium">Atividade</label>
            <select v-model="novaAtividade.nome" id="atividade" class="w-full p-2 border rounded-md">
              <option disabled value="">Selecione uma atividade</option>
              <option v-for="(valor, nome) in atividades" :key="nome" :value="nome">{{ nome }}</option>
            </select>
          </div>

          <div>
            <label for="tempo" class="block text-sm font-medium">Tempo (em minutos)</label>
            <input v-model.number="novaAtividade.tempo" type="number" id="tempo" min="1" class="w-full p-2 border rounded-md" />
          </div>

          <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-center hover:bg-blue-600">
            <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" /> Adicionar Atividade
          </button>
        </form>

        <div v-if="listaAtividades.length" class="mt-6">
          <h2 class="text-lg font-semibold text-center mb-2">Atividades</h2>
          <ul class="space-y-2">
            <li v-for="(item, index) in listaAtividades" :key="index" class="flex justify-between bg-gray-100 p-2 rounded-md">
              <span>{{ item.nome }} - {{ item.tempo }} minutos</span>
              <button @click="removerAtividade(index)" class="text-red-500 hover:underline flex items-center">
                <font-awesome-icon :icon="['fas', 'trash']" class="mr-1" /> Remover
              </button>
            </li>
          </ul>

          <button @click="calcularConsumoTotal" class="w-full mt-4 bg-green-500 text-white py-2 rounded-md flex items-center justify-center hover:bg-green-600">
            <font-awesome-icon :icon="['fas', 'calculator']" class="mr-2" /> Calcular Consumo Total
          </button>
        </div>
      </div>
      
      <!-- Card de Resultados -->
      <div v-if="resultado !== null" class="mt-6 w-full max-w-md bg-yellow-100 p-6 rounded-lg shadow-lg text-center">
        <p class="text-lg font-semibold">Consumo total: {{ resultado }} litros</p>
        <p :class="resultado > limite ? 'text-red-500' : 'text-green-500'">
          {{ resultado > limite ? 'Consumo Alto! Considere economizar.' : 'Consumo Aceitável' }}
        </p>
      </div>
    </section>

    <!-- Seção de Dicas -->
    <section class="bg-white py-10 px-4" id="dicas">
      <h2 class="text-2xl font-bold text-center mb-6">Dicas para Economizar Água</h2>
      <div class="max-w-4xl mx-auto space-y-8">
        <div class="flex items-center space-x-4">
          <font-awesome-icon :icon="['fas', 'water']" class="text-blue-500 w-8 h-8" />
          <p>Reduza o tempo no banho. Banhos mais curtos podem economizar até 10 litros por minuto. Procure não ultrapassar 5 minutos.</p>
        </div>
        <div class="flex items-center space-x-4">
          <font-awesome-icon :icon="['fas', 'water']" class="text-blue-500 w-8 h-8" />
          <p>Feche a torneira ao escovar os dentes ou fazer a barba. Isso economiza até 12 litros por minuto.</p>
        </div>
        <div class="flex items-center space-x-4">
          <font-awesome-icon :icon="['fas', 'water']" class="text-blue-500 w-8 h-8" />
          <p>Utilize a máquina de lavar roupa e louça apenas quando estiverem com carga completa para economizar água e energia.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      novaAtividade: { nome: '', tempo: 0 },
      listaAtividades: [],
      atividades: {
        'banheiro': 5
      },
      resultado: null,
      limite: 200,
    };
  },
  methods: {
    adicionarAtividade() {
      if (this.novaAtividade.nome && this.novaAtividade.tempo > 0) {
        this.listaAtividades.push({ ...this.novaAtividade });
        this.novaAtividade = { nome: '', tempo: 0 };
      }
    },
    removerAtividade(index) {
      this.listaAtividades.splice(index, 1);
    },
    calcularConsumoTotal() {
      this.resultado = this.listaAtividades.reduce((total, item) => total + (this.atividades[item.nome] * item.tempo), 0);

      setTimeout(() => {
        const dicasSection = document.getElementById('dicas');
        dicasSection.scrollIntoView({ behavior: 'smooth' });
      }, 3000);
    }
  }
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}
</style>

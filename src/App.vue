<template>
  <div class="min-h-screen bg-blue-50 flex flex-col">
    <!-- Main Section -->
    <section
      class="flex flex-col items-center justify-center h-screen w-full p-4 bg-blue-100"
    >
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 class="text-2xl font-bold text-center mb-6">
          Calculadora de Consumo de Água
        </h1>

        <!-- Form to Add Activities -->
        <div class="flex flex-col md:flex-row items-center md:space-x-4 mb-4">
          <div class="flex-1 w-full md:w-auto">
            <label for="activity" class="block text-sm font-medium mb-1">
              Atividade
            </label>
            <select
              v-model="newActivity.name"
              id="activity"
              class="w-full p-2 border rounded-md"
            >
              <option disabled value="">Selecione uma atividade</option>
              <option
                v-for="(liters, activity) in activities"
                :key="activity"
                :value="activity"
              >
                {{ activity }}
              </option>
            </select>
          </div>

          <div class="flex-1 w-full md:w-auto mt-4 md:mt-0">
            <label for="time" class="block text-sm font-medium mb-1">
              Tempo (minutos)
            </label>
            <input
              v-model.number="newActivity.time"
              type="number"
              min="1"
              id="time"
              class="w-full p-2 border rounded-md"
            />
          </div>

          <button
            @click="addActivity"
            class="bg-blue-500 text-white py-2 px-4 mt-4 md:mt-6 rounded-md flex items-center hover:bg-blue-600"
          >
            <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />
            Adicionar
          </button>
        </div>

        <!-- Activities Table -->
        <table
          v-if="activityList.length"
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
              v-for="(item, index) in activityList"
              :key="index"
              class="border-b"
            >
              <td class="p-3">{{ item.name }}</td>
              <td class="p-3">{{ activities[item.name] }} L/min</td>
              <td class="p-3">{{ item.time }} minutos</td>
              <td class="p-3 text-center">
                <button
                  @click="removeActivity(index)"
                  class="text-red-500 hover:text-red-700"
                >
                  <font-awesome-icon :icon="['fas', 'trash']" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Calculate Total Consumption Button -->
        <div class="w-full flex items-center">
          <button
            v-if="activityList.length"
            @click="calculateTotalConsumption"
            class="mt-6 w-auto text-center bg-green-500 px-4 text-white py-2 rounded-md flex items-center justify-center hover:bg-green-600"
          >
            <font-awesome-icon :icon="['fas', 'calculator']" class="mr-2" />
            Calcular Consumo Total
          </button>
        </div>
      </div>

      <!-- Results Card -->
      <div
        v-if="result !== null"
        class="mt-6 w-full max-w-md bg-yellow-100 p-6 rounded-lg shadow-lg text-center"
      >
        <p class="text-lg font-semibold">Consumo total: {{ result }} litros</p>
        <p :class="result > limit ? 'text-red-500' : 'text-green-500'">
          {{
            result > limit
              ? "Consumo Alto! Considere economizar."
              : "Consumo Aceitável"
          }}
        </p>
        <p v-if="savings > 0" class="text-blue-500">
          Você poderia economizar até {{ savings }} litros com ajustes.
        </p>
      </div>
    </section>

    <!-- Tips Section -->
    <section class="bg-white py-10 px-4" id="dicas">
      <h2 class="text-2xl font-bold text-center mb-6">
        Dicas para Economizar Água
      </h2>
      <div class="max-w-4xl mx-auto space-y-8">
        <!-- Dica 1 -->
        <div
          class="flex flex-col md:flex-row items-center md:items-start md:space-x-4"
        >
          <div class="md:w-1/2 order-2 md:order-1">
            <p class="mb-4">
              Reduza o tempo no banho. Banhos mais curtos podem economizar até
              10 litros por minuto. Procure não ultrapassar 5 minutos.
            </p>
          </div>
          <div class="md:w-1/2 order-1 md:order-2">
            <img
              src="https://img.freepik.com/fotos-gratis/homem-de-vista-lateral-no-banheiro_23-2150323150.jpg?ga=GA1.1.164472310.1729880387&semt=ais_hybrid"
              alt="Banho rápido"
              class="rounded-lg w-full"
            />
          </div>
        </div>

        <!-- Dica 2 -->
        <div
          class="flex flex-col md:flex-row-reverse items-center md:items-start md:space-x-4 md:space-x-reverse"
        >
          <div class="md:w-1/2">
            <p class="mb-4">
              Feche a torneira ao escovar os dentes ou fazer a barba. Isso
              economiza até 12 litros por minuto.
            </p>
          </div>
          <div class="md:w-1/2">
            <img
              src="https://img.freepik.com/fotos-gratis/mulher-feliz-limpando-os-dentes-com-uma-escova-de-dentes-pela-manha_637285-3686.jpg?ga=GA1.1.164472310.1729880387&semt=ais_hybrid"
              alt="Escovando os dentes com a torneira fechada"
              class="rounded-lg w-full"
            />
          </div>
        </div>

        <!-- Dica 3 -->
        <div
          class="flex flex-col md:flex-row items-center md:items-start md:space-x-4"
        >
          <div class="md:w-1/2 order-2 md:order-1">
            <p class="mb-4">
              Utilize a máquina de lavar roupa e louça apenas quando estiverem
              com carga completa para economizar água e energia.
            </p>
          </div>
          <div class="md:w-1/2 order-1 md:order-2">
            <img
              src="https://img.freepik.com/fotos-gratis/maquina-de-lavar-em-uma-lavanderia-minimalista_53876-145501.jpg?ga=GA1.1.164472310.1729880387&semt=ais_hybrid"
              alt="Máquina de lavar com carga completa"
              class="rounded-lg w-full"
            />
          </div>
        </div>

        <!-- Dica 4 -->
        <div
          class="flex flex-col md:flex-row-reverse items-center md:items-start md:space-x-4 md:space-x-reverse"
        >
          <div class="md:w-1/2">
            <p class="mb-4">
              Instale dispositivos de economia, como arejadores de torneira e
              chuveiros de baixo fluxo. Esses equipamentos ajudam a reduzir o
              consumo sem comprometer o conforto.
            </p>
          </div>
          <div class="md:w-1/2">
            <img
              src="https://img.freepik.com/fotos-gratis/chuveiro-com-agua-quente_23-2149088625.jpg?ga=GA1.1.164472310.1729880387&semt=ais_hybrid"
              alt="Arejador de torneira"
              class="rounded-lg w-full"
            />
          </div>
        </div>

        <!-- Dica 5 -->
        <div
          class="flex flex-col md:flex-row items-center md:items-start md:space-x-4"
        >
          <div class="md:w-1/2 order-2 md:order-1">
            <p class="mb-4">
              Reutilize a água sempre que possível. A água usada para lavar
              frutas e vegetais pode ser reutilizada para regar plantas.
            </p>
          </div>
          <div class="md:w-1/2 order-1 md:order-2">
            <img
              src="https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-do-dia-mundial-da-agua_114360-4809.jpg?ga=GA1.1.164472310.1729880387&semt=ais_hybrid"
              alt="Reutilização de água para plantas"
              class="rounded-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newActivity: { name: "", time: 0 },
      activityList: [],
      activities: {
        Banho: 9,
        "Escovar os Dentes": 0.5,
        "Lavar a Louça": 6,
        "Lavar Roupas": 10,
        "Regar Plantas": 8,
        "Lavar o Carro": 20,
        "Lavar Calçada": 15,
        Cozinhar: 2,
      },
      result: null,
      limit: 200, // Maximum acceptable consumption in liters
      idealConsumptionRate: 5, // Liters per minute for an ideal consumption scenario
      savings: 0, // Amount that could be saved
    };
  },

  methods: {
    addActivity() {
      if (this.newActivity.name && this.newActivity.time > 0) {
        this.activityList.push({ ...this.newActivity });
        this.newActivity = { name: "", time: 0 };
      }
    },

    removeActivity(index) {
      this.activityList.splice(index, 1);
    },

    calculateTotalConsumption() {
      this.result = this.activityList.reduce(
        (total, item) => total + this.activities[item.name] * item.time,
        0
      );

      const idealTotal = this.activityList.reduce(
        (total, item) => total + this.idealConsumptionRate * item.time,
        0
      );

      this.savings = Math.max(0, this.result - idealTotal);

      setTimeout(() => {
        const tipsSection = document.getElementById("tips");
        tipsSection.scrollIntoView({ behavior: "smooth" });
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

@media (max-width: 768px) {
  .flex-col > .flex-1 {
    width: 100%;
  }
}
</style>

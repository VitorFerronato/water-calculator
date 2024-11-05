import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPlus,
  faTrash,
  faCalculator,
  faWater,
} from "@fortawesome/free-solid-svg-icons";
library.add(faPlus, faTrash, faCalculator, faWater);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");

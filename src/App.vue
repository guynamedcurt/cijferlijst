<template>
  <h1>
    Cijferlijst
  </h1>
  <div>
    <table>
      <tr><td class="bg-gray-500">Examen</td><td class="bg-gray-500">Cijfer</td></tr>
      <examen-lijst v-for="(e,index) in cijfers" @veranderId="veranderId" @verwijderId="verwijderId" :key="index"
            :index = "index"
            :examen = "e.examen"
            :cijfer = "e.cijfer"
            >
      </examen-lijst>
    </table>
    <form @submit.prevent="addCijfer()">
      <td class="bg-blue-400">
        <label for="examenInvul">Examen:</label>
        <input id="examenInvul" type="text" v-model="newExamenInvul" required/>
      </td>
      <td class="bg-blue-400">
        <label for="cijferInvul">Cijfer:</label>
        <input id="cijferInvul" type="text" v-model="newCijferInvul"/>
        <button type="submit">Submit</button>
      </td>
    </form>
    <br>
    <span>Gemiddelde: {{ average }} ({{ this.cijfers.filter(el => el.cijfer != null).length }} cijfers)</span>
  </div>
</template>

<script>
import ExamenLijst from './components/Examen'
import axios from 'axios'
import './styles/app.css'
export default {
  components: {
    ExamenLijst
  },
  methods: {
    veranderId(index, cijfer){
      this.cijfers[index].cijfer= null;
      if (isNaN(parseFloat(cijfer))) {
        this.cijfers[index].cijfer = null;
      } else {
        this.cijfers[index].cijfer = parseFloat(cijfer);
      }
    },
    addCijfer() {
      const newCijfer = {
        examen: this.newExamenInvul,
        cijfer: parseFloat(this.newCijferInvul),
      };

      this.cijfers.push(newCijfer);
      this.newExamenInvul = "";
      this.newCijferInvul = "";
    },
    verwijderId: function(index){
      this.cijfers.splice(index, 1);
    },
    fetchData() {
      axios.get('http://localhost:8000/api/cijfers')
        .then(response => {
          this.cijfers = response.data.map(item => ({
            examen: item.examen,
            cijfer: item.cijfer !== null ? parseFloat(item.cijfer) : null
          }));        
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  },
  data () {
    return {
      cijfers: []
    }
  },
  computed: {
    average: function computeAverage() {
      return Math.round (this.cijfers.reduce((sum, e) => sum + e.cijfer, 0) / this.cijfers.filter(el => el.cijfer != null).length * 10) / 10;
    },
  },
  created() {
    this.fetchData();
  }
}
</script>
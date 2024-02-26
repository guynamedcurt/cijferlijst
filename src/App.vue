<template>
  <h1>
    Cijferlijst
  </h1>
  <div>
    <table>
      <tr><td bgcolor="gray">Examen</td><td bgcolor="gray">Cijfer</td></tr>
      <examen-lijst v-for="(e,index) in cijfers" @veranderId="veranderId" @verwijderId="verwijderId" :key="index"
            :index = "index"
            :examen = "e.examen"
            :nummer = "e.nummer"
            >
      </examen-lijst>
    </table>
    <form @submit.prevent="addCijfer()">
      <td>
        <label for="examenInvul">Examen:</label>
        <input id="examenInvul" type="text" v-model="newExamenInvul" required/>
      </td>
      <td>
        <label for="cijferInvul">Cijfer:</label>
        <input id="cijferInvul" type="text" v-model="newCijferInvul"/>
        <button type="submit">Submit</button>
      </td>
    </form>
    <br>
    <span>Gemiddelde: {{ average }} ({{ this.cijfers.filter(el => el.nummer != null).length }} cijfers)</span>
  </div>
</template>

<script>
import ExamenLijst from './components/Examen'
export default {
  components: {
    ExamenLijst
  },
  methods: {
    veranderId(index, nummer){
      this.cijfers[index].nummer= null;
      if (isNaN(parseFloat(nummer))) {
        this.cijfers[index].nummer = null;
      } else {
        this.cijfers[index].nummer = parseFloat(nummer);
      }
    },
    addCijfer() {
      const newCijfer = {
        examen: this.newExamenInvul,
        nummer: parseFloat(this.newCijferInvul),
      };

      console.log(this.newExamenInvul + " en " + this.newCijferInvul);
      this.cijfers.push(newCijfer);
      this.newExamenInvul = "";
      this.newCijferInvul = "";
    },
    verwijderId: function(index){
      console.log(index + "Werkt!!");
      this.cijfers.splice(index, 1);
    }
  },
  data () {
    return {
      cijfers: [{ examen:"Frontend Development", nummer:null},
          {examen:"Webdevelopment", nummer:7.5},
          {examen:"Mobile Application Development", nummer:4.5},
          {examen:"Stage 1", nummer:6.1},
          {examen:"Stage 2", nummer:null}]
    }
  },
  computed: {
    average: function computeAverage() {
      console.log(this.cijfers.reduce((sum, e) => sum + e.nummer, 0), this.cijfers.filter(el => el.nummer != null).length, this.cijfers.reduce((sum, e) => sum + e.nummer, 0) / this.cijfers.filter(el => el.nummer != null).length, Math.round(this.cijfers.reduce((sum, e) => sum + e.nummer, 0) / this.cijfers.filter(el => el.nummer != null).length * 10) / 10);
      console.log (this.cijfers.reduce((sum, e) => sum + e.nummer, 0) / this.cijfers.filter(el => el.nummer != null).length);
      return Math.round (this.cijfers.reduce((sum, e) => sum + e.nummer, 0) / this.cijfers.filter(el => el.nummer != null || el.nummer != isNaN).length * 10) / 10;
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.success {
  background-color: green;
}
.failure {
  background-color: red;
}
.blank {
  background-color: darkgray;
}
.tableWidth {
  width: 15%;
}
</style>

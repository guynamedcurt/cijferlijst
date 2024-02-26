<template>
    <tr :id="index" :class="classGrade">
        <td style="width:20vw">{{ examen }}</td><td style="width:5vw"><input type="text" :value="nummer" @keyup='verander'/></td>
        <td style="width:1vw"><button @click="verwijder">X</button></td>
    </tr>
</template>
<script>
    export default {
        name: 'ExamenLijst', // element <Examen>
        props: ['index', 'examen', 'nummer'], //gegevens van het element
        methods:{
            verwijder: function(){
                this.$emit('verwijderId', this.index)
            },
            verander($event){
                $event.target.value = $event.target.value.replace(/,/g, ".");
                if ($event.target.value != undefined || $event.target.value != null || $event.target.value != '') {
                    this.$emit('veranderId', this.index, $event.target.value)       //vuur event af
                }
            }
        },
        computed: {
            classGrade() {
                return {
                    'success': this.nummer >= 5.5 && this.nummer <= 10.0,
                    'failure': this.nummer >= 0.1 && this.nummer <= 5.4,
                    'blank': this.nummer == '' || this.nummer == null
                }
            }
        }
    }
</script>
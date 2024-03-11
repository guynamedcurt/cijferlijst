<template>
    <tr :id="index" :class="classGrade">
        <td class="tableName">{{ examen }}</td><td class="tableGrade"><input type="text" :value="cijfer" @keyup='verander'/></td>
        <td class="tableButton"><button @click="verwijder">X</button></td>
    </tr>
</template>
<script>
    export default {
        name: 'ExamenLijst', // element <Examen>
        props: ['index', 'examen', 'cijfer'], //gegevens van het element
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
                    'success': this.cijfer >= 5.5 && this.cijfer <= 10.0,
                    'failure': this.cijfer >= 0.1 && this.cijfer <= 5.4,
                    'blank': this.cijfer == '' || this.cijfer == null
                }
            }
        }
    }
</script>
<template>
  <v-card class="table-elements">
    <v-card-title>
      {{nameSection}}
      <br>
      Количество элементов: {{countElements}}
      <v-spacer></v-spacer>
      <v-text-field
              v-model="search"
              label="Поиск по любому полю"
              single-line
              hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
            :headers="headers"
            :items="elements"
            :search="search"
            disable-pagination
            item-key="ID"
            @click:row="rowClick"
    >

    </v-data-table>
  </v-card>
</template>
<style>
  .table-elements {
    height: 60vh;
    width: 82vw;
    overflow-y: scroll;
    /*overflow-x:scroll*/
  }
</style>
<script>
  export default {
    name: 'TableElements',
    data() {
      return {
        search: '',
        headers: [
          {
            text: 'ID',
            align: 'left',
            sortable: false,
            value: 'ID',
            width: '15%'
          },
          {
            text: 'ARTICLE',
            value: 'ARTICLE',
            width: '15%'
          },
          {
            text: 'NAME',
            value: 'NAME',
            width: '50%'
          },
          {
            text: 'PRICE',
            value: 'PRICE',
            width: '10%'
          },
          {
            text: 'QUANTITY',
            value: 'QUANTITY',
            width: '10%'
          },
        ],
      }
    },
    methods: {
      rowClick(item) {
        this.$store.dispatch('getAnalogs', {
          id: item['ID']
        });
        this.$store.dispatch('getGroups', {
          id: item['ID']
        })
      }
    },
    computed: {
      elements() {
        return this.$store.getters.elements;
      },
      countElements() {
        return this.$store.getters.countElements;
      },
      nameSection() {
        return this.$store.getters.nameSection;
      }
    }
  }
</script>
<template>
  <!--v-tabs>
    <v-tab>Item One</v-tab>
    <v-tab>Item Two</v-tab>
    <v-tab>Item Three</v-tab>
  </v-tabs>
  <v-card class="sub-table-elements">
    <v-data-table
            :headers="headers"
            :items="desserts"
            :search="search"
    ></v-data-table>
  </v-card-->
  <v-card>
    <v-tabs
            v-model="tab"
            background-color="indigo darken-3"
            dark
    >
      <v-tab
              v-for="item in items"
              :key="item.tab"
      >
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
              v-for="item in items"
              :key="item.tab"
      >
        <v-card class="sub-table-elements">
          <v-data-table
                  :headers="headers[item.headers]"
                  :items="analogsAndGroups[item.headers]"
                  disable-pagination
                  hide-default-footer
          ></v-data-table>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<style>
  .sub-table-elements {
    height: 25vh;
    width: 82vw;
    overflow-y: scroll;
    overflow-x: scroll
  }
</style>
<script>
  export default {
    name: 'SubTableElements',
    data() {
      return {
        search: '',
        headers: {
          analogs: [
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
          groups: [
            {
              text: 'ID',
              align: 'left',
              sortable: false,
              value: 'ID',
              width: '15%'
            },
            {
              text: 'NAME',
              value: 'NAME',
              width: '50%'
            },
          ]
        },
        tab: null,
        items: [
          {
            tab: 'Аналоги',
            headers: 'analogs',
          },
          {
            tab: 'Разделы',
            headers: 'groups',
          },
        ],
      }
    },
    computed: {
      analogsAndGroups() {
        const {analogs, groups} = this.$store.getters;
        return {analogs, groups};
      },
    }
  }
</script>
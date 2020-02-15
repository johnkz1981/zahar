<template>
  <div>
    <v-treeview
            v-model="tree"
            :open="open"
            :items="items"
            activatable
            item-key="id"
            @update:active="getItem"
    >

      <template v-slot:prepend="{ item, open }" >
        <v-icon v-if="!item.file">
          {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
        </v-icon>
        <v-icon v-else>
          {{ files[item.file] }}
        </v-icon>
      </template>
    </v-treeview>
  </div>
</template>

<script>
  export default {
    name: 'TreeView',
    data: () => ({
      open: ['public'],
      files: {
        html: 'mdi-language-html5',
        js: 'mdi-nodejs',
        json: 'mdi-json',
        md: 'mdi-markdown',
        pdf: 'mdi-file-pdf',
        png: 'mdi-file-image',
        txt: 'mdi-file-document-outline',
        xls: 'mdi-file-excel',
      },
      tree: [],
      items: [],
    }),
    methods: {
      async getCatalog() {
        const data = await fetch('https://ugautodetal.ru/api2/catalog/catalogs').then(res => res.json());
        const items = data.result.IBLOCK_SECTIONS;
        const itemsResult = [];
        let level_1 = null;
        let level_2 = null;
        let level_3 = null;

        for (const item in items) {

          let {ID: id, DEPTH_LEVEL, NAME: name, LEFT_MARGIN, RIGHT_MARGIN, ELEMENT_CNT} = items[item];

          if(ELEMENT_CNT === '0'){
            continue;
          }

          let itemResult = null;
          DEPTH_LEVEL = parseInt(DEPTH_LEVEL);
          LEFT_MARGIN = parseInt(LEFT_MARGIN);
          RIGHT_MARGIN = parseInt(RIGHT_MARGIN);

          if (LEFT_MARGIN + 1 < RIGHT_MARGIN) {
            itemResult = Object.assign({id, name}, {children: []});
          } else {
            itemResult = {id, name};
          }

          switch (DEPTH_LEVEL) {
            case 1:
              level_1 = itemResult;
              itemsResult.push(itemResult);
              break;
            case 2:
              level_2 = itemResult;
              level_1.children.push(itemResult);
              break;
            case 3:
              level_3 = itemResult;
              level_2.children.push(itemResult);
              break;
            default:
              level_3.children.push(itemResult);
          }
        }
        this.items = itemsResult;
        // console.log(itemsResult);
      },
      getItem(idSection){
        this.$store.dispatch('getElements', {
          idSection: idSection[0]
        })
      }
    },
    created(){
      this.getCatalog();
    }
  }
</script>
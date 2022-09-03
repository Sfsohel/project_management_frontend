<template>
    <v-layout>
        <v-row class="clickable">
            <v-col cols="12" md="12">
                <v-card class="ml-4 mr-4">
                    <!-- <v-app-bar dark color="#2C3A47">
                        <v-btn icon>
                            <v-icon>mdi-home</v-icon>
                        </v-btn>
                        <v-toolbar-title>Dashboard</v-toolbar-title>
                    </v-app-bar> -->
                    <v-card-title>
                        <h2>Departments</h2>
                    </v-card-title>
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-hover v-slot:default="{ hover }" open-delay="200">
                                    <v-card :elevation="hover ? 16 : 2" class="mx-auto">
                                        <v-card-text>
                                            <v-data-table :headers="headers" :items="departments" sort-by="calories"
                                                class="elevation-1">
                                                <!-- <template v-slot:item="{item, index}">
                                                    {{index +1}}
                                                </template> -->
                                                <template v-slot:top>
                                                    <v-toolbar flat>
                                                        <v-toolbar-title>Manage Departments</v-toolbar-title>
                                                        <v-divider class="mx-4" inset vertical></v-divider>
                                                        <v-spacer></v-spacer>
                                                        <v-dialog v-model="dialog" max-width="500px">
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn color="primary" dark class="mb-2" v-bind="attrs"
                                                                    v-on="on">
                                                                    New Item
                                                                </v-btn>
                                                            </template>
                                                            <v-card>
                                                                <v-card-title>
                                                                    <span class="text-h5">{{ formTitle }}</span>
                                                                </v-card-title>

                                                                <v-card-text>
                                                                    <v-container>
                                                                        <v-row>
                                                                            <v-col cols="12" md="12">
                                                                                <v-text-field v-model="editedItem.name"
                                                                                    label="Department name">
                                                                                </v-text-field>
                                                                            </v-col>
                                                                            <!-- <v-col cols="12" sm="6" md="4">
                                                                                <v-text-field
                                                                                    v-model="editedItem.calories"
                                                                                    label="Calories"></v-text-field>
                                                                            </v-col>
                                                                            <v-col cols="12" sm="6" md="4">
                                                                                <v-text-field v-model="editedItem.fat"
                                                                                    label="Fat (g)"></v-text-field>
                                                                            </v-col>
                                                                            <v-col cols="12" sm="6" md="4">
                                                                                <v-text-field v-model="editedItem.carbs"
                                                                                    label="Carbs (g)"></v-text-field>
                                                                            </v-col>
                                                                            <v-col cols="12" sm="6" md="4">
                                                                                <v-text-field
                                                                                    v-model="editedItem.protein"
                                                                                    label="Protein (g)"></v-text-field>
                                                                            </v-col> -->
                                                                        </v-row>
                                                                    </v-container>
                                                                </v-card-text>

                                                                <v-card-actions>
                                                                    <v-spacer></v-spacer>
                                                                    <v-btn color="blue darken-1" text @click="close">
                                                                        Cancel
                                                                    </v-btn>
                                                                    <v-btn color="blue darken-1" text @click="save">
                                                                        Save
                                                                    </v-btn>
                                                                </v-card-actions>
                                                            </v-card>
                                                        </v-dialog>
                                                        <v-dialog v-model="dialogDelete" max-width="500px">
                                                            <v-card>
                                                                <v-card-title class="text-h5">Are you sure you want to
                                                                    delete this item?</v-card-title>
                                                                <v-card-actions>
                                                                    <v-spacer></v-spacer>
                                                                    <v-btn color="blue darken-1" text
                                                                        @click="closeDelete">Cancel</v-btn>
                                                                    <v-btn color="blue darken-1" text
                                                                        @click="deleteItemConfirm">OK</v-btn>
                                                                    <v-spacer></v-spacer>
                                                                </v-card-actions>
                                                            </v-card>
                                                        </v-dialog>
                                                    </v-toolbar>
                                                </template>
                                                <template v-slot:item.actions="{ item }">
                                                    <v-icon small class="mr-2" @click="editItem(item)">
                                                        mdi-pencil
                                                    </v-icon>
                                                    <v-icon small @click="deleteItem(item)">
                                                        mdi-delete
                                                    </v-icon>
                                                </template>
                                                <template v-slot:no-data>
                                                    <v-btn color="primary" @click="initialize">
                                                        Reset
                                                    </v-btn>
                                                </template>
                                            </v-data-table>
                                        </v-card-text>
                                    </v-card>
                                </v-hover>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-layout>
</template>
<script>
    import axios from 'axios'
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        //   {
        //       text: 'Sl.',
        //       value: 'index'
        //   },
        {
          text: 'Department Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        // { text: 'Fat (g)', value: 'fat' },
        // { text: 'Carbs (g)', value: 'carbs' },
        // { text: 'Protein (g)', value: 'protein' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      departments: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        // calories: 0,
        // fat: 0,
        // carbs: 0,
        // protein: 0,
      },
      defaultItem: {
        name: '',
        // calories: 0,
        // fat: 0,
        // carbs: 0,
        // protein: 0,
      },
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        // itemsWithIndex() {
        //     return this.departments.map(
        //         (items, index) => ({
        //             ...items,
        //             index: index + 1
        //         }))
        // }
    },
    mounted() {
        let user = localStorage.getItem('user');
        if (!user) {
            this.$router.push({ name: "Login" });
        }
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      async initialize () {
            let result = await axios.get(`/department`);
            this.departments = result.data;
        },

        editItem(item) {
            this.editedIndex = this.departments.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.departments.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        async deleteItemConfirm() {
            let result = await axios.delete(`/department/` + this.editedItem.id);
            console.log(result);
            if (result.status == 200) {
                this.departments.splice(this.editedIndex, 1)
                this.closeDelete()
            }
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        async save() {
            if (this.editedIndex > -1) {
                let result = await axios.put(`/department/` + this.editedItem.id,{'name':this.editedItem.name});
                console.log(result);
                if (result.status==200) {
                    Object.assign(this.departments[this.editedIndex], this.editedItem)
                }
                // console.log(this.editedItem);
            } else {
                let result = await axios.post(`/department`, { 'name': this.editedItem.name });
                console.log(result);
                if (result.status == 200) {
                    this.departments.push(this.editedItem)
                }
                
            }
            this.close()
        },
    },
}
</script>
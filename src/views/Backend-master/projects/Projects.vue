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
                        <h2>Projects</h2>
                    </v-card-title>
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-hover v-slot:default="{ hover }" open-delay="200">
                                    <v-card :elevation="hover ? 16 : 2" class="mx-auto">
                                        <v-card-text>
                                            <v-data-table :headers="headers" :items="projects" sort-by="calories"
                                                class="elevation-1">
                                                <template v-slot:top>
                                                    <v-toolbar flat>
                                                        <v-toolbar-title>Manage Projects</v-toolbar-title>
                                                        <v-divider class="mx-4" inset vertical></v-divider>
                                                        <v-spacer></v-spacer>
                                                        <!-- <v-dialog v-model="dialog" max-width="500px">
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
                                                        </v-dialog> -->
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
export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: 'sl', value: 'serial' },
            {
                text: 'Project Name',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            // { text: 'Fat (g)', value: 'fat' },
            // { text: 'Carbs (g)', value: 'carbs' },
            // { text: 'Protein (g)', value: 'protein' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        projects: [],
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
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initialize()
    },

    methods: {
        initialize() {
            this.projects = [
                {
                    serial: 159,
                    name: 'Software',
                    // fat: 6.0,
                    // carbs: 24,
                    // protein: 4.0,
                },
            ]
        },

        editItem(item) {
            this.editedIndex = this.projects.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.projects.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.projects.splice(this.editedIndex, 1)
            this.closeDelete()
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

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.projects[this.editedIndex], this.editedItem)
            } else {
                this.projects.push(this.editedItem)
            }
            this.close()
        },
    },
}
</script>
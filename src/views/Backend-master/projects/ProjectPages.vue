<template>
    <v-layout>
        <v-row class="clickable">
            <v-col cols="12" md="12">
                <v-card class="ml-4 mr-4">
                    <v-card-title>
                        <h2>Project Pages</h2>
                    </v-card-title>
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-hover v-slot:default="{ hover }" open-delay="200">
                                    <v-card :elevation="hover ? 16 : 2" class="mx-auto">
                                        <v-card-text>
                                            <p>Projects</p>
                                            <v-row justify="center">
                                                <v-expansion-panels inset>
                                                    <v-expansion-panel v-for="(project, index) in projects" :key="index" @click="getModules(project.id)">
                                                        <v-expansion-panel-header>{{project.name}}</v-expansion-panel-header>
                                                        <v-expansion-panel-content>
                                                            <v-expansion-panels inset>
                                                                <v-expansion-panel v-for="(module, index) in modules" :key="index" @click="getPages(project.id,module.id)">
                                                                    <v-expansion-panel-header>{{module.name}}</v-expansion-panel-header>
                                                                    <v-expansion-panel-content>
                                                                        <!-- <div v-if="project_pages.length > 0"> -->
                                                                            <v-data-table :headers="headers" :items="project_pages" sort-by="calories"
                                                                                class="elevation-1">
                                                                                <template v-slot:top>
                                                                                    <v-toolbar flat>
                                                                                        <v-toolbar-title>Manage Pages</v-toolbar-title>
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
                                                                                                                <v-combobox v-model="editedItem.project"
                                                                                                                    :items="['Web development', 'Android']"
                                                                                                                    label="Select Project" multiple
                                                                                                                    outlined dense>
                                                                                                                </v-combobox>
                                                                                                            </v-col>
                                                                                                            <v-col cols="12" md="12">
                                                                                                                <v-combobox
                                                                                                                    v-model="editedItem.module_id"
                                                                                                                    :items="['Web development', 'Android']"
                                                                                                                    label="Parent Module" multiple
                                                                                                                    outlined dense>
                                                                                                                </v-combobox>
                                                                                                            </v-col>
                                                                                                            <v-col cols="12" md="12">
                                                                                                                <v-text-field v-model="editedItem.name"
                                                                                                                    label="Moudle name">
                                                                                                                </v-text-field>
                                                                                                            </v-col>
                                                                                                            <v-col cols="12" md="12">
                                                                                                                <v-text-field v-model="editedItem.url"
                                                                                                                    label="Page url">
                                                                                                                </v-text-field>
                                                                                                            </v-col>
                                                                                                            <v-col cols="12" md="12">
                                                                                                                <v-textarea
                                                                                                                    v-model="editedItem.description"
                                                                                                                    label="Description">
                                                                                                                </v-textarea>
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
                                                                                    <span><b>No data</b></span> &nbsp; &nbsp;
                                                                                    <v-btn color="primary" @click="initialize">
                                                                                        Reload
                                                                                    </v-btn>
                                                                                </template>
                                                                            </v-data-table>
                                                                        <!-- </div> -->
                                                                    </v-expansion-panel-content>
                                                                </v-expansion-panel>
                                                            </v-expansion-panels>
                                                        </v-expansion-panel-content>
                                                    </v-expansion-panel>
                                                </v-expansion-panels>
                                            </v-row>
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
        item: 5,
        project_pages: [],
        projects:[],
        modules:[],
        pages:[],

        dialog: false,
        dialogDelete: false,
        headers: [
            {
                text: 'Department Name',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            { text: 'Project Name', value: 'project.name' },
            { text: 'Module Name', value: 'module.name' },
            { text: 'Page Url', value: 'page_url' },
            { text: 'Description', value: 'description' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
            name: '',
            project: '',
            module_id: '',
            url: '',
            description: '',
            // calories: 0,
            // fat: 0,
            // carbs: 0,
            // protein: 0,
        },
        defaultItem: {
            name: '',
            project: '',
            module_id: '',
            url: '',
            description: '',
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
        async initialize() {
            let result = await axios.get(`/project`);
            this.projects = result.data;
            this.project_pages = [
                {
                    serial: 159,
                    name: 'Software',
                },
            ]
        },
        async getModules(id){
            let result = await axios.get(`/module/`+id);
            this.modules = result.data;
        },
        async getPages(project_id,module_id){
            let result = await axios.get(`/page/`+module_id);
            this.project_pages = result.data;
            console.log(project_id,module_id);
        },
        editItem(item) {
            this.editedIndex = this.project_pages.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.project_pages.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.project_pages.splice(this.editedIndex, 1)
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
                Object.assign(this.project_pages[this.editedIndex], this.editedItem)
            } else {
                this.project_pages.push(this.editedItem)
            }
            this.close()
        },
    },
}
</script>
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
                        <h2>Project Resources</h2>
                    </v-card-title>
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-hover v-slot:default="{ hover }" open-delay="200">
                                    <v-card :elevation="hover ? 16 : 2" class="mx-auto">
                                        <v-card-text>
                                            <v-data-table :headers="headers" :items="project_resources"
                                                sort-by="calories" class="elevation-1">
                                                <template v-slot:top>
                                                    <v-toolbar flat>
                                                        <v-toolbar-title>Manage Project Resources</v-toolbar-title>
                                                        <v-divider class="mx-4" inset vertical></v-divider>
                                                        <v-spacer></v-spacer>
                                                        <v-dialog v-model="dialog" max-width="500px">
                                                            <!-- <template v-slot:activator="{ on, attrs }">
                                                                <v-btn color="primary" dark class="mb-2" v-bind="attrs"
                                                                    v-on="on">
                                                                    New Item
                                                                </v-btn>
                                                            </template> -->
                                                            <v-card>
                                                                <v-card-title>
                                                                    <span class="text-h5">{{ formTitle }}</span>
                                                                </v-card-title>

                                                                <v-card-text>
                                                                    <v-container>
                                                                        <v-row>
                                                                            <v-col cols="12" md="12">
                                                                                <!-- <v-text-field v-model="editedItem.name"
                                                                                    label="Department name">
                                                                                </v-text-field> -->
                                                                                <v-autocomplete v-model="friends"
                                                                                    :disabled="isUpdating"
                                                                                    :items="people" filled chips
                                                                                    color="blue-grey lighten-2"
                                                                                    label="Select" item-text="name"
                                                                                    item-value="name" multiple>
                                                                                    <template v-slot:selection="data">
                                                                                        <v-chip v-bind="data.attrs"
                                                                                            :input-value="data.selected"
                                                                                            close @click="data.select"
                                                                                            @click:close="remove(data.item)">
                                                                                            <v-avatar left>
                                                                                                <v-img
                                                                                                    :src="data.item.avatar">
                                                                                                </v-img>
                                                                                            </v-avatar>
                                                                                            {{ data.item.name }}
                                                                                        </v-chip>
                                                                                    </template>
                                                                                    <template v-slot:item="data">
                                                                                        <template
                                                                                            v-if="typeof data.item !== 'object'">
                                                                                            <v-list-item-content
                                                                                                v-text="data.item">
                                                                                            </v-list-item-content>
                                                                                        </template>
                                                                                        <template v-else>
                                                                                            <v-list-item-avatar>
                                                                                                <img
                                                                                                    :src="data.item.avatar">
                                                                                            </v-list-item-avatar>
                                                                                            <v-list-item-content>
                                                                                                <v-list-item-title
                                                                                                    v-html="data.item.name">
                                                                                                </v-list-item-title>
                                                                                                <v-list-item-subtitle
                                                                                                    v-html="data.item.group">
                                                                                                </v-list-item-subtitle>
                                                                                            </v-list-item-content>
                                                                                        </template>
                                                                                    </template>
                                                                                </v-autocomplete>
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
        autoUpdate: true,
        friends: ['Sandra Adams', 'Britta Holt'],
        isUpdating: false,
        name: 'Midnight Crew',
        people: [
            { header: 'Group 1' },
            { name: 'Sandra Adams', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
            { name: 'Ali Connors', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
            { name: 'Trevor Hansen', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
            { name: 'Tucker Smith', group: 'Group 1', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
            { divider: true },
            { header: 'Group 2' },
            { name: 'Britta Holt', group: 'Group 2', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
            { name: 'Jane Smith ', group: 'Group 2', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
            { name: 'John Smith', group: 'Group 2', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
            { name: 'Sandra Williams', group: 'Group 2', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        ],
        title: 'The summer breeze',
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
        project_resources: [],
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
        isUpdating(val) {
            if (val) {
                setTimeout(() => (this.isUpdating = false), 3000)
            }
        },
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
            this.project_resources = [
                {
                    serial: 159,
                    name: 'Software',
                    // fat: 6.0,
                    // carbs: 24,
                    // protein: 4.0,
                },
            ]
        },
        remove(item) {
            const index = this.friends.indexOf(item.name)
            if (index >= 0) this.friends.splice(index, 1)
        },

        editItem(item) {
            this.editedIndex = this.project_resources.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.project_resources.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.project_resources.splice(this.editedIndex, 1)
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
                Object.assign(this.project_resources[this.editedIndex], this.editedItem)
            } else {
                this.project_resources.push(this.editedItem)
            }
            this.close()
        },
    },
}
</script>
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
                        <h2>Resources</h2>
                    </v-card-title>
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-hover v-slot:default="{ hover }" open-delay="200">
                                    <v-card :elevation="hover ? 16 : 2" class="mx-auto">
                                        <v-card-text>
                                            <v-data-table :headers="headers" :items="resources" sort-by="calories"
                                                class="elevation-1">
                                                <template v-slot:top>
                                                    <v-toolbar flat>
                                                        <v-toolbar-title>Manage Resources</v-toolbar-title>
                                                        <v-divider class="mx-4" inset vertical></v-divider>
                                                        <v-spacer></v-spacer>
                                                        <v-dialog v-model="dialog" max-width="500px">
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn color="primary" dark class="mb-2" v-bind="attrs"
                                                                    v-on="on">
                                                                    New Resource
                                                                </v-btn>
                                                            </template>
                                                            <v-card>
                                                                <v-card-title>
                                                                    <span class="text-h5">{{ formTitle }}</span>
                                                                </v-card-title>
                                                                <v-card-text>
                                                                    <v-container>
                                                                        <v-row>
                                                                            <v-col cols="12" sm="6" md="4">
                                                                                <v-text-field
                                                                                    v-model="editedItem.f_name"
                                                                                    label="First Name">
                                                                                </v-text-field>
                                                                            </v-col>
                                                                            <v-col cols="12" sm="6" md="4">
                                                                                <v-text-field
                                                                                    v-model="editedItem.l_name"
                                                                                    label="Last Name">
                                                                                </v-text-field>
                                                                            </v-col>
                                                                            <v-col cols="12" sm="6" md="4">
                                                                                <v-text-field v-model="editedItem.email"
                                                                                    label="Email">
                                                                                </v-text-field>
                                                                            </v-col>
                                                                            <v-col cols="12" sm="6" md="4">
                                                                                <v-text-field
                                                                                    v-model="editedItem.password"
                                                                                    :append-icon="password_show ? 'mdi-eye' : 'mdi-eye-off'"
                                                                                    :type="password_show ? 'text' : 'password'"
                                                                                    name="input-10-1" label="Password"
                                                                                    hint="At least 8 characters" counter
                                                                                    @click:append="password_show = !password_show">
                                                                                </v-text-field>
                                                                            </v-col>
                                                                            <v-col cols="12" sm="6" md="4">
                                                                                <v-select :items="departments"
                                                                                    label="Department" item-value="id"
                                                                                    item-text="name"
                                                                                    v-model="editedItem.department">
                                                                                </v-select>
                                                                            </v-col>
                                                                            <v-col cols="12" sm="6" md="4">
                                                                                <v-select :items="designations"
                                                                                    label="Designation" item-value="id"
                                                                                    item-text="name"
                                                                                    v-model="editedItem.designation">
                                                                                </v-select>
                                                                            </v-col>
                                                                            <v-col cols="12" sm="6" md="4">
                                                                                <v-combobox v-model="editedItem.skills"
                                                                                    :items="skills" item-value="id"
                                                                                    item-text="name" label="Skills"
                                                                                    multiple chips>
                                                                                </v-combobox>
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
import axios from 'axios'
export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        password_show:false,
        headers: [
            // { text: 'sl', value: 'serial' },
            {
                text: 'First Name',
                align: 'start',
                sortable: false,
                value: 'f_name',
            },
            { text: 'Last Name', value: 'l_name' },
            { text: 'Email', value: 'email' },
            { text: 'Department', value: 'department.name' },
            { text: 'Designation', value: 'designation.name' },
            { text: 'Skills', value: 'skills' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        resources: [],
        departments:[],
        designations:[],
        skills:[],
        editedIndex: -1,
        editedItem: {
            f_name: '',
            l_name:'',
            email:'',
            password:'',
            department:'',
            designation:'',
            skills:[],
        },
        defaultItem: {
            f_name: '',
            l_name:'',
            email:'',
            password:'',
            department:'',
            designation:'',
            skills:[],
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
            let result = await axios.get(`/resource`);
            this.departments = result.data.departments;
            this.designations = result.data.designations;
            this.skills = result.data.skills;
            this.resources = result.data.resources
            // [
            //     {
            //         serial: 159,
            //         f_name: 'Software',
            //         l_name:'l_name',
            //         'email':'sfsohel',
            //         'password': '2345',
            //         'department': 'foo',
            //         'designation': 'foo',
            //         'skills': 'foo',
            //     },
            // ]
        },

        editItem(item) {
            this.editedIndex = this.resources.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.resources.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.resources.splice(this.editedIndex, 1)
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

        async save() {
            if (this.editedIndex > -1) {
                Object.assign(this.resources[this.editedIndex], this.editedItem)
            } else {
                let result = await axios.post(`/resource`, { 'f_name': this.editedItem.f_name, 'l_name': this.editedItem.l_name, 'email': this.editedItem.email, 'password': this.editedItem.password, 'department_id': this.editedItem.department, 'designation_id': this.editedItem.designation, 'skills': this.editedItem.skills });
                if (result.status == 200) {
                    this.initialize()
                    this.resources.push(this.editedItem)
                }
            }
            this.close()
        },
    },
}
</script>
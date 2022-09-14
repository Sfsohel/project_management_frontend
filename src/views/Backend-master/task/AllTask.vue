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
                        <h2>Tasks</h2>
                    </v-card-title>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-select :items="projects" item-value="id" item-text="name" @change="projectChange" label="Project Name"
                                    v-model="project_id"></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-select :items="modules" item-value="id" item-text="name" @change="getPages" label="Module Name"
                                    v-model="module_id"></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-select :items="pages" @change="getTask" item-value="id" item-text="name" label="Page Name"
                                    v-model="page_id"></v-select>
                            </v-col>
                        </v-row>
                        <v-row v-if="tasks.length > 0">
                            <v-col cols="12" md="12">
                                <v-hover v-slot:default="{ hover }" open-delay="200">
                                    <v-card :elevation="hover ? 16 : 2" class="mx-auto">
                                        <v-card-text>
                                            <v-data-table :headers="headers" :items="tasks" sort-by="calories"
                                                class="elevation-1">
                                                <template v-slot:top>
                                                    <v-toolbar flat>
                                                        <v-toolbar-title>Manage Tasks</v-toolbar-title>
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
                                                                                    label="Task name">
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

                                                    <v-icon title="Edit" small class="mr-2" @click="editItem(item)">
                                                        mdi-pencil
                                                    </v-icon>
                                                    <v-icon title="Delete" small @click="deleteItem(item)">
                                                        mdi-delete
                                                    </v-icon>
                                                    <v-icon title="Publish" v-if="item.is_draft == 0"  @click="activatePublish(item.id)">
                                                        mdi-publish
                                                    </v-icon>
                                                    <v-btn v-if="item.is_draft == 1 && item.task_movement.length <= 0" color="purple" small  @click.stop="task_id=item.id,assigndialog = true">Assign User</v-btn>
                                                    <!-- <v-btn color="purple" @click="activatePublish(item.id)">Publish</v-btn> -->
                                                </template>
                                                <template v-slot:no-data>
                                                    <v-btn color="primary" @click="initialize">
                                                        Reset
                                                    </v-btn>
                                                </template>
                                            </v-data-table>
                                            <v-dialog
                                                v-model="assigndialog"
                                                max-width="450"
                                            >
                                                <v-card>
                                                    <v-card-title class="text-h5">
                                                        Assign Resource <small>(This resoures are assigned to this project)</small>
                                                    </v-card-title>

                                                    <v-card-text>
                                                        <v-row>
                                                            <!-- <v-col cols="12" sm="6" md="4">
                                                                <v-select :items="['On Going','Finished']" label="Depatment"
                                                                    v-model="department_id"></v-select>
                                                            </v-col>
                                                            <v-col cols="12" sm="6" md="4">
                                                                <v-select :items="['On Going','Finished']" label="Designation"
                                                                    v-model="designation_id"></v-select>
                                                            </v-col> -->
                                                            <v-col cols="12"  md="12">
                                                                <v-combobox :items="users" item-value="id" item-text="full_name" label="Resource"
                                                                    v-model="selected_user" return-object></v-combobox>
                                                            </v-col>
                                                            <v-col cols="12" md="12" v-if="selected_user">
                                                                <div>
                                                                    <p><b>Resource Skills</b></p>
                                                                    <ul>
                                                                        <li v-for="skill in selected_user.skill" :key="skill.id">{{skill.name}}</li>
                                                                    </ul>
                                                                </div>
                                                            </v-col>
                                                            <v-col cols="12" sm="6" md="12">
                                                                <tiptap-vuetify
                                                                    v-model="description"
                                                                    :extensions="extensions"
                                                                    placeholder="Description"
                                                                />
                                                            </v-col>
                                                        </v-row>
                                                    </v-card-text>

                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>

                                                        <v-btn
                                                            color="green darken-1"
                                                            text
                                                            @click="assigndialog = false"
                                                        >
                                                            Cancel
                                                        </v-btn>

                                                        <v-btn
                                                            color="green darken-1"
                                                            text
                                                            @click="assignUser"
                                                        >
                                                            Apply
                                                        </v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </v-card-text>
                                    </v-card>
                                </v-hover>
                            </v-col>
                        </v-row>
                        <v-row v-else>
                            <v-col clos="12" md="12"> <h1 align="center">Please select Project -> Module -> Pages</h1> </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-layout>
</template>
<script>
    import axios from 'axios'
    import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
    export default {
        components: { TiptapVuetify },
        data: () => ({
            users:[],
            selected_user:null,
            assigndialog: false,
            dialog: false,
            dialogDelete: false,
            projects:[],
            project_id:null,
            modules:[],
            module_id:null,
            pages:[],
            page_id:null,
            task_id:null,
            description:null,
            extensions: [
                History,
                Blockquote,
                Link,
                Underline,
                Strike,
                Italic,
                ListItem,
                BulletList,
                OrderedList,
                [Heading, {
                    options: {
                    levels: [1, 2, 3]
                    }
                }],
                Bold,
                Code,
                HorizontalRule,
                Paragraph,
                HardBreak
            ],
            headers: [
                //   {
                //       text: 'Sl.',
                //       value: 'index'
                //   },
                {
                text: 'Task Name',
                align: 'start',
                sortable: false,
                value: 'name',
                },
                { text: 'Priority', value: 'priority' },
                { text: 'Tracker', value: 'tracker' },
                { text: 'Status', value: 'status' },
                { text: 'Exp. Start', value: 'start_date' },
                { text: 'Exp. End', value: 'end_date' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            tasks: [],
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
            //     return this.tasks.map(
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
                let result = await axios.get(`/project`);
                this.projects = result.data;
            },

            async projectChange(){
                let result = await axios.get(`/project-resources/`+this.project_id);
                this.users = result.data.user;
                let module_result = await axios.get(`/module/`+this.project_id);
                this.modules = module_result.data;
            },
            async getPages(){
                let result = await axios.get(`/page/`+ this.module_id);
                this.pages = result.data;
                // console.log(project_id,module_id);
                // this.getTask();

            },
            async getTask(){
                let result = await axios.get(`/task`,{ params: { project_id: this.project_id,module_id:this.module_id,page_id:this.page_id } });
                this.tasks = result.data;
            },
            async activatePublish(id){
                let result = await axios.get(`/task-publish/`+ id);
                // this.pages = result.data;
                if (result.data){
                    this.getTask();   
                }
            },
            async assignUser(){
                let result = await axios.post(`/task-assign`,{user_id:this.selected_user.id,task_id:this.task_id,description:this.description});
                // this.pages = result.data;
                if (result.data){
                    this.assigndialog = false;
                    this.getTask();   
                }
            },
            editItem(item) {
                this.editedIndex = this.tasks.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                this.editedIndex = this.tasks.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },

            async deleteItemConfirm() {
                let result = await axios.delete(`/department/` + this.editedItem.id);
                console.log(result);
                if (result.status == 200) {
                    this.tasks.splice(this.editedIndex, 1)
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
                        Object.assign(this.tasks[this.editedIndex], this.editedItem)
                    }
                    // console.log(this.editedItem);
                } else {
                    let result = await axios.post(`/department`, { 'name': this.editedItem.name });
                    console.log(result);
                    if (result.status == 200) {
                        this.tasks.push(this.editedItem)
                    }
                    
                }
                this.close()
            },
        },
    }
</script>
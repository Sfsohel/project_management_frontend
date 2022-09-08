<template>
    <v-layout>
        <v-row class="clickable">
            <v-col cols="12" md="12">
                <v-card class="ml-4 mr-4">
                    <v-card-title>
                        <h2>Add Task/Issue</h2>
                    </v-card-title>
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-card>
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="12">
                                                <v-text-field v-model="name" label="Task/Issue Name"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-select :items="projects" item-value="id" item-text="name" @change="projectChange" label="Project Name"
                                                    v-model="project_id"></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-select :items="modules" item-value="id" item-text="name" @change="getPages" label="Module Name"
                                                    v-model="module_id"></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-select :items="pages" item-value="id" item-text="name" label="Page Name"
                                                    v-model="page_id"></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="menu_name" label="Menu Name"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-select :items="['Low','Medium','High','Urgent']" label="Priority"
                                                    v-model="priority"></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-select :items="['New','Feature','Bug','Start After Discussion','Support','Change Request','Optimization','Research & Development']" label="Tracker Type"
                                                    v-model="tracker"></v-select>
                                            </v-col>
                                            <!-- <v-col cols="12" sm="6" md="4">
                                                <v-select :items="['Not Done','Done','In Progress','Assigned','Solved','Deployed','Testing','Test Passed','Test Failed','Reopened']" label="Task Status"
                                                    v-model="status"></v-select>
                                            </v-col> -->
                                            <v-col cols="12" sm="6" md="4">
                                                <v-datetime-picker label="Select Datetime" v-model="start_date"></v-datetime-picker>
                                                <!-- <v-menu v-model="start_date_menu" :close-on-content-click="false"
                                                    :nudge-right="40" transition="scale-transition" offset-y
                                                    min-width="auto">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="start_date" label="Start Date"
                                                            prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                            v-on="on"></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="start_date"
                                                        @input="start_date_menu = false">
                                                    </v-date-picker>
                                                </v-menu> -->
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-datetime-picker label="Select Datetime" v-model="end_date"></v-datetime-picker>
                                                <!-- <v-menu v-model="end_date_menu" :close-on-content-click="false"
                                                    :nudge-right="40" transition="scale-transition" offset-y
                                                    min-width="auto">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="end_date" label="End Date"
                                                            prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                            v-on="on"></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="end_date" @input="end_date_menu = false">
                                                    </v-date-picker>
                                                </v-menu> -->
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field type="number" v-model="est_hour" label="Est. Hour (By Developer)"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-file-input label="Attachment" chips multiple show-size truncate-length="24"
                                                    v-model="attachment">
                                                </v-file-input>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="12">
                                                <v-card>
                                                    <v-card-title>Assign Resource <small>(This resoures are assigned to this project)</small> </v-card-title>
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
                                                            <v-col cols="12" sm="6" md="4">
                                                                <v-select :items="users" item-value="id" item-text="full_name" label="Resource"
                                                                    v-model="user_id"></v-select>
                                                            </v-col>
                                                        </v-row>
                                                    </v-card-text>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="12">
                                                <tiptap-vuetify
                                                    v-model="description"
                                                    :extensions="extensions"
                                                    placeholder="Description"
                                                />
                                            </v-col>
                                            <v-col cols="12" sm="6" md="12">
                                                <tiptap-vuetify
                                                    v-model="impact_description"
                                                    :extensions="extensions"
                                                    placeholder="Impact Description"
                                                />
                                                <!-- <v-text-field v-model="impact_description" label="Inpact Descrition"></v-text-field> -->
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="2" sm="6">
                                                <v-btn color="teal accent-4" @click=" is_draft=0,saveDetais()">Save As Draft</v-btn>
                                            </v-col>
                                            <v-col cols="12" md="2" sm="6">
                                                <v-btn color="primary" @click="is_draft=1,saveDetais()">Publish</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
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
import moment from 'moment';
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
export default {
    components: { TiptapVuetify },
    data: () => ({
        projects:[],
        users:[],
        modules:[],
        pages:[],
        name:'',
        project_id:null,
        module_id:null,
        page_id:null,
        menu_name:'',
        priority:null,
        tracker:'',
        status:'',
        start_date: moment().format('YYYY-MM-DD H:mm'),
        start_date_menu: false,
        end_date: moment().format('YYYY-MM-DD H:mm'),
        end_date_menu:false,
        est_hour:'',
        attachment:null,
        department_id:null,
        designation_id:null,
        user_id:null,
        description:'',
        impact_description:'',
        is_draft:0,
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
    }),

    computed: {
        
    },

    watch: {
        
    },

    created() {
        this.initialize()
    },

    methods: {
        async initialize(){
            let result = await axios.get(`/project`);
            this.projects = result.data;
        },
        async projectChange(){
            let result = await axios.get(`/project-resources/`+this.project_id);
            this.users = result.data.user;
            let module_result = await axios.get(`/module/`+this.project_id);
            this.modules = module_result.data;
            console.log(this.users);
        },
        async getPages(){
            let result = await axios.get(`/page/`+ this.module_id);
            this.pages = result.data;
            // console.log(project_id,module_id);
        },
        async saveDetais() {
            let formData = new FormData();
            if (this.attachment.length > 0) {
                this.attachment.forEach(element => {
                    formData.append('attachment[]', element);
                });
            }
            formData.append('name', this.name);
            formData.append('project_id', this.project_id);
            formData.append('module_id', this.module_id);
            formData.append('page_id', this.page_id);
            formData.append('menu_name', this.menu_name);
            formData.append('priority', this.priority);
            formData.append('tracker', this.tracker);
            // formData.append('status', this.status);
            formData.append('start_date', this.start_date);
            formData.append('end_date', this.end_date);
            formData.append('est_hour', this.est_hour);
            // formData.append('department_id', this.department_id);
            // formData.append('designation_id', this.designation_id);
            formData.append('user_id', this.user_id);
            formData.append('description', this.description);
            formData.append('impact_description', this.impact_description);
            formData.append('is_draft', this.is_draft);
            let result = await axios.post(`task`, formData);
            if (result.data) {
                console.log('good');
                // this.cashoutSaveSuccess = true;
                // this.file = [];
                // this.dialog = false;
                // this.$emit('getCallInfo');
            }
        }
    },
}
</script>
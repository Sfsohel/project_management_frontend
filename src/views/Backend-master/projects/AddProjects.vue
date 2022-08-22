<template>
    <v-layout>
        <v-row class="clickable">
            <v-col cols="12" md="12">
                <v-card class="ml-4 mr-4">
                    <v-card-title>
                        <h2>Add Projects</h2>
                    </v-card-title>
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-card>
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="name" label="Project Name"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="project_code" label="Project Code">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="home_page" label="Home Page"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-select :items="['On Going','Finished']" label="Standard"
                                                    v-model="status"></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-select :items="['General','Consultency']" label="Type"
                                                    v-model="type"></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-file-input chips multiple show-size truncate-length="24"
                                                    v-model="attachment">
                                                </v-file-input>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="client" label="Client"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="project_cost" label="Project Cost">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="contact_person" label="Contact Person">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <!-- <v-datetime-picker label="Select Datetime" v-model="start_date"></v-datetime-picker> -->
                                                <v-menu v-model="start_date_menu" :close-on-content-click="false"
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
                                                </v-menu>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <!-- <v-text-field v-model="awarded_date" label="Awarded Date"></v-text-field> -->
                                                <v-menu v-model="awarded_date_menu" :close-on-content-click="false"
                                                    :nudge-right="40" transition="scale-transition" offset-y
                                                    min-width="auto">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="awarded_date" label="Awarded Date"
                                                            prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                            v-on="on"></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="awarded_date"
                                                        @input="awarded_date_menu = false">
                                                    </v-date-picker>
                                                </v-menu>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <!-- <v-text-field v-model="end_date" label="End Date"></v-text-field> -->
                                                <v-menu v-model="end_date_menu" :close-on-content-click="false"
                                                    :nudge-right="40" transition="scale-transition" offset-y
                                                    min-width="auto">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="end_date" label="End Date"
                                                            prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                            v-on="on"></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="end_date" @input="end_date_menu = false">
                                                    </v-date-picker>
                                                </v-menu>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-select :items="['Government','Non Government']" label="Standard"
                                                    v-model="funded_by"></v-select>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field label="Time Revised" v-model="time_revised" suffix="Days">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="cost_revised" label="Cost Revised"
                                                    suffix="Amount">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="description" label="Description"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="objective" label="Objective"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="reference_terms" label="Reference Terms">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="technical_document"
                                                    label="Tecnical Documentation"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="solution_component" label="Solution Component">
                                                </v-text-field>
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
export default {
    data: () => ({
        name:'',
        project_code:'',
        home_page:'',
        status:'',
        type:'',
        attachment:null,
        client:'',
        project_cost:'',
        contact_person:'',
        start_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        start_date_menu: false,
        awarded_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        awarded_date_menu:false,
        end_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        end_date_menu:false,
        funded_by:'',
        time_revised:'',
        cost_revised:'',
        description:'',
        objective:'',
        reference_terms:'',
        technical_document:'',
        solution_component:'',
    }),

    computed: {
        
    },

    watch: {
        
    },

    created() {
        
    },

    methods: {
        async saveDetais() {
            let formData = new FormData();
            this.attachment.forEach(element => {
                formData.append('attachment[]', element);
            });
            formData.append('name', this.name);
            formData.append('project_code', this.project_code);
            formData.append('home_page', this.home_page);
            formData.append('status', this.status);
            formData.append('type', this.type);
            formData.append('client', this.client);
            formData.append('project_cost', this.project_cost);
            formData.append('contact_person', this.contact_person);
            formData.append('start_date', this.start_date);
            formData.append('awarded_date', this.awarded_date);
            formData.append('end_date', this.end_date);
            formData.append('funded_by', this.funded_by);
            formData.append('time_revised', this.time_revised);
            formData.append('cost_revised', this.cost_revised);
            formData.append('description', this.description);
            formData.append('objective', this.objective);
            formData.append('reference_terms', this.reference_terms);
            formData.append('technical_document', this.technical_document);
            formData.append('solution_component', this.solution_component);
            let result = await axios.post(`project`, formData);
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
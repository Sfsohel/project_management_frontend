<template>
    <v-layout>
        <v-row class="clickable">
            <v-col cols="12" md="12">
                <v-card class="ml-4 mr-4">
                    <v-card-title>
                        <h2>My Pending Task</h2>
                    </v-card-title>
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-card>
                                    <v-card-text>
                                        <v-tabs
                                            v-model="tab"
                                            background-color="primary"
                                            dark
                                        >
                                            <v-tab
                                                v-for="item in items"
                                                :key="item.tab"
                                                @click="getAssingedTask(item.tab)"
                                            >
                                                {{ item.tab }} (10) 
                                            </v-tab>
                                        </v-tabs>

                                        <v-tabs-items v-model="tab">
                                            <v-tab-item
                                                v-for="item in items"
                                                :key="item.tab"
                                            >
                                                <v-row>
                                                    <v-col cols="12" md="12">
                                                        <v-card flat>
                                                            <v-card-text>
                                                                <v-data-table
                                                                    :headers="headers"
                                                                    :items="tasks"
                                                                    :items-per-page="5"
                                                                    class="elevation-1"
                                                                >
                                                                    <template v-slot:item.actions="{ item }">
                                                                        <!-- <v-icon title="Edit" small class="mr-2" @click="editItem(item)">
                                                                            mdi-pencil
                                                                        </v-icon>
                                                                        <v-icon title="Delete" small @click="deleteItem(item)">
                                                                            mdi-delete
                                                                        </v-icon>
                                                                        <v-icon title="Publish" v-if="item.is_draft == 0"  @click="activatePublish(item.id)">
                                                                            mdi-publish
                                                                        </v-icon> -->
                                                                        <router-link :to="{ path: '/home/task-details/'+ item.id}">Details</router-link>
                                                                        <!-- <v-btn >Details</v-btn> -->
                                                                    </template>
                                                                </v-data-table>
                                                            </v-card-text>
                                                        </v-card>
                                                    </v-col>
                                                </v-row>
                                            </v-tab-item>
                                        </v-tabs-items>
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
        headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Status', value: 'status' },
          { text: 'Tracker', value: 'tracker' },
          { text: 'Priority', value: 'priority' },
          { text: 'Est. Start Date', value: 'start_date' },
          { text: 'Est. End Date', value: 'end_date' },
          { text: 'Action', value: 'actions' },
        ],
        tab: null,
        items: [
            { tab: 'New' },
            { tab: 'Feature'},
            { tab: 'Bug'},
            { tab: 'Start After Discussion' },
            { tab: 'Support' },
            { tab: 'Change Request' },
            { tab: 'Optimization'},
            { tab: 'Research & Development' }
        ],
        tasks:[],
    }),

    computed: {
        
    },

    watch: {
        
    },

    created() {
        this.getAssingedTask('New')
    },

    methods: {
        async getAssingedTask(tab) {
            console.log(tab);
            let result = await axios.get(`/pending-task`,{ params: {tracker:tab}});
            this.tasks = result.data;
        }
    },
}
</script>
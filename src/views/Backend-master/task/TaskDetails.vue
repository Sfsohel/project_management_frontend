<template>
    <v-layout>
        <v-container>
            <v-row class="clickable">
                <v-col cols="12" md="12">
                    <v-card class="ml-2 mr-2">
                        <v-card-title>
                            <h3>Task Details</h3>
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-row>
                                        <v-col cols="12" md="12">
                                            <v-card>
                                                <v-card-title>Task Info</v-card-title>
                                                <v-card-text>
                                                    <p><b>Issue Number:</b> {{task.issue_no}}</p>
                                                    <p><b>Project Name:</b> {{task.project.name}}</p>
                                                    <p><b>Module Name:</b>  {{task.module.name}}</p>
                                                    <p><b>Page Name:</b> {{task.page.name}}</p>
                                                    <p><b>Task Name:</b> {{task.name}}</p>
                                                    <p><b>Expected Start Date:</b> {{task.start_date}}</p>
                                                    <p><b>Expected End Date:</b> {{task.end_date}}</p>
                                                    <p><b>Est Hour:</b> {{task.est_hour}}</p>
                                                    <p><b>Assigned By:</b> {{task.user.full_name}}</p>
                                                    <p><b>Priority:</b> {{task.priority}}</p>
                                                    <p><b>Tracker Type:</b> {{task.tracker}}</p>
                                                    <p><b>Task Status:</b> {{task.status}}</p>
                                                    <!-- <p><b>Task Description:</b> <div v-html="task.description"></div> </p> -->
                                                    <p><b>Documents:</b> Task Management</p>
                                                    <p><b>Project Timeline:</b> Task Management</p>
                                                </v-card-text>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="12">
                                            <v-card>
                                                <v-card-title>Task Transfer</v-card-title>
                                                <v-card-text>
                                                    <p>acced</p>
                                                </v-card-text>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-row>
                                        <v-col cols="12" md="12">
                                            <v-card>
                                                <v-card-title>Task Progress: {{slider}}%</v-card-title>
                                                <!-- <br> -->
                                                <v-card-text>
                                                    <v-slider
                                                        v-model="slider"
                                                        :thumb-size="30"
                                                        thumb-label
                                                        @change="updateProgress()"
                                                    >
                                                        <template v-slot:thumb-label="{ value }">
                                                            {{ satisfactionEmojis[Math.min(Math.floor(value / 10), 9)] }}
                                                        </template>
                                                    </v-slider>
                                                </v-card-text>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="12">
                                            <v-card>
                                                <v-card-title>Task Time Trackings</v-card-title>
                                                <v-card-text>
                                                    <v-row>
                                                        <v-col clos="12" md="6">
                                                            <span class="time">{{ time }}</span>
                                                        </v-col>
                                                        <v-col cols="12" md="4">
                                                            <v-row>
                                                                <v-col clos="12" md="4">
                                                                    <v-btn id="start" :disabled="started_disable" @click="start" color="primary">Start</v-btn>
                                                                </v-col>
                                                                <v-col clos="12" md="4">
                                                                    <!-- <v-btn id="start" @click="start">Start</v-btn> -->
                                                                </v-col>
                                                                <v-col clos="12" md="4">
                                                                    <v-btn id="stop" @click="stop" color="deep-orange darken-1">Stop</v-btn>
                                                                </v-col>
                                                            </v-row>
                                                            <!-- <v-btn id="start" @click="start">Start</v-btn>&nbsp;&nbsp;
                                                            <v-btn id="stop" @click="stop">Stop</v-btn>
                                                            <v-btn id="reset" @click="reset">Reset</v-btn> -->
                                                        </v-col>
                                                        <v-col cols="12" md="12">
                                                            <v-simple-table>
                                                                <template v-slot:default>
                                                                    <thead>
                                                                        <tr>
                                                                        <th class="text-left">
                                                                            Start time
                                                                        </th>
                                                                        <th class="text-left">
                                                                            End Time
                                                                        </th>
                                                                        <th class="text-left">
                                                                            Total Time
                                                                        </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr
                                                                            v-for="item in task_tackings"
                                                                            :key="item.id"
                                                                        >
                                                                            <td>{{ item.start_time }}</td>
                                                                            <td><span v-if="item.end_time != null">{{ item.end_time }}</span> <span v-else>N/A</span></td>
                                                                            <td><span v-if="item.end_time != null">{{ item.total_time.hour + " h " + item.total_time.min + " m " }}</span> <span v-else>N/A</span></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </template>
                                                            </v-simple-table>
                                                        </v-col>
                                                    </v-row>
                                                </v-card-text>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-card>
                                        <v-card-title>Comments</v-card-title>
                                        <v-card-text>
                                            <v-row>
                                                <v-col cols="12" md="12">
                                                    <tiptap-vuetify
                                                        v-model="comment"
                                                        :extensions="extensions"
                                                        placeholder="Type Comment"
                                                    />
                                                </v-col>
                                                <v-col cols="12" md="6">
                                                    <v-file-input
                                                        v-model="attachment" 
                                                        show-size
                                                        chips
                                                        label="Attachment"
                                                        multiple
                                                    ></v-file-input>
                                                </v-col>
                                                <v-col cols="12" md="3">
                                                    <v-btn @click="addComment()">Save</v-btn>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12" md="12">
                                                    <h2>All comments</h2>
                                                    <br>
                                                    <span v-for="(comment, index) in comments" :key="index">
                                                        <span v-html="comment.comment"></span>
                                                        <span><span>Added: <b>{{comment.created_at}}</b></span> <span>Added By: <b>{{comment.user.full_name}}</b></span>
                                                            <span>
                                                                <v-btn
                                                                    class="mx-2"
                                                                    fab
                                                                    dark
                                                                    x-small
                                                                    color="primary"
                                                                >
                                                                    <v-icon dark>
                                                                        mdi-pencil
                                                                    </v-icon>
                                                                </v-btn>
                                                            </span>
                                                        </span>
                                                        <br><br>
                                                    </span>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-layout>
</template>
<script>
import axios from 'axios'
import moment from 'moment';
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
export default {
    components: { TiptapVuetify },
    data: () => ({
        comment:null,
        comments:[],
        attachment:null,
        time: '00:00:00.000',
        timeBegan: null,
        timeStopped: null,
        stoppedDuration: 0,
        started: null,
        started_disable:false,
        running: false,
        task:null,
        task_tackings:[],
        last_tracking:null,
        satisfactionEmojis: ['😭', '😢', '☹️', '🙁', '😐', '🙂', '😊', '😁', '😄', '😍'],
        slider:0,
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
    mounted(){
        this.initialize()
    },
    // created() {
    //     // console.log(this.$route.params.id)
    //     this.initialize()
    // },

    methods: {
        async initialize(){
            let result = await axios.get(`/task/`+this.$route.params.id);
            this.task = result.data;
            this.slider = this.task.progress;
            let trackings = await axios.get(`/task-tracking/`,{params:{
                task_id:this.task.id,task_movement_id:this.task.last_task_movement.id,user_id:this.task.last_task_movement.user_id
            }});
            this.task_tackings=trackings.data;
            if (this.task_tackings.length > 0) {
                this.last_tracking = this.task_tackings[this.task_tackings.length-1];
                if(!this.last_tracking.end_time){
                    this.started_disable=true;
                    this.timeBegan = new Date(Date.parse( this.last_tracking.start_time ));
                    this.started = setInterval(this.clockRunning, 10);	
                    this.running = true;
                }
            }
            this.getComments()
        },
        async updateProgress(){
            let result = await axios.put(`/task/`+this.task.id,{progress:this.slider});
            console.log(result);
        },
        async addComment(){
            let formData = new FormData();
            formData.append('comment', this.comment);
            this.attachment.forEach(element => {
                formData.append('attachment[]', element);
            });
            formData.append('task_id', this.task.id);
            formData.append('user_id', this.task.last_task_movement.user_id);
            formData.append('task_movement_id', this.task.last_task_movement.id);
            let result = await axios.post(`/comment`,formData);
            if (result.data){
                this.comment=null;
                this.attachment=null;
            }
        },
        async getComments(){
            let result = await axios.get(`/comment`,{params:{task_id:this.task.id}});
            this.comments = result.data;
            console.log(this.comments);
        },
        async start() {
            this.started_disable=true;
            if(this.running) return;
            
            if (this.timeBegan === null) {
                this.reset();
                this.timeBegan = new Date();
            }

            if (this.timeStopped !== null) {
                this.stoppedDuration += (new Date() - this.timeStopped);
            }

            this.started = setInterval(this.clockRunning, 10);	
            this.running = true;
            let result = await axios.post(`/task-tracking/start-time`,{ task_id:this.task.id,task_movement_id:this.task.last_task_movement.id,user_id:this.task.last_task_movement.user_id,start_time:moment(this.timeBegan).format('YYYY-MM-DD H:mm:ss')});
            this.tasks = result.data;
            // console.log(this.timeBegan);
        },

        async stop() {
            this.running = false;
            this.timeStopped = new Date();
            this.started_disable = false;
            clearInterval(this.started);
            let result = await axios.post(`/task-tracking/end-time`,{ id:this.last_tracking.id,end_time:moment(this.timeStopped).format('YYYY-MM-DD H:mm:ss')});
            // this.tasks = result.data;
            this.reset();
            this.initialize();
            console.log(result);
        },

        reset() {
            this.running = false;
            clearInterval(this.started);
            this.stoppedDuration = 0;
            this.timeBegan = null;
            this.timeStopped = null;
            this.time = "00:00:00.000";
        },

        clockRunning(){
            var currentTime = new Date()
            , timeElapsed = new Date(currentTime - this.timeBegan - this.stoppedDuration)
            , hour = timeElapsed.getUTCHours()
            , min = timeElapsed.getUTCMinutes()
            , sec = timeElapsed.getUTCSeconds()
            , ms = timeElapsed.getUTCMilliseconds();

            this.time = 
                this.zeroPrefix(hour, 2) + ":" + 
                this.zeroPrefix(min, 2) + ":" + 
                this.zeroPrefix(sec, 2) + "." + 
                this.zeroPrefix(ms, 3);
        },

        zeroPrefix(num, digit) {
            var zero = '';
            for(var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        }
    },
}
</script>
<style scoped>
    .time {
        font-size: 38px;
    }
</style>
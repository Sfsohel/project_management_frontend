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
                                                        <p><b>Issue Number:</b> 111.123.12.123</p>
                                                        <p><b>Project Name:</b> Task Management</p>
                                                        <p><b>Module Name:</b>  Reviewer/ Employee</p>
                                                        <p><b>Page Name:</b> Reviewer Dashboard</p>
                                                        <p><b>Task Name:</b>Committe তে তোলা file গুলোর আলাদা একটি ট্যাব দরকার।</p>
                                                        <p><b>Expected Start Date:</b> Task Management</p>
                                                        <p><b>Expected End Date:</b> Task Management</p>
                                                        <p><b>Est Hour:</b> Task Management</p>
                                                        <p><b>Assigned By:</b> Task Management</p>
                                                        <p><b>Priority:</b> Task Management</p>
                                                        <p><b>Tracker Type:</b> Task Management</p>
                                                        <p><b>Task Status:</b> Task Management</p>
                                                        <p><b>Task Description:</b> Task Management</p>
                                                        <p><b>Documents:</b> Task Management</p>
                                                        <p><b>Project Timeline:</b> Task Management</p>
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
                                                                        <v-btn id="start" @click="start" color="primary">Start</v-btn>
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
                                                        </v-row>
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
                                                        <v-text-field  label="Attachment"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" md="3">
                                                        <v-btn>Save</v-btn>
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
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'
export default {
    components: { TiptapVuetify },
    data: () => ({
        comment:null,
        time: '00:00:00.000',
        timeBegan: null,
        timeStopped: null,
        stoppedDuration: 0,
        started: null,
        running: false,
        task:null,
        // min: 0,
        // max: 100,
        // slider: 40,
        // range: [0, 100],
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

    created() {
        // console.log(this.$route.params.id)
        this.initialize()
    },

    methods: {
        async initialize(){
            let result = await axios.get(`/task/`+this.$route.params.id);
            this.task = result.data;
        },
        start() {
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
        },

        stop() {
            this.running = false;
            this.timeStopped = new Date();
            clearInterval(this.started);
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
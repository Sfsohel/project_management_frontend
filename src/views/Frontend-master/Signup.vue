<template>
    <div>
        <v-app>
            <v-container fluid pa-0>
                <v-row align="center" justify="center" style="height:100vh" dense>
                    <v-col cols="12" md="12"
                        class="grey lighten-2 fill-height d-flex flex-column justify-center align-center">
                        <!-- <v-card flat tile>
                            <v-card-text>Card #1</v-card-text>
                        </v-card> -->
                        <v-card elevation="2" width="500px">
                            <v-card-title class="justify-center">SignUp As A Company</v-card-title>
                            <v-card-text>
                                <v-row align="center" justify="center">
                                    <v-col cols="12" md="12"
                                        class="fill-height d-flex flex-column justify-center align-center">
                                        <v-stepper v-model="e1">
                                            <v-stepper-header>
                                                <v-stepper-step :complete="e1 > 1" step="1">
                                                    Basic Info
                                                </v-stepper-step>

                                                <v-divider></v-divider>

                                                <v-stepper-step :complete="e1 > 2" step="2">
                                                    Address
                                                </v-stepper-step>

                                                <v-divider></v-divider>

                                                <v-stepper-step step="3">
                                                    Credentials
                                                </v-stepper-step>
                                            </v-stepper-header>

                                            <v-stepper-items>
                                                <v-stepper-content step="1">
                                                    <v-card class="mb-12" color="teal lighten-5" height="200px">
                                                        <v-card-text>
                                                            <v-row>
                                                                <v-col cols="12" md="6">
                                                                    <v-text-field label="Company Name"
                                                                        v-model="company_name"></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" md="6">
                                                                    <v-text-field label="Offical Phone no"
                                                                        v-model="company_phone">
                                                                    </v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" md="12">
                                                                    <v-text-field label="Company Email"
                                                                        v-model="company_email">
                                                                    </v-text-field>
                                                                </v-col>
                                                            </v-row>
                                                        </v-card-text>
                                                    </v-card>

                                                    <v-btn color="primary" @click="e1 = 2">
                                                        Continue
                                                    </v-btn>

                                                    <v-btn text>
                                                        Cancel
                                                    </v-btn>
                                                </v-stepper-content>

                                                <v-stepper-content step="2">
                                                    <v-card class="mb-12" color="teal lighten-5" height="200px">
                                                        <v-card-text>
                                                            <v-row>
                                                                <v-col cols="12" md="12">
                                                                    <v-textarea label="Add Adress Info"
                                                                        v-model="address"></v-textarea>
                                                                </v-col>
                                                            </v-row>
                                                        </v-card-text>
                                                    </v-card>

                                                    <v-btn color="primary" @click="e1 = 3">
                                                        Continue
                                                    </v-btn>

                                                    <v-btn text>
                                                        Cancel
                                                    </v-btn>
                                                </v-stepper-content>

                                                <v-stepper-content step="3">
                                                    <v-card class="mb-12" color="teal lighten-5" height="200px">
                                                        <v-card-text>
                                                            <v-row>
                                                                <v-col cols="12" md="12">
                                                                    <v-text-field label="Login Email" v-model="email">
                                                                    </v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" md="6">
                                                                    <v-text-field label="Password" v-model="password">
                                                                    </v-text-field>
                                                                </v-col>
                                                                <v-col cols="12" md="6">
                                                                    <v-text-field label="Confirm Password"
                                                                        v-model="password_confirmation">
                                                                    </v-text-field>
                                                                </v-col>
                                                            </v-row>
                                                        </v-card-text>
                                                    </v-card>

                                                    <v-btn color="primary" @click="e1 = 1, saveDetais()">
                                                        Submit
                                                    </v-btn>

                                                    <v-btn text>
                                                        Cancel
                                                    </v-btn>
                                                </v-stepper-content>
                                            </v-stepper-items>
                                        </v-stepper>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-app>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            e1: 1,
            name:null,
            company_name:null,
            email:null,
            company_email:null,
            company_phone:null,
            password:null,
            password_confirmation:null,
            address:null,
        }
    },
    methods: {
        async saveDetais() {
            // console.log('clicked');
            // this.dialogloading = true;
            let formData = new FormData();
            formData.append('name', this.name);
            formData.append('company_name', this.company_name);
            formData.append('email', this.email);
            formData.append('company_email', this.company_email);
            formData.append('company_phone', this.company_phone);
            formData.append('password', this.password);
            formData.append('password_confirmation', this.password_confirmation);
            formData.append('address', this.address);
            let result = await axios.post(`register`, formData);
            if (result.data) {
                console.log('saved');
            }
        }
    }
}
</script>
<style scoped>
    
</style>
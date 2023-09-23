
import http from 'k6/http';

import { check } from 'k6';

export const options = {

    stages: [

        { duration: '10s', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users for 10 seconds.

        { duration: '20s', target: 200 },//, // stay at 200 users for 20 minute

        { duration: '30s', target: 0 }, // ramp-down to 0 users

    ],

    thresholds: {

        http_req_duration: ['p(90)<1500'], // 90% of requests must complete below 1.5s

    },

};

export default () => {

    const res = http.get('http://localhost:3000/api/books', {

    });           //call the api and set the response to res

    check(res, {

        'is status 200': (r) => r.status===200,//check 1

        'response body contains Book1': (r)=>

            r.body.includes('Book1'),//check 2

        'response body contains Book3': (r)=>

            r.body.includes('Book3'),//check 3

    });

};

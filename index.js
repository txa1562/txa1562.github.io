let liveMoment = moment('2019-10-01').startOf('day');

let app = new Vue({
    el: '#app',
    data: {
        message: 'Hello world, here I come...',
        time: {
            months: undefined,
            days: undefined,
            hours: undefined,
            minutes: undefined,
            seconds: undefined
        }
    },
    methods: {
        setTime: function(){
            let currentMoment = moment();

            this.time.months = liveMoment.diff(currentMoment, 'months');
            this.time.days = !!this.time.months ? moment(currentMoment).endOf('month').diff(currentMoment, 'days') : liveMoment.diff(currentMoment, 'days');
            this.time.hours = !!this.time.days ? moment(currentMoment).endOf('day').diff(currentMoment, 'hours') : liveMoment.diff(currentMoment, 'hours');
            this.time.minutes = !!this.time.hours ? moment(currentMoment).endOf('hour').diff(currentMoment, 'minutes') : liveMoment.diff(currentMoment, 'minutes');
            this.time.seconds = !!this.time.minutes ? moment(currentMoment).endOf('minute').diff(currentMoment, 'seconds') : liveMoment.diff(currentMoment, 'seconds');
        }
    },
    mounted: function(){
        const self = this;

        self.timeInterval = setInterval(() => {
            self.setTime();
        }, 1000);
    },
    beforeDestroy(){
        clearInterval(this.timeInterval);
    }
});
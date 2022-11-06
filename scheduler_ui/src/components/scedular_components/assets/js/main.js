import Util from "./util.js";

function ScheduleTemplate(element) {
    this.element = element;
    this.timelineItems = this.element.getElementsByClassName('cd-schedule__timeline')[0].getElementsByTagName('li');
    this.timelineStart = getScheduleTimestamp(this.timelineItems[0].textContent);
    this.timelineUnitDuration = getScheduleTimestamp(this.timelineItems[1].textContent) - getScheduleTimestamp(this.timelineItems[0].textContent);

    this.topInfoElement = this.element.getElementsByClassName('cd-schedule__top-info')[0];
    this.singleEvents = this.element.getElementsByClassName('cd-schedule__event');
    this.animating = false;
    this.supportAnimation = Util.cssSupports('transition');


    this.initSchedule();
};

ScheduleTemplate.prototype.initSchedule = function () {

    this.scheduleReset();
};

ScheduleTemplate.prototype.scheduleReset = function () {
    // according to the mq value, init the style of the template
    var mq = this.mq(),
        loaded = Util.hasClass(this.element, 'js-schedule-loaded');



    this.placeEvents();
    if (mq == 'desktop' && !loaded) {

        Util.addClass(this.element, 'js-schedule-loaded');
        this.placeEvents();

    } else if (mq == 'mobile' && loaded) {

        //in this case you are on a mobile version (first load or resize from desktop)
        Util.removeClass(this.element, 'cd-schedule--loading js-schedule-loaded');
        this.resetEventsStyle();

    } else if (mq == 'desktop' ) {


        Util.removeClass(this.element, 'cd-schedule--loading');
    } else {

        Util.removeClass(this.element, 'cd-schedule--loading');
    }
};

ScheduleTemplate.prototype.resetEventsStyle = function () {
    // remove js style applied to the single events
    for (var i = 0; i < this.singleEvents.length; i++) {
        this.singleEvents[i].removeAttribute('style');
    }
};

ScheduleTemplate.prototype.placeEvents = function () {
    // on big devices - place events in the template according to their time/day
    var self = this,
        slotHeight = this.topInfoElement.offsetHeight;

    for (var i = 0; i < this.singleEvents.length; i++) {
        var anchor = this.singleEvents[i].getElementsByTagName('a')[0];
        var start = getScheduleTimestamp(anchor.getAttribute('data-start')),
            duration = getScheduleTimestamp(anchor.getAttribute('data-end')) - start;

        var eventTop = slotHeight * (start - self.timelineStart) / self.timelineUnitDuration,
            eventHeight = slotHeight * duration / self.timelineUnitDuration;


        this.singleEvents[i].setAttribute('style', 'top: ' + (eventTop - 1) + 'px; height: ' + (eventHeight + 1) + 'px');
    }

    Util.removeClass(this.element, 'cd-schedule--loading');
};


ScheduleTemplate.prototype.animationFallback = function () {
    if (!this.supportAnimation) { // fallback for browsers not supporting transitions
        var event = new CustomEvent('transitionend');
        this.modal.dispatchEvent(event);
        this.modalHeaderBg.dispatchEvent(event);
    }
};

ScheduleTemplate.prototype.mq = function () {
    //get MQ value ('desktop' or 'mobile')
    var self = this;
    return window.getComputedStyle(this.element, '::before').getPropertyValue('content').replace(/'|"/g, "");
};

function getScheduleTimestamp(time) {
    //accepts hh:mm format - convert hh:mm to timestamp
    time = time.replace(/ /g, '');
    var timeArray = time.split(':');
    var timeStamp = parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
    return timeStamp;
};

export default function main() {
    var scheduleTemplate = document.getElementsByClassName('js-cd-schedule'),
        scheduleTemplateArray = [],
        resizing = false;

    if (scheduleTemplate.length > 0) { // init ScheduleTemplate objects
        for (var i = 0; i < scheduleTemplate.length; i++) {
            (function (i) {
                scheduleTemplateArray.push(new ScheduleTemplate(scheduleTemplate[i]));
            })(i);
        }


        window.addEventListener('resize', function (event) {
            // on resize - update events position and modal position (if open)
            if (!resizing) {
                resizing = true;
                (!window.requestAnimationFrame) ? setTimeout(checkResize, 250) : window.requestAnimationFrame(checkResize);
            }
        });


        function checkResize() {
            for (var i = 0; i < scheduleTemplateArray.length; i++) {
                scheduleTemplateArray[i].scheduleReset();
            }
            resizing = false;
        };
    }
}

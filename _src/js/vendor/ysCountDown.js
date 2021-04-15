/*!
 * yscountdown - A simple and easy-to-use countdown plugin.
 * Author: Yusuf SEZER <yusufsezer@mail.com>
 * Version: v1.0.0
 * Url: https://github.com/yusufsefasezer/ysCountDown.js
 * License: MIT
 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return factory(root);
    });
  } else if (typeof exports === 'object') {
    module.exports = factory(root);
  } else {
    root.ysCountDown = factory(root);
  }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function(window) {
  'use strict';
  //
  // Shared Methods
  //
  /**
   * Check if browser supports required methods.
   * @private
   * @return {Boolean} Returns true if all required methods are supported.
   */
  var supports = function() {
    return ('addEventListener' in window);
  };
  /**
   * Check `date` is a Date.
   * @private
   * @param {Object} date The date to check.
   * @returns {Boolean} Returns `true` if `date` is a Date, else `false`.
   */
  var isDate = function(date) {
    return date instanceof Date && !isNaN(date);
  };
  //
  // Plugin Constructor
  //
  /**
   * Plugin Object
   * @param {Object} opts User settings
   * @constructor
   */
  var Plugin = function(fDate, cb) {
    //
    // Plugin Variables
    //
    var publicAPIs = {};
    var finalDate = null;
    var callback = null;
    var interval = null;
    var remaining = null;
    var finished = false;
    //
    // Plugin Methods
    //
    /**
     * Initialize Plugin.
     * @public
     * @param {Object} options User settings
     */
    publicAPIs.init = function(fDate, cb) {
      // Feature test
      if (!supports()) throw 'ysCountDown: This browser does not support the required JavaScript methods.'
      // Destroy any existing initializations
      publicAPIs.destroy();
      // Set finalDate
      finalDate = (typeof fDate === 'string') ? new Date(fDate) : fDate;
      // Check if a valid date
      if (!isDate(finalDate)) throw new TypeError('ysCountDown: Please enter a valid date.');
      // Check if a valid callback
      if (typeof cb !== 'function') throw new TypeError('ysCountDown: Please enter a callback function.');
      callback = cb;
      // Start the countdown
      start();
    };
    /**
     * Destroy the current initialization.
     * @public
     */
    publicAPIs.destroy = function() {
      // Reset variables
      finalDate = null;
      callback = null;
      stop();
      remaining = null;
      finished = false;
    };
    /**
     * Calculate the remaining time.
     * @private
     */
    var calculate = function() {
      // Get current date
      var now = new Date();
      // Calculate totalSecsLeft
      var totalSecsLeft = Math.ceil((finalDate.getTime() - now.getTime()) / 1000);
      // Check if the countdown has elapsed
      if (totalSecsLeft <= 0) {
        finished = true;
        stop();
      }
      // Calculate the remaining time
      remaining = {
        seconds: totalSecsLeft % 60,
        minutes: Math.floor(totalSecsLeft / 60) % 60,
        hours: Math.floor(totalSecsLeft / 60 / 60) % 24,
        days: Math.floor(totalSecsLeft / 60 / 60 / 24) % 7,
        daysToWeek: Math.floor(totalSecsLeft / 60 / 60 / 24) % 7,
        daysToMonth: Math.floor(totalSecsLeft / 60 / 60 / 24 % 30.4368),
        weeks: Math.floor(totalSecsLeft / 60 / 60 / 24 / 7),
        weeksToMonth: Math.floor(totalSecsLeft / 60 / 60 / 24 / 7) % 4,
        months: Math.floor(totalSecsLeft / 60 / 60 / 24 / 30.4368),
        monthsToYear: Math.floor(totalSecsLeft / 60 / 60 / 24 / 30.4368) % 12,
        years: Math.abs(finalDate.getFullYear() - now.getFullYear()),
        totalDays: Math.floor(totalSecsLeft / 60 / 60 / 24),
        totalHours: Math.floor(totalSecsLeft / 60 / 60),
        totalMinutes: Math.floor(totalSecsLeft / 60),
        totalSeconds: totalSecsLeft
      }
      // Run callback
      callback(remaining, finished);
    };
    /**
     * Starts the auto calculate.
     * @private
     */
    var start = function() {
      // if an interval already exists, disregard call
      if (interval) return;
      // create an interval
      interval = setInterval(function() {
        calculate();
      }, 100);
    };
    /**
     * Stops the auto calculate.
     * @private
     */
    var stop = function() {
      // if no interval exists, disregard call
      if (!interval) return;
      // clear the interval
      clearInterval(interval);
      interval = null;
    };
    //
    // Initialize plugin
    //
    publicAPIs.init(fDate, cb);
    //
    // Return the public APIs
    //
    return publicAPIs;
  };
  //
  // Return the Plugin
  //
  return Plugin;
});

// initialize the countdown timer
const timerHtml = '\
  <span class="timer-message">\
    <span>The <span class="on-desktop">NYC Local Law 196 Training</span> <a class="on-mobile" href="/new-york/sst/">NYC Local Law 196 Training</a> Deadline Is Approaching!</span><br/>\
    <span class="on-desktop">Get Your <a href="/new-york/sst/"><strong>Site Safety Training (SST)</strong></a> Card by Sept. 1, 2020</span>\
  </span>\
  <div class="timer-element">\
    <div class="timer-display"><span class="timer-label">Days</span><span class="timer-digit" id="timer-days">00</span></div>\
    <div class="timer-display"><span class="timer-label">Hours</span><span class="timer-digit" id="timer-hours">00</span></div>\
    <div class="timer-display"><span class="timer-label">Minutes</span><span class="timer-digit" id="timer-minutes">00</span></div>\
    <div class="timer-display"><span class="timer-label">Seconds</span><span class="timer-digit" id="timer-seconds">00</span></div>\
  </div>\
  <span id="timer-hide-icon" class="hide-icon">&#10005;</span>'
const counterWrap = document.querySelector("#timer-wrap");
      counterWrap.innerHTML = timerHtml;
// const timerElement = document.querySelector("#timer-element");
const daysElement = document.querySelector("#timer-days");
const hoursElement = document.querySelector("#timer-hours");
const minutesElement = document.querySelector("#timer-minutes");
const secondsElement = document.querySelector("#timer-seconds");
const hideTimerIcon = document.querySelector("#timer-hide-icon");
const endDate = "2020/12/30"; // year/month/day
// var endDate = new Date("2020-07-23T16:05:55Z"); // year/month/day
const myCountDown = new ysCountDown(endDate, function (remaining, finished) {
  if (finished) {
    // hide the timer here
    // timerElement.textContent = "Expired";
    // counterWrap.classList.add("hidden");
    counterWrap.parentNode.removeChild(counterWrap);
    myCountDown.destroy(); // remove initialization because it has ended
  }
  else {
    daysElement.textContent = remaining.totalDays < 10 ? "0" + remaining.totalDays : remaining.totalDays;
    hoursElement.textContent = remaining.hours < 10 ? "0" + remaining.hours : remaining.hours;
    minutesElement.textContent = remaining.minutes < 10 ? "0" + remaining.minutes : remaining.minutes;
    secondsElement.textContent = remaining.seconds < 10 ? "0" + remaining.seconds : remaining.seconds;
  }
});

const hideCounter = (target, duration) => {
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.boxSizing = 'border-box';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout( () => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    counterWrap.parentNode.removeChild(counterWrap);
    myCountDown.destroy(); // remove initialization because it has ended  
  }, duration);
}

// hidding the timer
hideTimerIcon.addEventListener('click', function () {
  // counterWrap.classList.add("hidden");
  hideCounter(counterWrap, 500);
});


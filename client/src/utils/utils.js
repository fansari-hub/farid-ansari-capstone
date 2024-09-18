/* Object for provideing utility functions */
const utils = {
    /* method converts elapsed time to human reasable format
    Provide a numeric timestamp and it will a string output*/
    getRelativeTime: function (numTime) {
      /*
        Got original function from: https://codereview.stackexchange.com/questions/44623/output-human-readable-time. 
        Made the following improvements/ modifictions:
        1) Support for singuar and plural (month vs months)
        2) Support for year (original script went only up to month)
        3) Using Floor instead of Round function to round avoid round up
        4) Implemented remainder display (example: instead of rounding to "about one year ago", it can display "about one year and 5 months")
        5) moved related variables into one object to make it cleaner.
        6) added support for "just now" when something was just posted. 
      */
  
      let terminate = false;
      let SECOND_MS = 1000;
      let MINUTE_MS = 60 * SECOND_MS;
      let HOUR_MS = 60 * MINUTE_MS;
      let DAY_MS = 24 * HOUR_MS;
      let WEEK_MS = 7 * DAY_MS;
      let MONTH_MS = 30.4368645 * DAY_MS;
      let YEAR_MS = 12 * MONTH_MS;
  
      let lookup = {
        plural: ["years", "months", "weeks", "days", "hours", "minutes", "seconds"],
        singular: ["year", "month", "week", "day", "hour", "minute", "second"],
        maxValues: [999, 12, 4, 30, 24, 60, 60],
        values: [],
      };
  
      let ms = Date.now() - numTime;
      let msTotal = ms;
  
      lookup.values.push(ms / YEAR_MS);
      ms %= YEAR_MS;
      lookup.values.push(ms / MONTH_MS);
      ms %= MONTH_MS;
      lookup.values.push(ms / WEEK_MS);
      ms %= WEEK_MS;
      lookup.values.push(ms / DAY_MS);
      ms %= DAY_MS;
      lookup.values.push(ms / HOUR_MS);
      ms %= HOUR_MS;
      lookup.values.push(ms / MINUTE_MS);
      ms %= MINUTE_MS;
      lookup.values.push(ms / SECOND_MS);
      ms %= SECOND_MS;
  
      let prettyTime = "";
  
      for (var i = 0; i < lookup.values.length; i++) {
        var val = Math.floor(lookup.values[i]);
  
        if (val <= 0) {
          //if the current time unit is 0, skip loop to next lower unit
          continue;
        }
  
        if (val === 1) {
          // get singular time unit name
          prettyTime += val + " " + lookup.singular[i];
        } else {
          // get plural time unit name
          prettyTime += val + " " + lookup.plural[i];
        }
        // This block allows the appending of the next lower time unit if relevant conditions are met by allowing the loop to contine one more time
        if (lookup.values[i] - Math.floor(lookup.values[i]) > 0 //check to see if there are any time remainders
            && Math.floor(lookup.values[i + 1] > 0)  //check to see if next lower unit has any time 
            && (lookup.maxValues[i + 1] - Math.floor(lookup.values[i + 1]) > -1)  //check to see if we are at the max of our unit for the remainders, leave a little widdle room since are dividers are not exact
            && terminate === false) {
              prettyTime += " and ";
              terminate = true;
              continue;
            }
        break;
      }
  
      if (msTotal < 1000) {
        return " just now";
      } else {
        return prettyTime + " ago";
      }
    },
  };
  export default utils;
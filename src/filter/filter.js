import moment from "moment"
import Vue from "vue"

Vue.filter("filterData", function (time) {
    return moment(time).format("YYYY-MM-DD")
})
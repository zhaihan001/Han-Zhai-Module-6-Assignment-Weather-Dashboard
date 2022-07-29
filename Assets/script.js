var currentDateTime = moment().format("dddd, MMMM DD, YYYY");
var citySearch ;
var cityViewed ;
var searchButton = document.querySelector("#searchbtn");
var viewedButtons = document.querySelector(".btn");

$(".saveBtn").click(saveTask);
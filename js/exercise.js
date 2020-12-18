var apiKey = "7f4e564bd419069a3a0dd6f694b1cb79";
var apiId = "086e9742";
var url = "https://trackapi.nutritionix.com/v2/natural/nutrients";
var result;
var tol_calories_food;
var tol_calories_exercise;

// search for the food 
function food_search() {
  var tol_calories_food = 0;

  $("#food_result").empty();
  var queryItem = $("#queryFood").val();

  if (queryItem.trim() == "") {
    alert("Please Enter a food name");
    return;
  }

  var queryJson = { query: queryItem };

  var settings = {
    async: true,
    crossDomain: true,
    url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      "x-app-id": apiId,
      "x-app-key": apiKey,
      "x-remote-user-id": "0",
      "postman-token": "fa71a67a-c306-e015-1ccb-f9e7b4dd2424",
    },
    processData: false,
    data: JSON.stringify(queryJson),
  };

  $.ajax(settings)
    .done(function (response) {
      result = response;
      var each_cal = "";

      for (let i = 0; i < result["foods"].length; i++) {
        each_cal =
          each_cal +
          "<h4>" +
          result["foods"][i].food_name +
          ": " +
          result["foods"][i].nf_calories +
          " cal <br>";
        tol_calories_food += result["foods"][i].nf_calories;
      }

      $("#food_result").append(
        "<h3>Total Calories: " + tol_calories_food + " calories</h3>" + each_cal
      );
    })
    .fail(function (response) {
      alert("no such food!");
      $("#queryItem").val("");
    });
}

// search for the exercise
function exercise_search() {
  var tol_calories_exercise = 0;

  $("#exercise_result").empty();
  var queryItem = $("#queryExercise").val();

  if (queryItem.trim() == "") {
    alert("Please Enter Exercise");
    return;
  }

  var queryJson = { query: queryItem };

  var settings = {
    async: true,
    crossDomain: true,
    url: "https://trackapi.nutritionix.com/v2/natural/exercise",
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      "x-app-id": apiId,
      "x-app-key": apiKey,
      "postman-token": "fa71a67a-c306-e015-1ccb-f9e7b4dd2424",
    },
    processData: false,
    data: JSON.stringify(queryJson),
  };

  $.ajax(settings)
    .done(function (response) {
      result = response;
      var each_cal = "";

      for (let i = 0; i < result["exercises"].length; i++) {
        each_cal =
          each_cal +
          "<h4>" +
          result["exercises"][i].name +
          ": " +
          result["exercises"][i].nf_calories +
          " cal <br>";
        tol_calories_exercise += result["exercises"][i].nf_calories;
      }

      $("#exercise_result").append(
        "<h3>Total Calories: " +
          tol_calories_exercise +
          " calories</h3>" +
          each_cal
      );
    })
    .fail(function (response) {
      alert("no data for your exercise");
      $("#queryExercise").val("");
    });
}

function compare() {
  if (
    $("#queryFood").val().trim() != "" &&
    $("#queryExercise").val().trim() != ""
  ) {
    food_search();
    exercise_search();
    if (tol_calories_exercise > tol_calories_food) {
      $("#compare").append(
        "<strong> You burned more calorie than you ate! </strong> "
      );
    } else {
      $("#compare").append(
        "<strong> You ate more calorie than you burned! </strong> "
      );
    }
  } else {
    alert("please enter your exercise and food");
  }
}

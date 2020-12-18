var result;
var apiKey = "7f4e564bd419069a3a0dd6f694b1cb79";
var apiId = "086e9742";

function search() {
  var input = document.querySelector(".controls input[type=file]");
  if (input.files && input.files.length) {
    decode(URL.createObjectURL(input.files[0]));
  }
}

function decode(src) {
  var config = {
    locator: {
      patchSize: "large",
      halfSample: true,
    },
    decoder: {
      readers: ["upc_reader", "code_128_reader"],
    },
    locate: true,
    src: src,
  };

  Quagga.decodeSingle(config, function (result) {
    if (!result) {
      alert("There's no such barcode");
      return false;
    }
    if (result.codeResult) {
      result = result.codeResult.code;

      var settings = {
        async: true,
        crossDomain: true,
        url: " https://trackapi.nutritionix.com/v2/search/item?"+"upc="+result.toString(10),
        method: "GET",
        headers: {
          "x-app-id": apiId,
          "x-app-key": apiKey
        },
        processData: false
      };

      $.ajax(settings)
        .done(function (response) {
          $("#result").empty()
          result = response;

        var food_name = result["foods"][0].food_name;
        var calories = result["foods"][0].nf_calories;
        var total_fat = result["foods"][0].nf_total_fat;
        var serving_size = result["foods"][0].serving_qty + " " + result["foods"][0].serving_unit;
        var saturated_fat = result["foods"][0].nf_saturated_fat;
        var cholesterol = result["foods"][0].nf_cholesterol;
        var sodium = result["foods"][0].nf_sodium;
        var potassium = result["foods"][0].nf_potassium;
        var dietary_fiber = result["foods"][0].nf_dietary_fiber;
        var sugars = result["foods"][0].nf_sugars;
        var protein = result["foods"][0].nf_protein;
        var total_carb = result["foods"][0].nf_total_carbohydrate;
        var photo_url = result["foods"][0].photo["thumb"];

        var tableString =
        "<table class='table'> <thead class='thead-dark'><tr><th scope='col'>Nutrition</th><th scope='col'>% Daily Value</th></tr></thead></tbody>";

        tableString = tableString
        + "<tr><td> serving size</td>" + "<td>" + serving_size + "</td>"
        + "<tr><td> calories</td>" + "<td>" + calories + " calories </td>" 
        + "<tr><td> total fat</td>" + "<td>" + total_fat + " g</td>"
        + "<tr><td> saturated fat</td>" + "<td>" + saturated_fat + " g</td>"
        + "<tr><td> cholesterol</td>" + "<td>" + cholesterol + " mg</td>"
        + "<tr><td> sodium </td>" + "<td>" + sodium + " mg</td>"
        + "<tr><td> potassium </td>" + "<td>" + potassium + " mg</td>"
        + "<tr><td> total carbonhydrates </td>" + "<td>" + total_carb + " g</td>"
        + "<tr><td> dietary fiber </td>" + "<td>" + dietary_fiber + " g</td>"
        + "<tr><td> sugars </td>" + "<td>" + sugars + " g</td>"
        + "<tr><td> protein </td>" + "<td>" + protein + " g</td>";
        
        $("#result").append("<h4>" + food_name + "</h4>" + '<img src=' + photo_url + '>' + tableString);
        })
        .fail(function (response) {
          alert("no such food!")
        });

    } else {
      $(".controls").empty();
      alert("There's no such barcode");
    }
  });
  
}





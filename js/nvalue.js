var apiKey = "7f4e564bd419069a3a0dd6f694b1cb79";
var apiId = "086e9742";
var url = "https://trackapi.nutritionix.com/v2/natural/nutrients";
var result;

function search()
{
    var queryItem = $("#queryItem").val();

    if (queryItem.trim() == "")
    {
        alert("Please Enter a food name");
        return;
    }

    var queryJson = {"query":queryItem};

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
        "cache-control": "no-cache",
        "postman-token": "fa71a67a-c306-e015-1ccb-f9e7b4dd2424",
      },
      processData: false,
      data: JSON.stringify(queryJson),
    };

    $.ajax(settings).done(function (response) {
      result = response;
    });

    

}


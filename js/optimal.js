function changeBox()
{   
    var metric = $("#height_measure option:selected").val();
    if (metric == "cm")
    {   
        $("#feet").val("");
        $("#feet").prop('disabled', true);
        $("#feet_label").text("");
        $("#height_label").text("");
    }
    else
    {

        $("#feet").prop('disabled', false);
        $("#feet_label").text("feet");
        $("#height_label").text("inches");
    }
    
}

function calculate()
{   
    var age = $("#age").val();
    var gender = $('input[name="gender"]:checked').val();
    var weight = $("#weight").val();
    var weight_measure = $("#weight_measure option:selected").val();
    var height_measure = $("#height_measure option:selected").val();

    if (height_measure == "feet")
    {
        var feet = $("#feet").val();
        var inch = $("#inch").val();
        var calories = calc_calories(gender, weight, weight_measure, height_measure, age, feet, inch);
    }


    if (height_measure == "cm") {
        var cm = $("#inch").val();
        var calories = calc_calories(gender, weight, weight_measure, height_measure, age, 0, cm);
    }

    var activity = $("#activity option:selected").val();

    var protein = calories * 0.225 / 4;
    var carbs = calories * 0.55 / 4 ;
    var fats = calories * 0.2775 / 9;

    $("#result").empty();
    $("#chart").empty();
    var stats = "<p>protein: " + protein + " grams</p><br>" + "<p>carb: " + carbs + " grams</p><br>" + "<p>fats: " + fats + " grams</p><br>"
    $('#result').append('<br> <div id="innerdiv" class="border pad"> <h4> The Calories Needs Daily: ' + calories + ' calories </h4><br><strong>' + stats + '</strong><br>click each slice on pice chart  ' + '</div>');



    pie = {
        "$schema": "https://vega.github.io/schema/vega/v4.json",
        "width": 350,
        "height": 350,
        "autosize": "fit",

        "data": [
            {
                "name": "table",
                "values": [
                    { "id": "Protein", "field": protein },
                    { "id": "Carbs", "field": carbs},
                    { "id": "Fats", "field": fats },
                ],
                "transform": [
                    { "type": "formula", "expr": "datum.id + ': ' + datum.field", "as": "tooltip" },
                    {
                        "type": "pie",
                        "field": "field",
                        "startAngle": 0,
                        "endAngle": 6.29,
                        "sort": true
                    }
                ]
            }
        ],

        "scales": [
            {
                "name": "color",
                "type": "ordinal",
                "domain": { "data": "table", "field": "id" },
                "range": { "scheme": "category20c" }
            }
        ],

        "marks": [
            {
                "type": "arc",
                "from": { "data": "table" },
                "encode": {
                    "enter": {
                        "fill": { "scale": "color", "field": "id" },
                        "x": { "signal": "width / 2" },
                        "y": { "signal": "height / 2" },
                        "startAngle": { "field": "startAngle" },
                        "endAngle": { "field": "endAngle" },
                        "innerRadius": { "value": 60 },
                        "outerRadius": { "signal": "width / 2" },
                        "cornerRadius": { "value": 0 },
                        "tooltip": { "field": "tooltip" }
                    }
                }
            }
        ]
    }



    vegaEmbed("#chart", pie, { actions: true });
}

function calc_calories(gender, weight, w_metric, h_metric, age, feet, inch)
{
    var gender = gender;
    var weight = weight;
    var height = inch;

    if (w_metric == "pounds")
    {
        weight = weight * 0.453592;
    }
    if (h_metric == "feet")
    {
        height = feet * 30.48 + inch * 2.54
    }

    if (gender == "male")
    {
        return 10 * weight + 6.25 * height - 5 * age + 5
    }
    if (gender == "female")
    {
        return 10 * weight + 6.25 * height - 5 * age -161;
    }
}

$(document).ready(function () {
});

// if the height metric is inch, disable the feet input and change inch input to cm input
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

// return the activity_factor based on how much workout the users do
function activity_factor(activity)
{
    if (activity == "0")
    {
        return 1.2;
    }
    else if (activity == "1")
    {
        return 1.375;
    }
    else if (activity == "2")
    {
        return 1.55;
    }
    else if (activity)
    {
        return 1.725;
    }
    else
    {
        return 1.9;
    }

}

// calculate the macronutrients users need and show the pie chart of the optimal macro
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
        var calories = calc_calories(gender, weight, weight_measure, height_measure, age, feet, inch).toFixed(2);
    }


    if (height_measure == "cm") {
        var cm = $("#inch").val();
        var calories = calc_calories(gender, weight, weight_measure, height_measure, age, 0, cm).toFixed(2);
    }
 
    var activity = $("#activity option:selected").val();
    var tdee = (activity_factor(activity) * calories).toFixed(2);

    var protein = (calories * 0.225 / 4).toFixed(2);
    var carbs = (calories * 0.55 / 4).toFixed(2);
    var fats = (calories * 0.2775 / 9).toFixed(2);

    $("#result").empty();
    $("#chart").empty();
    var stats = "<p>protein: " + protein + " grams</p><br>" + "<p>carb: " + carbs + " grams</p><br>" + "<p>fats: " + fats + " grams</p><br>"
    
    $("#result").append(
      '<br> <div id="innerdiv" class="border pad"> <h4> The Calories Needed Daily (Basal Metabolic Rate): ' +
        calories +
        " calories </h4><br><strong>" +
        stats +
        "</strong><h4>How Many Calories You Burn Per Day (Total Daily Energy Expenditure): " + tdee
        +"calories </h4><br>click each slice on pice chart  " +
        "</div>"
    );



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

// calculate the calories needed based on the information given by users
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

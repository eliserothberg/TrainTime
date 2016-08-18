var config = {
    apiKey: "AIzaSyA5yEn6XxoyteTzEHs0QDn7zQRzV5P_rhI",
    authDomain: "first-firebase-df9a6.firebaseapp.com",
    databaseURL: "https://first-firebase-df9a6.firebaseio.com",
    storageBucket: "first-firebase-df9a6.appspot.com",
  };

  firebase.initializeApp(config);

var database = firebase.database();

$("#addTrainBtn").on("click", function(){

    // Grabs user input
    var trainName = $("#trainNameInput").val().trim();
    var trainDestination = $("#destinationInput").val().trim();
    var startTime = moment($("#startTrainInput").val().trim(), "HH:mm").format("X");
    var trainFrequency = moment($("#frequencyInput").val().trim(), "mm").format("X");

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        start: startTime,
        frequency: trainFrequency
    };

database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log("frequencyInput: " + newTrain.frequency)

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#startTrainInput").val("");
    $("#frequencyInput").val("");

    // Prevents moving to new page
    return false;
});

database.ref().on("child_added", function(childSnapshot, prevChildKey){

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().frequency;

    // Employee Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainStart);
    console.log("freq: " + trainFreq);

// Assumptions

    var trainStartPretty = moment.unix(trainStart).format("HH:mm");
    var trainFreqPretty = moment.unix(trainFreq).format("mm");


    var tFrequency = trainFreqPretty;
    var firstTime = trainStartPretty; 
            // var tFrequencyPretty = moment.unix(tFrequency).format("mm");
    console.log("tFreq : " + tFrequency);

    console.log("trainStartPretty : " + trainStartPretty);

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime,"HH:mm").subtract(1, "years");
    // var firstTimeConvertedPretty = moment(firstTimeConverted).format("HH:mm");
    console.log("firstTimeConverted: " + firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "mm");
        var diffTimePretty = moment(diffTime).format("mm");
        console.log("DIFFERENCE IN TIME P: " + diffTimePretty);
                console.log("DIFFERENCE IN TIME: " + diffTime);



    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
        console.log("tRemainder: " + tRemainder);


    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
        var tMinutesTillTrainPretty = moment(tMinutesTillTrain).format("mm");

    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);


    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes")
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"))
    var nextTrainPretty = moment(nextTrain).format("HH:mm");
    console.log("nextTrainPretty: " + nextTrainPretty)


    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + tFrequency + "</td><td>" + nextTrainPretty + "</td><td>" + tMinutesTillTrain + "</td><td>");

});
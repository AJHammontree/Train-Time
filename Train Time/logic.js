
var config = {
    apiKey: "AIzaSyCbYJxGgYCkgVFvhvzc1M-34pUzHSN447c",
    authDomain: "nextprojec.firebaseapp.com",
    databaseURL: "https://nextprojec.firebaseio.com",
    projectId: "nextprojec",
    storageBucket: "nextprojec.appspot.com",
    messagingSenderId: "278364618932"
  };

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = $("#first-train-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

    var firstTrainConverted = moment(firstTrain, "LT");
    console.log(firstTrainConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("LT"));

    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("LT"));

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + moment(nextTrain).format("LT") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});

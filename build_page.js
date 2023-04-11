// TEST CHANGE

document.getElementById("displaytext").style.display = "none";

async function searchPhoto() {
  const apigClient = apigClientFactory.newClient({
    apiKey: "CvU4TQTeuB4Ecghtyikai2A1XWfQMHTf6ba5K3xi"
  });

  // get query string
  const user_message = document.getElementById('note-textarea').value;

  const params = {q: user_message};
  const body = {};
  const additionalParams = {};

  try {
    // send to GET method
    const res = await apigClient.searchGet(params, body, additionalParams).then(function(result){
      console.log('API Response', result.data);

      // put the returned image on the screen
      const gallery = document.getElementById('gallery');
      gallery.innerHTML = '';
      if (result.data.results.length > 0) {
        result.data.results.forEach(obj => {
          const img = document.createElement('img');
          // hard code the image src path
          img.src = 'https://b2-hw2.s3.amazonaws.com/' + obj.url;
          gallery.appendChild(img);
        });
      } else {
        // handle the case of no results being returned
        console.log('no results found');
      }
    });
  } catch (err) {
    console.log("error", err);
  }
}


function uploadPhoto()
{
  // file data from file field
  var file_data = $("#file_path").prop("files")[0];
  console.log('file_data:', file_data);

  // do some error checking
  if (file_data.size === 0) {
    console.log("file is empty!");
    return false;
  }

  // set allowed file types - jpeg, png and do error checking
  var allowedTypes = ["image/jpeg", "image/png"];
  if (allowedTypes.indexOf(file_data.type) === -1) {
    console.log("file type is not allowed!");
    return false;
  }

  // convert the data to base64 encoded string to avoid empty issue
  var reader = new FileReader();
  reader.readAsDataURL(file_data);
  reader.onload = function() {
    var base64data = reader.result.split(",")[1];

    var apigClient = apigClientFactory.newClient({
                      apiKey: "CvU4TQTeuB4Ecghtyikai2A1XWfQMHTf6ba5K3xi"
        });

    // get the filename from the upload field
    var data = document.getElementById('file_path').value;
    var x = data.split("\\")
    var filename = x[x.length-1]
    var value = {};

    // get the custom labels from the field and split by white space
    var customLabels = document.getElementById('custom-labels').value.split(' ');
    if (customLabels.length > 0) {
      value= customLabels.join(',');
    }
    else {
      value= [];
    }

    // use the content type base64 so that API Gateway converts it
    var params = {"filename" : filename , "Content-Type" : "text/base64", "Content-Length": file_data.size, "x-amz-meta-customLabels": value};
    console.log(params)

    // call the PUT method
    apigClient.uploadFilenamePut(params, base64data, {})
      .then(function(res) {
        console.log(res)
      })
      .catch(function(result) {
        console.log(result)
      });
  };

  return false;
}

// get the button references and the search field reference
const startBtn = document.getElementById('start-record-btn');
const stopBtn = document.getElementById('pause-record-btn');
const noteTextarea = document.getElementById('note-textarea');

// use the SpeechRecognition API
const recognition = new webkitSpeechRecognition();

// recognition properties
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

// variable to hold the transcribed words
let finalTranscript = '';

// function to start recording on click start recording button
function startRecording() {
  recognition.start();
}

// function to start recording on click start recording button
function stopRecording() {
  recognition.stop();
}

// event listener for the recognition process
recognition.onresult = function(event) {
  let interimTranscript = '';

  // loop through transcribed words and compile the final search field
  for (let i = event.resultIndex; i < event.results.length; i++) {
    const transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript += transcript;
    } else {
      interimTranscript += transcript;
    }
  }

  // recognized text
  noteTextarea.value = finalTranscript + interimTranscript;
};

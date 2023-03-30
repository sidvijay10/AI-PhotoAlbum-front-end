document.getElementById("displaytext").style.display = "none";

async function searchPhoto() {
  const apigClient = apigClientFactory.newClient({
    apiKey: "CvU4TQTeuB4Ecghtyikai2A1XWfQMHTf6ba5K3xi"
  });

  const user_message = document.getElementById('note-textarea').value;

  const params = {q: user_message};
  const body = {};
  const additionalParams = {};

  try {
    const res = await apigClient.searchGet(params, body, additionalParams).then(function(result){
      console.log('API Response', result.data);
      const gallery = document.getElementById('gallery');
      gallery.innerHTML = '';
      result.data.results.forEach(obj => {
        const img = document.createElement('img');
        img.src = 'https://b2-hw2.s3.amazonaws.com/' + obj.url;
        gallery.appendChild(img);
      });
    });
  } catch (err) {
    console.log("error", err);
  }
}


function uploadPhoto()
{
  var file_data = $("#file_path").prop("files")[0];   // Getting the properties of file from file field
  console.log('file_data:', file_data);

  if (file_data.size === 0) {
    console.log("Error: selected file is empty");
    return false;
  }
  var allowedTypes = ["image/jpeg", "image/png"]; // allowed content types
  if (allowedTypes.indexOf(file_data.type) === -1) {
    console.log("Error: selected file type is not allowed");
    return false;
  }

  var reader = new FileReader();
  reader.readAsDataURL(file_data);
  reader.onload = function() {
    var base64data = reader.result.split(",")[1];
    console.log('base64data:', base64data);

    var apigClient = apigClientFactory.newClient({
                      apiKey: "CvU4TQTeuB4Ecghtyikai2A1XWfQMHTf6ba5K3xi"
        });

    var data = document.getElementById('file_path').value;
    var x = data.split("\\")
    var filename = x[x.length-1]
    console.log('filename:', filename);

    var value = {};
    var customLabels = document.getElementById('custom-labels').value.split(' ');
    if (customLabels.length > 0) {
      value= customLabels.join(',');
    }
    else {
      value= [];
    }
    var params = {"filename" : filename , "Content-Type" : "text/base64", "Content-Length": file_data.size, "x-amz-meta-customLabels": value};
    console.log(params)

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

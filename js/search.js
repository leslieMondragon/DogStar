let breeds;

$('#breedSearch').on('input', function (e) {
  let searchStr = $(this).val();
  searchBreeds(searchStr);
});

function searchBreeds(searchStr) {
  let stringLength = searchStr.length
  searchStr = searchStr.toLowerCase();
  for (let i = 0; i < breeds.length; i++) {
    let breedNameSnippet = breeds[i].name.substr(0, stringLength).toLowerCase();
    if (breedNameSnippet == searchStr) {
      getDogByBreed(breeds[i].id)
      return;
    };
  };
};


let $breedSelect = $('select.breedSelect');
$breedSelect.change(function () {
  let id = $(this).children(":selected").attr("id");
  getDogByBreed(id)
});



function getBreeds() {
  ajaxGet('https://api.thedogapi.com/v1/breeds', function (data) {
    populateBreedsSelect(data)
    breeds = data
  });
};

function populateBreedsSelect(breeds) {
  $breedSelect.empty().append(function () {
    let output = '';
    $.each(breeds, function (key, value) {
      output += '<option id="' + value.id + '">' + value.name + '</option>';
    });
    return output;
  });
};

function getDogByBreed(breedId) {

  ajaxGet('https://api.thedogapi.com/v1/images/search?include_breed=1&breed_id=' + breedId, function (data) {

    if (data.length == 0) {

      clearBreed();
      $("#breedDataTable").append("<tr><td>Sorry, no Image for that breed yet</td></tr>");
    } else {

      displayBreed(data[0])
    };
  });
};

function clearBreed() {
  $('#breedImage').attr('src', "");
  $("#breedDataTable tr").remove();
};

function displayBreed(image) {
  $('#breedImage').attr('src', image.url);
  $("#breedDataTable tr").remove();

  let breedData = image.breeds[0]
  $.each(breedData, function (key, value) {

    if (key == 'weight' || key == 'height') value = value.metric

    $("#breedDataTable").append("<tr><td>" + key + "</td><td>" + value + "</td></tr>");
  });
};


function ajaxGet(url, callback) {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log('responseText:' + xmlhttp.responseText);
      try {
        data = JSON.parse(xmlhttp.responseText);
      } catch (err) {
        console.log(err.message + " in " + xmlhttp.responseText);
        return;
      };
      callback(data);
    };
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
};

getBreeds();
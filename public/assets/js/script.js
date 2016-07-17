'use strict';

var addInput = $("#add");
var removeInput = $("#remove");
var options = $("#options");

$(document).ready(function() {
  addInput.on('click', function() {
    var html = "<input type='text' class='form-control added' name='options[]'>"
    options.append(html);
  });
  removeInput.on('click', function() {
    $("#options .added").last().remove();
  });
});

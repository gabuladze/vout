'use strict';

var addInput = $("#add");
var removeInput = $("#remove");
var options = $("#options");
var select = $("select");
var customOption = $("#customOption");

$(document).ready(function() {
  addInput.on('click', function() {
    var html = "<input type='text' class='form-control added' name='options'>"
    options.append(html);
  });
  removeInput.on('click', function() {
    $("#options .added").last().remove();
  });
  select.change('click', function() {
    if ($(this).val() == 'custom') {
      customOption.removeClass('hidden');
    } else {
      customOption.addClass('hidden');
    }
  });
});

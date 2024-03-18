//you can also write in element: focus = "this.showpicker()"
const startTimeElement = document.getElementById("start-time-payment");
    startTimeElement.addEventListener('focus', function() {
    this.showPicker();
});

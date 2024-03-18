document.addEventListener('DOMContentLoaded', function() {
    const numPersonsInput = document.getElementById('numPersons');
    numPersonsInput.addEventListener('input', function(event) {
    	this.value = this.value.replace(/[-+]/g, ''); // Remove any non-numeric characters except '-' at the beginning
    });
});

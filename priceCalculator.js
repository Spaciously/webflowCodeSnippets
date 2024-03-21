console.log("hi from gh");
const pricePerPerson = parseFloat(document.querySelector('.priceperperson').textContent);
 		// calculate the min event total price
    function setMinPrice() {
  		const minPers = parseInt(document.querySelector('.minpers').textContent) || 1;
  		const minPrice = minPers * pricePerPerson;
  		document.getElementById('pricePerPerson').innerText = `$${pricePerPerson} per person`;
      document.getElementById('minPrice').innerText = `$${minPrice} minimum`;
  		return minPrice;
    }
    
		// calculate the event total price according to people num
    function calculateTotal() {
      const minPrice = setMinPrice();
      const numPersonsInput = document.getElementById('numPersons');
      let numPersons = parseInt(numPersonsInput.value) || 0;
      const maxPers = parseInt(document.querySelector('.maxpers').textContent) || 200;
      const errorMsg = document.getElementById('errorMsg');
      const maxAllowed = document.getElementById('maxAllowed');
   		
			// only allow num of persons smaller than max allowed
			if (numPersons > maxPers) {
        numPersonsInput.value = maxPers;
        numPersons = maxPers;
        errorMsg.style.display = 'inline';
        maxAllowed.innerText = maxPers;
      } else {
        errorMsg.style.display = 'none';
      }
      const totalPrice = pricePerPerson * numPersons;
      const displayPrice = totalPrice < minPrice ? minPrice : totalPrice;
      if (numPersons === 0) {
      	document.getElementById('totalPrice').innerText = `Total: $0`;
      } else {
      document.getElementById('totalPrice').innerText = `Total: $${displayPrice.toFixed(2)}`;
      }
    }
    document.getElementById('numPersons').addEventListener('input', calculateTotal);
    document.getElementById('numPersons').addEventListener('input', function(event) {
    	this.value = this.value.replace(/[-+]/g, ''); // Remove any non-numeric characters at the beginning
    });
    setMinPrice();
    calculateTotal();
    
    // create customed prefilled Airtable link
    function createFormLink() {
  		let airtableLink = 'https://airtable.com/embed/appHLxqRn0sf6ZYpJ/shrQpXgOa11tUvtLA?';
    	// form fields to build url
      const numPeopleField = 'Attendee+Count';
      const dateField = 'Date';
      //const titleField = 'Title';
      const titleField = 'Experience';
      const slugField = 'Webflow+slug';
      // values
      const numPeople = document.getElementById('numPersons').value;
      const dateInput = document.getElementById('eventDate').value;
      const title = document.querySelector('.exp-title').id;
      const fullPath = window.location.pathname;
      const pathSegments = fullPath.split('/');
			const slug = pathSegments[pathSegments.length - 1];
      if (title) {
      	airtableLink += `prefill_${titleField}=${title}`
      }
      if (numPeople) {
      	if (airtableLink.length > 62 ) {
      			airtableLink += `&prefill_${numPeopleField}=${numPeople}`;
					} else {
        		airtableLink += `prefill_${dateField}=${dateInput}`;
        	}
    	}
      if (dateInput) {
      	if (airtableLink.length > 62 ) {
      		airtableLink += `&prefill_${dateField}=${dateInput}`;
				} else {
        	airtableLink += `prefill_${dateField}=${dateInput}`;
        }
      }
      if (slug) {
      	if (airtableLink.length > 62) {
        	airtableLink += `&prefill_${slugField}=${slug}`;
        } else {
        	airtableLink += `prefill_${slugField}=${slug}`;
        }
      }
      airtableLink+=`&hide_Total+price=true`;
      airtableLink+=`&hide_Webflow+slug=true`;
    	return airtableLink;
    }
    

		function triggerConversionEvent() {
		// Push an event to the data layer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'ReserveButtonClick' // Custom event name
    });
		}
       
    // open modal
    function openModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
    // show loading wheel
  	const loadingSpinner = document.getElementById('loadingSpinner');
  	loadingSpinner.style.display = 'block';
    const dynamicAirtableLink = createFormLink();
   	// embed airtable iframe element
   	const airtableIframe = document.createElement('iframe');
    airtableIframe.classList.add('airtable-embed', 'airtable-dynamic-height');
    airtableIframe.src = dynamicAirtableLink;
    airtableIframe.frameBorder = '0';
    airtableIframe.setAttribute('onmousewheel', '');
    airtableIframe.width = '100%';
    airtableIframe.height = '1718';
    airtableIframe.style.background = 'transparent';
    airtableIframe.onload = function() {
    // Hide the loading wheel when content is loaded
    loadingSpinner.style.display = 'none';
 		};
    
 
    // Get the container and append the Airtable iframe
    const embedContainer = document.getElementById('airtableEmbedContainer');
    embedContainer.innerHTML = '';
    embedContainer.appendChild(airtableIframe);
  
  	// trigger GTM
	  triggerConversionEvent()
  
  }


  // Close the modal
  function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  }
  // close modal if clicking outside of it
	const modal = document.getElementById('myModal');
	window.addEventListener('click', function(event) {
  	if (event.target === modal && modal.style.display === 'block') {
   	 modal.style.display = 'none';
  	}
	});

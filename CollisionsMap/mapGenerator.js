var mouseDown = false;
var mouseDownType = null;
var isMapGenerated = false;

document.body.onmousedown = function() { 
	mouseDown = true;
}

document.body.onmouseup = function(){
	mouseDown = false;
	mouseDownType = null;
}

function generateMap(typ) {
	if (typ == 0 && isMapGenerated) {
		document.getElementById('modal_generate').style.display = "block";
		return;
	}
	const rows = document.getElementById('rows').value;
	const columns = document.getElementById('columns').value;
	const mapContainer = document.getElementById('mapContainer');
	let mapHTML = '<table><tr style="text-align: center;line-height: 1"><td></td>';
	isMapGenerated = true;
	for (let i = 1; i <= columns; i++) {
		mapHTML += `<td>${i}</td>`;
	}
	mapHTML += '</tr>';
	for (let i = 0; i < rows; i++) {
		mapHTML += '<tr>';
		mapHTML += `<td>${i + 1}</td>`;
		for (let j = 0; j < columns; j++) {
			mapHTML += `<td><input type="checkbox" id="checkbox-${i}-${j}" value="0"></td>`;
		}
		mapHTML += '</tr>';
	}
	mapHTML += '</table>';
	mapContainer.innerHTML = mapHTML;
	document.getElementById('mapContainer').style.maxHeight = (window.innerHeight - 90) + 'px';
	document.getElementById('modal_generate').style.display = "none";
}

// BOXES //
document.body.addEventListener('mouseover', function(event) {
	if (mouseDown && event.target.matches('input[type="checkbox"]')) {
		if (mouseDownType == null) {
			mouseDownType = !event.target.checked;
		}
	event.target.checked = mouseDownType;
	}
});

document.body.addEventListener('mousedown', function(event) {
	if (event.target.matches('input[type="checkbox"]')) {
		mouseDownType = event.target.checked;
	}
});

function downloadMap() {
  const rows = document.getElementById('rows').value;
  const columns = document.getElementById('columns').value;
  let mapData = '';
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const checkbox = document.getElementById(`checkbox-${i}-${j}`);
      mapData += checkbox.checked ? '#' : ' ';
    }
    mapData += '\n';
  }
  
  const element = document.createElement('a');
  const file = new Blob([mapData], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = 'collision_map.txt';
  document.body.appendChild(element); 
  element.click();
}
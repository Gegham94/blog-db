// UPLOAD IMAGE WITH FETCH REQUEST_________________________________________________________


async function uploadImage(src){ 
	const data = {
		name: user.value,
		email: email.value,
		age: age.value,
		password: password.value,
		confirm_password: confirm_password.value,
	};

	if(src !== '../../uploadImages/defaultImage.jpeg'){
		data.image = src;
	} 
	
	if(!data.name || !data.email || !data.age || !data.password || !data.confirm_password){
		alert('Enter all inputs');
	}else{
		await fetch('/auth/register',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data) 
		})
	}
}


// READ  FILE AND SET BASE64__________________________________________________________________
function readFile(file){
	const reader = new FileReader();

	image_preview__image.style.display = 'block';

	reader.onloadend = () => {
		image_preview__image.setAttribute('src', reader.result);
	};
	reader.readAsDataURL(file);
};


// CHECK FILE______________________________________________________________________________
function checkFile(file){
	const checkImage = file.type.slice(0,5);
	if(checkImage == 'image'){
	readFile(file)
	}else alert('Selected file is not Image');
};


// ONCLICK EVENT___________________________________________________________________________
registerButton.onclick = () => {
	uploadImage(image_preview__image.src);
};


// ONCHANGE EVENT__________________________________________________________________________
inpFile.onchange = (file) => {
	file = inpFile.files[0];
	checkFile(file);
};


//DRAG AND SROP METHODS____________________________________________________________________
image_content.ondragover = (event) =>{
	event.preventDefault();
};

image_content.ondragleave = (event) =>{
	event.preventDefault();
};

image_content.ondrop = (event) =>{
	event.preventDefault();
	const file = event.dataTransfer.files[0];
	checkFile(file);
};
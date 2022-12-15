var storage = firebase.storage();
var storageRef = storage.ref();
const db = firebase.firestore()


// const personal_form = document.getElementById("personal_form");
const form_company = document.getElementById("form_company");
const register_btn = document.getElementById("register_btn");

// personal_form && personal_form.addEventListener('submit', (e) => {
// 	const email_personal = document.getElementById("email_personal");
// 	const password_personal = document.getElementById("password_personal");
// 	signUp(email_personal.value, password_personal.value)
// 	e.preventDefault()
// })

register_btn.addEventListener('click', (e) => {
	const email_personal = document.getElementById("email_personal");
	const password_personal = document.getElementById("password_personal");
	signUp(email_personal.value, password_personal.value)
})

// register_btn.addEventListener("onClick", (e) => {

// })

function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			$('#blah')
				.attr('src', e.target.result);
		};

		reader.readAsDataURL(input.files[0]);
		return input.files[0]
	}
}
function readURL1(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			$('#blah1')
				.attr('src', e.target.result);
		};

		reader.readAsDataURL(input.files[0]);
		return input.files[0]
	}
}

const signUp = (email, password) => {
	const username_personal = document.getElementById("username_personal");
	const firstname_personal = document.getElementById("firstname_personal");
	const lastname_personal = document.getElementById("lastname_personal");
	const email_personal = document.getElementById("email_personal");
	const password_personal = document.getElementById("password_personal");
	const confirmpassword_personal = document.getElementById("confirmpassword_personal");
	const qualification_personal = document.getElementById("qualification_personal");
	const experience_personal = document.getElementById("experience_personal");
	const lastwork_personal = document.getElementById("lastwork_personal");
	const phone_personal = document.getElementById("phone_personal");
	const city_personal = document.getElementById("city_personal");
	const zipcode_personal = document.getElementById("zipcode_personal");
	const country_personal = document.getElementById("country_personal");
	const porfolio_personal = document.getElementById("porfolio_personal");
	const profilephoto_personal = document.getElementById("profilephoto_personal");
	const address_personal = document.getElementById("address_personal");
	const cv_personal = document.getElementById("cv_personal");
	const file = readURL(profilephoto_personal)

	firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((userCredential) => {
			var user = userCredential.user;
			let profileURL = "";
			var uploadTask = storageRef.child(`USERS/${user.uid}/${user.uid}`).put(file);
			uploadTask.on('state_changed',
				(snapshot) => {
					var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					switch (snapshot.state) {
						case firebase.storage.TaskState.PAUSED: // or 'paused'
							console.log('Upload is paused');
							break;
						case firebase.storage.TaskState.RUNNING: // or 'running'
							console.log('Upload is running');
							break;
					}
				},
				(error) => {
					// Handle unsuccessful uploads
				},
				() => {
					const user = firebase.auth().currentUser;
					user.updateProfile({
						displayName: "USER",
					}).then(() => {
						console.log("Profile Updated")
					}).catch((error) => {
					});
					uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
						profileURL = downloadURL;
						db.collection("USERS").doc(user.uid).set({
							username: username_personal.value,
							firstname: firstname_personal.value,
							lastname: lastname_personal.value,
							email: email_personal.value,
							qualification: qualification_personal.value,
							experience: experience_personal.value,
							lastwork: lastwork_personal.value,
							phonenumber: phone_personal.value,
							city: city_personal.value,
							zipcode: zipcode_personal.value,
							country: country_personal.value,
							portfolio: porfolio_personal.value,
							address: address_personal.value,
							photoURL: profileURL,
							cvURL: ""
						})
							.then(() => {
								console.log("Document successfully written!");
								alert('Account created successfully, you will be redirected soon to login page')
								window.location.href = '/login.html'
								// const cvURL = uploadFiles("USERS", user.uid, `CV/${readURL(cv_personal).name}`, readURL(cv_personal))
							})
							.catch((error) => {
								console.error("Error writing document: ", error);
								alert(error.message)
							});
					});
				}
			);


		})
		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			alert(error.message)
			// ..
		});

}

const uploadFiles = (role, id, filename, file) => {
	let cvURL = "";
	var uploadTask = storageRef.child(`${role}/${id}/${filename}`).put(file);
	uploadTask.on('state_changed',
		(snapshot) => {
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		},
		(error) => {
			// Handle unsuccessful uploads
		},
		() => {
			uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
				console.log('File available at', downloadURL);
				cvURL = downloadURL;
				var docRef = db.collection(role).doc(id);
				var updateCV = docRef.update({
					cvURL
				}).then(() => {
					setTimeout(() => {
						window.location.href = "/"
					}, 3000);
				})
					.catch((err) => {
						console.log(err)
					})
			});
		}
	);
	return cvURL
}

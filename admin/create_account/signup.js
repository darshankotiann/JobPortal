const form_company = document.getElementById('form_company')
var storage = firebase.storage();
var storageRef = storage.ref();
const db = firebase.firestore()


form_company && form_company.addEventListener('submit', (e) => {
	const email_company = document.getElementById('email_company');
	const password_company = document.getElementById('password_company');
	company_signup(email_company.value, password_company.value)
	e.preventDefault()

})

const company_signup = (email, password) => {
	const username_company = document.getElementById('username_company');
	const email_company = document.getElementById('email_company');
	const password_company = document.getElementById('password_company');
	const confirmpassword_company = document.getElementById('confirmpassword_company');
	const phone_company = document.getElementById('phone_company');
	const companyname_company = document.getElementById('companyname_company');
	const website_company = document.getElementById('website_company');
	const profilephoto_company = document.getElementById('profilephoto_company');
	const addressline_company = document.getElementById('addressline_company');

	function readURL1(input) {
		if (input.files && input.files[0]) {
			return input.files[0]
		}
	}

	firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((userCredential) => {
			// Signed in 
			var user = userCredential.user;
			var uploadTask = storageRef.child(`COMPANY/${user.uid}/${user.uid}.jpg`).put(readURL1(profilephoto_company));
			uploadTask.on('state_changed',
				(snapshot) => {
					var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					switch (snapshot.state) {
						case firebase.storage.TaskState.PAUSED: // or 'paused'
							('Upload is paused');
							break;
						case firebase.storage.TaskState.RUNNING: // or 'running'
							('Upload is running');
							break;
					}
				},
				(error) => {
					// Handle unsuccessful uploads
				},
				() => {
					const user = firebase.auth().currentUser;
					user.updateProfile({
						displayName: "COMPANY",
					}).then(() => {
						("Profile Updated")
					}).catch((error) => {
					});
					uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
						profileURL = downloadURL;
						db.collection("COMPANY").doc(user.uid).set({
							username: username_company.value,
							email: email_company.value,
							phonenumber: phone_company.value,
							company: companyname_company.value,
							website: website_company.value,
							addressline: addressline_company.value,
							photoURL: profileURL,
							disabled: false
						})
							.then(() => {
								var docRef = db.collection("COMPANY").doc(user.uid);
								docRef.get().then((doc) => {
									if (doc.exists) {
										("Document data:", doc.data());
										let obj = doc.data()
										obj.id = doc.id
										window.sessionStorage.setItem("user", JSON.stringify(obj))
										setTimeout(() => {
											window.location.href = "../"
										}, 3000);
									} else {
										("No such document!");
									}
								}).catch((error) => {
									("Error getting document:", error);
								});

							})
							.catch((error) => {
								console.error("Error writing document: ", error);
							});

					});
				}
			);
			// ...
		})
		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			(errorMessage)
			window.alert(errorMessage)
		});
}
const db = firebase.firestore()
const login_form = document.getElementById('login_form');

login_form.addEventListener('submit', (e) => {
	login()
	e.preventDefault()

})


const login = () => {
	const email = document.getElementById('email');
	const password = document.getElementById('password');
	firebase.auth().signInWithEmailAndPassword(email.value, password.value)
		.then((userCredential) => {
			var user = userCredential.user;
			(user)
			if (user.displayName === "USER") {
				window.alert("Your Email Is Registered As User!")
				firebase.auth().signOut().then(() => {
					("Sign-out successful.")
				}).catch((error) => {
					// An error happened.
				});
			} else {
				var docRef = db.collection("COMPANY").doc(user.uid);
				docRef.get().then((doc) => {
					if (doc.exists) {
						("Document data:", doc.data());
						let data = doc.data()
						data.id = doc.id
						window.sessionStorage.setItem('user', JSON.stringify(data))
						setTimeout(() => {
							window.location.href = "../"
						}, 3000);
					} else {
						// doc.data() will be undefined in this case
						("No such document!");
					}
				}).catch((error) => {
					("Error getting document:", error);
				});

			}
		})
		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			window.alert(errorMessage)
		});

}
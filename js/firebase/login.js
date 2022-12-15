const email = document.getElementById('email');
const password = document.getElementById('password');
const login_btn = document.getElementById('login_btn');
const db = firebase.firestore()

login_btn.addEventListener('click', () => {
	login(email.value, password.value)
})


const login = (email, password) => {
	firebase.auth().signInWithEmailAndPassword(email, password)
		.then((userCredential) => {
			// Signed in
			var user = userCredential.user;
			if (user.displayName === 'COMPANY') {
				window.location.href = '/admin/'
			}else{
			var docRef = db.collection("USERS").doc(user.uid);
			docRef.get().then((doc) => {
				if (doc.exists) {
					let obj = doc.data()
					obj.id = doc.id
					window.sessionStorage.setItem("currentuser", JSON.stringify(obj))
					setTimeout(() => {
						if (user.displayName == 'USER') {
							window.location.href = "/"
						}
					}, 2000);
				} else {
					// doc.data() will be undefined in this case
					console.log("No such document!");
				}
			}).catch((error) => {
				console.log("Error getting document:", error);
			});
}
		})
		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(error)
		});

}
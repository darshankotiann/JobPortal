const signout = () => {
	firebase.auth().signOut().then(() => {
		window.sessionStorage.removeItem('currentuser')
		window.location.href = "/login.html"
	}).catch((error) => {
		// An error happened.
	});
}

firebase.auth().onAuthStateChanged((user) => {
	try {
		let profilePage = document.getElementById('profile-page')
		let signoutBtn = document.getElementById('signout-btn')
		let loginBtn = document.getElementById('login-btn')
		let postjob = document.getElementById('postjob')
		let foremployees = document.getElementById('foremployees')
		if (user) {
			console.log(user)
			profilePage.style.display = ''
			signoutBtn.style.display = ''
			loginBtn.style.display = 'none'
			postjob.style.display = 'none'
			foremployees.style.display = 'none'
			var docRef = db.collection("USERS").doc(user.uid);
			docRef.get().then((doc) => {
				if (doc.exists) {
					let obj = doc.data()
					obj.id = doc.id
					window.sessionStorage.setItem("currentuser", JSON.stringify(obj))
				}
			}).catch((error) => {
				console.log("Error getting document:", error);
			});
		} else {
			profilePage.style.display = 'none'
			signoutBtn.style.display = 'none'
			loginBtn.style.display = ''
			postjob.style.display = ''
			foremployees.style.display = ''
			if (window.location.pathname.includes("candidate_profile")) {
				window.location.href = "/login.html"
			}
		}
	}
	catch (error) {

	}
});


const forgetPassword = () => {
	const email = document.getElementById('email').value
	if (email.length === 0) {
		alert("Please Enter A Valid Email!")
	}
	else {
		firebase.auth().sendPasswordResetEmail(email)
			.then(() => {
				alert("Password Reset Email Sent!")
			})
			.catch((error) => {
				alert(error.message)
			});
	}

}

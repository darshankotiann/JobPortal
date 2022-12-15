const signout = () => {
	firebase.auth().signOut().then(() => {
		window.sessionStorage.removeItem('user')
		setTimeout(() => {
			window.location.href = `${window.location.origin}/admin/login`
		}, 1000);
	}).catch((error) => {
		// An error happened.
	});
}

// let user = JSON.parse(window.sessionStorage.getItem('user'))
// if (!user) {
// 	if (!window.location.href.includes('login')) {
// 		signout()
// 	}
// }

firebase.auth().onAuthStateChanged((user) => {
	if (!user) {
		if (location.href.includes("login") || location.href.includes(`/create_account`)) {
			return
		} else {
			window.sessionStorage.removeItem('user')
			window.location.href = `${window.location.origin}/admin/login`
		}
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
				var errorCode = error.code;
				var errorMessage = error.message;
				// ..
			});
	}

}

try {
	const data = JSON.parse(window.sessionStorage.getItem('user'))
	document.getElementById("sidebarName").innerHTML = data.company
	document.getElementById("sidebarProfile").src = data.photoURL
} catch (error) {
	console.log(error)
}

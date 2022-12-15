const loadmorebtn = document.getElementById("loadmorebtn")

const db = firebase.firestore()
const company_collection = document.getElementById('company_collection')
let lastDoc = null

const fetchData = () => {
	db.collection("COMPANY").orderBy("username").startAfter(lastDoc || 0).limit(10)
		.onSnapshot((querySnapshot) => {
			var users = [];
			lastDoc = querySnapshot
			company_collection.innerHTML = ""
			querySnapshot.forEach((doc, i) => {
				obj = doc.data();
				obj.id = doc.id
				users.push(obj);
			});
			lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
			users.forEach((user) => {
				console.log(user.disabled)
				let text = 'Disable'
				if (user.disabled === true) {
					text = 'Enable'
				}
				else {
					text = 'Disable'
				}
				company_collection.innerHTML += `
			<div class="col-md-4">
							<div class="card user-card">
								<div class="card-header">
									<h5>Company</h5>
								</div>
								<div class="card-block">
									<div class="user-image">
										<img src='${user.photoURL}' class="img-radius" alt="User-Profile-Image">
									</div>
									<a  href="../company-details/?uid=${user.id}"><h6 class="f-w-600 m-t-25 m-b-10">${user.company}</h6></a>
									<p class="text-muted">Username: ${user.username} | Phone: ${user.phonenumber} | Email: ${user.email}</p>
									<hr>
									<button class='btn-sm btn-primary' onclick='handleDisable("${user.id}")'>${text}</button>
									<button type='button' class='btn-sm btn-danger' onclick='handleCompanyDelete("${user.id}", "${user.disabled}")'>Delete</button>
								</div>
							</div>
						</div>
			`
			})
		})
}

const handleCompanyDelete = async (id) => {
	let confirmModal = window.confirm('Are you sure you want to delete the company?')
	if (confirmModal) {
		db.collection("COMPANY").doc(id).delete().then(() => {
			alert('Deleted Successfully!')
		}).catch((error) => {
			alert(error.message)
		});
	}
}
fetchData()

loadmorebtn.addEventListener('click', () => {
	db.collection("COMPANY").orderBy("username").startAfter(lastDoc || 0).limit(10)
		.onSnapshot((querySnapshot) => {
			var users = [];
			lastDoc = querySnapshot
			querySnapshot.forEach((doc, i) => {
				obj = doc.data();
				obj.id = doc.id
				users.push(obj);
			});
			lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
			users.forEach((user) => {
				let text = 'Disable'
				if (user.disabled === true) {
					text = 'Enable'
				}
				else {
					text = 'Disable'
				}
				company_collection.innerHTML += `
				<div class="col-md-4">
				<div class="card user-card">
					<div class="card-header">
						<h5>Company</h5>
					</div>
					<div class="card-block">
						<div class="user-image">
							<img src='${user.photoURL}' class="img-radius" alt="User-Profile-Image">
						</div>
						<a  href="../company-details/?uid=${user.id}"><h6 class="f-w-600 m-t-25 m-b-10">${user.company}</h6></a>
						<p class="text-muted">Username: ${user.username} | Phone: ${user.phonenumber} | Email: ${user.email}</p>
						<hr>
						<button class='btn-sm btn-primary' onclick='handleDisable("${user.id}")'>${text}</button>
						<button type='button' class='btn-sm btn-danger' onclick='handleCompanyDelete("${user.id}", "${user.disabled}")'>Delete</button>
					</div>
				</div>
			</div>
			`
			})
		})
})

const handleDisable = (id, state) => {
	state = Boolean(state)
	console.log(id, state)
	var docRef = db.collection("COMPANY").doc(id);
	if (state) {
		docRef.update({
			disabled: false
		})
			.then(() => {
				alert("Document successfully updated!");
			})
			.catch((error) => {
				alert("Error updating document: ", error);
			});
	}
	else{
		docRef.update({
			disabled: true
		})
			.then(() => {
				alert("Document successfully updated!");
			})
			.catch((error) => {
				alert("Error updating document: ", error);
			});
	}
}
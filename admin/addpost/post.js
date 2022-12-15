const db = firebase.firestore();
const postButton = document.getElementById("postButton")
let cityJSON = JSON.parse('["Mumbai","Pune","Nagpur","Nashik","Vasai-Virar","Aurangabad","Solapur","Bhiwandi","Amravati","Malegaon","Kolhapur","Nanded","Sangli","Jalgaon","Akola","Latur","Ahmadnagar","Dhule","Ichalkaranji","Chandrapur","Parbhani","Jalna","Bhusawal","Navi Mumbai","Panvel","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"]')
let jobpostform = document.getElementById('jobpostform')

const getDate = () => {
	const dateOBJ = new Date();
	let date = dateOBJ.getDate()
	if (date <= 9) {
		date = `0${date}`
	}
	let month = dateOBJ.getMonth() + 1
	if (month <= 9) {
		month = `0${month}`
	}
	let year = dateOBJ.getFullYear()
	let dateString = `${date}-${month}-${year}`
	return dateString
}

const user = JSON.parse(window.sessionStorage.getItem('user'))
// if (user.subscription === 'free') {
// 	console.log("first")
// 	jobdescription.addEventListener('change', (e) => {
// 		if (e.target.value.length < 200) {
// 			return
// 		} else {
// 			let onlyChars = e.target.value.subString(0, 200)
// 			e.target.value = onlyChars
// 		}
// 	})
// }

const addJobData = () => {
	postButton.disabled = true
	console.log('Func called')
	var storage = firebase.storage();
	var storageRef = storage.ref();
	const jobtitle = document.getElementById('jobtitle').value
	const joblocation = document.getElementById('joblocation').value
	const salary = document.getElementById('salary').value
	const qualification = document.getElementById('qualification').value
	const jobsector = document.getElementById('jobsector').value
	const gender = document.getElementById('gender').value
	const experience = document.getElementById('experience').value
	const jobtimings = document.getElementById('jobtimings').value
	const jobtype = document.getElementById('jobtype').value
	const jobcategory = document.getElementById('jobcategory').value
	const jobdescription = document.getElementById('jobdescription').value
	const jobfile = document.getElementById('jobfile')
	const user = JSON.parse(window.sessionStorage.getItem('user'))

	if (jobfile.files.length === 0) {
		const data = {
			jobtitle,
			joblocation,
			salary,
			qualification,
			jobsector,
			gender,
			experience,
			jobtimings,
			jobtype,
			jobcategory,
			jobdescription,
			company: user.company,
			companyID: user.id,
			files: "",
			companyIMG: user.photoURL,
			website: user.website,
			date: getDate()
		}
		if (user.disabled) {
			alert('You are disabled by the admin')
		}
		else {

			db.collection("JOBS").add(data)
				.then((docRef) => {
					window.alert('Job Posted')
				})
				.catch((error) => {
					console.error("Error adding document: ", error);
				});
		}
	}
	else {
		var uploadTask = storageRef.child(`JOBS/${user.id}/${jobfile.files[0].name}`).put(jobfile.files[0]);
		uploadTask.on('state_changed',
			(snapshot) => {
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				switch (snapshot.state) {
					case firebase.storage.TaskState.PAUSED: // or 'paused'
						break;
					case firebase.storage.TaskState.RUNNING: // or 'running'
						console.log('running')
						break;
				}
			},
			(error) => {
				// Handle unsuccessful uploads
			},
			() => {
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					('File available at', downloadURL);
					const data = {
						jobtitle,
						joblocation,
						salary,
						qualification,
						jobsector,
						gender,
						experience,
						jobtimings,
						jobtype,
						jobcategory,
						jobdescription,
						company: user.company,
						companyID: user.id,
						files: downloadURL,
						companyIMG: user.photoURL
					}
					if (user.disabled) {
						alert('You are disabled by the admin')
					} else {
						db.collection("JOBS").add(data)
							.then((docRef) => {
								window.alert('Job Posted')
								jobpostform.reset()
								postButton.disabled = false
							})
							.catch((error) => {
								console.error("Error adding document: ", error);
							});
					}
				});
			}
		);
	}
}

postButton.addEventListener('click', (e) => {
	e.preventDefault()
	const user = firebase.auth().currentUser
	if (user) {
		let postedJob = []
		// db.collection("JOBS").where("companyID", "==", user.uid)
		// 	.get()
		// 	.then((querySnapshot) => {
		// 		querySnapshot.forEach((doc) => {
		// 			postedJob.push(doc.data())
		// 		});
		// 		let data = JSON.parse(window.sessionStorage.getItem('user'))
		// 		if (data.subscription === 'free') {
		// 			console.log(postedJob)
		// 			console.log('first')
		// 			if (postedJob.length < 1) {
		// 				console.log("asd")
		// 				// addJobData()
		// 			} else {
		// 				alert('Only 1 Job is allowed to post in Free Subscription Plan')
		// 			}
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.log("Error getting documents: ", error);
		// 	});
		addJobData()
	}
})

cityJSON.forEach((city) => {
	document.getElementById('joblocation').innerHTML += `<option value='${city}'>${city}</option>`
})


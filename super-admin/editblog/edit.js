const searchURL = window.location.search;
let urlSearchParams = new URLSearchParams(searchURL)
let id = urlSearchParams.get('id')


const getDataEdit = () => {
	const db = firebase.firestore()
	var docRef = db.collection("BLOGS").doc(id);
	docRef.get().then((doc) => {
		if (doc.exists) {
			console.log(document.getElementById('blog_title'))
			document.getElementById('blog_title').value = doc.data().blogTitle
			document.getElementById('blog_desc').value = doc.data().blogDesc
		} else {
			console.log("No such document!");
		}
	}).catch((error) => {
		console.log("Error getting document:", error);
	});

}
getDataEdit()



const editBlogFunc = () => {
	var docRef = db.collection("BLOGS").doc(id);
	docRef.update({
		blogTitle: document.getElementById('blog_title').value,
		blogDesc: document.getElementById('blog_desc').value
	})
		.then(() => {
			alert("Document successfully updated!");
		})
		.catch((error) => {
			alert("Error updating document: ", error);
		});

}
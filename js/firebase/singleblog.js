const db = firebase.firestore()
const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams.get('id'))
db.collection("BLOGS").doc(urlParams.get('id'))
	.onSnapshot((doc) => {
		console.log("Current data: ", doc.data());
		document.getElementById('blog-desc').innerHTML = doc.data().blogDesc
		document.getElementById('blog-title').innerHTML = doc.data().blogTitle
		document.getElementById('blog-date').innerHTML += doc.data().date
		document.getElementById('blog-img').src = doc.data().img
	});
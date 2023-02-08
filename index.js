import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
import { collection, getDocs, addDoc, Timestamp, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
import { query, orderBy, limit, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyB5flINh63wsorTDndgmfupp-eWIbBU-bQ",
    authDomain: "social-tr.firebaseapp.com",
    projectId: "social-tr",
    databaseURL: "https://social-tr-default-rtdb.europe-west1.firebasedatabase.app",
    storageBucket: "social-tr.appspot.com",
    messagingSenderId: "908123565600",
    appId: "1:908123565600:web:39db485567d7d95fce5645",
    measurementId: "G-YRNHT4G8R3"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { app, firestore, collection, getDocs, Timestamp, addDoc };
export { query, orderBy, limit, where, onSnapshot };

document.getElementById("btnAddDoc").addEventListener('click',function (event) {
		if (checkContents() === true && isEqualInput() === false && boxValidation() === true) {
            findAlreadyExistingId();
        }
        else {
            return false;
        }
});

async function setDocumentFriend1() {
    let inputName = document.getElementById('friend-1-name').value;
    let inputPhone = document.getElementById('friend-1-phone').value;
    await setDoc(doc(firestore, "users", inputPhone), {
   			name: inputName,
        to: inputPhone,
        body: "Hej " + inputName + ", du är inbjuden till Social Tree!"
    });
    console.log('Object added to Firebase');
}

async function setDocumentFriend2() {
    let inputName = document.getElementById('friend-2-name').value;
    let inputPhone = document.getElementById('friend-2-phone').value;
    await setDoc(doc(firestore, "users", inputPhone), {
    		name: inputName,
        to: inputPhone,
        body: "Hej " + inputName + ", du är inbjuden till Social Tree!"
    });
    console.log('Object added to Firebase');
}

async function setDocumentFriend3() {
    let inputName = document.getElementById('friend-3-name').value;
    let inputPhone = document.getElementById('friend-3-phone').value;
    await setDoc(doc(firestore, "users", inputPhone), {
    		name: inputName,
        to: inputPhone,
        body: "Hej " + inputName + ", du är inbjuden till Social Tree!"
    });
    console.log('Object added to Firebase');
}

async function setDocumentSubmission() {
    let inputFirstNameId = document.getElementById('fName').value;
    let inputLastNameId = document.getElementById('lName').value;
    let inputFirstName = document.getElementById('fName').value;
    let inputLastName = document.getElementById('lName').value;
    let email = document.getElementById('epost').value;
    let myHTML = `<body><section style='margin:auto;width:500px;padding:75px;text-align:center;'><div style='margin-bottom:50px;'><img src='https://1000logos.net/wp-content/uploads/2021/11/Nike-Logo.png' width='300';></div><div class='text-section'><h1 id='welcome'>Välkommen till Social Tree, ${inputFirstNameId} ${inputLastNameId}! </h1><p>Social Tree önskar dig varmt välkommen till Auktionsverket den 28 januari.</p></div><div style='margin-top:50px;'><img src='https://1000logos.net/wp-content/uploads/2021/11/Nike-Logo.png' width='300';></div></section></body>`
    let count = 0;
    const querySnapshot = await getDocs(collection(firestore, "submissions"));
    querySnapshot.forEach((doc) => {
      count++;
    });
    
    await setDoc(doc(firestore, "submissions", count + '. ' + inputFirstNameId + ' ' + inputLastNameId), {
    		firstName: inputFirstName,
        lastName: inputLastName,
        to: [email],
				message: {
  			subject: 'Bekräftelse Social Tree',
 				text: 'Du är nu på gästlistan!',
        html: myHTML
        }
    });
    console.log('Object added to Firebase');
}

async function getAllDocuments() {
    const querySnapshot = await getDocs(collection(firestore, "users"));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
}

async function findAlreadyExistingId() {
        // checks all ids, if equal to the input, break.
        let inputFromTheUser1 = document.getElementById('friend-1-phone');
        let inputFromTheUser2 = document.getElementById('friend-2-phone');
        let inputFromTheUser3 = document.getElementById('friend-3-phone');
        let epost = document.getElementById('epost');
        let isFound = false;
        const querySnapshotUsers = await getDocs(collection(firestore, "users"));
        const querySnapshotSubs = await getDocs(collection(firestore, "submissions"));
        
        querySnapshotUsers.forEach((doc) => {
            if (doc.data()['to'] === inputFromTheUser1.value || 
            doc.data()['to'] === inputFromTheUser2.value || 
            doc.data()['to'] === inputFromTheUser3.value) {
                isFound = true;
                alert(doc.id + ' is already invited to this event!');
                return false;
            }
        });
         
         querySnapshotSubs.forEach((doc) => {
            if (doc.data()['to'] === epost.value) {
                isFound = true;
                alert('You are already on the guest list!');
                return false;
            }
        });
        
        if (isFound === false) {
            	setDocumentFriend1();
              setDocumentFriend2();
              setDocumentFriend3();
              setDocumentSubmission();
              console.log(isFound);
              setTimeout(function (){
            		window.location = "https://socialtree.webflow.io/success";
            }, 3000);
            }
    }
    
    function checkContents() {
        const phone1 = document.getElementById('friend-1-phone').value;
        const phone2 = document.getElementById('friend-2-phone').value;
        const phone3 = document.getElementById('friend-3-phone').value;

        if (phone1.includes('+') && phone1.length > 10 && phone1.length < 14 && !phone1.includes(' ')
        && phone2.includes('+') && phone2.length > 10 && phone2.length < 14 && !phone2.includes(' ')
        && phone3.includes('+') && phone3.length > 10 && phone3.length < 14 && !phone3.includes(' '))
        {
          console.log('All formats are correct!');
          return true;
        }
        else {
        		alert('Wrong format!')
            console.log('Bad input!');
        }
    }
    
    function isEqualInput() {
        const phone1 = document.getElementById('friend-1-phone').value;
        const phone2 = document.getElementById('friend-2-phone').value;
        const phone3 = document.getElementById('friend-3-phone').value;

        if (phone1 === phone2 || phone1 === phone3 || phone2 === phone3) {
        		alert('Phone numbers are equal!')
        		console.log('Same numbers')
            return true;
        }
        else {
        		return false;
        }
    }
    
    
    let count = 0;
    document.getElementById('myBox').addEventListener('click',function (event) {
        count++;
        if (count % 2 === 1) {
            document.getElementById('myBox').checked = true;
        }
        else {
            document.getElementById('myBox').checked = false;
        }
    });

    function boxValidation() {
        let myBox = document.getElementById('myBox');
        
        if (myBox.checked) {
            console.log('Box checked');
            return true;
        }
        else {
        		alert('Please check the box!')
        }
    }

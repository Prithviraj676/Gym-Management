import * as authen from "./auth.js";
import * as db from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";

let log = console.log;

db.getDocs(db.collection(authen.fs, "User")).then((qs) => {

    qs.docs.forEach(element => {
        var plan = element.data().plan;
        if (plan !== "null") {
            var subdate = String(element.data().subDate);
            var today = new Date()
            log(subdate);
            log(today);
            var subdate_1 = new Date(subdate.split("/").reverse());

            var thirty = 1000 * 60 * 60 * 24 * 30;
            if ((today - subdate_1) > thirty) {

                window.location.href = "notification.html";

            }
        }
    });
});
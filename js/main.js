/*
Reference:
https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
https://developers.google.com/web/updates/2015/07/mediastream-deprecations?hl=en#stop-ended-and-active
https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos
*/

// reference to the current media stream
let mediaStream = null;
// Hide an element
let hide = function (elem) {
    elem.style.display = 'none';
};
let preview = false;

let show = function (elem) {
    elem.style.display = 'block';
};

document.addEventListener("DOMContentLoaded", function(event) {
    var node = document.getElementById('snapBtn');
    // node.onmouseover = function(e) {
    //     node.innerHTML = "re-shoot";
    // }
    //
    // node.onmouseout = function(e) {
    //     node.innerHTML = "Hover";
    // }
});

// Prefer camera resolution nearest to 1280x720.
const constraints = {
    audio: false,
    video: {
        width: {ideal: 640},
        height: {ideal: 480},
        facingMode: "environment"
    }
};

async function getMediaStream(constraints) {
    try {
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        let video = document.getElementById('cam');
        video.srcObject = mediaStream;
        let elem = document.getElementById('image');
        hide(elem);
        video.onloadedmetadata = () => {
            video.play();
        };
    } catch (err) {
        console.error(err.message);
    }
}

// Example POST method implementation:



function postData(url = '', data = {}) {
    console.log('within postdata')
    // Default options are marked with *

    fetch('http://3.120.127.207/api/login/', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: 'Beeldengeluid',
            password: 'Jkf738%^dg',
        })
    })
        // .then(response => response.json()); // parses response to JSON
}

function sendPicture() {


    console.log('within postdata');
    fetch('./serve.php', {
        method: 'post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'username=Beeldengeluid&password=Jkf738%^dg'
    })
        .then(res => console.log(res))
        .catch(function (error) {
            console.log('Request failed', error);
        });



}



async function switchCamera(cameraMode) {
    try {
        // stop the current video stream
        if (mediaStream != null && mediaStream.active) {
            var tracks = mediaStream.getVideoTracks();
            tracks.forEach(track => {
                track.stop();
            })
        }
        let elem = document.getElementById('snapBtn');
        show(elem);

        // set the video source to null
        document.getElementById('cam').srcObject = null;

        // change "facingMode"
        constraints.video.facingMode = cameraMode;

        // get new media stream
        await getMediaStream(constraints);
    } catch (err)  {
        console.error(err.message);
        alert(err.message);
    }
}


function reloadCamera(){
    console.log('reloading camera')
    let cam = document.getElementById('cam');
    let photo = document.getElementById('photo');
    show(cam);
    hide(photo)
}

function takePicture() {
    let canvas = document.getElementById('canvas');
    let video = document.getElementById('cam');
    let photo = document.getElementById('photo');
    let context = canvas.getContext('2d');
    let elem = document.getElementById('cam');

    hide(elem);
    // let removeElem = document.getElementById('btnRemovePicture');
    // show(removeElem);
    let reloadCamera = document.getElementById('btnReloadCamera');
    show(reloadCamera);
    //reloadCamera
    const height = video.videoHeight;
    const width = video.videoWidth;
console.log(photo)
    if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
        let data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
        photo.style.display = 'block';
    } else {
        clearphoto();
    }
}



function clearPhoto() {
    let canvas = document.getElementById('canvas');
    let photo = document.getElementById('photo');
    // let context = canvas.getContext('2d');

    // context.fillStyle = "#AAA";
    // context.fillRect(0, 0, canvas.width, canvas.height);
    // var data = canvas.toDataURL('image/png');
    // photo.setAttribute('src', data);
}

clearPhoto();


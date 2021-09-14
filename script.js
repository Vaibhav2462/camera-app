let video = document.querySelector("video")
let capture = document.querySelector(".click")
let filters = document.querySelectorAll(".myfilters")
let filterLayer = document.querySelector(".anonymous")
let videoTillNow = []
let recordBtn = document.querySelector(".record")
let isRecording = false
let mediaRecorderObject = ""
let constrain = {video: true}
let color = ""
let streamWeGot = navigator.mediaDevices.getUserMedia(constrain)  //pass constrains
streamWeGot.then(function(stream){
    video.srcObject = stream
    mediaRecorderObject = new MediaRecorder(stream);
    mediaRecorderObject.addEventListener("dataavailable" , function(e){
        videoTillNow.push(e.data)
    })
    mediaRecorderObject.addEventListener("stop" , function(){
        const blob = new Blob(videoTillNow, { type: 'video/mp4' });
        const url = window.URL.createObjectURL(blob);
        let a  = document.createElement("a")
        a.href = url
        a.download = "video.mp4"
        a.click()

    })

})
.catch(function(err){
    alert("Allow access")
})

recordBtn.addEventListener("click",function(){
    if(isRecording == false){
        mediaRecorderObject.start()
        recordBtn.innerText = "Click To Stop"
    }else{
        mediaRecorderObject.stop()
        recordBtn.innerText = "RECORD"
    }
    isRecording = !isRecording
})
capture.addEventListener("click" , function(){
    let canvas = document.createElement("canvas")
    let tool = canvas.getContext("2d")
    canvas.height = video.videoHeight
    canvas.width = video.videoWidth
    tool.drawImage(video , 0,0)
    tool.fillStyle = color;
    tool.fillRect(0, 0, canvas.width, canvas.height);
    let url = canvas.toDataURL()
    let a = document.createElement("a")
    a.download = "image.png"
    a.href = url
    a.click()
    a.remove()
})
for(let i = 0 ; i<filters.length ; i++){
    filters[i].addEventListener("click" , function(){
        color = filters[i].style.backgroundColor 
        filterLayer.style.backgroundColor = color      
    })
}
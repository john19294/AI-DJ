function draw(){
image(video,0,0,600,500)
fill("#73020a")
stroke("#b5e8c3")
if(scorerightwrist>0.2){


circle(rightWristX,rightWristY,20)
if(rightWristY>0 && rightWristY<=100){
    document.getElementById("speed").innerHTML="speed=0.5x"
    song.rate(0.5)
}
else if (rightWristY>100 && rightWristY<=200){
    document.getElementById("speed").innerHTML="speed=1x"
    song.rate(1)
}
else if(rightWristY>200 && rightWristY<=300){
document.getElementById("speed").innerHTML="speed=1.5x"
song.rate(1.5)
}
else if(rightWristY>300 && rightWristY<=400){
    document.getElementById("speed").innerHTML="speed=2x"
    song.rate(2)
}
else if(rightWristY>400 && rightWristY<=500){
    document.getElementById("speed").innerHTML="speed=2.5x"
    song.rate(2.5)
}
}
if(scoreleftwrist>0.2){
circle(leftWristX,leftWristY,20)
leftWristY_in_number=Number(leftWristY)
leftWristY_whole_number=floor(leftWristY_in_number)
volume=leftWristY_whole_number/500
document.getElementById("volume").innerHTML="volume"+volume
song.setVolume(volume)
}

}
function setup(){
canvas=createCanvas(600,500)
canvas.center()
video=createCapture(VIDEO)
video.hide()
poseNet=ml5.poseNet(video,modelLoaded)
poseNet.on('pose',gotPoses)
}
function preload(){
song=loadSound("music.mp3")


}
function play(){
song.play()



}
song=""
function modelLoaded(){
console.log("Posenet is initialized")
}
function gotPoses(results){
if(results.length>0){
    console.log(results)
    scorerightwrist=results[0].pose.keypoints[10].score
    leftWristX=results[0].pose.leftWrist.x
    leftWristY=results[0].pose.leftWrist.y
    rightWristY=results[0].pose.rightWrist.y
    rightWristX=results[0].pose.rightWrist.x
    scoreleftwrist=results[0].pose.keypoints[9].score
    console.log("leftWristscore="+scoreleftwrist+"rightWristscore="+scorerightwrist)
    console.log("leftWristx="+leftWristX+"leftWristy="+leftWristY+"rightWristy"+rightWristY+"rightWristx"+rightWristX)
    
}
}
leftWristX=0
leftWristY=0
rightWristY=0
rightWristX=0
scoreleftwrist=0
scorerightwrist=0
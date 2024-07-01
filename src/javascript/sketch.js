var width = window.innerWidth;
var height = window.innerHeight;
var mouseX = width / 2;
var mouseY = height / 2;
var renderer = new PIXI.autoDetectRenderer(width, height);//Chooses either WebGL if supported or falls back to Canvas rendering
document.body.appendChild(renderer.view);//Add the render view object into the page
document.addEventListener('mousemove', function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}, false);
var stage = new PIXI.Container();//The stage is the root container that will hold everything in our scene

// smoke shader
var uniforms = {};

uniforms.resolution = { type: 'v2', value: { x: width, y: height}};
uniforms.alpha = { type: '1f', value: 1.0 };
uniforms.shift = { type: '1f', value: 0.0 };
uniforms.time = {type: '1f',value: 0};
uniforms.speed = {type: 'v2', value: {x: 0.7, y: 0.4}};
uniforms.mouse = {type: 'v2', value: { x:mouseX, y:mouseY }};

var shaderCode = document.getElementById( 'fragShader' ).innerHTML
var smokeShader = new PIXI.AbstractFilter('',shaderCode, uniforms);

var bg = PIXI.Sprite.fromImage('');
bg.width = width;
bg.height = height;
bg.filters = [smokeShader]
stage.addChild(bg);

animate()


var count = 0

function animate() {
    // start the timer for the next animation loop
    requestAnimationFrame(animate);

    count += 0.002
    smokeShader.uniforms.time.value = count;

    // this is the main render call that makes pixi draw your container and its children.
    renderer.render(stage);
}
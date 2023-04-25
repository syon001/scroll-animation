var isDragging = false;
var previousMousePosition = { x: 0, y: 0 };
var currentRotation = 0;
var initialRotation = 0;

function startDragging(event) {
    event.preventDefault();
    isDragging = true;
    initialRotation = currentRotation;
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
}

function stopDragging(event) {
    event.preventDefault();
    isDragging = false;
}

function rotateImage(event) {
    if (isDragging) {
        var container = document.querySelector('.container1');
        var scrollTop = container.scrollTop;
        var img = document.querySelector('.rotated-img');
        var imgHeight = img.offsetHeight;
        var containerHeight = container.offsetHeight;
        var currentMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
        var dx = currentMousePosition.x - previousMousePosition.x;
        var dy = currentMousePosition.y - previousMousePosition.y;
        var rotation = initialRotation + (dx + dy) * 0.5;
        currentRotation = rotation;
        img.style.transform = 'rotate(' + rotation + 'deg)';

        // calculate the new scroll position based on the rotation angle
        var scrollPosition = scrollTop + (rotation - initialRotation) * (containerHeight - imgHeight) / 360;
        container.scrollTop = scrollPosition;
    }
}

function scrollContainer1(event) {
    var container = document.querySelector('.container1');
    var scrollTop = container.scrollTop;
    var img = document.querySelector('.rotated-img');
    var imgHeight = img.offsetHeight;
    var containerHeight = container.offsetHeight;
    var rotation = (scrollTop / (containerHeight - imgHeight)) * 360;
    currentRotation = rotation;
    img.style.transform = 'rotate(' + rotation + 'deg)';
}

document.addEventListener('mousemove', rotateImage);
document.addEventListener('mouseup', stopDragging);
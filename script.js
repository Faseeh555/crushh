const pictures = document.querySelectorAll('.Picture');
let previousTouch = undefined;

function updateElementPosition(element, event) {
  let movementX, movementY;

  if (event.type === 'touchmove') {
    const touch = event.touches[0];
    movementX = previousTouch ? touch.clientX - previousTouch.clientX : 0;
    movementY = previousTouch ? touch.clientY - previousTouch.clientY : 0;
    previousTouch = touch;
  } else {
    movementX = event.movementX;
    movementY = event.movementY;
  }
  
  const elementY = parseInt(element.style.top || 0) + movementY;
  const elementX = parseInt(element.style.left || 0) + movementX;

  element.style.top = elementY + "px";
  element.style.left = elementX + "px";
}

function startDrag(element, event) {
  event.preventDefault();
  previousTouch = event.touches ? event.touches[0] : undefined;

  function onMouseMove(e) {
    updateElementPosition(element, e);
  }

  function onTouchMove(e) {
    updateElementPosition(element, e);
  }

  function stopDrag() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', stopDrag);
    previousTouch = undefined;
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchmove', onTouchMove);
  document.addEventListener('touchend', stopDrag);
}

pictures.forEach(picture => {
  picture.style.position = 'absolute'; // Ensures draggable positioning
  picture.addEventListener('mousedown', event => startDrag(picture, event));
  picture.addEventListener('touchstart', event => startDrag(picture, event), { passive: true });
});

function init(): void {
  const body = document.querySelector('body');
  const helloWorld = document.createElement('h1');
  helloWorld.innerHTML = 'Hello World';
  body.appendChild(helloWorld);
}

window.addEventListener('load', init);

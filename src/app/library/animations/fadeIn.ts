export function fadeIn(element: HTMLElement, duration: number = 1000): () => void {
  function _fadeIn(zero: number): void {
    function _animate() {
      const _value = (performance.now() - zero) / duration;
      if (_value < 1){
        element.style.opacity = _value.toString();
        requestAnimationFrame(_animate);
      }
      else element.style.opacity = '1';
    }
    requestAnimationFrame(_animate);
  }
  
  return () => {
    const _zero = performance.now();
    _fadeIn(_zero);
  };
}
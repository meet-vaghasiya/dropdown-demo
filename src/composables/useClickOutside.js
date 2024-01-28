import { ref, onMounted, onUnmounted } from 'vue';

function useClickOutside(elementToWatch, callback) {
  const isClickOutside = ref(false);

  const handleClick = (event) => {
    if (elementToWatch.value && !elementToWatch.value.contains(event.target)) {
      isClickOutside.value = true;
      callback();
    } else {
      isClickOutside.value = false;
    }
  };

  onMounted(() => {
    document.addEventListener('click', handleClick);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleClick);
  });

  return isClickOutside;
}

export default useClickOutside;

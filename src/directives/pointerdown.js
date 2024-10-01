export default {
    beforeMount(el, binding) {
        let pressTimer = null;

        const start = (e) => {
            if (e.button !== 0) return;
            if (typeof binding.value !== 'function') {
                console.warn(`Expected a function in v-long-click directive, but got ${typeof binding.value}`);
                return;
            }

            pressTimer = setTimeout(() => {
                binding.value(e);
            }, 1000);
        };

        const cancel = () => {
            if (pressTimer !== null) {
                clearTimeout(pressTimer);
                pressTimer = null;
            }
        };

        el.addEventListener('pointerdown', start);
        el.addEventListener('pointerup', cancel);
        el.addEventListener('pointerleave', cancel);

        el._pointerDown = {
            start,
            cancel
        };
    },

    beforeUnmount(el) {
        const {start, cancel} = el._pointerDown;
        el.removeEventListener('pointerdown', start);
        el.removeEventListener('pointerup', cancel);
        el.removeEventListener('pointerleave', cancel);
    }
};

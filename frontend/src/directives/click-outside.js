export const clickOutsideNav = {
    mounted(el, binding) {
        const menu = document.querySelector('.nav-toggle');
        el.clickOutsideEvent = function(event) {
            if (
                !(el === event.target || el.contains(event.target)) &&
                event.target !== menu &&
                !menu.contains(event.target)
            ) {
                binding.value();
            }
        };

        document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    },
};
export const clickOutsideDropdown = {
    mounted(el, binding) {
        const dropdown = document.querySelector('.avatar');

        el.clickOutsideEvent = function(event) {
            if (
                !(el === event.target) &&
                event.target !== dropdown &&
                !dropdown.contains(event.target)
            ) {
                binding.value();
            }
        };

        document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    },
};
export const clickOutsideFilter = {
    mounted(el, binding) {
        const filter = document.querySelector('.filter-button');

        el.clickOutsideEvent = function(event) {
            if (
                !(el === event.target || el.contains(event.target)) &&
                event.target !== filter &&
                !filter.contains(event.target)
            ) {
                binding.value();
            }
        };

        document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    },
};

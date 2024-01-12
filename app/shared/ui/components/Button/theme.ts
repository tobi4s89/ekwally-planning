export const buttonTheme = {
    base: 'group flex items-stretch items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none',
    fullSized: 'w-full',
    color: {
        default: 'text-white bg-primary border border-transparent enabled:hover:bg-primary-darker focus:ring-4 focus:ring-primary-lighter',
        light: 'text-gray-900 bg-white border border-gray-300 enabled:hover:bg-gray-100 focus:ring-4 focus:ring-cyan-300 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:enabled:hover:bg-gray-700 dark:enabled:hover:border-gray-700 dark:focus:ring-gray-700',
        info: 'text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800',
        success: 'text-white bg-green-700 border border-transparent enabled:hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:enabled:hover:bg-green-700 dark:focus:ring-green-800',
        warning: 'text-white bg-yellow-400 border border-transparent enabled:hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900', green: 'text-green-900 bg-white border border-green-300 enabled:hover:bg-green-100 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:text-white dark:border-green-600 dark:enabled:hover:bg-green-700 dark:enabled:hover:border-green-700 dark:focus:ring-green-700',
        danger: 'text-red-900 bg-white border border-red-300 enabled:hover:bg-red-100 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:text-white dark:border-red-600 dark:enabled:hover:bg-red-700 dark:enabled:hover:border-red-700 dark:focus:ring-red-700',
    },
    disabled: 'cursor-not-allowed opacity-50',
    inner: {
        base: 'flex items-stretch items-center transition-all duration-200',
        position: {
            none: '',
            start: 'rounded-r-none',
            middle: 'rounded-none',
            end: 'rounded-l-none',
        },
        outline: 'border border-transparent',
    },
    outline: {
        color: {
            gray: 'border border-gray-900 dark:border-white',
            default: 'border-0',
            light: '',
        },
        off: '',
        on: 'flex justify-center bg-white text-gray-900 transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-white w-full',
        pill: {
            off: 'rounded-md',
            on: 'rounded-full',
        },
    },
    pill: {
        off: 'rounded-lg',
        on: 'rounded-full',
    },
    size: {
        xs: 'text-xs px-2 py-1',
        sm: 'text-sm px-3 py-1.5',
        md: 'text-sm px-4 py-2',
        lg: 'text-base px-5 py-2.5',
        xl: 'text-base px-6 py-3',
    },
};

export const buttonGroupTheme = {
    base: 'inline-flex',
    position: {
        none: 'focus:ring-2',
        start: 'rounded-r-none',
        middle: 'rounded-none border-l-0 pl-0',
        end: 'rounded-l-none border-l-0 pl-0',
    },
};

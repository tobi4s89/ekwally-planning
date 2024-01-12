export const fieldInputTheme = {
    base: 'relative',
    input: {
        base: 'block peer w-full placeholder-transparent text-gray-900 rounded-lg border-0 ring-1 ring-inset focus:ring-inset',
        sizes: {
            sm: 'sm:text-xs py-2 sm:leading-4 focus:shadow-md',
            md: 'sm:text-sm py-2.5 sm:leading-5 focus:shadow-md',
            lg: 'sm:text-md py-3 sm:leading-6 focus:shadow-lg',
            xl: 'sm:text-lg py-4 sm:leading-7 focus:shadow-lg',
        },
        status: {
            none: 'ring-gray-300 focus:ring-gray-400',
            invalid: 'text-gray-400 focus:text-gray-900 ring-red-500 focus:ring-red-500',
            valid: 'ring-green-500 focus:ring-green-500',
        },
    },
    label: {
        base: 'absolute -top-2 left-2 transition-all inline-block bg-white px-1 text-xs font-medium ' +
            'peer-placeholder-shown:left-2 ' +
            'peer-placeholder-shown:bg-transparent ' +
            'peer-placeholder-shown:font-normal ' +
            'peer-placeholder-shown:text-gray-400 ' +
            'peer-focus:-top-2 ' +
            'peer-focus:left-2 ' +
            'peer-focus:bg-white ' +
            'peer-focus:font-medium ' +
            'peer-focus:text-xs',
        sizes: {
            sm: 'peer-placeholder-shown:text-xs peer-placeholder-shown:top-2',
            md: 'peer-placeholder-shown:text-sm peer-placeholder-shown:top-2.5',
            lg: 'peer-placeholder-shown:text-base peer-placeholder-shown:top-3',
            xl: 'peer-placeholder-shown:text-lg peer-placeholder-shown:top-4'
        },
        status: {
            none: 'text-gray-500 peer-focus:text-gray-500',
            invalid: 'text-red-500 peer-focus:text-red-500',
            valid: 'text-green-500 peer-focus:text-green-500',
        }
    },
    icon: {
        base: 'pointer-events-none absolute text-gray-300 inset-y-0 right-0 flex items-center pr-3',
        sizes: {
            sm: 'h-4 w-4',
            md: 'h-5 w-5',
            lg: 'h-6 w-6',
            xl: 'h-7 w-7',
        }
    },
};

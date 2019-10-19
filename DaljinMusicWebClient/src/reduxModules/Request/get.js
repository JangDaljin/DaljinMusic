export const getWithoutBody = () => (
    {
        headers : {
            'Content-Type' : 'application/json',
        },
        method : 'GET'
    }
)

export const get = () => (
    {
        headers : {
            'Content-Type' : 'application/json',
        },
        method : 'GET'
    }
)
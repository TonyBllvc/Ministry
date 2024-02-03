
let data
let pending = false

export function fetchDataset(url) {

    async function dataSet() {

        // const details = {
        //     access: access,
        // };
        pending = true
        try {
            const response = await fetch(url)
            //     {
            //     method: 'PUT',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(details),
            // });

            const json = await response.json()
            console.log(response.status)

            if (response.status === 401) {

                console.log(json?.message || json?.error)
            }

            if (response.status === 400 || response.status === 404) {
                console.log(json?.message || json?.error)
            } else if (response.status === 200) {
                console.log(json?.content || 'nothing')
                return data = json?.content
            }
            pending = false
        } catch (error) {
            console.log(error.message)
        };
        pending = false
    }

    return { dataSet, pending }

}
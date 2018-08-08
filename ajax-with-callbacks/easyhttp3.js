class EasyHTTP {
    // HTTP GET request
    async get(url) {
        const res = await fetch(url)
        return await res.json()
    }


    //POST
    async post(url, data) {

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return await res.json()
    }

    //PUT
    async put(url, data) {

        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return await res.json()
    }

    //DELETE
    async delete(url) {

        await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
        return await 'Resource deleted'
    }
}
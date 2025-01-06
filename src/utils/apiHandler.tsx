const API_BASE_URL = '/api';

const handleResponse = async (response: any) => {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong!');
    }
    return response.json();
};

const GetApi = async(url: string) => {

    const apiUrl = `${API_BASE_URL}/${url}`;

    try {
        const response = await fetch(apiUrl);
        return await handleResponse(response);
    } catch (error) {
        console.error(`Error fetching ${apiUrl} :`, error);
    }
}

const PostApi = async(url: string, body: string) => {
    
    const apiUrl = `${API_BASE_URL}/${url}`;
    console.log(apiUrl);
    console.log(body);

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: body,
        });
        return await handleResponse(response);

    } catch (error: any) {
        console.error(`Error creating ${apiUrl} :`, error);
        throw new Error(error || 'Something went wrong!'); 
    }
}

const DeleteApi = async(url: string, id: number) => {

    const apiUrl = `${API_BASE_URL}/${url}/${id}`;
    try {
        const response = await fetch(apiUrl, {
          method: 'DELETE',
        });
        return await handleResponse(response);
    } catch (error) {
        console.error(`Error deleting ${apiUrl} :`, error);
    }
}

export { GetApi, PostApi, DeleteApi }
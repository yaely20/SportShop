import axios from 'axios'

const baseUrl ="http://localhost:4000/product"

export const fetchProduct=async()=>{
    const response = await axios.get(baseUrl)
    console.log("api")
    console.log(response.data)
    return response.data
}
export const fetchproductbyId=async(id)=>{
    const response = await axios.get(`${baseUrl}/${id}`)

    return response.data
}


export const deleteProduct=async(id)=>{
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
}

export const addProduct=async(product)=>{
    const response = await axios.post(`${baseUrl}/`,product)
    return response.data
}

export const updateProduct=async(id,product)=>{
    const response = await axios.put(`${baseUrl}/${id}`,product)
    return response.data
}

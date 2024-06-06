import axios from 'axios'

const baseUrl ="http://localhost:4000/order"

export const fetchAllOrder=async()=>{
    const response = await axios.get(baseUrl)
    return response.data
}

export const deleteOneOrder=async(id)=>{
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
}

export const addOneOrder=async(order)=>{
    const response = await axios.post(`${baseUrl}/`,order)
    return response.data
}

export const updateOneOrder=async(id)=>{
    const response = await axios.put(`${baseUrl}/ ${id}`)
    return response.data
}

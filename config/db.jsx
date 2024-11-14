import { DB } from "./constants"
import db from './db.json'

export async function getData(url){
    // const res = await fetch(`http://localhost:8000/${url}`);
    return db
}

export async function getImage(id){
    const res = await fetch(`http://localhost:8000/api/image/${id}/`)
    return res.json()
}

export async function getOrder(no){
    const res = await fetch(`http://localhost:8000/api/order/${no}/`)
    return res.json()
}
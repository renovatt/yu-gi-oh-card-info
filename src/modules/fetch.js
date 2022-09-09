const fetchYuGiOh = async () => {
    const fetchAPI = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?&language=pt`)
    if(fetchAPI.status == 200){
        const data = await fetchAPI.json()
        return data
    }
}

const fetchDivineBeast = async () =>{
    const fetchAPI = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?&language=pt&race=Divine-Beast`)
    if(fetchAPI.status == 200){
        const data = await fetchAPI.json()
        return data
    }
}

export { fetchYuGiOh, fetchDivineBeast }
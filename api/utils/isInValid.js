const reqFields = [
    "recipeName",
    "category",
    "ingredients",
    "instructions",
    "recipeTime",
    "servingSuggestion"
]

//nesnedeki değişkenlerin en az 1i bile eksikse false
//hepsi tamamsa true döndürür

const isInValid = (data) => {
    return reqFields.some((field) =>!data[field])
}

export default isInValid
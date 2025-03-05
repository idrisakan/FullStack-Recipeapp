import { readRecipes, writeRecipes } from "../model/recipeModel.js";
import isInValid from "../utils/isInValid.js";

const data = readRecipes();

//1-) bütün yemek tariflerini al
export const getAllRecipes = (req, res) => {
  //tarif verisinin bir kopyasını oluştur
  let recipes = [...data];

  //aranılan kelime (küçük harf)
  const search = req.query?.search?.toLowerCase();

  //eger search parametresi geldiyse filitreleme yap
  if (search) {
    recipes = data.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(search)
    );
  }
  // eger order parametresi geldiyse sıralama yap
  if (req.query.order) {
    recipes.sort((a, b) =>
      req.query.order === "asc"
        ? a.recipeTime - b.recipeTime
        : b.recipeTime - a.recipeTime
    );
  }

  res.status(200).json({
    message: "Bütün yemek tarifleri alındı",
    results: recipes.length,
    recipes: recipes,
  });
};
//2-) yeni yemek tarifini ekle
export const createRecipes = (req, res) => {
  // isteğin body bölümünde gelen veriye erişmeliyim
  let newRecipe = req.body;

  //veri bütünlügü kontrol et
  if (isInValid(newRecipe)) {
    return res
      .status(404)
      .json({ message: "Lütfen bütün değerleri tanımlayın" });
  }

  //veriye id ve foto ekle
  newRecipe = {
    ...newRecipe,
    id: crypto.randomUUID(),
    image: `https://picsum.photos/seed/${crypto.randomUUID()}/500/500`,
  };

  //tarif verisiini diziye ekle
  data.push(newRecipe);

  //json dosyasını güncelle
  writeRecipes(data);

  //cevap gönder
  res.status(201).json({
    message: "Yeni yemek tarifi eklendi",
  });
};
//3-) bir yemek tarifini al
export const getRecipe = (req, res) => {
  res.status(200).json({
    message: "Bir yemek tarifi oluşturuldu",
    found: req.foundRecipe,
  });
};

//4-) bir yemek tarifini sil
export const deleteRecipe = (req, res) => {
  //silinecek id li elemanın sırasını bul
  const index = data.findIndex((i) => i.id === req.params.id);

  //elemanı diziden kaldır
  data.splice(index, 1);

  //json dosyasını güncelle
  writeRecipes(data);

  res.status(204).json({
    message: "Bir yemek tarifi silindi",
  });
};

//5-)bir yemek tarifini güncelle
export const updateRecipe = (req, res) => {
//eski tarif nesnesini güncelle 
const updated = {...req.foundRecipe, ...req.body}

//güncellenecek elemanın sırasını bul 
const index = data.findIndex((i) => i.id === req.params.id);

//diziyi güncelle
data.splice(index, 1,updated)

//json dosyasını güncelle
writeRecipes(data)

  res.status(200).json({
    message: "Bir yemek tarifi güncellendi",
    recipe:updated,
  });
};

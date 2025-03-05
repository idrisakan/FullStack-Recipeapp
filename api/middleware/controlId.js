import { readRecipes } from "../model/recipeModel.js";

const data = readRecipes();

const controlId = (req, res, next) => {
  //json dosyasındaki veriler arasında parametreyle gelen id li eleman var mı

  const found = data.find((i) => i.id == req.params.id);

  //eğer eleman bulunmazsa hata gönder

  if (!found) {
    return res
      .status(404)
      .json({ mesagge: "aradığınız id li elemman bulunamadı" });
  }

  //req nesnesi  içerisinde bulunan ekle
  req.foundRecipe = found;

  //sorun yoksa sonra ki adıma devam et
  next();
};
export default controlId;

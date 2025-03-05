import fs from "fs";

//json dosyasının içeriğini 'OKU'

export const readRecipes = () => {
  try {
    const text = fs.readFileSync("./data.json", "utf8");
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// param olarak veriyi json dosyasına 'YAZAR'

export const writeRecipes = (data) => {
  try {
    fs.writeFileSync("./data.json", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

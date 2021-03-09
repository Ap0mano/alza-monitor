const axios = require('axios');
const { JSDOM } = require("jsdom");
let obj = {};

let arr = ['https://www.alza.sk/tex-tech-respirator-ffp2-nr-5-ks-d6225392.htm', 'https://www.alza.sk/samsung-970-evo-plus-2000gb-d5543504.htm', 'https://www.alza.sk/gainward-geforce-rtx-3090-phantom-d6232458.htm', 'https://www.alza.cz/gaming/pny-geforce-rtx-3090-24gb-xlr8-gaming-revel-epic-x-rgb-triple-fan-edition-d6275951.htm', 'https://www.alza.cz/gaming/gigabyte-p850gm-d6163420.htm', 'https://www.alza.sk/evga-geforce-rtx-3090-ftw3-ultra-d6160836.htm'];

for (i of arr) {
  getData(i)
}

async function getData(url) {
  try {
    await new Promise(resolve => setTimeout(resolve, 5000)); //timeout v ms
    const res = await axios.get(url);
    const html = await new JSDOM(res.data);
    let name = html.window.document.querySelector("h1[itemprop='name']").innerHTML.trim(); //nazov produktu
    const element = html.window.document.querySelector(".quantity").querySelector(".text"); // pojebane "Kupit" tlacitko, null = tlacitko tam neni takze produkt je oos
    (obj[name] && obj[name].stock == false && element) ? console.log(`${name} just restocked, ${url}`) : console.log(`${name} oos`); getData(url) //ak bol produkt predtym oos a teraz je in stock tak to ASI ukaze ze sa restockol
    obj[name] = {stock: element != null ? true : false } //tu sa vytvori objekt
  } catch (error) {
    console.error(error);
  }
}

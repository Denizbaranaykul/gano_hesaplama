// Global değişkenler
let eskiToplamPuan = 0;
let eskiToplamKredi = 0;

function combo_goster()
{
  const dersSayisi = parseInt(document.getElementById("ders_sayisi").value);
  const alanlarDiv = document.getElementById("alanlar");
  alanlarDiv.innerHTML = "";
  
  for(let i = 1; i <= dersSayisi; i++)
  {
    const satir = document.createElement("div");
    satir.className = "ders-satiri";

    const textarea = document.createElement("textarea");
    textarea.placeholder = `Ders ${i} adı veya notu`;
    textarea.rows = 1;
    textarea.cols = 30;

    const select = document.createElement("select");
    const secenekler = [1, 2, 3, 4, 5, 6];
    secenekler.forEach(kredi => {
      const option = document.createElement("option");
      option.value = kredi;
      option.textContent = `${kredi} kredi`;
      select.appendChild(option);
    });

    satir.appendChild(textarea);
    satir.appendChild(select);
    alanlarDiv.appendChild(satir);
  }
}

function ex_kredi()
{
  const ganoTextarea = document.querySelector("textarea[name='Gano']");
  const krediTextarea = document.querySelector("textarea[name='kredi']");

  const eskiGano = parseFloat(ganoTextarea.value.trim());
  const eskiKredi = parseFloat(krediTextarea.value.trim());

  if (!isNaN(eskiGano) && !isNaN(eskiKredi)) {
    eskiToplamKredi = eskiKredi;
    eskiToplamPuan = eskiGano * 25 * eskiKredi;
    alert("Eski dönem başarıyla eklendi!");
  } else {
    alert("Lütfen geçerli eski GANO ve kredi bilgisi giriniz.");
  }
}

function hesapla()
{
  const alanlarDiv = document.getElementById("alanlar");
  const dersSatirlari = alanlarDiv.querySelectorAll(".ders-satiri");

  let toplamPuan = eskiToplamPuan;
  let toplamKredi = eskiToplamKredi;

  dersSatirlari.forEach(satir => {
    const textarea = satir.querySelector("textarea");
    const select = satir.querySelector("select");

    const notu = parseFloat(textarea.value.trim());
    const kredi = parseInt(select.value);

    if (!isNaN(notu) && !isNaN(kredi)) {
      toplamPuan += notu * kredi;
      toplamKredi += kredi;
    }
  });

  if (toplamKredi === 0) {
    alert("Hiç kredi girilmedi!");
    return;
  }

  const gano = (toplamPuan / toplamKredi / 25).toFixed(2);
  alert("GANO'nuz: " + gano);
}

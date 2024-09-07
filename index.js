window.onload = function () {
    const url = 'https://developer-lostark.game.onstove.com/markets/items';
    const authorizationToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwNDE2ODkifQ.W7Og-Wa8JOm93BHnmJ2vg4dr8w7ob8cSYiZ_KOYirXBUFbs0Xk_6FfJOtUTuurm1_6t-LYAznCkZyk5Ykrt3k2FNg1K43G3jbWVR0OvaFyVnsGM46IFsuE8YyFGFbuFrhs18zaIw82gABx7cS_3LDjLND2uvWKRXuDUp3S38WXdzIWqsM_a6aWB8lP_Q63wmjt-Xpy7Ph_WO4LSU_tXyKbOCrTIEW7iMv-uzpTCB-DBybcRZdhbVxhp5Rgr-aiMszZekzF8AH3ppMWkpKxN16Ni1cYRY-q2TEPNuRCKfsWxkwVhoJMi5joJNXOsKB3jeuQqWf6F-cdwT62wwYbO_GQ'; // 토큰은 변수로 빼서 재사용

    Promise.all([
        fetchItemPrices(url, authorizationToken, 50010, "최상급 오레하 융화 재료", ['resultPrice2']),
        fetchItemPrices(url, authorizationToken, 50010, "아비도스 융화 재료", ['resultPrice3']),
        fetchItemPrices(url, authorizationToken, 90700, "고대 유물", ['ancientArtifactPrice']),
        fetchItemPrices(url, authorizationToken, 90700, "희귀한 유물", ['rareArtifactPrice']),
        fetchItemPrices(url, authorizationToken, 90700, "오레하 유물", ['orehaArtifactPrice']),
        fetchItemPrices(url, authorizationToken, 90700, "아비도스 유물", ['abydosArtifactPrice']),
        fetchItemPrices(url, authorizationToken, 90600, "생선", ['fishPrice']),
        fetchItemPrices(url, authorizationToken, 90600, "붉은 살 생선", ['redFishPrice']),
        fetchItemPrices(url, authorizationToken, 90600, "오레하 태양 잉어", ['orehaFishPrice']),
        fetchItemPrices(url, authorizationToken, 90600, "아비도스 태양 잉어", ['abydosFishPrice']),
        fetchItemPrices(url, authorizationToken, 90300, "목재", ['woodPrice']),
        fetchItemPrices(url, authorizationToken, 90300, "부드러운 목재", ['softWoodPrice']),
        fetchItemPrices(url, authorizationToken, 90300, "아비도스 목재", ['abydosWoodPrice'])
    ]).then(() => {
        displayProfit();
    }).catch(error => {
        console.error('Error fetching item prices:', error);
    });

    document.getElementById('page1Button').addEventListener('click', function() {
        showPage(1);
    });
    document.getElementById('page2Button').addEventListener('click', function() {
        showPage(2);
    });
    document.getElementById('page3Button').addEventListener('click', function() {
        showPage(3);
    });
};

function changeMaterialPrice(materialInputId, materialPriceId) {
    var inputVal = parseFloat(document.getElementById(materialInputId).value);
    document.getElementById(materialPriceId).textContent = isNaN(inputVal) ? "0" : inputVal;
}

document.getElementById('ancientArtifact').oninput = function () { changeMaterialPrice('ancientArtifact', 'ancientArtifactPrice'); displayProfit(); };
document.getElementById('rareArtifact').oninput = function () { changeMaterialPrice('rareArtifact', 'rareArtifactPrice'); displayProfit(); };
document.getElementById('orehaArtifact').oninput = function () { changeMaterialPrice('orehaArtifact', 'orehaArtifactPrice'); displayProfit(); };
document.getElementById('abydosArtifact').oninput = function () { changeMaterialPrice('abydosArtifact', 'abydosArtifactPrice'); displayProfit(); };

document.getElementById('fish').oninput = function () { changeMaterialPrice('fish', 'fishPrice'); displayProfit(); };
document.getElementById('redFish').oninput = function () { changeMaterialPrice('redFish', 'redFishPrice'); displayProfit(); };
document.getElementById('orehaFish').oninput = function () { changeMaterialPrice('orehaFish', 'orehaFishPrice'); displayProfit(); };
document.getElementById('abydosFish').oninput = function () { changeMaterialPrice('abydosFish', 'abydosFishPrice'); displayProfit(); };

document.getElementById('wood').oninput = function () { changeMaterialPrice('wood', 'woodPrice'); displayProfit(); };
document.getElementById('softWood').oninput = function () { changeMaterialPrice('softWood', 'softWoodPrice'); displayProfit(); };
document.getElementById('abydosWood').oninput = function () { changeMaterialPrice('abydosWood', 'abydosWoodPrice'); displayProfit(); };

document.getElementById('result2').oninput = function () { changeMaterialPrice('result2', 'resultPrice2'); displayProfit(); };
document.getElementById('result3').oninput = function () { changeMaterialPrice('result3', 'resultPrice3'); displayProfit(); };

document.getElementById('reducedFee').oninput = function () { changeMaterialPrice('reducedFee', 'reducedFeeAmount'); displayProfit(); };
document.getElementById('increasedGreat').oninput = function () { changeMaterialPrice('increasedGreat', 'increasedGreatAmount'); displayProfit(); };

function changeMaterialPrice(materialInputId, materialPriceId) {
    var inputVal = parseFloat(document.getElementById(materialInputId).value);
    var validatedInputVal = isNaN(inputVal) ? "0" : inputVal.toString();
    document.getElementById(materialPriceId).textContent = validatedInputVal;

    localStorage.setItem(materialPriceId, validatedInputVal);
}

function loadSavedPrices() {
    ['reducedFeeAmount', 'increasedGreatAmount'].forEach(id => {
        if (localStorage.getItem(id)) {
            document.getElementById(id).textContent = localStorage.getItem(id);
        }
    });
}

document.addEventListener('DOMContentLoaded', loadSavedPrices);

function fetchItemPrices(url, authorizationToken, categoryCode, itemName, resultIds) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'authorization': authorizationToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "CategoryCode": categoryCode,
            "ItemName": itemName
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            resultIds.forEach((id, index) => {
                if (data.Items.length > index) {
                    const price = data.Items[index].CurrentMinPrice;
                    document.getElementById(id).innerText = price;
                }
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

document.getElementById('fetchPriceButton').addEventListener('click', function () {
    const url = 'https://developer-lostark.game.onstove.com/markets/items';
    const authorizationToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwNDE2ODkifQ.W7Og-Wa8JOm93BHnmJ2vg4dr8w7ob8cSYiZ_KOYirXBUFbs0Xk_6FfJOtUTuurm1_6t-LYAznCkZyk5Ykrt3k2FNg1K43G3jbWVR0OvaFyVnsGM46IFsuE8YyFGFbuFrhs18zaIw82gABx7cS_3LDjLND2uvWKRXuDUp3S38WXdzIWqsM_a6aWB8lP_Q63wmjt-Xpy7Ph_WO4LSU_tXyKbOCrTIEW7iMv-uzpTCB-DBybcRZdhbVxhp5Rgr-aiMszZekzF8AH3ppMWkpKxN16Ni1cYRY-q2TEPNuRCKfsWxkwVhoJMi5joJNXOsKB3jeuQqWf6F-cdwT62wwYbO_GQ'; // 토큰은 변수로 빼서 재사용

    Promise.all([
        fetchItemPrices(url, authorizationToken, 50010, "최상급 오레하 융화 재료", ['resultPrice2']),
        fetchItemPrices(url, authorizationToken, 50010, "아비도스 융화 재료", ['resultPrice3']),
        fetchItemPrices(url, authorizationToken, 90700, "고대 유물", ['ancientArtifactPrice']),
        fetchItemPrices(url, authorizationToken, 90700, "희귀한 유물", ['rareArtifactPrice']),
        fetchItemPrices(url, authorizationToken, 90700, "오레하 유물", ['orehaArtifactPrice']),
        fetchItemPrices(url, authorizationToken, 90700, "아비도스 유물", ['abydosArtifactPrice']),
        fetchItemPrices(url, authorizationToken, 90600, "생선", ['fishPrice']),
        fetchItemPrices(url, authorizationToken, 90600, "붉은 살 생선", ['redFishPrice']),
        fetchItemPrices(url, authorizationToken, 90600, "오레하 태양 잉어", ['orehaFishPrice']),
        fetchItemPrices(url, authorizationToken, 90600, "아비도스 태양 잉어", ['abydosFishPrice']),
        fetchItemPrices(url, authorizationToken, 90300, "목재", ['woodPrice']),
        fetchItemPrices(url, authorizationToken, 90300, "부드러운 목재", ['softWoodPrice']),
        fetchItemPrices(url, authorizationToken, 90300, "아비도스 목재", ['abydosWoodPrice'])
    ]).then(() => {
        displayProfit();
    }).catch(error => {
        console.error('Error fetching item prices:', error);
    });
});

let currentPage = 1;
const rowsPerPage = 4;
const table = document.getElementById('materialsTable');
const rows = table.getElementsByTagName('tr');
const totalPages = Math.ceil((rows.length - 1) / rowsPerPage);

function showPage(page) {
    currentPage = page;
    for (let i = 1; i < rows.length; i++) {
        rows[i].classList.add('hidden');
    }
    const start = (page - 1) * rowsPerPage + 1;
    const end = page * rowsPerPage + 1;
    for (let i = start; i < end && i < rows.length; i++) {
        rows[i].classList.remove('hidden');
    }
}

// Initialize
showPage(1);


function calculateProfit(materialPrices, resultPriceId, goldUsed, materialRates, productCount) {
    var resultPrice = parseFloat(document.getElementById(resultPriceId).textContent);
    var increasedGreat = parseFloat(document.getElementById('increasedGreatAmount').textContent);
    var goldReduction = parseFloat(document.getElementById('reducedFeeAmount').textContent);

    var materialCost = materialPrices.reduce((total, priceId, index) => {
        return total + (parseFloat(document.getElementById(priceId).textContent) * materialRates[index]);
    }, 0);

    var productionCost = Math.floor(goldUsed * (100 - goldReduction) / 100) + materialCost;
    var fee = Math.ceil(resultPrice / 20);

    var profit = (resultPrice - fee) * productCount * (0.0005 * increasedGreat + 1.05) - productionCost;
    var singleProfit = profit / productCount;
    var useProfit = (resultPrice * productCount * (0.0005 * increasedGreat + 1.05)) - productionCost;

    return {
        totalProfit: profit.toFixed(2),
        singleProfit: singleProfit.toFixed(2),
        useProfit: useProfit.toFixed(2)
    };
}

function displayProfit() {

    var bundle2 = calculateProfit(['ancientArtifactPrice', 'rareArtifactPrice', 'orehaArtifactPrice'], 'resultPrice2', 300, [1.07, 0.51, 0.52], 15);
    document.getElementById('bundleProfit2').innerHTML = bundle2.totalProfit;
    document.getElementById('singleProfit2').innerHTML = bundle2.singleProfit;
    document.getElementById('useProfit2').innerHTML = bundle2.useProfit;

    var bundle3 = calculateProfit(['fishPrice', 'redFishPrice', 'orehaFishPrice'], 'resultPrice2', 300, [1.42, 0.69, 0.52], 15);
    document.getElementById('bundleProfit3').innerHTML = bundle3.totalProfit;
    document.getElementById('singleProfit3').innerHTML = bundle3.singleProfit;
    document.getElementById('useProfit3').innerHTML = bundle3.useProfit;

    var bundle4 = calculateProfit(['ancientArtifactPrice', 'rareArtifactPrice', 'abydosArtifactPrice'], 'resultPrice3', 364, [0.86, 0.45, 0.33], 10);
    document.getElementById('bundleProfit4').innerHTML = bundle4.totalProfit;
    document.getElementById('singleProfit4').innerHTML = bundle4.singleProfit;
    document.getElementById('useProfit4').innerHTML = bundle4.useProfit;

    var bundle5 = calculateProfit(['fishPrice', 'redFishPrice', 'abydosFishPrice'], 'resultPrice3', 364, [0.86, 0.45, 0.33], 10);
    document.getElementById('bundleProfit5').innerHTML = bundle5.totalProfit;
    document.getElementById('singleProfit5').innerHTML = bundle5.singleProfit;
    document.getElementById('useProfit5').innerHTML = bundle5.useProfit;

    var bundle6 = calculateProfit(['woodPrice', 'softWoodPrice', 'abydosWoodPrice'], 'resultPrice3', 364, [0.86, 0.45, 0.33], 10);
    document.getElementById('bundleProfit6').innerHTML = bundle6.totalProfit;
    document.getElementById('singleProfit6').innerHTML = bundle6.singleProfit;
    document.getElementById('useProfit6').innerHTML = bundle6.useProfit;
}

window.onload = function () {
    const url = 'https://developer-lostark.game.onstove.com/markets/items';
    const authorizationToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwNDE2ODkifQ.W7Og-Wa8JOm93BHnmJ2vg4dr8w7ob8cSYiZ_KOYirXBUFbs0Xk_6FfJOtUTuurm1_6t-LYAznCkZyk5Ykrt3k2FNg1K43G3jbWVR0OvaFyVnsGM46IFsuE8YyFGFbuFrhs18zaIw82gABx7cS_3LDjLND2uvWKRXuDUp3S38WXdzIWqsM_a6aWB8lP_Q63wmjt-Xpy7Ph_WO4LSU_tXyKbOCrTIEW7iMv-uzpTCB-DBybcRZdhbVxhp5Rgr-aiMszZekzF8AH3ppMWkpKxN16Ni1cYRY-q2TEPNuRCKfsWxkwVhoJMi5joJNXOsKB3jeuQqWf6F-cdwT62wwYbO_GQ'; // 토큰은 변수로 빼서 재사용

    Promise.all([
        fetchItemPrices(url, authorizationToken, 50010, "상급 오레하 융화 재료", ['resultPrice1', 'resultPrice2']),
        fetchItemPrices(url, authorizationToken, 50010, "아비도스 융화 재료", ['resultPrice3']),
        fetchItemPrices(url, authorizationToken, 90700, "고대 유물", ['ancientArtifactPrice']),
        fetchItemPrices(url, authorizationToken, 90700, "희귀한 유물", ['rareArtifactPrice']),
        fetchItemPrices(url, authorizationToken, 90700, "오레하 유물", ['orehaArtifactPrice']),
        fetchItemPrices(url, authorizationToken, 90700, "아비도스 유물", ['abydosArtifactPrice']),
        fetchItemPrices(url, authorizationToken, 90600, "생선", ['fishPrice']),
        fetchItemPrices(url, authorizationToken, 90600, "붉은 살 생선", ['redFishPrice']),
        fetchItemPrices(url, authorizationToken, 90600, "오레하 태양 잉어", ['orehaFishPrice']),
        fetchItemPrices(url, authorizationToken, 90600, "아비도스 태양 잉어", ['abydosFishPrice'])
    ]).then(() => {
        displayProfit();
    }).catch(error => {
        console.error('Error fetching item prices:', error);
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

document.getElementById('result1').oninput = function () { changeMaterialPrice('result1', 'resultPrice1'); displayProfit(); };
document.getElementById('result2').oninput = function () { changeMaterialPrice('result2', 'resultPrice2'); displayProfit(); };
document.getElementById('result3').oninput = function () { changeMaterialPrice('result3', 'resultPrice3'); displayProfit(); };

document.getElementById('reducedFee').oninput = function () { changeMaterialPrice('reducedFee', 'reducedFeeAmount'); displayProfit(); };
document.getElementById('increasedGreat').oninput = function () { changeMaterialPrice('increasedGreat', 'increasedGreatAmount'); displayProfit(); };

// Function to update material or result prices based on input
function changeMaterialPrice(materialInputId, materialPriceId) {
    var inputVal = parseFloat(document.getElementById(materialInputId).value);
    document.getElementById(materialPriceId).textContent = isNaN(inputVal) ? "0" : inputVal;
}

// General function to calculate and display profit for different scenarios
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
    var bundle1 = calculateProfit(['ancientArtifactPrice', 'rareArtifactPrice', 'orehaArtifactPrice'], 'resultPrice1', 250, [0.94, 0.29, 0.16], 20);
    document.getElementById('bundleProfit1').innerHTML = bundle1.totalProfit;
    document.getElementById('singleProfit1').innerHTML = bundle1.singleProfit;
    document.getElementById('useProfit1').innerHTML = bundle1.useProfit;

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

}

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
        fetchItemPrices(url, authorizationToken, 50010, "상급 오레하 융화 재료", ['resultPrice1', 'resultPrice2']),
        fetchItemPrices(url, authorizationToken, 50010, "아비도스 융화 재료", ['resultPrice3']),
        fetchItemPrices(url, authorizationToken, 90700, "고대 유물", ['ancientArtifactPrice']),
        fetchItemPrices(url, authorizationToken, 90700, "희귀한 유물", ['rareArtifactPrice']),
        fetchItemPrices(url, authorizationToken, 90700, "오레하 유물", ['orehaArtifactPrice']),
        fetchItemPrices(url, authorizationToken, 90700, "아비도스 유물", ['abydosArtifactPrice']),
        fetchItemPrices(url, authorizationToken, 90600, "생선", ['fishPrice']),
        fetchItemPrices(url, authorizationToken, 90600, "붉은 살 생선", ['redFishPrice']),
        fetchItemPrices(url, authorizationToken, 90600, "오레하 태양 잉어", ['orehaFishPrice']),
        fetchItemPrices(url, authorizationToken, 90600, "아비도스 태양 잉어", ['abydosFishPrice'])
    ]).then(() => {
        displayProfit();

    }).catch(error => {
        console.error('Error fetching item prices:', error);
    });

});
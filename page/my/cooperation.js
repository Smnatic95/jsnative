var dtPicker = new mui.DtPicker({
    type: 'date'
});

var cityPicker = new mui.PopPicker({
    layer: 2
});

var myarea = Area.map((province) => {
    return {
        text: province.provinceName,
        value: province.provinceName,
        children: province.mallCityList.map((city) => {
            return {
                text: city.cityName,
                value: city.cityName,
                children: city.mallAreaList.map((town) => {
                    return {
                        text: town.areaName,
                        value: town.areaName,
                    }
                })
            }
        })
    }
});

cityPicker.setData(myarea);

function pickDate(_this) {
    dtPicker.show(function (selectItems) {
        $(_this).val(selectItems.value)
    })
}

function pickCity(_this) {
    cityPicker.show(function (selectItems) {
        $(_this).val(selectItems[0].value + selectItems[1].value);
    })
}



$(function(){
    $('.submit').on('click',function(){
        mui.alert('提交成功,请等待审核','提示');
    })
})
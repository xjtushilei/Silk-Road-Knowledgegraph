$(document).ready(function () {
    var reg = new RegExp('(^|&)' + 'lang' + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);

    if(r != null){
        console.log(r[2])
        if(r[2] == 'en'){
            $("#ieee").html("<a href=\"index.html\">IEEE</a>")
            $("#company").html("<a href=\"company.html\">Company</a>")
            $("#uansr").html("<a href=\"uansr.html\">Education Of Science</a>")
            $("#country").html("<a href=\"country.html\">CountryContent</a>")
            $("#uebook").html("<a href=\"uebook.html\">History And Culture</a>")
            $("#btn_search").text("Search")
            // $("#input_search").val("Criteria for Security Systems")
        }
        else if(r[2] == 'ru')
        {
            $("#ieee").html("<a href=\"index.html\">IEEE</a>")
            $("#company").html("<a href=\"company.html\">Компания</a>")
            $("#uansr").html("<a href=\"uansr.html\">Образование Наука</a>")
            $("#country").html("<a href=\"country.html\">Содержание в стране</a>")
            $("#uebook").html("<a href=\"uebook.html\">История и культура</a>")
            $("#btn_search").text("Поиск")
        }
    }
})
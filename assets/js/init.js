function init() {
    
    console.log('pagina lista');
    array_fav = [];
    
    recorrer_ls();
}


$("#btn_buscar_artista").click(function() {
    
    console.log('entro a buscar artistas');
    
    //Ejemplo: https://platzi-music-api.now.sh/search?q=pepe&type=artist
    var artista             = $("#buscar_artista").val();
    var tipo                = 'artist';
    var api_method          = 'POST';
    var api_datatype        = 'JSON';
    
    $.ajax({
        url: 'https://platzi-music-api.now.sh/search?q=' + artista + '&type=' + tipo,
        method: api_method,
        datatype: api_datatype,
        success: function(data) {
            
            //debugger;
            
            
            // Guarda el resultado de la busqueda en una variable
            var array_artistas = data.artists.items;
            
            $('#grilla_artistas').empty();
            $('#grilla_artistas').append(mostrar_resultado_artistas(array_artistas));
            
        },
        error: function() {
            
            console.log('Error');
        
        } 
    });
});


function agregar_favoritos(id_artista) {
    
    console.log('entro a favoritos');
    
    var id_ls = "id" + id_artista;
    
    array_fav.push(id_artista);
    
    localStorage.setItem(id_ls, id_artista);
    
    consultar_artistas_fav(array_fav);
}


function recorrer_ls() {
    
    var array_favoritos;
    
    for (var i = 0; i < localStorage.length; i++) {
        array_favoritos += localStorage[i];
        console.log('localStorage: ' + localStorage[i]);
    }
   
    /*
    for (var i in localStorage) {
        array_favoritos += localStorage[i] + ',';
        console.log('localStorage: ' + localStorage[i]);
        
    }
    
    
    
    array_favoritos_cleaned2 = array_favoritos.slice(0, -1);
    array_favoritos_cleaned2 = array_favoritos.slice(0, -1);
    console.log('array_favoritos_cleaned: ' + array_favoritos_cleaned);
    */
   
   
    
    var array_favoritos_cleaned = "4KOorc5WXPSuujoB2Xb8BE";
    
    consultar_artistas_fav(array_favoritos_cleaned);
}


function consultar_artistas_fav(array_favoritos) {
    
    console.log('entro a buscar artistas favoritos: ' + array_favoritos);     
        
    var id_artistas         = array_favoritos;
    var api_method          = 'POST';
    var api_datatype        = 'JSON';

    $.ajax({
        url: 'https://platzi-music-api.now.sh/artists?ids=' + id_artistas,
        method: api_method,
        datatype: api_datatype,
        success: function(data) {

            //debugger;

            // Guarda el resultado de la busqueda en una variable
            var array_artistas_favoritos = data.artists;
            
            $('#grilla_favoritos').empty();
            $('#grilla_favoritos').append(mostrar_favoritos(array_artistas_favoritos));

        },
        error: function() {

            console.log('Error');

        } 
    });
}

/*
$(".btn_favoritos").on('click', function(e) {
    
    e.preventDefault();
    
    console.log('entro a favoritos');
    
    var id_ls = "id" + id_artista;
    
    localStorage.setItem(id_ls, JSON.stringify({
        "id": id_artista,
        "imagen": imagen_artista,
        "nombre": nombre_artista
    }));
});
*/

// Busca albums por ID de ARTISTA
function buscar_album_por_artista(id_artista) {
    
    console.log('entro a buscar albumes');
    
    // Ejemplo: https://platzi-music-api.now.sh/artists/10gzBoINW3cLJfZUka8Zoe/albums?market=AR&album_type=single
    
    var api_method          = 'POST';
    var api_datatype        = 'JSON';
    
    $.ajax({
        url: 'https://platzi-music-api.now.sh/artists/' + id_artista + '/albums',
        method: api_method,
        datatype: api_datatype,
        success: function(data) {
            
            //debugger;
            
            // Guarda en una variable el array artistas
            var array_albumes = data.items;
            
            $('#grilla_albumes').empty();
            $('#grilla_albumes').append(mostrar_resultado_albumes(array_albumes));
            
            // acomoda las grillas para mostrar los albumes
            $('#grilla_favoritos').slideUp(); // oculta la grilla de favoritos 
            $('#grilla_albumes').slideDown(); // muestra la grilla albumes 
        },
        error: function() {
            
            console.log('Error');
        
        } 
    });
}


// Busca el detalle de un album por ID de ALBUM
function buscar_detalle_album(id_album,imagen_album,nombre_album) {
    
    console.log('entro a buscar albumes: ' + imagen_album + ' ' + nombre_album);
    
    // Ejemplo: https://platzi-music-api.now.sh/albums/2UibTz5TYp1zbacZUcnYx1/tracks
    
    var api_method          = 'POST';
    var api_datatype        = 'JSON';
    
    $.ajax({
        url: 'https://platzi-music-api.now.sh/albums/' + id_album + '/tracks',
        method: api_method,
        datatype: api_datatype,
        success: function(data) {
            
            //debugger;
            console.log('entre al detalle');
            
            // Guarda en una variable el resultado de la consulta
            var array_detalle_album = data.items;
            
            $('#grilla_album_contenido').empty();
            $('#grilla_album_contenido').append(mostrar_detalle_album(array_detalle_album));
        },
        error: function() {
            
            console.log('Error');
        
        } 
    });
}


// Cierra la grilla de albumes
function cerrar_album() {

    // acomoda las grillas para mostrar los albumes
    $('#grilla_favoritos').slideDown(); // muestra la grilla de favoritos 
    $('#grilla_albumes').slideUp(); // oculta la grilla albumes
    
    // remueve append
    $('#grilla_albumes').empty();
}
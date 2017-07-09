// Muestra los resultados de la busqueda por ARTISTA de acuerdo al NOMBRE del ARTISTA
function mostrar_resultado_artistas(array_artistas) {
    
    var html;
    
    html = "<div class='row'>";
        html += "<div class='col-sm-12'>";
            html += "<div class='card-box table-responsive'>";
                html += "<h4 class='m-t-0 header-title'><b>Resultado de la busqueda</b></h4>";
                html += "<table class='table table-hover table-striped m-0 table-responsive'>";
                    html += "<thead>";
                        html += "<tr>";
                            html += "<th>Foto</th>";
                            html += "<th>Artista</th>";
                            html += "<th>Favoritos</th>";
                        html += "</tr>";
                    html += "</thead>";
                    html += "<tbody>";
                        for(var i in array_artistas) {
                            var info_artista = array_artistas[i];

                            var array_images = info_artista.images;

                            for (var j in array_images) {
                               var objeto_images = array_images[j];
                               var url_images = objeto_images[Object.keys(objeto_images)[1]];
                            }
                            html += "<tr>";
                                if (url_images) {
                                    html += "<td><img class='circular--square' src='" + url_images + "' width='42' height='42'></td>";   
                                } else {
                                    html += "<td><img class='circular--square' src='' width='42' height='42'></td>";       
                                }
                                html += "<td>" + info_artista.name + "</td>";
                                var en_favoritos = comprueba_favorito(info_artista.id); // Comprueba si el artista ya se encuentra en favoritos
                                if (en_favoritos === -1) {
                                    html += "<td><a href='javascript:void(0)' onclick='agregar_favoritos(this.id);' id='" + info_artista.id + "'><i class='md md-favorite-outline'></i></a></td>";
                                } else {
                                    html += "<td><a href='javascript:void(0)'><i class='md md-favorite'></i></a></td>";
                                }
                            html += "</tr>";
                        }
                    html += "</tbody>";
                html += "</table>";
            html += "</div>";
        html += "</div>";
    html += "</div>";
    
    return html;
}


// Muestra los favoritos del usuario
function mostrar_favoritos(array_artistas_favoritos) {
    
    var html;
    
    for(var i in array_artistas_favoritos) {
        var info_artista_fav = array_artistas_favoritos[i];

        var array_images = info_artista_fav.images;

        for (j in array_images) {
           var objeto_images = array_images[j];
           var url_images = objeto_images[Object.keys(objeto_images)[1]];
        }
        html += "<tr>";
            if (url_images) {
                html += "<td><img class='circular--square' src='" + url_images + "' width='42' height='42'></td>";   
            } else {
                html += "<td><img class='circular--square' src='' width='42' height='42'></td>";       
            }
            html += "<td>" + info_artista_fav.name + "</td>";
            html += "<td><button onclick='buscar_album_por_artista(this.id);' id='" + info_artista_fav.id + "' type='button' class='btn btn-primary waves-effect waves-light'>Ver</button></td>"
            html += "<td><button onclick='borrar_artista_fav(this.id);' id='" + info_artista_fav.id + "' type='button' class='btn btn-primary waves-effect waves-light'>Borrar</button></td>"
            html += "<td><a href='javascript:void(0)' onclick='borrar_artista_fav(this.id);' id='" + info_artista_fav.id + "'> <i class='glyphicon glyphicon-remove'></i></a></td>";
        html += "</tr>";
    }
    
    return html;
}


// Muestra los resultados de la busqueda por ALBUM de acuerdo al ID del ARTISTA
function mostrar_resultado_albumes(array_albumes) {
        
    var html;
    
    html = "<div class='row'>";
        html += "<div class='col-sm-12'>";
            html += "<div class='card-box table-responsive'>";
                html += "<h4 class='m-t-0 header-title'><b>Albumes</b></h4>";
                html += "<button onclick='cerrar_album();' type='button' class='btn btn-default waves-effect waves-light'>Cerrar</button>";
                html += "<table class='table table-hover table-striped m-0 table-responsive'>";
                    html += "<thead>";
                        html += "<tr>";
                            html += "<th>Foto</th>";
                            html += "<th>Album</th>";
                            html += "<th>Detalle</th>";
                        html += "</tr>";
                    html += "</thead>";
                    html += "<tbody>";
                        html += "<tbody>";
                            for(var i in array_albumes) {
                                var info_album = array_albumes[i];
                                
                                var array_images = info_album.images;

                                for (j in array_images) {
                                   var objeto_images = array_images[0];
                                   var url_images = objeto_images[Object.keys(objeto_images)[1]];
                                }
                                
                                html += "<tr>";
                                    if (url_images) {
                                        html += "<td><img class='circular--square' src='" + url_images + "' width='42' height='42'></td>";   
                                    } else {
                                        html += "<td><img class='circular--square' src='' width='42' height='42'></td>";       
                                    }
                                    html += "<td>" + info_album.name + "</td>";
                                    html += "<td><button onclick='buscar_detalle_album(this.id);' id='" + info_album.id + "' type='button' class='btn btn-primary waves-effect waves-light'>Ver Album</button></td>"
                                html += "</tr>";
                            }
                    html += "</tbody>";
                html += "</table>";
            html += "</div>";
        html += "</div>";
    html += "</div>";
    
    return html;
}


// Muestra el detalle del ALBUM
function mostrar_detalle_album(array_detalle_album) {
    
    $('#modal').modal('show'); // muestra el modal
    
    var html;
    
    html = "<div class='row'>";
        html += "<div class='col-sm-12'>";
            html += "<div class='card-box table-responsive'>";
                html += "<h4 class='m-t-0 header-title'><b>Nombre Album</b></h4>";
                html += "<table class='table table-hover table-striped m-0 table-responsive'>";
                    html += "<thead>";
                        html += "<tr>";
                            html += "<th>Track</th>";
                            html += "<th>Nombre</th>";
                            html += "<th>Duracion</th>";
                            html += "<th>Acciones</th>";
                        html += "</tr>";
                    html += "</thead>";
                    html += "<tbody>";
                        html += "<tbody>";
                            for(var i in array_detalle_album) {
                                var info_album = array_detalle_album[i];
                                // Se usa el moment.js para convertir duration_ms de MS a minutos:segundos
                                var x = info_album.duration_ms;
                                var tempTime = moment.duration(x);
                                var duracion = tempTime.minutes() + ":" + tempTime.seconds();
                                
                                html += "<tr>";
                                    html += "<td>" + info_album.track_number + "</td>";
                                    html += "<td>" + info_album.name + "</td>";
                                    html += "<td>" + duracion + "</td>";
                                    html += "<td>" + "<a target='_blank' href='" + info_album.preview_url + "'> <button type='button' class='btn btn-success waves-effect waves-light'>Preview</button></a>" + "</td>";
                                html += "</tr>";
                            }
                    html += "</tbody>";
                html += "</table>";
            html += "</div>";
        html += "</div>";
    html += "</div>";
    
    return html;
}
//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace malta.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class blog
    {
        public int Id { get; set; }
        public Nullable<System.DateTime> Fecha { get; set; }
        public string Titulo { get; set; }
        public string Subtitulo { get; set; }
        public string Fuente { get; set; }
        public string Descripcion { get; set; }
        public string Etiquetas { get; set; }
        public string Url { get; set; }
        public string Tipo { get; set; }
        public string Imagen { get; set; }
        public string Autor { get; set; }
        public string Especies { get; set; }
    }
}

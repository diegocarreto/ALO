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
    
    public partial class correo
    {
        public int Id { get; set; }
        public int IdPlanta { get; set; }
        public short IdPuesto { get; set; }
        public string NombreCompleto { get; set; }
        public string Correo1 { get; set; }
        public short Tipo { get; set; }
    
        public virtual planta planta { get; set; }
        public virtual puesto puesto { get; set; }
    }
}
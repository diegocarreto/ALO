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
    
    public partial class precios
    {
        public int Id { get; set; }
        public int IdProducto { get; set; }
        public int IdPlanta { get; set; }
        public int IdMedida { get; set; }
        public Nullable<int> Minimo { get; set; }
        public decimal Precio { get; set; }
        public Nullable<int> IdPadre { get; set; }
        public Nullable<int> ValorPromocion { get; set; }
        public Nullable<int> RecompensaPromocion { get; set; }
        public bool TienePromocion { get; set; }
        public System.DateTime FechaDeInsercion { get; set; }
        public bool Activo { get; set; }
    
        public virtual medidas medidas { get; set; }
        public virtual planta planta { get; set; }
        public virtual productos productos { get; set; }
    }
}
